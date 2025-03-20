import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId
import tournamentsData from "./tournamentsData.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Look for .env.local in the root directory
const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../../.env.production") // Go two levels up for root
    : path.resolve(__dirname, "../../.env.local");

dotenv.config({ path: envPath });

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is undefined in TournamentSeeding! Check your .env file.");
}
async function seedTournaments() {
  console.log("TOURNAMENTS RAN");

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log("Connected to db");

    const db = client.db("qManager");
    const tournamentCollection = db.collection("tournaments");

    // Ensure each queue gets an ObjectId before insertion
    const modifiedTournamentsData = tournamentsData.map((tournament) => ({
      ...tournament,
      queues: tournament.queues.map((queue) => ({
        ...queue,
        _id: new ObjectId(), // Assign MongoDB ObjectId to each queue
      })),
    }));

    // Insert tournaments and capture inserted documents
    const result = await tournamentCollection.insertMany(modifiedTournamentsData);
    console.log("Tournaments inserted:", result.insertedIds);
    return result.insertedIds; // Returns an object mapping array index to _id
  } finally {
    await client.close();
  }
}

seedTournaments().then(console.log).catch(console.error);

// import {MongoClient} from "mongodb";
// import tournamentsData from "./tournamentsData.js";
// import dotenv from "dotenv";

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;

// async function seedTournaments() {
//   console.log("TOURNAMENTS RAN");

//   const client = new MongoClient(MONGO_URI);
//   console.log(client);

//   try {
//     await client.connect();

//     console.log("connected to db");

//     const db = client.db("qManager");
//     const tournamentCollection = db.collection("tournaments");

//     // Insert tournaments and capture inserted documents
//     const result = await tournamentCollection.insertMany(tournamentsData);
//     console.log("Tournaments inserted:", result.insertedIds);
//     return result.insertedIds; // Returns an object mapping array index to _id
//   } finally {
//     await client.close();
//   }
// }

// seedTournaments().then(console.log).catch(console.error);
