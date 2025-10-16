package com.happyworld.mekong.constant;

public final class MessageConstants {

    private MessageConstants() {}

    // Success Messages
    public static final String SUCCESS_OPERATION = "Thao tác thành công";
    public static final String SUCCESS_CREATE = "Tạo mới thành công";
    public static final String SUCCESS_UPDATE = "Cập nhật thành công";
    public static final String SUCCESS_DELETE = "Xóa thành công";
    public static final String SUCCESS_REGISTER = "Đăng ký tài khoản thành công";
    public static final String SUCCESS_LOGIN = "Đăng nhập thành công";
    public static final String SUCCESS_LOGOUT = "Đăng xuất thành công";
    public static final String SUCCESS_EMAIL_SENT = "Email đã được gửi";
    public static final String SUCCESS_PASSWORD_CHANGED = "Đổi mật khẩu thành công";
    public static final String SUCCESS_ENROLLMENT = "Đăng ký khóa học thành công";
    public static final String SUCCESS_PAYMENT = "Thanh toán thành công";

    // Error Messages - Authentication
    public static final String ERROR_INVALID_CREDENTIALS = "Email hoặc mật khẩu không đúng";
    public static final String ERROR_ACCOUNT_LOCKED = "Tài khoản đã bị khóa";
    public static final String ERROR_ACCOUNT_DISABLED = "Tài khoản đã bị vô hiệu hóa";
    public static final String ERROR_EMAIL_NOT_VERIFIED = "Email chưa được xác thực";
    public static final String ERROR_INVALID_TOKEN = "Token không hợp lệ hoặc đã hết hạn";
    public static final String ERROR_TOKEN_EXPIRED = "Token đã hết hạn";
    public static final String ERROR_UNAUTHORIZED = "Không có quyền truy cập";
    public static final String ERROR_FORBIDDEN = "Không có quyền thực hiện hành động này";

    // Error Messages - Validation
    public static final String ERROR_EMAIL_EXISTS = "Email đã tồn tại";
    public static final String ERROR_PHONE_EXISTS = "Số điện thoại đã tồn tại";
    public static final String ERROR_INVALID_EMAIL = "Email không hợp lệ";
    public static final String ERROR_INVALID_PHONE = "Số điện thoại không hợp lệ";
    public static final String ERROR_WEAK_PASSWORD = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số";
    public static final String ERROR_PASSWORD_MISMATCH = "Mật khẩu xác nhận không khớp";
    public static final String ERROR_REQUIRED_FIELD = "Trường này là bắt buộc";
    public static final String ERROR_INVALID_INPUT = "Dữ liệu đầu vào không hợp lệ";

    // Error Messages - Resources
    public static final String ERROR_USER_NOT_FOUND = "Không tìm thấy người dùng";
    public static final String ERROR_COURSE_NOT_FOUND = "Không tìm thấy khóa học";
    public static final String ERROR_ENROLLMENT_NOT_FOUND = "Không tìm thấy đăng ký học";
    public static final String ERROR_PAYMENT_NOT_FOUND = "Không tìm thấy thanh toán";
    public static final String ERROR_POST_NOT_FOUND = "Không tìm thấy bài viết";
    public static final String ERROR_JOB_NOT_FOUND = "Không tìm thấy tin tuyển dụng";
    public static final String ERROR_RESOURCE_NOT_FOUND = "Không tìm thấy tài nguyên";

    // Error Messages - Business Logic
    public static final String ERROR_ALREADY_ENROLLED = "Bạn đã đăng ký khóa học này";
    public static final String ERROR_COURSE_NOT_PUBLISHED = "Khóa học chưa được công bố";
    public static final String ERROR_COURSE_FULL = "Khóa học đã đủ số lượng học viên";
    public static final String ERROR_INSUFFICIENT_PERMISSION = "Không đủ quyền thực hiện";
    public static final String ERROR_PAYMENT_FAILED = "Thanh toán thất bại";
    public static final String ERROR_COUPON_INVALID = "Mã giảm giá không hợp lệ hoặc đã hết hạn";
    public static final String ERROR_COUPON_USED = "Mã giảm giá đã được sử dụng";
    public static final String ERROR_FILE_UPLOAD_FAILED = "Tải file lên thất bại";
    public static final String ERROR_FILE_TOO_LARGE = "File quá lớn";
    public static final String ERROR_INVALID_FILE_TYPE = "Loại file không được hỗ trợ";

    // Error Messages - Server
    public static final String ERROR_INTERNAL_SERVER = "Lỗi hệ thống, vui lòng thử lại sau";
    public static final String ERROR_DATABASE = "Lỗi cơ sở dữ liệu";
    public static final String ERROR_NETWORK = "Lỗi kết nối mạng";
}

