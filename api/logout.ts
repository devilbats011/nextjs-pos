import { auth_token_name } from "@/hooks/helper/constant";
import { cookies } from "next/headers";

export default async function () {
    try {
      cookies().delete(auth_token_name);
    } catch (error: any) {
      cookies().delete(auth_token_name);
    }
  }