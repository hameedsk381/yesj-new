"use client"

import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

export default function StepFour() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
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
