// src/actions/authActions.ts
"use server";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  // NOTE: This is a minimal placeholder to satisfy the login flow during builds.
  // Replace with real authentication logic (NextAuth, database checks) in production.
  if (email === "admin@local" && password === "password") {
    redirect("/");
  }

  return "Invalid email or password";
}
