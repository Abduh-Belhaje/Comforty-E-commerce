package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

@Configuration
public class StorageConfig {

        private String accessKeyID = "AKIA5FTZAVNGZAXJZWE7";

        private String secretKey = "ECVFtHtP7NgNNBc7Op2q+C4C6nyomPpWhSUpZhPf";

        private String region = "us-east-1";

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