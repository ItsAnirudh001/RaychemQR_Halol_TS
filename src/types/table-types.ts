export interface TableHeaderItem {
  name: string;
  width: string;
  align?: string;
}

export interface UserTableItem {
  user_id: number | null;
  username: string;
  full_name: string;
  email_id: string;
  phone_number: string | number;
  role: string;
  is_active: boolean;
  password: string;
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

export interface UserLogsItem {
  slno: number;
  username: string;
  user_id: number;
  login_flag: string;
  login_success: boolean;
  login_time: string;
  logout_time: string | null;
}
