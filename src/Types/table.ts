export interface TableHeaderItem {
  name: string;
  width: string;
  align?: string;
};

export interface UserTableItem {
  user_name: string;
  name: string;
  email_id: string;
  phone_number: string | number;
  role: string;
  status: string;
}
