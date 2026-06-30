import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    const userdata = await User.findById(userId).select("-password");
    if (!userdata) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: userdata });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
