"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Trip {
  id: number
  title: string
  location: string
  price: string
  duration: string
  groupSize: string
  rating: number
  image: string
  description: string
  highlights: string[]
  category?: "pakistan" | "international"
}

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

export default function ToursPage() {
  const [pakistanTours, setPakistanTours] = useState<Trip[]>([])
  const [internationalTours, setInternationalTours] = useState<Trip[]>([])

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("http://localhost:5000/api/trips");
        const data = await res.json()
        setPakistanTours(data.filter((trip: Trip) => trip.category === "pakistan"));
        setInternationalTours(data.filter((trip: Trip) => trip.category === "international"))
      } catch (error) {
        console.error(error)
      }
    }
    fetchTrips()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Tour Packages</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Explore our carefully curated tour packages for unforgettable adventures in Pakistan and around the world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pakistan North Tours */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pakistan North Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the breathtaking beauty of Northern Pakistan with our expertly designed tour packages
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {pakistanTours.map((tour: Trip) => (
              <motion.div key={tour.id} variants={fadeInUp}>
                <Card className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{tour.rating}</span>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-teal-600">Pakistan North</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between gap-4 mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 max-w-[70%] leading-snug">{tour.title}</CardTitle>
                      <span className="text-2xl font-bold text-emerald-600 text-right whitespace-nowrap">{tour.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      {tour.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {tour.groupSize}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <div className="flex flex-col flex-1">
                      <CardDescription className="text-gray-600 mb-4 leading-relaxed">{tour.description}</CardDescription>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tour.highlights.map((highlight: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <Link href={`/book?tour=${tour.id}`}><Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Book Now</Button></Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* International Tours */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">International Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the world with our international tour packages including Umrah, Hajj, Europe, and Southeast Asia
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {internationalTours.map((tour: Trip) => (
              <motion.div key={tour.id} variants={fadeInUp}>
                <Card className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{tour.rating}</span>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-emerald-600">International</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between gap-4 mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 max-w-[70%] leading-snug">{tour.title}</CardTitle>
                      <span className="text-2xl font-bold text-emerald-600 text-right whitespace-nowrap">{tour.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      {tour.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {tour.groupSize}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <div className="flex flex-col flex-1">
                      <CardDescription className="text-gray-600 mb-4 leading-relaxed">{tour.description}</CardDescription>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {tour.highlights.map((highlight: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <Link href={`/book?tour=${tour.id}`}><Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Book Now</Button></Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
