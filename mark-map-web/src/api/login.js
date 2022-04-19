import request from '@/utils/request';

export function login(data) {
  return request.post('/login', data);
}

export function register(data) {
  return request.post('/register', data);
}
