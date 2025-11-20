"use client"

import { useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

export default function StepThree() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-light text-primary mb-4">Leadership Questions</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please answer the following questions to help us understand your vision and approach to leadership.
        </p>

        <FormField
          control={control}
          name="justSocietyDefinition"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>What is your definition of a just/equal society?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts on what constitutes a just and equal society"
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="communicationExample"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>
                Communication is vital when coordinating events. How would you handle miscommunication or
                misunderstandings within the organizing team? Can you provide an example from your past experiences?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your approach to handling communication challenges"
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="yesjVision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Where do you see the YESJ a year from now? What role do you envision yourself playing in achieving that
                vision?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your vision for YESJ and your role in it"
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
