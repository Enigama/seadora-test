import axios from "axios";

export default (api) => {
  axios.defaults.headers.common["Authorization"] =
    "HGVNzu3qEGvrQrN0Tri8Yvx0D4g46Z9j"; //store.getState().session.token;
};
