import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string> => {
  try {
    const response = await fetch('/api/auth/login', { // Ensure correct API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed'); // Use server-provided error message if available
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken); // Store the token for authenticated requests
    return data.accessToken;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export { login };
