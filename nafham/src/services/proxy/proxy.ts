import { auth } from "@/services/auth/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;
  const userRole = (req.auth?.user as any)?.role || "STUDENT";

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isAuthRoute = nextUrl.pathname.startsWith('/auth/login') || nextUrl.pathname.startsWith('/auth/register');
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isInstructorRoute = nextUrl.pathname.startsWith('/instructor/dashboard');
  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');

  if (isApiAuthRoute) return;

  // Redirect logged-in users away from auth pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (userRole === 'ADMIN') return Response.redirect(new URL('/dashboard', nextUrl));
      if (userRole === 'TEACHER') return Response.redirect(new URL('/instructor/dashboard', nextUrl));
      return Response.redirect(new URL('/', nextUrl));
    }
    return;
  }

  // Protect Admin Routes (dashboard)
  if (isDashboardRoute || isAdminRoute) {
    if (!isLoggedIn) return Response.redirect(new URL('/auth/login', nextUrl));
    
    const adminOnlyPaths = [
      "/dashboard/admins", 
      "/dashboard/financials", 
      "/dashboard/marketing", 
      "/dashboard/paths", 
      "/dashboard/instructors", 
      "/dashboard/reports",
    ];

    const isAdminPath = adminOnlyPaths.some(p => nextUrl.pathname.startsWith(p));

    if (userRole !== 'ADMIN' && userRole !== 'TEACHER') {
      return Response.redirect(new URL('/', nextUrl));
    }

    if (isAdminPath && userRole !== 'ADMIN') {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
    return;
  }

  // Protect Instructor Routes
  if (isInstructorRoute) {
    if (!isLoggedIn) return Response.redirect(new URL('/auth/login', nextUrl));
    if (userRole !== 'TEACHER' && userRole !== 'ADMIN') return Response.redirect(new URL('/', nextUrl));
    return;
  }

});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
