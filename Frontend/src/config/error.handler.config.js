import {toast} from 'react-toastify'

export const handleHttpError = (error, status, data) => {
    const errorResponse = {
        ...error,
        message: data.message || '',
        code: ''
    };

    switch (status) {
        case 400:
            errorResponse.message = data.message || 'Bad request: Invalid input data';
            errorResponse.code = 'BAD_REQUEST';
            break;
        case 401:
            // Uncomment to redirect to login
            // window.location.href = '/login';
            errorResponse.message = data.message || 'Unauthorized: Please log in';
            errorResponse.code = 'UNAUTHORIZED';
            break;
        case 403:
            errorResponse.message = data.message || 'Forbidden: Access denied';
            errorResponse.code = 'FORBIDDEN';
            break;
        case 404:
            errorResponse.message = data.message || 'Resource not found';
            errorResponse.code = 'NOT_FOUND';
            break;
        case 429:
            errorResponse.message = data.message || 'Too many requests: Please try again later';
            errorResponse.code = 'RATE_LIMIT_EXCEEDED';
            break;
        case 500:
            errorResponse.message = data.message || 'Server error: Something went wrong';
            errorResponse.code = 'SERVER_ERROR';
            break;
        default:
            errorResponse.message = data.message || `Unexpected error: ${status}`;
            errorResponse.code = 'UNKNOWN_ERROR';
    }

    toast.error(message);
    return Promise.reject(errorResponse);
};
