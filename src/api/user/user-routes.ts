export const useroutes = {
  forgetPassword: "/api/reset/forgot-password", //tested
  resetPassword: "/api/reset/reset-password", //tested
  changePassword: "/api/reset/change-password",

  scanItem: "/api/scan-items/scan-item", //tested
  startScanSession: "/scan-sessions/start", //tested
  abortScanSession: "/scan-sessions/abort-session", //tested
  autoScanAbort: "/scan-sessions/abort-session/simple",
};

export const usermodroutes = (data: {
  pickslip_id?: number;
  scan_item_id?: number;
}) => {
  const { pickslip_id, scan_item_id } = data;

  const routes = {
    submitPickslipItems: `/api/scan-items/pickslip/${pickslip_id}/submit`, //tested
    deleteScanItem: `/api/scan-items/scan-items/${scan_item_id}`, //tested
  };

  return routes;
};
