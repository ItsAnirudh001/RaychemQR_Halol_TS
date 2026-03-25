export function invalidUserPaths(path: string) {
  return path.startsWith("/admin");
}

export const preauthUserPaths: string[] = [
  "/user/emailverify",
  "/user/login",
];
