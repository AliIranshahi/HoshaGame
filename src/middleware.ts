import { NextResponse, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/home", request.url));

  const Signup = request.cookies.get("Signup")?.value;
  const Login = request.cookies.get("Login")?.value;
  const webUrl = request.nextUrl.pathname;
  console.log("💡 Middleware is active");
  console.log("📄 Pathname:", webUrl);
  console.log("🍪 Signup Cookie:", Signup);
  if (webUrl.startsWith("/match")) {
    if (Signup || Login) {
      return NextResponse.next();
    } else if (!Signup || !Login) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return
  }
  if(webUrl.startsWith("/login")){
    if(Signup || Login){
      return NextResponse.redirect(new URL("/" , request.url))
    }
  }else{
    return NextResponse.next()
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/match","/match/:path*" , "/login"]
};
