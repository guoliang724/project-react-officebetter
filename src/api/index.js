import ajax from "./base";

const baseURL = "";

//get the information from weather api
export const reqWeather = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather`;
  const result = await ajax(url, {
    q: city,
    appid: "31b67d550e93316925f5913b31894f17",
  });

  return result;
};

//get the login information
export function getLogin(loginId, loginPwd) {
  return ajax("/user/login", { loginId, loginPwd }, "post");
}

//add user
export function addUser(user) {
  console.log("here");
  return ajax("/user/add", user, "post");
}

//get the userlist information
export function getUsers() {
  return ajax("/user/users");
}
