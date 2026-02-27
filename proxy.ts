import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_ROUTES,
  ADVERTISER_ROUTES,
  AUTH_ROUTES,
  USER_ROUTES,
} from "./constants/routers";
import { verifyJwt } from "./lib/jwt";
import { ROLE } from "./constants/role.enum";

const ROLE_BASED_ROUTES = {
  [ROLE.ADMIN]: ADMIN_ROUTES.HOME.ROOT,
  [ROLE.ADVERTISER]: ADVERTISER_ROUTES.HOME.ROOT,
  [ROLE.USER]: USER_ROUTES.HOME.ROOT,
};

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const nextUrl = request.nextUrl.pathname;

  if (!token) {
    if (
      !nextUrl.startsWith(ADMIN_ROUTES.SIGNIN.ROOT) &&
      nextUrl.startsWith(ADMIN_ROUTES.HOME.ROOT)
    ) {
      return NextResponse.redirect(
        new URL(ADMIN_ROUTES.SIGNIN.ROOT, request.url),
      );
    } else if (
      !nextUrl.startsWith(AUTH_ROUTES.ADVERTISER_SIGNUP.ROOT) &&
      nextUrl.startsWith(ADVERTISER_ROUTES.HOME.ROOT)
    ) {
      return NextResponse.redirect(
        new URL(AUTH_ROUTES.ADVERTISER_SIGNUP.ROOT, request.url),
      );
    } else if (
      nextUrl !== USER_ROUTES.HOME.ROOT &&
      nextUrl.startsWith(USER_ROUTES.HOME.ROOT)
    ) {
      return NextResponse.redirect(
        new URL(AUTH_ROUTES.LOGIN.ROOT, request.url),
      );
    }

    return NextResponse.next();
  }

  const payload = verifyJwt(token);

  if (!payload) {
    if (nextUrl.startsWith(USER_ROUTES.HOME.ROOT)) {
      return NextResponse.redirect(new URL(USER_ROUTES.HOME.ROOT, request.url));
    }
    const response = NextResponse.redirect(
      new URL(AUTH_ROUTES.LOGIN.ROOT, request.url),
    );

    response.cookies.delete("accessToken");
    return response;
  }

  const { role } = payload;

  if (
    nextUrl === AUTH_ROUTES.ADVERTISER_SIGNUP.ROOT ||
    nextUrl === AUTH_ROUTES.LOGIN.ROOT ||
    nextUrl === AUTH_ROUTES.SIGNUP.ROOT ||
    nextUrl === ADMIN_ROUTES.SIGNIN.ROOT
  ) {
    if (role === ROLE.ADMIN) {
      return NextResponse.redirect(
        new URL(ADMIN_ROUTES.HOME.ROOT, request.url),
      );
    } else if (role === ROLE.USER) {
      return NextResponse.redirect(new URL(USER_ROUTES.HOME.ROOT, request.url));
    } else if (role === ROLE.ADVERTISER) {
      return NextResponse.redirect(
        new URL(ADVERTISER_ROUTES.HOME.ROOT, request.url),
      );
    }
  } else if (
    nextUrl.startsWith(ADMIN_ROUTES.HOME.ROOT) &&
    role !== ROLE.ADMIN
  ) {
    return NextResponse.redirect(new URL(ROLE_BASED_ROUTES[role], request.url));
  } else if (
    nextUrl.startsWith(ADVERTISER_ROUTES.HOME.ROOT) &&
    role !== ROLE.ADVERTISER
  ) {
    return NextResponse.redirect(new URL(ROLE_BASED_ROUTES[role], request.url));
  } else if (nextUrl.startsWith(USER_ROUTES.HOME.ROOT) && role !== ROLE.USER) {
    return NextResponse.redirect(new URL(ROLE_BASED_ROUTES[role], request.url));
  }
}
