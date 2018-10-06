import { get, post, put, del } from "utils";

var user = null;
var eventId = null;

function status() {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject();
      return;
    }
    get("/").then(() => resolve(user)).catch(() => {
      clear();
      reject();
    });
  })
}

function login(principal, password) {
  return new Promise((resolve, reject) => {
    var headers = {
      "Content-type": "application/json",
      "X-Auth-Username": principal.username,
      "X-Auth-Password": password,
      "X-Auth-Customization": principal.customization
    };
    user = {
      username: "Admin",
      token: "token"
    };
    resolve(user);
    // post("/authentication/login", {}, headers)
    //   .then(res => {
    //     var token = res.json().token;
    //     user = {
    //       username: principal.username,
    //       customization: principal.customization,
    //       token: token
    //     };
    //     if (eventId) {
    //       webix.detachEvent(eventId);
    //     }
    //     eventId = webix.attachEvent("onBeforeAjax",
    //       function(mode, url, data, request, headers, files, promise) {
    //         headers["Content-type"] = "application/json";
    //         headers["X-Auth-Token"] = user.token;
    //       }
    //     );
    //     resolve(user);
    //   })
    //   .catch(err => {
    //     user = {
    //       username: "Admin",
    //       token: "token"
    //     };
    //     resolve(user);
    //   })
  });
}

function logout() {
  if (user) {
    return post("/authentication/logout", { token: user.token }).then(() => clear())
  }
}

function clear() {
  user = null;
  webix.detachEvent(eventId);
  eventId = null;
}

export function register(user) {
  return new Promise((resolve, reject) => {
    post("/authentication/register", user, { "Content-Type": "application/json" })
      .then(res => resolve())
      .catch(err => reject(err));
  });
}

export default { status, login, logout }
