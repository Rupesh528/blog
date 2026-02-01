// Support both VITE_BACKEND_URL and VITE_API_URL for flexibility
const apiUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || "http://localhost:3000";

// Ensure URL has protocol (https:// or http://)
const getBackendUrl = () => {
  if (apiUrl.startsWith("http://") || apiUrl.startsWith("https://")) {
    return apiUrl;
  }
  // If no protocol, assume https for production
  return `https://${apiUrl}`;
};

export const BACKEND_URL = getBackendUrl();