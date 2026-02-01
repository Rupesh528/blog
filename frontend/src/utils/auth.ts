// Utility function to decode JWT token and get userId
export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage");
    return null;
  }

  try {
    // JWT tokens have 3 parts separated by dots: header.payload.signature
    const payload = token.split(".")[1];
    if (!payload) {
      console.error("Invalid token format");
      return null;
    }
    
    const decoded = JSON.parse(atob(payload));
    const userId = decoded.userId;
    
    if (!userId) {
      console.error("No userId in token payload:", decoded);
      return null;
    }
    
    // Ensure we return a number
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      console.error("userId is not a valid number:", userId);
      return null;
    }
    
    return userIdNumber;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

