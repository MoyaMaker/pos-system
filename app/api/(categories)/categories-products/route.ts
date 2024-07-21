import { NextResponse } from "next/server";

import prisma from "@/lib/prisma-db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        product: {
          orderBy: {
            name: "asc",
          },
          where: {
            available: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      where: {
        product: {
          some: {
            available: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Categories with products",
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
