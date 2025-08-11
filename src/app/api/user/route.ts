import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const signupCookie = req.cookies.get("Signup");
    const loginCookie = req.cookies.get("Login");

    const Account = signupCookie?.value || loginCookie?.value;
    if (!Account) {
      return NextResponse.json(
        { message: "no account login", action: false },
        { status: 401 }
      );
    }
    if (Account) {
      return NextResponse.json(
        { message: `secusse`, username: Account , status:true  },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "no account login" }, { status: 401 });
  }
}
