import axios from "axios";

export default axios.create({
  baseURL: "http://jsonplaceholder.typicode.com/albums/1",
  headers: {
    "Content-type": "application/json"
  }
});