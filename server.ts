export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api/v1';
console.log('환경변수 직접 출력:', process.env.NEXT_PUBLIC_BACKEND_URL);
console.log('최종 API_URL:', API_URL);  