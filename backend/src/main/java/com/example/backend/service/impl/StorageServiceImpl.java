package com.example.backend.service.impl;

import com.example.backend.exception.FileConvertingException;
import com.example.backend.exception.UploadFileException;
import com.example.backend.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class StorageServiceImpl implements StorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    private final S3Client s3Client;

    public StorageServiceImpl(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String uploadFile(MultipartFile file) throws UploadFileException,
            FileConvertingException {
        File fileObj = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" +
                file.getOriginalFilename();

        try {
            // Upload the file to S3
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromFile(fileObj));

            // Generate the URL for the uploaded file
            String fileUrl = s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fileName))
                    .toString();

            if (fileUrl.isEmpty() || fileUrl == null) {
                throw new UploadFileException("fileUrl not generated");
            } else {
                return fileUrl;
            }
        } catch (Exception e) {
            log.error("Error occurred while uploading file: {}", e.getMessage());
            throw new UploadFileException("Failed to upload file: " + fileName);
        } finally {
            // Delete the file from local storage after uploading
            fileObj.delete();
        }
    }

    @Override
    public File convertMultiPartFileToFile(MultipartFile file) throws FileConvertingException {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new FileConvertingException("Failed to convert file : " +
                    file.getName());
        }
        return convertedFile;
    }
}
