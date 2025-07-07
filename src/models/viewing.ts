import mongoose, { Schema } from "mongoose";

export interface ViewingAttributes {
  contactId: string;
  propertyId: string;
  agentId: string;
  datetime: Date;
  status: string;
  notes?: string;
}

const ViewingSchema = new Schema(
  {
    contactId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Contact",
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
    agentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Agent",
    },
    status: {
      type: String,
      require: true,
      enum: ["pending", "completed", "no-show"],
      default: "pending",
    },
    datetime: {
      type: Date,
      require: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);
ViewingSchema.index({ agentId: 1 });
type ViewingDocument = ViewingAttributes & Document;

const Viewing = mongoose.model<ViewingDocument>("Viewing", ViewingSchema);

export default Viewing;
