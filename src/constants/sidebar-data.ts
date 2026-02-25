import { IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineAudit } from "react-icons/ai";
import { MdGroupAdd } from "react-icons/md";
import { SideBarItem } from "@/types/sidebar-types";

export const sidebarData: SideBarItem[] = [
  {
    name: "User Management",
    route: "/admin/usermanagement",
    icon: MdGroupAdd,
  },
  {
    name: "Pickslips",
    route: "/admin/pickslips",
    icon: IoNewspaperOutline,
  },
  {
    name: "Audit",
    route: "/admin/audit",
    icon: AiOutlineAudit,
  },
];