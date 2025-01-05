import jwtDecode from 'jwt-decode';
class AuthService {
    getProfile() {
        const token = this.getToken();
        if (!token)
            return null;
        try {
            return jwtDecode(token);
        }
        catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp) {
                const currentTime = Math.floor(Date.now() / 1000);
                return decoded.exp < currentTime;
            }
            return false;
        }
        catch (error) {
            console.error('Failed to check token expiration:', error);
            return true;
        }
    }
    getToken() {
        return localStorage.getItem('token');
    }
    login(idToken) {
        localStorage.setItem('token', idToken);
        window.location.assign('/'); // Redirect to the home page
    }
    logout() {
        localStorage.removeItem('token');
        window.location.assign('/login'); // Redirect to the login page
    }
}
export default new AuthService();
