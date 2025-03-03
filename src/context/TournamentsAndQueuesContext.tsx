"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode
} from "react";
import {usePathname} from "next/navigation";
import {useUser} from "@clerk/nextjs";

// Types
import {TPlayer, TTournament, TTournamentsAndQueuesContextProps} from "@/types/Types";

const TournamentsAndQueuesContext = createContext<
  TTournamentsAndQueuesContextProps | undefined
>(undefined);

export const TournamentsAndQueuesProvider = ({children}: {children: ReactNode}) => {
  const [draggedItem, setDraggedItem] = useState<TPlayer | null>(null);

  // Tournaments State
  const [tournaments, setTournaments] = useState<TTournament[]>([]);
  const [currentTournament, setCurrentTournament] = useState<TTournament | null>();

  const pathname = usePathname();
  const {isSignedIn, user} = useUser();
  // console.log(user, "user");
  // console.log("in the context", currentTournament);
  const tournamentOwner = isSignedIn && user.id === currentTournament?.adminUser;

  // console.log("RUNNING INSIDE CONTEXT")
  //WORKS: as expected Fetch Players and Tournaments on Mount || to fetch the newest tournament might have to use Websocket
  useEffect(() => {
    // console.log("RUNNING HERE IN USEEFFECT");
    // fetchPlayers();
    fetchTournaments();
  }, []);

  // WORKS: sets both the tournamnet and its players | Sync Current Tournament with URL Pathname
  useEffect(() => {
    // console.log("Current Pathname:", pathname);
    // console.log("Tournaments:", tournaments);
    // console.log("Current Tournament:", currentTournament);

    const segments = pathname.split("/");
    const id = segments.pop();

    if (id && tournaments.length > 0) {
      const foundTournament = tournaments.find(tournament => tournament._id === id);
      // console.log("Found TOURNAMENT");
      // console.log(foundTournament);
      if (foundTournament) {
        setCurrentTournament(foundTournament);
      }
    }
  }, [pathname, tournaments]);
  // console.log("in the context", currentTournament);

  // NEW:
  const addPlayerToTournament = (player, tournamentId) => {
    console.log("addPlayerToTournament RAN");
    console.log("currentTournament ", currentTournament);

    if (currentTournament) {
      setCurrentTournament(prevTournament => {
        if (!prevTournament) return prevTournament; // Ensure prevTournament exists
        console.log("SETTING THE TOURNAMENT");
        return {
          ...prevTournament, // Create a new tournament object
          unProcessedQItems: [...prevTournament.unProcessedQItems, player] // Create a new array
        };
      });
    }
  };

  // Filtered Tournaments
  const filteredTournaments = tournaments.filter(
    tournament => tournament.adminUser === user?.id
  );

  // to get the newest players after one is added
  const fetchNewPlayers = async (tournamentId: string) => {
    try {
      const response = await fetch(`/api/tournament/${tournamentId}`);
      const playersData = await response.json();

      const playersForTournament = playersData.filter(
        (player: TPlayer) => player.tournamentId === tournamentId
      );

      console.log("Fetched Players: ", playersForTournament);

      setCurrentTournament(prevTournament =>
        prevTournament
          ? {...prevTournament, unprocessedPlayers: playersForTournament}
          : prevTournament
      );
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  //

  //WORKS: Adds Queues
  const addMoreQueues = () => {
    const newQueue = {
      queueName: (currentTournament.queues.length + 1).toString(),
      queueItems: [],
      id: currentTournament.queues.length.toString()
    };

    setCurrentTournament(prevTournament => {
      if (!prevTournament) return prevTournament;
      return {
        ...prevTournament,
        queues: [...prevTournament?.queues, newQueue]
      };
    });
  };

  //WORKS: Removes Queues
  const removeQueues = () => {
    setCurrentTournament(prevTournament => {
      if (!prevTournament) return prevTournament;
      return {
        ...prevTournament,
        queues: prevTournament.queues.slice(0, -1)
      };
    });
  };

  //WORKS: as expected gets ALL tournaments
  const fetchTournaments = async () => {
    const response = await fetch(`/api/tournaments/`);
    const tournamentsData = await response.json();
    setTournaments(tournamentsData);
    // WORKS: as expected
    // console.log("Tournaments");
    // console.log(tournamentsData);
  };

  //WORKS: Derived Categories from Players
  const uniqueCategories = useMemo(() => {
    const categories = tournaments.flatMap(tournament => tournament.categories || []);
    return Array.from(new Set(categories));
  }, [currentTournament]);
  // console.log(uniqueCategories);

  // "FIXME:"
  const saveTournament = async tournamentId => {
    // comes through OK
    // console.log(tournamentId);
    console.log("BEFORE TRY: ", currentTournament);

    try {
      const res = await fetch(`/api/tournaments/${tournamentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(currentTournament)
      });

      if (!res.ok) {
        throw new Error(`Error saving tournaments: ${res.statusText}`);
      }

      const dataToPost = await res.json();
      console.log("Tournament saved!", dataToPost);
    } catch (err) {
      console.error("Failed to save tournament: ", err);
    }
  };

  return (
    <TournamentsAndQueuesContext.Provider
      value={{
        addMoreQueues,
        removeQueues,
        draggedItem,
        setDraggedItem,
        uniqueCategories,
        currentTournament,
        tournaments,
        setCurrentTournament,
        setTournaments,
        filteredTournaments,
        fetchTournaments,
        tournamentOwner,
        saveTournament,
        fetchNewPlayers,
        addPlayerToTournament
      }}>
      {children}
    </TournamentsAndQueuesContext.Provider>
  );
};

export const useTournamentsAndQueuesContext =
  (): TTournamentsAndQueuesContextProps => {
    const context = useContext(TournamentsAndQueuesContext);
    if (!context) {
      throw new Error(
        "useTournamentsAndQueuesContext must be used within a TournamentsAndQueuesProvider"
      );
    }
    return context;
  };
