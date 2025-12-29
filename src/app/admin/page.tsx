import { redirect } from "next/navigation";

export default function Page() {
  // Admin routes have been removed — redirect to home.
  redirect("/");
}
