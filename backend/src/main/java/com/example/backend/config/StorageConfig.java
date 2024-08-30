package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

@Configuration
public class StorageConfig {

        @Value("${cloud.aws.credentials.access-key}")
        private String accessKeyID;

        @Value("${cloud.aws.credentials.secret-key}")
        private String secretKey;

        @Value("${cloud.aws.region.static}")
        private String region;

        @Bean
        public S3Client s3Client() {
                // Set your AWS credentials
                AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKeyID,
                                secretKey);

                // Build the S3Client with region and credentials
                return S3Client.builder()
                                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                                .region(Region.of(region)) // Use the configured AWS region
                                .serviceConfiguration(S3Configuration.builder()
                                                .pathStyleAccessEnabled(true) // Optional: use path-style access for
                                                // local testing
                                                .build())
                                .build();
        }
}