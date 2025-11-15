"use client"

import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const leadershipPositions = [
  { id: "president", label: "President" },
  { id: "vicePresident", label: "Vice President" },
  { id: "procurator", label: "Procurator" },
  { id: "volunteerCoordinator", label: "Volunteer Coordinator" },
  { id: "culturalCoordinator", label: "Cultural Coordinator" },
  { id: "communicationCoordinator", label: "Communication Coordinator" },
  { id: "socialMediaCoordinator", label: "Social Media Coordinator" },
  { id: "secretary", label: "Secretary" },
  { id: "deputySecretary", label: "Deputy Secretary" },
  { id: "eventCoordinator", label: "Event Coordinator" },
  { id: "dalitCommissionLead", label: "Dalit Commission Lead" },
  { id: "womenCommissionCoordinator", label: "Women Commission Coordinator" },
]

export default function StepFour() {
  const { control, watch } = useFormContext()
  const applicationType = watch("applicationType")

  return (
    <div className="space-y-6">
      {applicationType === "leadership" && (
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-light text-primary mb-4">Leadership Position</h3>
          <p className="text-sm text-muted-foreground mb-6">Please select the position you are contesting for.</p>

          <FormField
            control={control}
            name="leadershipPosition"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Contesting For:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    {leadershipPositions.map((position) => (
                      <div key={position.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={position.id} id={position.id} />
                        <Label htmlFor={position.id}>{position.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-light text-primary mb-4">Declaration</h3>

        <FormField
          control={control}
          name="declaration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I hereby declare that all the details furnished above are true and shall hereby adhere to the further
                  process.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="additionalMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Any message you want to convey?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share any additional information or message"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
