import http from "../http-common";

class LoginService {
  login(email, password) {
    return http.post("/users/login", { email, password });
  }

  register(data) {
    return http.post("/users/register", data);
  }
}

export default new LoginService();
