"use client";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Plus } from "lucide-react";

import { Button } from "@/lib/components/ui/button";
import { Combobox } from "@/lib/components/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { Switch } from "@/lib/components/ui/switch";
import { Textarea } from "@/lib/components/ui/textarea";
import {
  Product,
  ProductCreate,
  ProductCreateSchema,
} from "@/lib/schema/product-schema";
import { useProducts } from "@/lib/providers/products-provider";
import { useEffect, useMemo, useState } from "react";
import { postProduct, putProduct } from "@/lib/services/product-service";
import { toast } from "sonner";
import { useGetCategories } from "@/lib/services/category-service";

const ID_TOAST = "toast_form_id";

export function FormProduct() {
  const { addData, updateData, editProduct, setEditProduct } = useProducts();
  const { isLoading, data } = useGetCategories();

  const form = useForm<ProductCreate>({
    mode: "onSubmit",
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      unit_price: undefined,
      category_id: undefined,
      available: false,
    },
  });

  const [open, setOpen] = useState(false);

  const isEditing = useMemo(() => !!editProduct, [editProduct]);

  const onSubmit: SubmitHandler<ProductCreate> = async (data) => {
    try {
      toast.loading("Registrando producto", {
        id: ID_TOAST,
      });

      const response = !isEditing
        ? await postProduct(data)
        : await putProduct(editProduct!.id, data);

      if (response.ok) {
        const productResponse = (await response.json()) as {
          product: Product;
        };

        toast.success(!isEditing ? "Producto creada" : "Producto editado", {
          id: ID_TOAST,
        });

        onReset();

        if (!isEditing) {
          addData(productResponse.product);
        } else {
          updateData(productResponse.product);
        }

        setOpen(false);
      }
    } catch (error) {
      console.error(error);

      toast.error("Hubo un error al guardar el producto", {
        id: ID_TOAST,
      });
    }
  };

  const onError: SubmitErrorHandler<ProductCreate> = (error, event) =>
    console.error(error, event);

  const onReset = () => {
    form.reset({
      name: "",
      description: "",
      unit_price: undefined,
      category_id: undefined,
      available: false,
    });

    setEditProduct(undefined);
  };

  useEffect(() => {
    if (editProduct) {
      const { name, description, unit_price, available, category_id } =
        editProduct;

      form.reset({
        name,
        description,
        unit_price,
        category_id,
        available,
      });
    }
  }, [editProduct, form]);

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
        <Button>
          <Plus className="w-4 h-4" />
          <span className="max-md:hidden">Registrar producto</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar producto" : "Registrar producto"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="form-product"
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descripción{" "}
                    <span className="text-muted-foreground">- opcional</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio unitario</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    {isLoading ? (
                      <Button
                        variant="outline"
                        className="w-[200px] justify-between"
                        disabled
                      >
                        Cargando...
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    ) : (
                      <Combobox
                        defaultValue={field.value?.toString()}
                        options={
                          data?.categories?.map((cat) => ({
                            label: cat.name,
                            value: cat.id.toString(),
                          })) ?? []
                        }
                        onChange={field.onChange}
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 space-y-0">
                  <FormLabel>Disponible</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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

          <Button type="submit" form="form-product">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
