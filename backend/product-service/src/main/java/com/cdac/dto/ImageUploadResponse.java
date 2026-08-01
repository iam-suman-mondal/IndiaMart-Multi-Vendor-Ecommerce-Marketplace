package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageUploadResponse {
    private String uploadUrl;
    private String imageUrl;
    private String fileKey;
}
