import { NextResponse, NextRequest } from "next/server";

export function middleware() {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser && typeof self === 'undefined') {
    global.self = window;
  }
  const res = NextResponse.next();

  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*');
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return res;
}

export const config = {
  matcher: '/api/:path*'
};
