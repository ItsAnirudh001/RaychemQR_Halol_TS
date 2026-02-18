export function invalidUserPaths(path: string) {
  return path.startsWith("/admin");
}

export function preauthUserPaths(path: string) {
  const unauthPaths = ["/user/emailverify", "/user/reset"];

  return unauthPaths.includes(path);
}
