import { IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineAudit } from "react-icons/ai";
import { MdGroupAdd } from "react-icons/md";
import { SideBarItem } from "@/types/sidebar";

export const sidebarData: SideBarItem[] = [
  {
    name: "User Management",
    route: "/web/usermanagement",
    icon: MdGroupAdd,
  },
  {
    name: "Reports",
    route: "/web/reports",
    icon: IoNewspaperOutline,
  },
  {
    name: "Audit",
    route: "/web/audit",
    icon: AiOutlineAudit,
  },
];