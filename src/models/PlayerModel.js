import mongoose from "mongoose";

export const playerSchema = new mongoose.Schema(
  //   FIXME: singular/plural
  {
    names: {type: String, required: true},
    categories: [{type: String, required: true}],
    phoneNumbers: [{type: String, required: true}],
    tournamentId: {
      // used to refer this field to tournament._id
      type: String,
      required: true
    }
  },
  {collection: "players"}
);

// makes sure we only create a new model if we don't already have it
const PlayerModel =
  mongoose.models.PlayerModel || mongoose.model("PlayerModel", playerSchema);

export default PlayerModel;
