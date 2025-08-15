"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Heart, Globe, Shield } from "lucide-react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description: "We believe travel transforms lives and creates lasting memories that enrich the soul.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your safety and satisfaction are our top priorities in every journey we plan.",
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "From local hidden gems to international destinations, we know the world inside out.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Every traveler is unique, and we craft experiences tailored to your dreams and preferences.",
  },
]

const team = [
  {
    name: "Suhaib Ahmed",
    role: "Founder & CEO",
    image: "/teammem.jpg",
    description: "5+ years in travel industry with expertise in Pakistan tourism",
  },
  {
    name: "Muhammad Shayan",
    role: "International Tours Director",
    image: "/teammem.jpg",
    description: "Specialist in European and Middle Eastern destinations",
  },
  {
    name: "Huzaifa Sabeeh",
    role: "Adventure Tours Manager",
    image: "/teammem.jpg",
    description: "Expert mountaineer and trekking guide for Northern Pakistan",
  },
    {
    name: "Muhammad Ezaan",
    role: "Travel Consultant",
    image: "/teammem.jpg",
    description: "Helps travelers with destination advice, package details, and personalized support.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Journey Planner</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Your trusted partner in creating unforgettable travel experiences across Pakistan and around the world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2022, Journey Planner began with a simple mission: to showcase the incredible beauty of
                  Pakistan while connecting travelers to amazing destinations worldwide.
                </p>
                <p>
                  What started as a passion project by a group of travel enthusiasts has grown into a trusted travel
                  company that has helped over 500 travelers create memories that last a lifetime.
                </p>
                <p>
                  We specialize in both domestic tours across Pakistan's stunning northern regions and international
                  packages including spiritual journeys, European adventures, and Southeast Asian explorations.
                </p>
                <p>
                  Our team of experienced travel professionals is dedicated to providing personalized service, ensuring
                  every journey is perfectly tailored to your dreams and preferences.
                </p>
              </div>
            </motion.div>
            <motion.div
            >
              <Image
                src="/About-Img.png"
                alt="Journey Planner team"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-8 w-8 text-teal-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To provide exceptional travel experiences that connect people with the beauty, culture, and
                    adventure that our world has to offer. We strive to make travel accessible, safe, and memorable for
                    every traveler.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-8 w-8 text-emerald-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To become the leading travel company in Pakistan, known for our commitment to quality, innovation,
                    and customer satisfaction. We envision a world where travel brings people together and creates
                    lasting positive impact.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </motion.div>

<motion.div
  className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
  variants={staggerContainer}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true }}
>
  {values.map((value, index) => (
    <div key={index} className="flex justify-center">
      <Card className="text-center h-full shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-center mb-4">
            <value.icon className="h-12 w-12 text-teal-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
          <p className="text-gray-600 leading-relaxed">{value.description}</p>
        </CardContent>
      </Card>
    </div>
  ))}
</motion.div>

        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate travel experts dedicated to making your journey extraordinary
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex flex-col h-full items-center">
  <Card className="flex flex-col justify-between text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 h-full w-full max-w-xs">
    <CardContent className="p-6 flex flex-col justify-between h-full items-center text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {member.role}
                    </Badge>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-teal-100">Destinations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-teal-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-teal-100">Satisfaction Rate</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
