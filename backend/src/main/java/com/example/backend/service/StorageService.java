package com.example.backend.service;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

import com.example.backend.exception.FileConvertingException;
import com.example.backend.exception.UploadFileException;

public interface StorageService {

    String uploadFile(MultipartFile file) throws UploadFileException, FileConvertingException;

    File convertMultiPartFileToFile(MultipartFile file) throws FileConvertingException;

}
