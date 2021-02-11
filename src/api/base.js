import axios from "axios";
import { message } from "antd";
import { getUser } from "../util/storage";
export default function ajax(url, body = {}, method = "GET") {
  //set the interceptor for response: errorhandling
  axios.interceptors.response.use(null, (err) => {
    const expectedError =
      err.response && err.response.status > 400 && err.response.status < 500;
    if (err.response && err.response.status === 400) {
      message.warn("Please Login First");
    } else if (err.response && err.response.status === 404) {
      message.warn("Forbbiden");
    } else if (err.response && err.response.status === 401) {
      message.warn("Access Denied...");
    } else if (expectedError) {
      message.warn("Try another name please..");
    }
    return Promise.reject(err);
  });
  //set the request goes with headers[token] automatically
  axios.defaults.headers.post["user_id"] = getUser();
  axios.defaults.headers.put["user_id"] = getUser();
  axios.defaults.headers.delete["user_id"] = getUser();

  //
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
