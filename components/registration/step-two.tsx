"use client"

import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const skills = [
  { id: "singing", label: "Singing" },
  { id: "dance", label: "Dance" },
  { id: "painting", label: "Painting" },
  { id: "acting", label: "Acting" },
  { id: "writing", label: "Writing" },
  { id: "photography", label: "Photography" },
  { id: "editing", label: "Editing" },
  { id: "videography", label: "Videography" },
  { id: "designing", label: "Designing" },
  { id: "decoration", label: "Decoration" },
  { id: "organizing", label: "Organizing" },
  { id: "accounting", label: "Accounting" },
  { id: "fundraising", label: "Fundraising" },
  { id: "cooking", label: "Cooking" },
  { id: "publicSpeaking", label: "Public Speaking" },
  { id: "comedy", label: "Comedy" },
]

export default function StepTwo() {
  const { control, register, watch, setValue } = useFormContext()
  const selectedSkills = watch("skills") || []

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setValue(
        "skills",
        selectedSkills.filter((s: string) => s !== skill),
        { shouldValidate: true },
      )
    } else {
      setValue("skills", [...selectedSkills, skill], { shouldValidate: true })
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-light text-primary mb-4">Help us know you better</h3>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">I'm good at</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-2">
                <Checkbox
                  id={skill.id}
                  checked={selectedSkills.includes(skill.id)}
                  onCheckedChange={() => toggleSkill(skill.id)}
                />
                <Label htmlFor={skill.id} className="text-sm">
                  {skill.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <FormField
          control={control}
          name="otherSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Any other skills</FormLabel>
              <FormControl>
                <Input placeholder="Enter any other skills you have" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={control}
          name="eventExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you organized/involved in any Departmental/Cultural events so far? If yes, please provide details.
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your experience with organizing or participating in events"
                  className="resize-none min-h-[120px]"
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
