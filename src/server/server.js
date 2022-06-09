import axios from "axios";

export default axios.create({
  baseURL: "https://deploying-json-server.herokuapp.com/",
});
