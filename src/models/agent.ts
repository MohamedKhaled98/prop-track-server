import mongoose, { Schema } from "mongoose";

export interface ContactOption {
  type: string;
  value?: string;
  link?: string;
}

export interface AgentAttributes {
  fullName: string;
  email: string;
  image?: string;
  contactOptions: ContactOption[];
}

const ContactOptionSchema = new Schema<ContactOption>(
  {
    type: {
      type: String,
      required: true,
      enum: ["email", "phone", "whatsapp"],
    },
    value: { type: String },
    link: { type: String },
  },
  { _id: false }
);

type AgentDoc = AgentAttributes & Document;

const AgentSchema = new Schema<AgentDoc>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: { type: String },
    contactOptions: [ContactOptionSchema],
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v;
      },
    },
  }
);

export const Agent = mongoose.model<AgentDoc>("Agent", AgentSchema);
