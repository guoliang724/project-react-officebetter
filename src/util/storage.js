import store from "store";

//set the name of localstorage
const userid = "user_id";

export function getUser() {
  return store.get(userid);
}
export function setUser(value) {
  return store.set(userid, value);
}
export function removeUser() {
  return store.remove(userid);
}
