"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import UsersTable from "./table";
import { UserCreateDialog } from "./user-create-dialog";

type Movie = {
  id: number;
  name: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`);
      const data = await res.json();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <h1>Хэрэглэгчид</h1>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Шинээр нэмэх
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable movies={movies} />
        </CardContent>
      </Card>
      <UserCreateDialog open={createModalOpen} onClose={setCreateModalOpen} />
    </div>
  );
}
