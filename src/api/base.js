import axios from "axios";
import { message } from "antd";
export default function ajax(url, body = {}, method = "GET") {
  let promise;
  if (method === "GET") {
    promise = axios.get(url, {
      params: body,
    });
  } else promise = axios.post(url, body);
  return new Promise((resolve, reject) => {
    promise
      .then((data) => resolve(data))
      .catch((err) => {
        message.warn("err:" + err);
      });
  });
}
