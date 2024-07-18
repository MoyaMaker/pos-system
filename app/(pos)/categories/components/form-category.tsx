"use client";
import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import {
  Category,
  CategoryCreate,
  CategoryCreateSchema,
} from "@/lib/schema/category-schema";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { postCategory, putCategory } from "@/lib/services/category-service";
import { useCategories } from "@/lib/providers/category-provider";

const ID_TOAST = "toast_form_id";

export function FormCategory() {
  const { addData, updateData, editCategory, setEditCategory } =
    useCategories();

  const form = useForm<CategoryCreate>({
    mode: "onSubmit",
    resolver: zodResolver(CategoryCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const [open, setOpen] = useState(false);

  const isEditing = useMemo(() => !!editCategory, [editCategory]);

  const onSubmit: SubmitHandler<CategoryCreate> = async (data) => {
    try {
      toast.loading("Registrando categoría", {
        id: ID_TOAST,
      });

      const response = !isEditing
        ? await postCategory(data)
        : await putCategory(editCategory!.id, data);

      if (response.ok) {
        const categoryResponse = (await response.json()) as {
          category: Category;
        };

        toast.success(!isEditing ? "Categoría creada" : "Categoría editada", {
          id: ID_TOAST,
        });

        onReset();

        if (!isEditing) {
          addData(categoryResponse.category);
        } else {
          updateData(categoryResponse.category);
        }

        setOpen(false);
      } else if (response.status === 400) {
        toast.info("Faltó información para guardar la categoría", {
          id: ID_TOAST,
        });
      } else if (response.status === 409) {
        toast.info("Esta categoría ya existe", {
          id: ID_TOAST,
        });
      } else if (!response.ok) {
        toast.error("Algo falló al guardar la categoría", {
          id: ID_TOAST,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Hubo un error al guardar la categoría", {
        id: ID_TOAST,
      });
    }
  };

  const onError: SubmitErrorHandler<CategoryCreate> = (error, event) => {
    console.error(error, event);
  };

  const onReset = () => {
    form.reset({
      name: "",
    });

    setEditCategory(undefined);
  };

  useEffect(() => {
    if (editCategory) {
      const { name } = editCategory;
      form.reset({
        name,
      });
    }
  }, [editCategory, form]);

  useEffect(() => {
    if (isEditing) {
      setOpen(true);
    }
  }, [isEditing]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);

        onReset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Registrar categoría</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar categoría" : "Registrar categoría"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-category"
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    El nombre debe ser único y no debe existir previamente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" onClick={onReset}>
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" form="form-category">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
