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
        <h3 className="text-2xl font-light text-primary mb-6">OUR JOURNEY OF EMPOWERING YOUTH</h3>

        <h4 className="text-xl font-light text-primary mb-4">BEGINNING OUR MISSION</h4>

        <p className="text-muted-foreground font-extralight mb-4">
          In the story of modern India's youth empowerment movements, the journey of Youth Empowering Service Jesuits (YESJ) 
          stands as a testament to the power of young people guided by values and purpose. Founded in a time when India was 
          experiencing rapid social and economic changes, YESJ emerged as a bridge between education and real-world impact.
        </p>

        <p className="text-muted-foreground font-extralight mb-4">
          The history of YESJ reflects the changing needs of Indian society, from the initial focus on educational support 
          and skill development in the early years, through the growing awareness of social justice and community service 
          in the 2010s, to the comprehensive approach of holistic youth development in the 2020s. This journey has been marked 
          by continuous innovation and adaptation to meet the evolving challenges faced by young people.
        </p>

        <p className="text-muted-foreground font-extralight mb-4">
          What makes YESJ particularly significant is how it embodies the evolution of youth development in India. The movement 
          began with traditional educational support approaches but gradually embraced a more comprehensive understanding of 
          youth empowerment that called for engagement with real-world challenges, particularly those affecting marginalized 
          communities. This transition from education to empowerment would eventually culminate in what we call "Transforming 
          Lives, Building Futures" that challenges not only societal barriers but also creates opportunities for every young 
          person to thrive.
        </p>

        <p className="text-muted-foreground font-extralight">
          YESJ developed within the unique socio-cultural and economic context of the Telugu states. As regions experiencing 
          rapid urbanization while still maintaining strong rural communities, Andhra Pradesh and Telangana present both 
          challenges and opportunities for youth development. The history of YESJ in these regions reflects the broader 
          national aspirations of empowering young people while addressing local concerns and challenges.
        </p>
      </motion.div>
    </div>
  )
}
