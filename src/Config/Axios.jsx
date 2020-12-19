import Axios from "react-native-axios";

export const axios = Axios.create({
  baseURL: "http://admin.aast-trainery.com/api",
});

// import Axios from "axios";

// export const axios = Axios.create({
//   baseURL: "http://admin.aast-trainery.com/api",
// });

// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + sessionStorage.getItem("token");
