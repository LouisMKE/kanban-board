const login = async (userInfo) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        return data.accessToken; // Return the access token
    }
    catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
export { login };
