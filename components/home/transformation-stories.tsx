"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TransformationStories() {
  const stories = [
    {
      id: 1,
      name: "Lakshmi, 22",
      story: "\"I couldn't speak a single English sentence. My village laughed when I said I'd study in a English Medium College. Summer Shapes didn't just teach me English. It taught me to believe I deserve success. Today, I'm a proud graduate, supporting my entire family.\"",
      image: "/images/lakshmi.jpg",
    },
    {
      id: 2,
      name: "Ravi Kumar, 35",
      story: "\"I dropped out after Class 10. Everyone said I'd be a daily wage labourer forever. YESJ's Driving program changed everything. Now I earn ₹25,000/month at the Maruti Toyota company. I'm building my family's first pucca house.\"",
      image: "/images/ravi.jpg",
    },
    {
      id: 3,
      name: "Sweatha, 22",
      story: "\"I'm from a broken family. Graduation was an impossible dream until SSP said YES. I'm now working in a media Company. YESJ didn't just fund my education, they believed in me when no one else did.\"",
      image: "/images/sweatha.jpg",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary mb-4">Transformation Stories</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border border-primary/10 p-6 transition-all hover:shadow-lg"
            >
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-light mb-2 text-primary">{story.name}</h3>
              <p className="text-muted-foreground font-extralight italic mb-4">"{story.story}"</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/stories">
            <Button variant="outline" className="rounded-none border-primary hover:bg-blue-50 text-primary">
              Read More Success Stories
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}