import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function startWith(request: NextRequest, url: string) {
  return request.nextUrl.pathname.startsWith(url);
}

async function checkSignIn(request: NextRequest) {
  request.cookies.set("sidebar", '1');


  if (!request.cookies.has("session")) {
    return false;
  }
  console.log(request.cookies.get("session"), "session!");

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
