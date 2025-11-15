import mongoose, { Schema, Document } from "mongoose"

export interface INomination extends Document {
  name: string
  unitName: string
  contestingFor:
    | "President"
    | "Vice President"
    | "Secretary"
    | "Joint Secretary"
    | "Treasurer"
    | "Social Media Coordinator"
    | "Event Coordinator"
  nocFilePath: string
  nocFileName: string
  educationQualification: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

const NominationSchema = new Schema<INomination>(
  {
    name: {
      type: String,
      required: true,
    },
    unitName: {
      type: String,
      required: true,
    },
    contestingFor: {
      type: String,
      required: true,
      enum: [
        "President",
        "Vice President",
        "Secretary",
        "Joint Secretary",
        "Treasurer",
        "Social Media Coordinator",
        "Event Coordinator",
      ],
    },
    nocFilePath: {
      type: String,
      required: true,
    },
    nocFileName: {
      type: String,
      required: true,
    },
    educationQualification: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

NominationSchema.index({ name: 1 })
NominationSchema.index({ unitName: 1 })
NominationSchema.index({ contestingFor: 1 })
NominationSchema.index({ createdAt: -1 })

export default mongoose.models.Nomination ||
  mongoose.model<INomination>("Nomination", NominationSchema)
