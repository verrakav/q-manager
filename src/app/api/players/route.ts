import dbConnect from "@/lib/db";
import PlayerModel from "@/models/PlayerModel";

export async function GET() {
  await dbConnect();
  const players = await PlayerModel.find({});
  console.log("PLAYERS");
  console.log(players);
  return new Response(JSON.stringify(players), {
    headers: {"Content-Type": "application/json"}
  });
}

export async function POST(req) {
  await dbConnect();

  // handles incoming JSON
  const {names, categories, phoneNumbers} = await req.json();

  // creates a new entry using the incoming data
  const newPayer = new PlayerModel({names, categories, phoneNumbers});

  // saves to db
  await newPayer.save();

  // Response - NextJS constructor that send data to from server to client
  return new Response(JSON.stringify(newPayer), {
    headers: {"Content-Type": "application/json"}
  });
}
