"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        // Reset form
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setErrors({});
      } else {
        toast({
          title: "Error Sending Message",
          description: result.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Network Error",
        description: "Unable to send message. Try again later.",
        variant: "destructive",
      });
    }
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              {"Have questions about our tours or need help planning your next adventure? We're here to help!"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {
                      "Ready to start your next adventure? Contact our travel experts who are passionate about creating unforgettable experiences tailored just for you."
                    }
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-teal-100 p-3 rounded-full">
                          <MapPin className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Office Address</h3>
                          <p className="text-gray-600">Plot #B-45, Block 5, Gulshan-e-Iqbal, Near Sir Syed University, Karachi, Pakistan</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-emerald-100 p-3 rounded-full">
                          <Phone className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Phone Numbers</h3>
                          <p className="text-gray-600">+92 300 1234567</p>
                          <p className="text-gray-600">+92 51 1234567</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Email Addresses</h3>
                          <p className="text-gray-600">info@journeyplannerpro.com</p>
                          <p className="text-gray-600">bookings@journeyplannerpro.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Business Hours</h3>
                          <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                          <p className="text-gray-600">Sunday: Closed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                  <CardDescription className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-semibold">
                        Subject *
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className={`${errors.subject ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="booking">Tour Booking</SelectItem>
                          <SelectItem value="custom">Custom Plan Request</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your travel plans or ask any questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                      />
                      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 text-lg font-semibold"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-lg text-gray-600">
              Located in the heart of Karachi, our office is easily accessible for in-person consultations
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-200 rounded-lg h-96 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center text-gray-600">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Interactive Map Coming Soon</p>
              <p className="text-sm">Plot #B-45, Block 5, Gulshan-e-Iqbal, Near Sir Syed University, Karachi, Pakistan</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
