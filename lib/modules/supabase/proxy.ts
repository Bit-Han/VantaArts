import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request });

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
					supabaseResponse = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// IMPORTANT: never put any logic between createServerClient
	// and getUser() — it will break session refresh
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const url = request.nextUrl.clone();
	const isAdminRoute = url.pathname.startsWith("/admin");
	const isLoginRoute = url.pathname.startsWith("/login");

	// Not logged in and trying to access admin — redirect to login
	if (!user && isAdminRoute) {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	// Logged in but wrong email — sign out and redirect to login
	if (user && isAdminRoute && user.email !== process.env.ADMIN_EMAIL) {
		await supabase.auth.signOut();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	// Already logged in and trying to visit login — redirect to admin
	if (user && isLoginRoute && user.email === process.env.ADMIN_EMAIL) {
		url.pathname = "/admin";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
