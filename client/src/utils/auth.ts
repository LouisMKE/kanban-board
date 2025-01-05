import { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      }
      return false;
    } catch (error) {
      console.error('Failed to check token expiration:', error);
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(idToken: string): void {
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
}

export default new AuthService();
