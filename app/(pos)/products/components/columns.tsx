"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit, Trash2, ArrowUpDown, MoveUp, MoveDown } from "lucide-react";
import { toast } from "sonner";

import { Product } from "@/lib/schema/product-schema";
import { dateFormat } from "@/lib/utils/date-format";

import { Button } from "@/lib/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/components/ui/alert-dialog";
import { useProducts } from "@/lib/providers/products-provider";
import { deleteProduct } from "@/lib/services/product-service";
import { Badge } from "@/lib/components/ui/badge";
import { cn } from "@/lib/utils";
import { currencyFormat } from "@/lib/utils/currency-format";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "asc" && (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <MoveDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio unitario
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "asc" && (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <MoveDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => currencyFormat(row.original.unit_price),
  },
  {
    accessorKey: "available",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Disponible
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "asc" && (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <MoveDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("available");

      return (
        <Badge
          variant={value ? "default" : "destructive"}
          className={cn(
            value ? "bg-green-700 text-white hover:bg-green-700/80" : ""
          )}
        >
          {value ? "Disponible" : "No disponible"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => row.original.category?.name,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de creación
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "asc" && (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <MoveDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => dateFormat(row.getValue("created_at")),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de actualización
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "asc" && (
            <MoveUp className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <MoveDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => dateFormat(row.getValue("updated_at")),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions row={row} />,
  },
];

const ID_TOAST = "toast_delete_id";

export function Actions({ row }: { row: Row<Product> }) {
  const product = row.original;

  const { removeData, setEditProduct } = useProducts();

  const onDelete = async (id: number) => {
    toast.loading("Eliminando producto", {
      id: ID_TOAST,
    });

    const response = await deleteProduct(id);

    if (response.status === 204) {
      toast.success("Producto eliminado", {
        id: ID_TOAST,
      });

      removeData(id);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => setEditProduct(product)}
      >
        <span className="sr-only">Editar</span>
        <Edit className="h-4 w-4" />
      </Button>
      <ConfirmDelete onConfirm={() => onDelete(product.id)} />
    </>
  );
}

const ConfirmDelete = ({ onConfirm }: { onConfirm(): void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Eliminar</span>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirmar eliminación del producto
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Por favor, confirma tu decisión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
