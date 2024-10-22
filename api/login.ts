import { cookies } from "next/headers";

export default async function (url: string, options: any | undefined = undefined) {
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }}
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json, "login");
      cookies().set("session", JSON.stringify(json));
    } catch (error: any) {
      console.log('api-login-err');
      console.error(error.message);
    }
  }
