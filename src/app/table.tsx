"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserEditDialog } from "./user-edit-dialog";
import { useState } from "react";

export type Movie = {
  id: number;
  name: string;
};

export default function UsersTable({ movies }: { movies: Movie[] }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState<number>(0);
  const [editOpen, setEditOpen] = useState(false);

  const removeUser = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setEditOpen(false);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies?.map((movie) => (
          <TableRow key={movie.id}>
            <TableCell className="font-medium">{movie.id}</TableCell>
            <TableCell>{movie.name}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCreateModalOpen(true);
                      setName(movie.name);
                      setId(movie.id);
                    }}
                  >
                    Edit Profile
                  </Button>
                </DialogTrigger>
              </Dialog>
            </TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger>
                  <div>•••</div>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 w-[140px] ">
                  <PopoverClose>
                    <Button
                    variant='outline'
                      onClick={() => {
                        removeUser(movie.id);
                      }}
                    >
                      Remove
                    </Button>
                  </PopoverClose>
                  <PopoverClose className="p-0">
                    <Button variant='outline' className="px-6">Detail</Button>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
        <UserEditDialog
          open={createModalOpen}
          onClose={setCreateModalOpen}
          name={name}
          id={id}
        />
      </TableBody>
    </Table>
  );
}
