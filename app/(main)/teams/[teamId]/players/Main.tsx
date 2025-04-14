"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTeam, usePlayersByTeam } from "@/lib/firebaseQueries";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TeamDetailsPage({ teamId }: { teamId: string }) {
  const {
    data: team,
    isLoading: isTeamLoading,
    error: teamError,
  } = useGetTeam(teamId);
  const {
    data: players,
    isLoading: isPlayersLoading,
    error: playersError,
  } = usePlayersByTeam(teamId);
  const router = useRouter();

  if (isTeamLoading || isPlayersLoading) {
    return (
      <div className='flex justify-center py-8'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  if (teamError || playersError) {
    return (
      <div className='text-red-500 text-center py-8'>
        Error: {(teamError || playersError)?.message}
      </div>
    );
  }

  if (!team) {
    return <div className='text-center py-8'>Team not found</div>;
  }

  return (
    <div className='container mx-auto py-8'>
      <Button variant='outline' onClick={() => router.back()} className='mb-6'>
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>{team.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {team.imageUrl && (
            <Image
              src={team.imageUrl}
              alt={`${team.name} logo`}
              width={100}
              height={100}
              className='rounded-full mb-4'
            />
          )}
          <p>Phone: {team.phoneNumber}</p>
          <p>Created: {new Date(team.createdAt).toLocaleDateString()}</p>
        </CardContent>
      </Card>
      <h2 className='text-xl font-bold mt-8 mb-4'>Players</h2>
      {players?.length === 0 ? (
        <p>No players in this team</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {players?.map((player) => (
            <Card key={player.id}>
              <CardHeader>
                <CardTitle className='text-lg'>{player.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {player.imageUrl && (
                  <Image
                    src={player.imageUrl}
                    alt={`${player.name} image`}
                    width={80}
                    height={80}
                    className='rounded-full mb-4'
                  />
                )}
                <p>DOB: {new Date(player.dateOfBirth).toLocaleDateString()}</p>
                <p>Phone: {player.phoneNumber || "N/A"}</p>
                <Button asChild variant='outline' size='sm' className='mt-4'>
                  <Link href={`/players/${player.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
