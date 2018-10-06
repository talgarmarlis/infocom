export const baseUrl = "http://" + window.location.host + "/api";
const headers = {
  "Content-Type": "application/json"
};

export function get(url) {
  return webix.ajax().headers(headers).get(baseUrl + url);
}

export function post(url, data) {
  return webix.ajax().headers(headers).post(baseUrl + url, JSON.stringify(data));
}

export function put(url, data) {
  return webix.ajax().headers(headers).put(baseUrl + url, JSON.stringify(data));
}

export function del(url) {
  return webix.ajax().headers(headers).del(baseUrl + url);
}