// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function updateSession(request: NextRequest) {
// 	let supabaseResponse = NextResponse.next({ request });

// 	const supabase = createServerClient(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
// 		{
// 			cookies: {
// 				getAll() {
// 					return request.cookies.getAll();
// 				},
// 				setAll(cookiesToSet) {
// 					cookiesToSet.forEach(({ name, value }) =>
// 						request.cookies.set(name, value),
// 					);
// 					supabaseResponse = NextResponse.next({ request });
// 					cookiesToSet.forEach(({ name, value, options }) =>
// 						supabaseResponse.cookies.set(name, value, options),
// 					);
// 				},
// 			},
// 		},
// 	);

// 	// Refresh session — IMPORTANT: do not add logic between createServerClient and getUser()
// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();

// 	const url = request.nextUrl.clone();
// 	const isAuthRoute = url.pathname.startsWith("/login");
// 	const isDashboardRoute = url.pathname.startsWith("/admin");

// 	if (!user && isDashboardRoute) {
// 		url.pathname = "/login";
// 		return NextResponse.redirect(url);
// 	}

// 	if (user && isAuthRoute) {
// 		url.pathname = "/admin";
// 		return NextResponse.redirect(url);
// 	}

// 	return supabaseResponse;
// }

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Only protect /admin routes (allow /admin/login)
	if (pathname.startsWith("/admin") && !pathname.startsWith("/login")) {
		let response = NextResponse.next({ request });

		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					getAll() {
						return request.cookies.getAll();
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value }) =>
							request.cookies.set(name, value),
						);
						response = NextResponse.next({ request });
						cookiesToSet.forEach(({ name, value, options }) =>
							response.cookies.set(name, value, options),
						);
					},
				},
			},
		);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		// Only allow the single admin email
		if (user.email !== process.env.ADMIN_EMAIL) {
			await supabase.auth.signOut();
			return NextResponse.redirect(new URL("/login", request.url));
		}

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};