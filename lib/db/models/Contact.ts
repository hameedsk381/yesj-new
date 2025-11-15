import mongoose, { Schema, Document } from "mongoose"

export interface IContact extends Document {
  name: string
  email: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
)

ContactSchema.index({ email: 1 })
ContactSchema.index({ createdAt: -1 })
ContactSchema.index({ status: 1 })

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
