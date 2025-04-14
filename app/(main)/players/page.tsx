"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/Modal";
import { DeleteModal } from "@/components/DeleteModal";
import { usePlayers } from "@/lib/firebaseQueries";
import { Loader2, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PlayerForm } from "@/components/forms/PlayerForm";

export default function PlayersPage() {
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState<string | null>(null);
  const { data: players, isLoading, error } = usePlayers();

  return (
    <div className='container mx-auto py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Players</h1>
        <Button onClick={() => setIsAddPlayerModalOpen(true)}>
          Add Player
        </Button>
      </div>
      {isLoading && (
        <div className='flex justify-center'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      )}
      {error && <div className='text-red-500'>Error loading players</div>}
      {!isLoading && !error && players && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {players.map((player) => (
            <Card key={player.id}>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>
                  {player.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {player.imageUrl && (
                  <Image
                    src={""}
                    alt={`${player.name} image`}
                    width={80}
                    height={80}
                    className='rounded-full mb-4'
                  />
                )}
                <p className='text-sm text-muted-foreground'>
                  DOB: {new Date(player.dateOfBirth).toLocaleDateString()}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Club ID: {player.teamId}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Phone: {player.phoneNumber || "N/A"}
                </p>
                <div className='flex gap-2 mt-4'>
                  <button
                    onClick={() => setEditPlayerId(player.id)}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <Pencil className='w-4 h-4' />
                  </button>
                  <DeleteModal
                    //   isOpen={isDeleteModalOpen}
                    // onClose={() => setIsDeleteModalOpen(false)}
                    onClose={() => {}}
                    itemId={player?.id}
                    itemName={player?.name}
                    // onSuccess={() => setIsDeleteModalOpen(false)}
                    onSuccess={() => {}}
                    type='player'
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Modal
        isOpen={isAddPlayerModalOpen}
        onClose={() => setIsAddPlayerModalOpen(false)}
        title='Add New Player'
      >
        <PlayerForm onSuccess={() => setIsAddPlayerModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={!!editPlayerId}
        onClose={() => setEditPlayerId(null)}
        title='Edit Player'
      >
        <PlayerForm
          playerId={editPlayerId}
          onSuccess={() => setEditPlayerId(null)}
        />
      </Modal>
    </div>
  );
}
