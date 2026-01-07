import { getDevice } from "@/utils/helpers";
import { redirect } from "next/navigation";

export default async function Page() {
  const isMobile = await getDevice();

  redirect(isMobile ? "/mobile/login" : "/admin/login");
}
