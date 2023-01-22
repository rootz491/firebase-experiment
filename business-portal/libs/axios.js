import axios from 'axios';

// Create instance called instance
const instance = axios.create({
	baseURL: NEXT_PUBLIC_BACKEND_BASE_URL,
	headers: {
		"content-type": "application/json",
	},
});

// Set the AUTH token for any request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers
        .Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;