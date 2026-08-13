"use client"

import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import StepOne from "./step-one"
import StepTwo from "./step-two"
import StepThree from "./step-three"
import StepFour from "./step-four"
import SuccessMessage from "./success-message"
import { useFormPersistence, getSavedFormData } from "@/hooks/use-form-persistence"
import { FORM_CONSTANTS } from "@/lib/constants"

// Define the form schema
const formSchema = z.object({
  applicationType: z.enum(["membership", "leadership"], {
    message: "Please select an application type",
  }),

  name: z.string().min(FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH, {
    message: `Name must be at least ${FORM_CONSTANTS.VALIDATION.MIN_NAME_LENGTH} characters`
  }),
  gender: z.string().min(1, { message: "Please select your gender" }),
  registrationNo: z.string().min(1, { message: "Registration number is required" }),
  course: z.string().min(1, { message: "Course is required" }),
  age: z.string().min(1, { message: "Age is required" }).refine((val) => {
    const num = parseInt(val)
    return num >= FORM_CONSTANTS.VALIDATION.MIN_AGE && num <= FORM_CONSTANTS.VALIDATION.MAX_AGE
  }, { message: `Age must be between ${FORM_CONSTANTS.VALIDATION.MIN_AGE} and ${FORM_CONSTANTS.VALIDATION.MAX_AGE}` }),
  instagramId: z.string().optional(),
  mobileNo: z.string()
    .min(FORM_CONSTANTS.VALIDATION.MIN_PHONE_LENGTH, {
      message: `Mobile number must be at least ${FORM_CONSTANTS.VALIDATION.MIN_PHONE_LENGTH} digits`
    })
    .regex(/^[0-9]{10,15}$/, { message: "Please enter a valid mobile number (digits only)" }),
  whatsappNo: z.string()
    .min(FORM_CONSTANTS.VALIDATION.MIN_PHONE_LENGTH, {
      message: `WhatsApp number must be at least ${FORM_CONSTANTS.VALIDATION.MIN_PHONE_LENGTH} digits`
    })
    .regex(/^[0-9]{10,15}$/, { message: "Please enter a valid WhatsApp number (digits only)" }),
  emailId: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  }),
  confirmPassword: z.string().min(1, {
    message: "Please confirm your password"
  }),
  religion: z.enum(["catholic", "christian", "other"], {
    message: "Please select your religion",
  }),
  address: z.string().min(FORM_CONSTANTS.VALIDATION.MIN_ADDRESS_LENGTH, {
    message: `Address must be at least ${FORM_CONSTANTS.VALIDATION.MIN_ADDRESS_LENGTH} characters`
  }),

  // Skills
  skills: z.array(z.string()).optional(),
  otherSkills: z.string().optional(),

  // Experience
  eventExperience: z.string().optional(),

  // Leadership questions (conditional)
  justSocietyDefinition: z.string().optional(),
  communicationExample: z.string().optional(),
  aicufVision: z.string().optional(),

  // Leadership position (conditional)
  leadershipPosition: z.string().optional(),

  declaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the declaration to proceed with your application",
  }),

  // Additional message
  additionalMessage: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showRestorePrompt, setShowRestorePrompt] = useState(false)

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationType: "membership",
      skills: [],
      declaration: false,
    },
    mode: "onChange",
  })

  const { handleSubmit, watch, trigger, reset } = methods
  const applicationType = watch("applicationType")
  const formData = watch()

  const totalSteps = applicationType === "leadership" ? 4 : 3

  useEffect(() => {
    const savedData = getSavedFormData<FormValues>(FORM_CONSTANTS.STORAGE_KEYS.REGISTRATION_DRAFT)
    if (savedData && !isSubmitted) {
      setShowRestorePrompt(true)
    }
  }, [isSubmitted])

  const { clearSavedData } = useFormPersistence(
    FORM_CONSTANTS.STORAGE_KEYS.REGISTRATION_DRAFT,
    formData,
    !isSubmitted
  )

  const restoreDraft = () => {
    const savedData = getSavedFormData<FormValues>(FORM_CONSTANTS.STORAGE_KEYS.REGISTRATION_DRAFT)
    if (savedData) {
      reset(savedData)
      setShowRestorePrompt(false)
    }
  }

  const discardDraft = () => {
    clearSavedData()
    setShowRestorePrompt(false)
  }

  const goToNextStep = async () => {
    let fieldsToValidate: string[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "applicationType",
          "name",
          "gender",
          "registrationNo",
          "course",
          "age",
          "mobileNo",
          "whatsappNo",
          "emailId",
          "password",
          "confirmPassword",
          "religion",
          "address",
        ]
        break
      case 2:
        fieldsToValidate = [] // Skills are optional
        break
      case 3:
        if (applicationType === "leadership") {
          fieldsToValidate = ["justSocietyDefinition", "communicationExample", "aicufVision"]
        } else {
          fieldsToValidate = ["declaration"]
        }
        break
      case 4:
        fieldsToValidate = ["leadershipPosition", "declaration"]
        break
    }

    const isValid = await trigger(fieldsToValidate as any)

    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
      }
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Payload uses camelCase keys matching the Drizzle schema (registrations table)
      const payload = {
        applicationType: data.applicationType,
        name: data.name,
        gender: data.gender,
        registrationNo: data.registrationNo,
        course: data.course,
        age: parseInt(data.age),
        instagramId: data.instagramId,
        mobileNo: data.mobileNo,
        whatsappNo: data.whatsappNo,
        emailId: data.emailId,
        religion: data.religion,
        address: data.address,
        skills: data.skills,
        otherSkills: data.otherSkills,
        eventExperience: data.eventExperience,
        justSocietyDefinition: data.justSocietyDefinition,
        communicationExample: data.communicationExample,
        aicufVision: data.aicufVision,
        leadershipPosition: data.leadershipPosition,
        declaration: data.declaration,
        additionalMessage: data.additionalMessage,
        password: data.password
      }

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.detail || "Failed to submit registration")
      }

      console.log("Registration successful:", result)
      clearSavedData()

      // Passkey registration is a demo-only stub (hardcoded mock users) and does not
      // persist credentials, so skip the prompt and show the success screen directly.
      setIsSubmitted(true)
    } catch (error) {
      console.error("Registration error:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to submit registration. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  // Show final success message
  if (isSubmitted) {
    return <SuccessMessage />
  }

  return (
    <FormProvider {...methods}>
      {showRestorePrompt && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded">
          <p className="text-sm text-primary mb-3">
            We found a saved draft of your registration. Would you like to continue where you left off?
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={restoreDraft}
              className="rounded-md bg-primary hover:bg-primary/90 text-white text-sm"
            >
              Restore Draft
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={discardDraft}
              className="rounded-md border-primary text-primary text-sm"
            >
              Start Fresh
            </Button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light text-primary">
            Application for {applicationType === "membership" ? "Membership" : "Leadership"}
          </h2>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-md ${currentStep >= index + 1 ? "bg-primary" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && <StepOne />}
            {currentStep === 2 && <StepTwo />}
            {currentStep === 3 && (applicationType === "leadership" ? <StepThree /> : <StepFour />)}
            {currentStep === 4 && <StepFour />}
          </motion.div>
        </AnimatePresence>

        {submitError && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded">
            <p className="text-sm">{submitError}</p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={isSubmitting}
              className="rounded-md border-primary hover:bg-primary/5 text-primary"
            >
              Previous
            </Button>
          )}

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={goToNextStep}
              disabled={isSubmitting}
              className="ml-auto rounded-md bg-primary hover:bg-primary/90 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto rounded-md bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
