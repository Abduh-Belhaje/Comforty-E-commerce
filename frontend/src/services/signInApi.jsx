
 const signInApi = async (userData) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};

export default (signInApi)
