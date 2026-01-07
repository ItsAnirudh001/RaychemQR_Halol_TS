export interface TableHeaderItem {
  name: string;
  width: string;
  align?: string;
}

export interface UserTableItem {
  user_name: string;
  name: string;
  email_id: string;
  phone_number: string | number;
  role: string;
  status: string;
}

export interface AuditTableItem {
  user_name: string;
  name: string;
  email_id: string;
  date_time: string;
  role: string;
  status: string;
}

export interface PackslipTableItem {
  order_no: string;
  po_no: string;
  line_items: number;
  lot_no: number;
  status: string;
}
