import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyJwt } from "./lib/jwt";
import {
  ADMIN_ROUTES,
  ADVERTISER_ROUTES,
  AUTH_ROUTES,
  USER_ROUTES,
} from "./constants/routers";
import { ROLE } from "./constants/role.enum";

const ROLE_REDIRECT_MAP: Record<string, string> = {
  [ROLE.ADMIN]: ADMIN_ROUTES.HOME.ROOT,
  [ROLE.USER]: USER_ROUTES.HOME.ROOT,
  [ROLE.ADVERTISER]: ADVERTISER_ROUTES.HOME.ROOT,
};

const AUTH_PAGE_ROUTES = [
  AUTH_ROUTES.LOGIN.ROOT,
  AUTH_ROUTES.ADVERTISER_SIGNUP.ROOT,
  AUTH_ROUTES.SIGNUP.ROOT,
];

// Routes that are public — no token needed
const isPublicRoute = (nextUrl: string): boolean => {
  return nextUrl === USER_ROUTES.HOME.ROOT; // exactly "/home", not "/home/anything"
};

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const nextUrl = request.nextUrl.pathname;

  // Redirect root to public landing page
  if (nextUrl === "/") {
    return NextResponse.redirect(new URL(USER_ROUTES.HOME.ROOT, request.url));
  }

  // Allow public routes without token
  if (isPublicRoute(nextUrl)) {
    return NextResponse.next();
  }

  if (!token) {
    return handleUnauthenticatedRedirect(nextUrl, request);
  }

  const user = verifyJwt(token);

  if (!user) {
    const response = NextResponse.redirect(
      new URL(AUTH_ROUTES.LOGIN.ROOT, request.url),
    );
    response.cookies.delete("accessToken");
    return response;
  }

  const { role } = user;

  // Authenticated users should not see auth pages, redirect to their home
  const isAuthPage = AUTH_PAGE_ROUTES.includes(nextUrl);
  if (isAuthPage) {
    const redirectPath = ROLE_REDIRECT_MAP[role];
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

const handleUnauthenticatedRedirect = (
  nextUrl: string,
  request: NextRequest,
) => {
  // /home/profile, /home/something → login
  if (nextUrl.startsWith(USER_ROUTES.HOME.ROOT + "/")) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN.ROOT, request.url));
  }

  // /advertiser/* → advertiser signup
  if (nextUrl.startsWith(ADVERTISER_ROUTES.HOME.ROOT)) {
    return NextResponse.redirect(
      new URL(AUTH_ROUTES.ADVERTISER_SIGNUP.ROOT, request.url),
    );
  }

  // /admin/* → admin signin
  if (nextUrl.startsWith(ADMIN_ROUTES.HOME.ROOT)) {
    return NextResponse.redirect(
      new URL(ADMIN_ROUTES.SIGNIN.ROOT, request.url),
    );
  }

  return NextResponse.next();
};
