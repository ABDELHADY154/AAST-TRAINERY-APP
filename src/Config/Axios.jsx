import Axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axios = Axios.create({
  baseURL: "http://admin.aast-trainery.com/api",
});

// const token = async () => {
//   try {

//   fdgthdfghdfgdfg  var userToken = await AsyncStorage.getItem("userToken");

//     return (axios.defaults.headers.common["Authorization"] =
//       "Bearer " + userToken);
//   } catch (e) {
//     console.log(e);
//   }
// };
// token();
// axios.defaults.headers.common["Authorization"] = "";
