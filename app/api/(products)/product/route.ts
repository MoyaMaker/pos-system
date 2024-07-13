import { NextResponse } from "next/server";

import Prisma from "@/lib/prisma-db";
import {
  ProductCreate,
  ProductCreateSchema,
} from "@/lib/schema/product-schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductCreate;

    const schema = await ProductCreateSchema.safeParseAsync(body);

    if (!schema.success) {
      return NextResponse.json(
        {
          message: "Invalid request. Please check your input and try again",
        },
        {
          status: 400,
        }
      );
    }

    const isUnique = await Prisma.product.findUnique({
      where: {
        name: schema.data.name,
      },
    });

    if (isUnique) {
      return NextResponse.json(
        {
          message: "This product already exist",
        },
        {
          status: 409,
        }
      );
    }

    const product = await Prisma.product.create({
      data: schema.data,
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Could't create the product",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      message: "Product created",
      product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something was wrong during creation of product",
      },
      {
        status: 500,
      }
    );
  }
}
