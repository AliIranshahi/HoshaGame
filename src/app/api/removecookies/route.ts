import { NextRequest, NextResponse } from "next/server";

export  async function POST(req: NextRequest) {
  if (req.method == "POST") {
    try {
      const response = NextResponse.json(
        { message: "Account Logout" },
        { status: 200 }
      );
      response.cookies.delete("Signup");
      response.cookies.delete("Login");
      return response
    } catch (error) {
      return NextResponse.json(
        { message: "Logout has beed error" },
        { status: 401 }
      );
    }
  }
}
