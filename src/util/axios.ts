import cookie from "js-cookie";
import axios from "axios";

axios.interceptors.request.use(async (config:any) => {
  if(localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  } else {

    config.headers.Authorization = `Bearer ${cookie.get("token")}`;

  }
  return config;
});

export default axios;