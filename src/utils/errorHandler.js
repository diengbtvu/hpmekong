// Utility to parse and format API errors
export const parseApiError = (error) => {
  // If no response, return generic error
  if (!error.response) {
    return {
      message: 'Không thể kết nối đến server',
      details: []
    }
  }

  const responseData = error.response.data

  // Check if it's our standard error format
  if (responseData && responseData.error) {
    const { error: errorObj } = responseData
    
    // If has validation details, extract them
    if (errorObj.details) {
      const details = []
      Object.keys(errorObj.details).forEach(field => {
        const fieldErrors = errorObj.details[field]
        if (Array.isArray(fieldErrors)) {
          details.push(...fieldErrors)
        }
      })
      
      return {
        message: errorObj.message || 'Có lỗi xảy ra',
        details: details,
        code: errorObj.code
      }
    }
    
    return {
      message: errorObj.message || 'Có lỗi xảy ra',
      details: [],
      code: errorObj.code
    }
  }

  // Fallback for non-standard error format
  return {
    message: responseData.message || error.message || 'Có lỗi xảy ra',
    details: []
  }
}

// Format error for toast display
export const formatErrorForToast = (error) => {
  const parsed = parseApiError(error)
  
  if (parsed.details && parsed.details.length > 0) {
    // Return array: [main message, ...detail messages]
    return [parsed.message, ...parsed.details]
  }
  
  return parsed.message
}

export default {
  parseApiError,
  formatErrorForToast
}
