export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/user/${userId}`,
            userData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.success) {
            return response.data.user;
        } else {
            throw new Error(response.data.message || 'Failed to update profile');
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating profile');
    }
}; 