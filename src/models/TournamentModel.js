import mongoose from "mongoose";

// import {queueSchema} from "./QueueModel.js";
const tournamentSchema = new mongoose.Schema(
  {
    // _id: String,
    name: {type: String, required: true},
    categories: [{type: String, required: true}],
    adminUser: String,
    image: {type: String},
    description: {type: String},
    queues: {
      queueName: String,
      queueItems: [{type: mongoose.Schema.Types.ObjectId, ref: "PlayerModel"}]
    },
    players: [{type: mongoose.Schema.Types.ObjectId, ref: "PlayerModel"}]
    // queues: [{type: mongoose.Schema.Types.ObjectId, ref: "QueueModel"}]
  },
  {collection: "tournaments"}
);

const TournamentModel =
  mongoose.models.TournamentModel ||
  mongoose.model("TournamentModel", tournamentSchema);

export default TournamentModel;
