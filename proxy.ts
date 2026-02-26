import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyJwt } from "./lib/jwt";
import {
  ADMIN_ROUTES,
  ADVERTISER_ROUTES,
  AUTH_ROUTES,
  HOME_ROUTES,
} from "./constants/routers";
import { ROLE } from "./constants/role.enum";

export function proxy(requset: NextRequest) {
  const token = requset.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.next();
  }

  const user = verifyJwt(token);

  if (!user) {
    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    return response;
  }

  const { role } = user;

  if (requset.nextUrl.pathname === AUTH_ROUTES.LOGIN.ROOT) {
    if (role === ROLE.ADMIN) {
      return NextResponse.redirect(
        new URL(ADMIN_ROUTES.HOME.ROOT, requset.url),
      );
    } else if (role === ROLE.USER) {
      return NextResponse.redirect(new URL(HOME_ROUTES.HOME.ROOT, requset.url));
    } else if (role === ROLE.ADVERTISER) {
      return NextResponse.redirect(
        new URL(ADVERTISER_ROUTES.HOME.ROOT, requset.url),
      );
    }
  }
  return NextResponse.next();
}
