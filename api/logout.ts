import { cookies } from "next/headers";

export default async function () {
    try {
      cookies().delete("session");
    } catch (error: any) {
      cookies().delete("session");
    }
  }