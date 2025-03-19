class AuthService {
    setToken(token) {
      localStorage.setItem("token", token);
    }
  
    getToken() {
      return localStorage.getItem("token");
    }
  
    isAuthenticated() {
      return !!this.getToken();
    }
  
    logout() {
      localStorage.removeItem("token");
    }
  }
  
  export default new AuthService();
  