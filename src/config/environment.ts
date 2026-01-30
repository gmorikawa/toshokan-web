export const Environment = Object.freeze({
    APPLICATION_NAME: import.meta.env.VITE_APPLICATION_NAME || "Toshokan",
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api"
});
