package com.example.backend.service.impl;

import com.example.backend.exception.FileConvertingException;
import com.example.backend.exception.UploadFileException;
import com.example.backend.service.StorageService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class StorageServiceImpl implements StorageService {

    private String bucketName;

    private final S3Client s3Client;

    // Constructor only requires S3Client
    public StorageServiceImpl(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String uploadFile(MultipartFile file) throws UploadFileException, FileConvertingException {
        File fileObj = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        try {
            uploadFileToS3(fileObj, fileName);
            return generateFileUrl(fileName);
        } catch (Exception e) {
            log.error("Error occurred while uploading file: {}", e.getMessage(), e);
            throw new UploadFileException("Failed to upload file: " + fileName);
        } finally {
            deleteLocalFile(fileObj);
        }
    }

    private void uploadFileToS3(File fileObj, String fileName) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromFile(fileObj));
    }

    private String generateFileUrl(String fileName) {
        return s3Client.utilities().getUrl(GetUrlRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build()).toString();
    }

    private void deleteLocalFile(File fileObj) {
        if (fileObj != null && fileObj.exists()) {
            if (fileObj.delete()) {
                log.info("Successfully deleted local file: {}", fileObj.getName());
            } else {
                log.warn("Failed to delete local file: {}", fileObj.getName());
            }
        }
    }

    @Override
    public File convertMultiPartFileToFile(MultipartFile file) throws FileConvertingException {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new FileConvertingException("Failed to convert file: " + file.getName());
        }
        return convertedFile;
    }
}
