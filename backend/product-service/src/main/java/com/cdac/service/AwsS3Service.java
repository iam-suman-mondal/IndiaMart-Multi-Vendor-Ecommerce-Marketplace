package com.cdac.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cdac.dto.ImageUploadResponse;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
public class AwsS3Service {

    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    public AwsS3Service(S3Presigner s3Presigner) {
        this.s3Presigner = s3Presigner;
    }

    public ImageUploadResponse generatePresignedUploadUrl(String fileExtension, String contentType) {
        String cleanExtension = fileExtension.replace(".", "");
        String fileKey = "products/" + UUID.randomUUID() + "." + cleanExtension;

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileKey)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10))
                .putObjectRequest(objectRequest)
                .build();

        String uploadUrl = s3Presigner.presignPutObject(presignRequest).url().toString();
        String publicImageUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, fileKey);

        return ImageUploadResponse.builder()
                .uploadUrl(uploadUrl)
                .imageUrl(publicImageUrl)
                .fileKey(fileKey)
                .build();
    }

   
}