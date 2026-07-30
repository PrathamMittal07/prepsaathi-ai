export interface ApiResponse<T = any> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  }
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  headline?: string;
  bio?: string;
}

export interface User {
  id: string;
  email: string;
  roles: string[];
  profile?: UserProfile;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
