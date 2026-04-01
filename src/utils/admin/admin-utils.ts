export function isAdminPath(path: string) {
  // console.log("func path", path);
  const invalid = path.startsWith("/admin");

  // console.log("invalid",invalid)

  return invalid;
}

export const preauthAdminPaths: string[] = ["/admin/login"];
