"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
  Edit,
  Trash2,
  ArrowUpDown,
  MoveUp,
  MoveDown,
  CircleAlert,
  CircleCheck,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
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
        </div>
      );
    },
    // header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "unit_price",
    enableHiding: true,
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Precio
            {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === "asc" && (
              <MoveUp className="ml-2 h-4 w-4" />
            )}
            {column.getIsSorted() === "desc" && (
              <MoveDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => currencyFormat(row.original.unit_price),
  },
  {
    accessorKey: "available",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
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
        </div>
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
          {value ? (
            <CircleCheck className="w-5 h-5" />
          ) : (
            <CircleAlert className="w-5 h-5" />
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Categoría
            {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === "asc" && (
              <MoveUp className="ml-2 h-4 w-4" />
            )}
            {column.getIsSorted() === "desc" && (
              <MoveDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => row.original.category?.name,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start"
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
    cell: ({ row }) => dateFormat(row.original.created_at),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="justify-start"
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
    cell: ({ row }) => dateFormat(row.original.updated_at),
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
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu acciones</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={row.getToggleExpandedHandler()}>
            <Info className="w-4 h-4 mr-2" />
            {row.getIsExpanded() ? "Ocultar detalles" : "Ver detalles"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setEditProduct(product)}>
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenuItem>
          {/* Delete dialog trigger */}
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete dialog content */}
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
          <AlertDialogAction onClick={() => onDelete(product.id)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
