import { Skeleton } from "@/lib/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";

export function TableLoading() {
  return (
    <div className="rounded-md border mb-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="w-44 h-5 rounded-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-44 h-5 rounded-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-44 h-5 rounded-full" />
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-24 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-24 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-24 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-64 h-5 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
              <Skeleton className="inline-block w-8 h-8 rounded-md" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
