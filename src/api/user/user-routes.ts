export const useroutes = {
  forgetPassword: "/api/reset/forgot-password", //done
  resetPassword: "/api/reset/reset-password", //done

  scanItem: "/api/scan-items/scan-item",
  startScanSession: "/scan-sessions/start", //done
  abortScanSession: "/scan-sessions/abort-session", //done
};

export const usermodroutes = (data: {
  pickslip_id?: number;
  scan_item_id?: number;
}) => {
  const { pickslip_id, scan_item_id } = data;

  const routes = {
    submitPickslipItems: `/api/scan-items/pickslip/${pickslip_id}/submit`, //done
    deleteScanItem: `/api/scan-items/scan-items/${scan_item_id}`, //done
  };

  return routes;
};
