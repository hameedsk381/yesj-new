import mongoose, { Schema, Document } from "mongoose"

export interface IRegistration extends Document {
  applicationType: "membership" | "leadership"
  name: string
  gender: string
  registrationNo: string
  course: string
  age: number
  instagramId?: string
  mobileNo: string
  whatsappNo: string
  emailId: string
  religion: "catholic" | "christian" | "other"
  address: string
  skills?: string[]
  otherSkills?: string
  eventExperience?: string
  justSocietyDefinition?: string
  communicationExample?: string
  aicufVision?: string
  leadershipPosition?: string
  declaration: boolean
  additionalMessage?: string
  registrationId: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    applicationType: {
      type: String,
      required: true,
      enum: ["membership", "leadership"],
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    registrationNo: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    instagramId: String,
    mobileNo: {
      type: String,
      required: true,
    },
    whatsappNo: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
    },
    religion: {
      type: String,
      required: true,
      enum: ["catholic", "christian", "other"],
    },
    address: {
      type: String,
      required: true,
    },
    skills: [String],
    otherSkills: String,
    eventExperience: String,
    justSocietyDefinition: String,
    communicationExample: String,
    aicufVision: String,
    leadershipPosition: String,
    declaration: {
      type: Boolean,
      required: true,
    },
    additionalMessage: String,
    registrationId: {
      type: String,
      required: true,
      unique: true,
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

RegistrationSchema.index({ emailId: 1 })
RegistrationSchema.index({ registrationId: 1 })
RegistrationSchema.index({ createdAt: -1 })

export default mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema)
