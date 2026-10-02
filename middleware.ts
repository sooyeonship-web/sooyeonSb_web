import { NextRequest, NextResponse } from "next/server";

// 예약·관리자 기능은 아직 저장소/인증 미연동 → 배포 환경에서는 404 처리 (로컬 dev에서는 동작)
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/booking/:path*", "/api/bookings/:path*"],
};
