export interface PickslipItem {
  item_id: number;
  line_item_no: number;
  item_code: string;
  item_name: string;
  batch_no: string | null;
  material_description: string;
  requested_qty: number;
  lot_no: string | null;
  serial_no: string | null;
  box_type: string | null;
  weight: string | null;
  packing_details: string | null;
  no_of_boxes: number | null;
  status: string;
  is_scanned: boolean;
  remaining: number;
}

export interface ScannedItem {
  pcn: string;
  batch_no: string | null;
  serial_no: string;
  box_type: string;
  weight: string;
}

export interface Pickslip {
  pickslip_id: number;
  po_no: string;
  oa_no: string;
  scanned: number;
  total: number;
  status: string;
  created_at: string;
  items: PickslipItem[];
}
