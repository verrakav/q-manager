import dbConnect from "@/lib/db";
import TournamentModel from "@/models/TournamentModel";
import {NextRequest} from "next/server";

export async function GET() {
  await dbConnect();
  const tournaments = await TournamentModel.find({});
  // console.log(tournaments);
  return new Response(JSON.stringify(tournaments), {
    headers: {"Content-Type": "application/json"}
  });
}
// OLD: used to work
export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  // console.log("Recieved at backend: ", body);
  const {name, categories, adminUser, image, description, queues, players} = body;
  const newTournament = new TournamentModel({
    name,
    categories,
    adminUser,
    image,
    description,
    queues,
    players
  });

  await newTournament.save();

  return new Response(JSON.stringify(newTournament), {
    headers: {"Content-Type": "application/json"}
  });
}

// NEW: not working
// export async function POST(req: NextRequest) {
//   await dbConnect();

//   const body = await req.json();
//   const {name, categories, adminUser, image, description, queues, players} = body;

//   // Ensure `players` and `queues.queueItems` contain only `_id`
//   const newTournament = new TournamentModel({
//     name,
//     categories,
//     adminUser,
//     image,
//     description,
//     queues: queues.map(queue => ({
//       ...queue,
//       queueItems: queue.queueItems.map(player => player._id)
//     })),
//     players: players.map(player => player._id)
//   });

//   await newTournament.save();

//   return new Response(JSON.stringify(newTournament), {
//     headers: {"Content-Type": "application/json"}
//   });
// }
