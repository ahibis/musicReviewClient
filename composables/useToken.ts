let userToken = "";

export function getToken() {
  if (localStorage["token"]) {
    userToken = localStorage["token"];
  }
  return userToken;
}

export function setToken(token: string) {
  userToken = token;
  localStorage["token"] = token;
  useRouter().push("/");
}
