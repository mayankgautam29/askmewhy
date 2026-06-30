import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest): Promise<string | null> => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;

    const decodedToken: { id: string } = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: string;
    };
    return decodedToken.id;
  } catch (error: any) {
    console.error("JWT Verification failed:", error.message);
    return null;
  }
};
