import middlewareFunction from "./services/proxy/proxy";

export default middlewareFunction;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
