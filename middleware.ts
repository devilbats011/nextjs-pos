import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth_token_name } from "./hooks/helper/constant";

function startWith(request: NextRequest, url: string) {
  return request.nextUrl.pathname.startsWith(url);
}

async function checkSignIn(request: NextRequest) {
  if (!request.cookies.has(auth_token_name)) {
    return false;
  }
  console.log(request.cookies.get(auth_token_name), "auth_token!");

  return true;
}

export async function middleware(request: NextRequest) {
  if (await checkSignIn(request)) {
    console.log("auth");

    if (startWith(request, "/login") || startWith(request, "/register")) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
    return NextResponse.next();
  }

  console.log("no auth");
  if (startWith(request, "/user")) {
    return NextResponse.redirect(
      new URL("/ops_something_went_wrong", request.url)
    );
  }

  return NextResponse.next();
}
