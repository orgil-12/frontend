import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const UserCreateDialog = ({ open, onClose }: { open: boolean, onClose: (open: boolean) => void }) => {
  const [name, setName] = useState("")

  const addUser = ( async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
    })
  })
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Firstname</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onClose(false)} variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" onClick={() => {
            addUser();
            setName("")
            onClose(false)}} >Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
