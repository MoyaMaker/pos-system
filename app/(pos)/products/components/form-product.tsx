"use client";
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
  ProductCreate,
  ProductCreateSchema,
} from "@/lib/schema/product-schema";
import { useGetCategories } from "@/lib/services/category-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

export function FormProduct() {
  const { data, isLoading } = useGetCategories();

  const form = useForm<ProductCreate>({
    mode: "onSubmit",
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<ProductCreate> = (data) => console.log(data);

  const onError: SubmitErrorHandler<ProductCreate> = (error, event) =>
    console.error(error, event);

  const onReset = () => {
    form.reset({
      name: "",
      description: "",
      unit_price: undefined,
      available: true,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Registrar producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar producto</DialogTitle>
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
