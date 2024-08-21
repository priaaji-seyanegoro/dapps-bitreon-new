// src/services/authService.ts

import { post } from '@/services/api'; // Replace with your actual import path

export interface AuthResponse {
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
}

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await post<AuthResponse>('/api/user/login', data);
      this.setToken(response.token);
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await post<AuthResponse>('/api/user/register', data);
      this.setToken(response.token);
      return response;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  }

  logout(router: any): void {
    this.clearToken();
    router.push('/login'); // Redirect to login page
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }
}

// Create an instance of AuthService
const authService = new AuthService();
export default authService;