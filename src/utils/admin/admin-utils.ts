export function invalidAdminPaths(path: string) {
  console.log("func path",path);
  const invalid =  path.startsWith("/user");

  // console.log("invalid",invalid)

  return invalid
}