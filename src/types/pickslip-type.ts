export interface PickslipItem {
  item_id: number;
  line_item_no: number;
  item_code: string;
  item_name: string;
  batch_no: number | null;
  material_description: string;
  requested_qty: number;
  lot_no: string | null;
  serial_no: string | null;
  box_type: string | null;
  weight: string | number | null;
  packing_details: string | null;
  no_of_boxes: number | null;
  status: string;
  net_weight: number | null;
  gross_weight: number | null;
}

export interface Pickslip {
  pickslip_id: number;
  oa_no: string;
  scanned: number;
  total: number;
  status: string;
  created_at: string;
  items: PickslipItem[];
}
