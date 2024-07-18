import { NextResponse } from "next/server";

import Prisma from "@/lib/prisma-db";

export async function GET() {
  try {
    const products = await Prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      message: "Products founded",
      products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something was wrong getting products",
      },
      {
        status: 500,
      }
    );
  }
}
