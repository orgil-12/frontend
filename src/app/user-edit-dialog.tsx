import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Movie } from "./table";

export const UserEditDialog = ({
  open,
  onClose,
  name,
  id
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  name: string;
  id:number
}) => {


  useEffect(() => {
    setEditName(name);
  }, [name]);

  const [editName, setEditName] = useState("");

  const editUser = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editName }),
    });
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Firstname</Label>
            <Input
              id="name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              editUser();
              onClose(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
