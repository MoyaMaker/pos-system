import { NextResponse } from "next/server";

import Prisma from "@/lib/prisma-db";
import {
  CategoryCreate,
  CategoryCreateSchema,
} from "@/lib/schema/category-schema";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const body = (await request.json()) as CategoryCreate;

    const schema = await CategoryCreateSchema.safeParseAsync(body);

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

    const isUnique = await Prisma.category.findUnique({
      where: {
        name: schema.data.name,
      },
    });

    if (isUnique && isUnique.id !== id) {
      return NextResponse.json(
        {
          message: "This category already exist",
        },
        {
          status: 409,
        }
      );
    }

    const category = await Prisma.category.update({
      where: {
        id,
      },
      data: schema.data,
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Could't update the category",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      message: "Category updated",
      category,
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

    const deletedCategory = await Prisma.category.delete({
      where: {
        id,
      },
    });

    if (deletedCategory) {
      return new Response(null, { status: 204 });
    }

    return NextResponse.json({
      message: "Couldn't delete the category",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something was wrong during delete of category",
      },
      {
        status: 500,
      }
    );
  }
}
