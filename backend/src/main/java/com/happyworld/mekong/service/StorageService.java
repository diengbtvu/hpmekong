package com.happyworld.mekong.service;

import com.happyworld.mekong.constant.AppConstants;
import com.happyworld.mekong.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;

@Service
@Slf4j
public class StorageService {

    @Value("${file.upload.path}")
    private String uploadPath;

    @Value("${app.base-url}")
    private String baseUrl;

    public String uploadFile(MultipartFile file, String folder) {
        validateFile(file);

        try {
            // Create folder if not exists
            Path folderPath = Paths.get(uploadPath, folder);
            Files.createDirectories(folderPath);

            // Generate unique filename
            String filename = generateUniqueFilename(file.getOriginalFilename());
            Path filePath = folderPath.resolve(filename);

            // Save file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return URL
            String fileUrl = baseUrl + "/uploads/" + folder + "/" + filename;
            log.info("File uploaded successfully: {}", fileUrl);

            return fileUrl;

        } catch (IOException e) {
            log.error("Failed to upload file", e);
            throw new BadRequestException("Tải file lên thất bại: " + e.getMessage());
        }
    }

    public String uploadImage(MultipartFile file, String folder, int maxWidth) {
        validateImageFile(file);

        try {
            // Create folder if not exists
            Path folderPath = Paths.get(uploadPath, folder);
            Files.createDirectories(folderPath);

            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            
            if (originalImage == null) {
                throw new BadRequestException("File không phải là hình ảnh hợp lệ");
            }

            // Resize image if needed
            BufferedImage resizedImage;
            if (originalImage.getWidth() > maxWidth) {
                resizedImage = Thumbnails.of(originalImage)
                        .width(maxWidth)
                        .asBufferedImage();
            } else {
                resizedImage = originalImage;
            }

            // Generate unique filename
            String filename = generateUniqueFilename(file.getOriginalFilename());
            Path imagePath = folderPath.resolve(filename);

            // Save image
            String formatName = getImageFormat(file.getContentType());
            ImageIO.write(resizedImage, formatName, imagePath.toFile());

            // Return URL
            String imageUrl = baseUrl + "/uploads/" + folder + "/" + filename;
            log.info("Image uploaded successfully: {}", imageUrl);

            return imageUrl;

        } catch (IOException e) {
            log.error("Failed to upload image", e);
            throw new BadRequestException("Tải hình ảnh lên thất bại: " + e.getMessage());
        }
    }

    public void deleteFile(String fileUrl) {
        try {
            String relativePath = extractRelativePathFromUrl(fileUrl);
            
            if (relativePath != null && !relativePath.isEmpty()) {
                Path filePath = Paths.get(uploadPath, relativePath);
                Files.deleteIfExists(filePath);
                log.info("File deleted successfully: {}", relativePath);
            }

        } catch (Exception e) {
            log.error("Failed to delete file: {}", fileUrl, e);
            throw new BadRequestException("Xóa file thất bại: " + e.getMessage());
        }
    }

    public boolean fileExists(String fileUrl) {
        try {
            String relativePath = extractRelativePathFromUrl(fileUrl);
            if (relativePath == null) return false;
            
            Path filePath = Paths.get(uploadPath, relativePath);
            return Files.exists(filePath);
        } catch (Exception e) {
            log.error("Error checking file existence", e);
            return false;
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File không được để trống");
        }

        if (file.getSize() > AppConstants.MAX_FILE_SIZE) {
            throw new BadRequestException("File quá lớn. Kích thước tối đa: 50MB");
        }
    }

    private void validateImageFile(MultipartFile file) {
        validateFile(file);

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new BadRequestException("File không phải là hình ảnh");
        }

        String extension = getFileExtension(file.getOriginalFilename());
        if (!Arrays.asList(AppConstants.ALLOWED_IMAGE_EXTENSIONS).contains(extension.toLowerCase())) {
            throw new BadRequestException(
                    "Định dạng hình ảnh không được hỗ trợ. Chỉ chấp nhận: " +
                    String.join(", ", AppConstants.ALLOWED_IMAGE_EXTENSIONS)
            );
        }
    }

    private String generateUniqueFilename(String originalFilename) {
        String extension = getFileExtension(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + extension;
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    private String getImageFormat(String contentType) {
        if (contentType == null) {
            return "jpg";
        }
        
        switch (contentType.toLowerCase()) {
            case "image/png":
                return "png";
            case "image/gif":
                return "gif";
            case "image/webp":
                return "webp";
            default:
                return "jpg";
        }
    }

    private String extractRelativePathFromUrl(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return null;
        }

        // Extract relative path from URL
        // Example: http://localhost:8080/uploads/images/abc.jpg -> images/abc.jpg
        if (fileUrl.contains("/uploads/")) {
            return fileUrl.substring(fileUrl.indexOf("/uploads/") + 9);
        }
        
        return null;
    }
}

