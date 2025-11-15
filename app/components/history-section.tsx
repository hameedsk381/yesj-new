"use client"

import { motion } from "framer-motion"

export function HistorySection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="prose prose-lg max-w-none"
      >
        <h3 className="text-2xl font-light text-maroon mb-6">HISTORY OF ANDHRA-TELANGANA AICUF</h3>

        <h4 className="text-xl font-light text-primary mb-4">INTRODUCTION</h4>

        <p className="text-muted-foreground font-extralight mb-4">
          In the story of post-independence India's social movements, the journey of the All India Catholic University
          Federation (AICUF) in Andhra Pradesh stands as a testament to the power of student activism guided by faith
          and justice. Born in a time when India was still finding its national identity and the Catholic Church was
          beginning to engage more deeply with social realities, AICUF in Andhra Pradesh emerged as a bridge between
          spiritual formation and social transformation.
        </p>

        <p className="text-muted-foreground font-extralight mb-4">
          The history of AICUF in Andhra Pradesh reflects the changing tides of Indian society, from the initial focus
          on faith formation and spiritual development in the late 1950s and early 1960s, through the growing social
          consciousness of the 1970s, to the radical embrace of Dalit liberation in the 1980s. This journey was not
          without its storms and challenges, including a period of ban and reinvention in the 1990s, followed by revival
          and renewal in the new millennium.
        </p>

        <p className="text-muted-foreground font-extralight mb-4">
          What makes the Andhra Pradesh chapter particularly significant is how it embodied the evolution of Catholic
          social consciousness in India. The movement began with traditional Catholic Action approaches but gradually
          embraced a more radical understanding of the Gospel that called for solidarity with the oppressed,
          particularly the Dalits, who form a significant portion of the Christian population in Andhra Pradesh. This
          transition from piety to prophetic witness would eventually culminate in what one observer called "The Brewing
          of a Dalit Storm" that would challenge not only societal injustices but also the Church's own complicity in
          caste discrimination.
        </p>

        <p className="text-muted-foreground font-extralight">
          The AICUF in Andhra Pradesh developed within the unique socio-cultural and religious context of the region. As
          a predominantly Hindu state with a small but vibrant Christian minority, Andhra Pradesh presented both
          challenges and opportunities for a Catholic student movement. The history of AICUF in this region reflects the
          broader national aspirations of Catholic youth while addressing local concerns and challenges.
        </p>
      </motion.div>
    </div>
  )
}
