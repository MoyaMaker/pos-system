import { NextResponse } from "next/server";

import Prisma from "@/lib/prisma-db";
import {
  CategoryCreate,
  CategoryCreateSchema,
} from "@/lib/schema/category-schema";

export async function POST(request: Request) {
  try {
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

    if (isUnique) {
      return NextResponse.json(
        {
          message: "This category already exist",
        },
        {
          status: 409,
        }
      );
    }

    const category = await Prisma.category.create({
      data: schema.data,
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Could't create the category",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      message: "Category created",
      category,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something was wrong during creation of category",
      },
      {
        status: 500,
      }
    );
  }
}
