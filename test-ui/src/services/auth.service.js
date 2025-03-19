import { jwtDecode } from "jwt-decode";
class AuthService {
    setToken(token) {
      localStorage.setItem("token", token);
    }
  
    getToken() {
      return localStorage.getItem("token");
    }

    getCurrentUser() {
      const token = this.getToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded;
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          return null;
        }
      }
      return null;
    }

    getUserId() {
      const token = this.getToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded.id;
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          return null;
        }
      }
      return null;
    }
  
    isAuthenticated() {
      return !!this.getToken();
    }
  
    logout() {
      localStorage.removeItem("token");
    }
  }
  
  export default new AuthService();
  