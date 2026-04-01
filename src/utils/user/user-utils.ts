export function isUserPath(path: string) {
  return path.startsWith("/user");
}

export const preauthUserPaths: string[] = [
  "/user/emailverify",
  "/user/login",
];
