# Hướng Dẫn Xử Lý & Hiển Thị Lỗi Chi Tiết

## 📋 Tổng Quan

Hệ thống đã được cải thiện để hiển thị chi tiết lỗi validation và lỗi API trên giao diện người dùng một cách rõ ràng và thân thiện.

## 🎯 Vấn Đề Đã Được Giải Quyết

### Trước khi fix:
```javascript
// Backend trả về:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": {
      "password": ["Mật khẩu phải bao gồm chữ hoa, chữ thường và số"],
      "email": ["Email không hợp lệ"]
    }
  }
}

// Frontend chỉ hiển thị:
❌ "Email đã được sử dụng hoặc có lỗi xảy ra"
```

### Sau khi fix:
```
// Frontend hiển thị toast với đầy đủ thông tin:
❌ Dữ liệu không hợp lệ
   • Mật khẩu phải bao gồm chữ hoa, chữ thường và số
   • Email không hợp lệ
```

## 🔧 Các Thay Đổi Đã Thực Hiện

### 1. **errorHandler.js** (New File)

File utility mới để parse và format errors từ API:

```javascript
// src/utils/errorHandler.js
export const parseApiError = (error) => {
  // Parse error response và extract validation details
  if (responseData?.error?.details) {
    return {
      message: errorObj.message,
      details: extractedDetails,  // Array of error messages
      code: errorObj.code
    }
  }
}

export const formatErrorForToast = (error) => {
  const parsed = parseApiError(error)
  
  // Return array format for toast: [mainMessage, ...details]
  if (parsed.details.length > 0) {
    return [parsed.message, ...parsed.details]
  }
  
  return parsed.message
}
```

**Chức năng:**
- Parse error response từ backend
- Extract validation details từ `error.details` object
- Format thành array để hiển thị trên toast

### 2. **toast.js** (Updated)

Cải thiện để hỗ trợ hiển thị multiple error messages:

```javascript
show(message, type = 'info', duration = 3000) {
  // Handle message as string or array
  let messageHtml = ''
  if (Array.isArray(message)) {
    messageHtml = `
      <div class="flex-1">
        <div class="font-semibold mb-1">${message[0]}</div>
        ${message.length > 1 ? `
          <ul class="text-sm space-y-1 mt-2">
            ${message.slice(1).map(msg => `<li>• ${msg}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `
  } else {
    messageHtml = `<span class="flex-1">${message}</span>`
  }
  // ...
}
```

**Chức năng:**
- Hỗ trợ message dạng string và array
- Hiển thị main message bold + bullet list cho details
- Auto-dismiss sau 5 seconds cho validation errors

### 3. **Register.jsx** (Updated)

Sử dụng error handler mới:

```javascript
import { formatErrorForToast } from '../utils/errorHandler'

try {
  const response = await authService.register(userData)
  // ...
} catch (error) {
  // Format error with validation details
  const errorMessage = formatErrorForToast(error)
  toast.error(errorMessage, 5000) // Show for 5 seconds
}
```

### 4. **Login.jsx** (Updated)

Tương tự Register.jsx:

```javascript
import { formatErrorForToast } from '../utils/errorHandler'

catch (error) {
  const errorMessage = formatErrorForToast(error)
  toast.error(errorMessage, 5000)
}
```

### 5. **AdminLogin.jsx** (Updated)

Kết hợp toast và local error state:

```javascript
import { formatErrorForToast } from '../../utils/errorHandler'
import toast from '../../utils/toast'

catch (err) {
  const errorMessage = formatErrorForToast(err)
  if (Array.isArray(errorMessage)) {
    setError(errorMessage[0])
    toast.error(errorMessage, 5000)
  } else {
    setError(errorMessage)
    toast.error(errorMessage, 5000)
  }
}
```

## 📊 Format Error Response Từ Backend

### Standard Error Format (Chuẩn)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": {
      "password": [
        "Mật khẩu phải bao gồm chữ hoa, chữ thường và số",
        "Mật khẩu phải có ít nhất 8 ký tự"
      ],
      "email": [
        "Email không hợp lệ"
      ]
    }
  },
  "timestamp": "2025-10-19T06:02:09.809538317"
}
```

### Error Codes Được Xử Lý

- `VALIDATION_ERROR` - Lỗi validation input
- `AUTHENTICATION_ERROR` - Lỗi xác thực
- `AUTHORIZATION_ERROR` - Lỗi phân quyền
- `RESOURCE_NOT_FOUND` - Không tìm thấy resource
- `DUPLICATE_RESOURCE` - Resource đã tồn tại
- `BUSINESS_LOGIC_ERROR` - Lỗi business logic
- Generic errors - Lỗi khác

## 🎨 UI/UX Improvements

### Toast Notification Styles

```css
/* Single message toast */
┌─────────────────────────────────┐
│ ❌ Email đã được sử dụng         │
└─────────────────────────────────┘

/* Multiple messages toast */
┌─────────────────────────────────┐
│ ❌ Dữ liệu không hợp lệ          │
│    • Mật khẩu phải bao gồm...   │
│    • Email không hợp lệ          │
└─────────────────────────────────┘
```

### Features

- ✅ Auto-dismiss sau 5 seconds (cho validation errors)
- ✅ Manual close button
- ✅ Smooth slide-in/out animations
- ✅ Responsive design (mobile-friendly)
- ✅ Max-width 500px để không bị quá rộng
- ✅ Font size nhỏ hơn cho details để phân biệt

## 💻 Cách Sử Dụng Trong Code Mới

### Trong Component

```javascript
import toast from '../utils/toast'
import { formatErrorForToast } from '../utils/errorHandler'

