import axios from "axios";

export default axios.create({
  baseURL: "https://api.scripture.api.bible/v1/",
});
