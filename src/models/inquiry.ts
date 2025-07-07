import mongoose, { Schema } from "mongoose";

export interface InquiryAttributes {
  contactId: string;
  propertyId: string;
  agentId: string;
  message: string;
  notes?: string;
}

const InquirySchema = new Schema(
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
      ref: "Agent",
    },
    message: {
      type: String,
      require: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

InquirySchema.index({ agentId: 1 });
InquirySchema.index({ propertyId: 1 });

type InquiryDocument = InquiryAttributes & Document;

const Inquiry = mongoose.model<InquiryDocument>("Inquiry", InquirySchema);

export default Inquiry;
