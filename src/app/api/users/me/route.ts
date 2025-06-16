import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: userId}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { user: null, error: error.message }
    );
  }
}
