"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit, Trash2, ArrowUpDown, MoveUp, MoveDown } from "lucide-react";

import { Category } from "@/lib/schema/category-schema";
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
import { deleteCategory } from "@/lib/services/category-service";
import { toast } from "sonner";
import { useCategories } from "@/lib/providers/category-provider";

export const columns: ColumnDef<Category>[] = [
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

export function Actions({ row }: { row: Row<Category> }) {
  const category = row.original;

  const { removeData, setEditCategory } = useCategories();

  const onDelete = async (id: number) => {
    toast.loading("Eliminando categoría", {
      id: ID_TOAST,
    });

    const response = await deleteCategory(id);

    if (response.status === 204) {
      toast.success("Categoría eliminada", {
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
        onClick={() => setEditCategory(category)}
      >
        <span className="sr-only">Editar</span>
        <Edit className="h-4 w-4" />
      </Button>
      <ConfirmDelete onConfirm={() => onDelete(category.id)} />
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
            Confirmar eliminación de categoría
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
