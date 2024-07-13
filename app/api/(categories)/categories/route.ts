import { NextResponse } from "next/server";

import Prisma from "@/lib/prisma-db";

export async function GET() {
  try {
    const categories = await Prisma.category.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      message: "Categories founded",
      categories,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something was wrong getting categories",
      },
      {
        status: 500,
      }
    );
  }
}
