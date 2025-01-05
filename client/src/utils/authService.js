class AuthService {
    static setToken(token) {
        localStorage.setItem('token', token);
    }
    static getToken() {
        return localStorage.getItem('token');
    }
    static clearToken() {
        localStorage.removeItem('token');
    }
    static isAuthenticated() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    static isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
            if (payload.exp) {
                const currentTime = Math.floor(Date.now() / 1000);
                return payload.exp < currentTime;
            }
            return false;
        }
        catch (error) {
            console.error('Failed to decode token or check expiration:', error);
            return true; // Assume expired if decoding fails
        }
    }
}
export default AuthService;
