import ajax from "./base";

const baseURL = "";
//get the login information
export function getLogin() {
  return ajax("/login");
}
