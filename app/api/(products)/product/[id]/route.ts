import { NextResponse } from "next/server";

import Prisma from "@/lib/prisma-db";
import {
  ProductCreate,
  ProductCreateSchema,
} from "@/lib/schema/product-schema";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const body = (await request.json()) as ProductCreate;

    const schema = await ProductCreateSchema.safeParseAsync(body);

    if (!schema.success) {
      return NextResponse.json(
        {
          message: "Invalid request. Please check your input and try again.",
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

    if (isUnique && isUnique.id !== id) {
      return NextResponse.json(
        {
          message: "This product already exist",
        },
        {
          status: 409,
        }
      );
    }

    const product = await Prisma.product.update({
      where: {
        id,
      },
      data: schema.data,
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Could't update the product",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      message: "Product updated",
      product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something was wrong updating the category",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const deletedProduct = await Prisma.product.delete({
      where: {
        id,
      },
    });

    if (deletedProduct) {
      return new Response(null, { status: 204 });
    }

    return NextResponse.json({
      message: "Couldn't delete the product",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something was wrong during delete of product",
      },
      {
        status: 500,
      }
    );
  }
}
