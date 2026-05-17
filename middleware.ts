// middleware.ts  ← project root, same level as app/ folder
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/modules/supabase/proxy";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Run on all admin routes
    "/admin/:path*",
    // Run on login page so logged-in users get redirected away
    "/login",
    // Exclude static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};