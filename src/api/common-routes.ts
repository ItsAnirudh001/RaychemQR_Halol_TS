export const commonroutes = {
  login: "/api/auth/login", //tested
  // token: "/api/auth/token",
  // refreshToken: "/api/auth/refresh-token",
  logout: "/api/auth/logout", //tested
  autoLogout: "/api/auth/logout/simple",

  getAllPickslips: "/pickslips/get-all-pickslips", //tested
};

export const commonmodroutes = (data: { pickslip_id?: number }) => {
  const { pickslip_id } = data;

  const routes = {
    getPickslipitems: `/pickslips/pickslips-items/${pickslip_id}`, //tested
    downloadPickslip: `/api/scan-items/download/by-pickslip/${pickslip_id}`, //tested
  };

  return routes;
};
