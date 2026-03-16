import { TableHeaderItem } from "@/types/table-types";

export const userTableHeaders: TableHeaderItem[] = [
  {
    name: "User ID",
    width: "10%",
  },
  {
    name: "Name",
    width: "20%",
  },
  {
    name: "Email ID",
    width: "22.5%",
  },
  {
    name: "Phone Number",
    width: "12.5%",
  },
  {
    name: "Role",
    width: "10%",
    align: "center",
  },
  {
    name: "Status",
    width: "12.5%",
    align: "center",
  },
  {
    name: "Actions",
    width: "12.25%",
    align: "center",
  },
];

export const pickslipTableHeaders: TableHeaderItem[] = [
  {
    name: "Order No.",
    width: "20%",
  },
  {
    name: "PO Number",
    width: "20%",
  },
  {
    name: "No. of line Items",
    width: "20%",
  },
  {
    name: "Created At",
    width: "20%",
  },
  {
    name: "Status",
    width: "20%",
    align: "center",
  },
];

export const pickslipItemsTableHeaders: TableHeaderItem[] = [
  {
    name: "Material",
    width: "30%",
  },
  {
    name: "Item Code",
    width: "12.5%",
  },
  {
    name: "Req Quantity",
    width: "12.5%",
  },
  {
    name: "Serial Number",
    width: "12.5%",
  },
  {
    name: "Net Weight",
    width: "10%",
  },
  {
    name: "Gross Weight",
    width: "10%",
  },
];

export const auditTableHeaders: TableHeaderItem[] = [
  {
    name: "SL No",
    width: "10%",
  },
  {
    name: "User ID",
    width: "12.5%",
  },
  {
    name: "Username",
    width: "15%",
  },
  {
    name: "Login Time",
    width: "12.5%",
  },
  {
    name: "Logout Time",
    width: "12.5%",
    align: "center",
  },
  {
    name: "Success",
    width: "10%",
    align: "center",
  },
];
