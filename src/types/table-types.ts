export interface TableHeaderItem {
  name: string;
  width: string;
  align?: string;
}

export const userTableObject = {
  user_id: null,
  username: "",
  full_name: "",
  email_id: "",
  phone_number: "",
  role: "",
  is_active: true,
};

export interface UserTableItem {
  user_id: number | null;
  username: string;
  full_name: string;
  email_id: string;
  phone_number: string | number;
  role: string;
  is_active: boolean;
}

export interface AuditTableItem {
  user_name: string;
  full_name: string;
  email_id: string;
  date_time: string;
  role: string;
  status: string;
}

export interface PickslipTableItem {
  order_no: string;
  po_no: string;
  line_items: number;
  lot_no: number;
  status: string;
}
