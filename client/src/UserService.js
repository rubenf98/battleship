import axios from "axios";

const url = "localhost:8000/api/";

class UserServices {
  //Login
  static login(email, password) {
    return axios.post(url + "login", {
      email: toString(email),
      password: password
    });
  }
}

export default UserServices;
