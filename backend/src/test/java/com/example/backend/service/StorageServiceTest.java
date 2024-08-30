package com.example.backend.service;

import com.example.backend.exception.FileConvertingException;
import com.example.backend.exception.UploadFileException;
import com.example.backend.service.impl.StorageServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StorageServiceImplTest {

    @Mock
    private S3Client s3Client;

    @Mock
    private S3Presigner s3Presigner;

    private StorageServiceImpl storageService;

    @Mock
    private MultipartFile multipartFile;

    private String bucketName = "test-bucket";

    @BeforeEach
    void setUp() {
        storageService = new StorageServiceImpl(s3Client);
    }

    @SuppressWarnings("deprecation")
    @Test
    void uploadFile_shouldUploadFileAndReturnUrl() throws IOException,
            UploadFileException, FileConvertingException {
        // Mock MultipartFile
        when(multipartFile.getOriginalFilename()).thenReturn("testFile.txt");
        when(multipartFile.getBytes()).thenReturn("Test Content".getBytes());

        // Mock S3 client
        ArgumentCaptor<PutObjectRequest> putObjectRequestCaptor = ArgumentCaptor.forClass(PutObjectRequest.class);
        when(s3Client.putObject(putObjectRequestCaptor.capture(),
                any(RequestBody.class)))
                .thenReturn(PutObjectResponse.builder().build());

        // Mock S3Presigner to generate URL
        PresignedGetObjectRequest presignedRequest = mock(PresignedGetObjectRequest.class);
        when(s3Presigner.presignGetObject(any(GetObjectPresignRequest.class)))
                .thenReturn(presignedRequest);
        when(presignedRequest.url()).thenReturn(new java.net.URL("http://test-url.com"));

        // Call the method
        String fileUrl = storageService.uploadFile(multipartFile);

        // Assertions
        assertNotNull(fileUrl);
        assertEquals("http://test-url.com", fileUrl);

        // Verify that the putObject method was called
        verify(s3Client, times(1)).putObject(any(PutObjectRequest.class),
                any(RequestBody.class));
        // Verify that the URL is generated correctly
        assertEquals("testFile.txt", putObjectRequestCaptor.getValue().key());
    }

    @Test
    void convertMultiPartFileToFile_shouldConvertMultipartFileToFile() throws IOException, FileConvertingException {
        // Mock MultipartFile
        when(multipartFile.getOriginalFilename()).thenReturn("testFile.txt");
        when(multipartFile.getBytes()).thenReturn("Test Content".getBytes());

        // Call the method
        File convertedFile = storageService.convertMultiPartFileToFile(multipartFile);

        // Assertions
        assertNotNull(convertedFile);
        assertEquals("testFile.txt", convertedFile.getName());
        assertTrue(convertedFile.length() > 0);

        // Cleanup
        convertedFile.delete();
    }

    @Test
    void uploadFile_shouldThrowUploadFileException_whenPutObjectFails() throws IOException {
        // Mock MultipartFile
        when(multipartFile.getOriginalFilename()).thenReturn("testFile.txt");
        when(multipartFile.getBytes()).thenReturn("Test Content".getBytes());

        // Mock S3 client to throw an exception
        when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                .thenThrow(S3Exception.builder().message("Error").build());

        // Call the method and assert exception
        assertThrows(UploadFileException.class, () -> storageService.uploadFile(multipartFile));
    }

    @Test
    void convertMultiPartFileToFile_shouldThrowFileConvertingException_whenIOExceptionOccurs()
            throws IOException {
        // Mock MultipartFile to throw IOException
        when(multipartFile.getOriginalFilename()).thenReturn("testFile.txt");
        when(multipartFile.getBytes()).thenThrow(new IOException("IO Error"));

        // Call the method and assert exception
        assertThrows(FileConvertingException.class, () -> storageService.convertMultiPartFileToFile(multipartFile));
    }
}
