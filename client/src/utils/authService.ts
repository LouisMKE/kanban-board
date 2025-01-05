class AuthService {
  static setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static clearToken(): void {
    localStorage.removeItem('token');
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
      if (payload.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
      }
      return false;
    } catch (error) {
      console.error('Failed to decode token or check expiration:', error);
      return true; // Assume expired if decoding fails
    }
  }
}

export default AuthService;
