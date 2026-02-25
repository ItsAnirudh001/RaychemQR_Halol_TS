import { PickslipItem } from "@/types/pickslip-type";

export const pickslipItemsMock: PickslipItem[] = [
  {
    item_id: 21,
    line_item_no: 7,
    item_code: "JAA5H55656",
    item_name: "Power Item",
    material_description:
      "BPTM-30/12-A/U-4 (S30) BUS BAR PROTECTION TUBE(TE PCN:723955-000)",
    requested_qty: 7,
    lot_no: "LCRM-167-12",
    batch_no: null,
    serial_no: null,
    box_type: null,
    weight: null,
    packing_details: null,
    no_of_boxes: null,
    status: "pending",
    net_weight: 40.23,
    gross_weight: 48.5,
  },
  {
    item_id: 20,
    line_item_no: 8,
    item_code: "JAA0455656",
    item_name: "JA Item",
    material_description:
      "BPTM-30/12-A/U-4 (S30) BUS BAR PROTECTION TUBE(TE PCN:723955-000)",
    requested_qty: 5,
    lot_no: "LCRM-167-45",
    batch_no: 1,
    serial_no: "SN-239849",
    box_type: "BOX-6",
    weight: null,
    packing_details: null,
    no_of_boxes: null,
    status: "verified",
    net_weight: 40.23,
    gross_weight: 48.5,
  },
];
