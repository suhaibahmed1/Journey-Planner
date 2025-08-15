"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Star, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  const router = useRouter();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (!isLoggedIn) {
  //     router.push("/login"); // Redirect if NOT logged in
  //   }
  // }, [router]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const featuredPackages = [
    {
      id: 1,
      title: "Hunza Valley Adventure",
      location: "Pakistan North",
      price: "PKR 35,000",
      duration: "5 Days",
      rating: 4.8,
      image: "/Hunza-Valley.jpeg",
      description:
        "Experience the breathtaking beauty of Hunza Valley with its stunning landscapes and rich culture.",
    },
    {
      id: 2,
      title: "Switzerland Alpine Tour",
      location: "Europe",
      price: "PKR 400,000",
      duration: "7 Days",
      rating: 4.9,
      image: "/Alpine.jpg",
      description:
        "Discover the majestic Swiss Alps with pristine lakes and charming mountain villages.",
    },
    {
      id: 3,
      title: "Umrah Package",
      location: "Saudi Arabia",
      price: "PKR 250,000",
      duration: "10 Days",
      rating: 4.7,
      image: "/Umrah.jpg",
      description:
        "Complete Umrah package with comfortable accommodation and guided spiritual journey.",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSlider />

      {/* Featured Packages Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Tour Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked destinations that offer unforgettable experiences and
              memories to last a lifetime
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredPackages.map((pkg) => (
              <motion.div key={pkg.id} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{pkg.rating}</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {pkg.title}
                      </CardTitle>
                      <span className="text-2xl font-bold text-teal-600">
                        {pkg.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {pkg.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {pkg.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed flex-grow">
                      {pkg.description}
                    </CardDescription>
                    <Link href={`/book?tour=${pkg.id}`}>
                      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-auto">
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Let us help you create the perfect travel experience tailored to
              your dreams and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                <Link href="/tours">View All Packages</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">3</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
