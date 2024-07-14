import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: "User",
    },
    message: [ 
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);


const ConversationModel = mongoose.model("conversation", ConversationSchema);

export default ConversationModel;