const MyComponent = () => {
  const handleSubmit = async (data) => {
    try {
      await api.post('/endpoint', data)
      toast.success('Thành công!')
    } catch (error) {
      // Tự động parse và format error
      const errorMessage = formatErrorForToast(error)
      toast.error(errorMessage, 5000)
    }
  }
}
```

### Với Custom Error Handling

```javascript
try {
  await api.post('/endpoint', data)
} catch (error) {
  const parsed = parseApiError(error)
  
  if (parsed.code === 'VALIDATION_ERROR') {
    // Handle validation error specifically
    setFieldErrors(parsed.details)
    toast.error(formatErrorForToast(error), 5000)
  } else {
    // Handle other errors
    toast.error(parsed.message)
  }
}
```

### Toast Array Format

```javascript
// Manual array format
toast.error([
  'Main error message',
  'Detail 1',
  'Detail 2',
  'Detail 3'
], 5000)
```

## 🧪 Testing Error Display

### Test Cases

#### 1. Validation Error (Multiple Fields)
```bash
curl -X POST http://localhost:8081/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "invalid-email",
    "password": "weak",
    "fullName": ""
  }'
```

**Kết quả mong đợi:**
```
❌ Dữ liệu không hợp lệ
   • Email không hợp lệ
   • Mật khẩu phải bao gồm chữ hoa, chữ thường và số
   • Họ tên không được để trống
```

#### 2. Single Error
```bash
curl -X POST http://localhost:8081/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "notfound@example.com",
    "password": "password123"
  }'
```

**Kết quả mong đợi:**
```
❌ Email hoặc mật khẩu không đúng
```

#### 3. Network Error
```bash
# Stop backend
docker stop hpmekong-backend

# Try to login
```

**Kết quả mong đợi:**
```
❌ Không thể kết nối đến server
```

## 🔍 Troubleshooting

### Issue: Error không hiển thị details

**Nguyên nhân:** Backend không trả về đúng format

**Giải pháp:**
1. Check backend logs: `docker logs hpmekong-backend | grep ERROR`
2. Verify error response format từ API
3. Ensure backend return:
   ```json
   {
     "error": {
       "details": { ... }
     }
   }
   ```

### Issue: Toast bị duplicate

**Nguyên nhân:** Component re-render nhiều lần

**Giải pháp:**
```javascript
// Use useCallback or debounce
const handleError = useCallback((error) => {
  const errorMessage = formatErrorForToast(error)
  toast.error(errorMessage, 5000)
}, [])
```

### Issue: Toast không tự động đóng

**Nguyên nhân:** Duration không được set

**Giải pháp:**
```javascript
// Always specify duration for errors
toast.error(message, 5000) // 5 seconds
```

## 📝 Best Practices

### 1. **Always use formatErrorForToast**
```javascript
// ✅ Good
const errorMessage = formatErrorForToast(error)
toast.error(errorMessage, 5000)

// ❌ Bad
toast.error(error.message)
```

### 2. **Use appropriate duration**
```javascript
// Validation errors - 5 seconds
toast.error(validationError, 5000)

// Simple errors - 3 seconds (default)
toast.error(simpleError)

// Success messages - 3 seconds
toast.success(message)
```

### 3. **Log errors for debugging**
```javascript
catch (error) {
  console.error('Operation failed:', error)
  const errorMessage = formatErrorForToast(error)
  toast.error(errorMessage, 5000)
}
```

### 4. **Handle specific error codes**
```javascript
const parsed = parseApiError(error)

switch(parsed.code) {
  case 'VALIDATION_ERROR':
    // Show inline field errors
    break
  case 'AUTHENTICATION_ERROR':
    // Redirect to login
    break
  default:
    // Show toast
    toast.error(formatErrorForToast(error), 5000)
}
```

## 📦 Files Changed

```
src/utils/errorHandler.js          (NEW)
src/utils/toast.js                  (UPDATED)
src/pages/Register.jsx              (UPDATED)
src/pages/Login.jsx                 (UPDATED)
src/pages/admin/AdminLogin.jsx      (UPDATED)
```

## ✅ Checklist Deployment

- [x] errorHandler.js được tạo
- [x] toast.js support array messages
- [x] Register.jsx sử dụng formatErrorForToast
- [x] Login.jsx sử dụng formatErrorForToast
- [x] AdminLogin.jsx sử dụng formatErrorForToast
- [x] Frontend deployed to production
- [x] Test validation errors hiển thị đúng
- [x] Test network errors hiển thị đúng
- [x] Test auth errors hiển thị đúng

## 🎉 Kết Quả

Người dùng giờ đây sẽ thấy:
- ✅ Chi tiết chính xác lỗi validation
- ✅ Multiple errors cùng lúc
- ✅ Messages dễ đọc và rõ ràng
- ✅ Auto-dismiss để không làm phiền
- ✅ Consistent error handling across all forms

Trải nghiệm người dùng được cải thiện đáng kể! 🚀
