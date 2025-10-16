package com.happyworld.mekong.constant;

public final class AppConstants {

    private AppConstants() {}

    // Pagination
    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int MAX_PAGE_SIZE = 100;
    public static final String DEFAULT_PAGE_NUMBER = "1";
    public static final String DEFAULT_SORT_BY = "createdAt";
    public static final String DEFAULT_SORT_DIRECTION = "desc";

    // Token
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long ACCESS_TOKEN_VALIDITY = 24 * 60 * 60 * 1000; // 24 hours
    public static final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000; // 7 days

    // File Upload
    public static final long MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    public static final String[] ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp"};
    public static final String[] ALLOWED_VIDEO_EXTENSIONS = {"mp4", "avi", "mov", "webm"};
    public static final String[] ALLOWED_DOCUMENT_EXTENSIONS = {"pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"};

    // S3 Folders
    public static final String S3_FOLDER_AVATARS = "avatars";
    public static final String S3_FOLDER_COURSE_THUMBNAILS = "courses/thumbnails";
    public static final String S3_FOLDER_COURSE_VIDEOS = "courses/videos";
    public static final String S3_FOLDER_LESSONS = "lessons";
    public static final String S3_FOLDER_POSTS = "posts";
    public static final String S3_FOLDER_CERTIFICATES = "certificates";
    public static final String S3_FOLDER_RESUMES = "resumes";

    // Cache Keys
    public static final String CACHE_COURSES = "courses";
    public static final String CACHE_POSTS = "posts";
    public static final String CACHE_CATEGORIES = "categories";
    public static final String CACHE_INSTRUCTORS = "instructors";
    public static final String CACHE_CENTERS = "centers";

    // Security
    public static final int MAX_LOGIN_ATTEMPTS = 5;
    public static final int ACCOUNT_LOCK_DURATION_MINUTES = 30;
    public static final int PASSWORD_MIN_LENGTH = 8;
    public static final int PASSWORD_MAX_LENGTH = 100;

    // Email
    public static final String EMAIL_FROM_NAME = "Happy World Mekong";
    public static final String EMAIL_VERIFICATION_SUBJECT = "Xác thực tài khoản Happy World Mekong";
    public static final String EMAIL_RESET_PASSWORD_SUBJECT = "Đặt lại mật khẩu";
    public static final String EMAIL_ENROLLMENT_SUBJECT = "Chào mừng bạn đến với khóa học";
    public static final String EMAIL_CERTIFICATE_SUBJECT = "Chúc mừng bạn hoàn thành khóa học";

    // Payment
    public static final String PAYMENT_CODE_PREFIX = "MK-PAY-";
    public static final String CERTIFICATE_CODE_PREFIX = "MK-CERT-";
    public static final int PAYMENT_EXPIRY_MINUTES = 15;

    // Roles
    public static final String ROLE_SUPER_ADMIN = "SUPER_ADMIN";
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_CENTER_MANAGER = "CENTER_MANAGER";
    public static final String ROLE_INSTRUCTOR = "INSTRUCTOR";
    public static final String ROLE_STUDENT = "STUDENT";
    public static final String ROLE_PARTNER = "PARTNER";
    public static final String ROLE_EMPLOYER = "EMPLOYER";
    public static final String ROLE_USER = "USER";
}

