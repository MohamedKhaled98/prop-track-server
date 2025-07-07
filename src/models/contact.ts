import { Schema, model, Document } from "mongoose";

export interface ContactAttributes {
  fullName: string;
  email: string;
  interestedProperties: string[];
  assignedAgentId?: string;
}

type ContactDoc = ContactAttributes & Document;

const ContactSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    interestedProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    assignedAgentId: { type: Schema.Types.ObjectId, ref: "Agent" },
  },
  {
    timestamps: true,
  }
);
ContactSchema.index({ email: 1 });
const Contact = model<ContactDoc>("Contact", ContactSchema);

export default Contact;
