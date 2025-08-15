'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, MapPin, Users, DollarSign, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

function getDurationText(start: Date, end: Date): string {
  const diffTime = end.getTime() - start.getTime()
  if (diffTime <= 0) return 'Invalid date range'
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const months = Math.floor(diffDays / 30)
  const days = diffDays % 30
  if (months > 0 && days > 0) return `${months} month${months > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''}`
  if (months > 0) return `${months} month${months > 1 ? 's' : ''}`
  return `${days} day${days > 1 ? 's' : ''}`
}

export default function PlanPage() {
  const [formData, setFormData] = useState({
    destination: '',
    budget: [100000],
    travelers: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    accommodation: '',
    activities: '',
    specialRequests: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', '/plan')
      router.push('/login')
    }
  }, [router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    }
    if (!formData.travelers) {
      newErrors.travelers = 'Number of travelers is required'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        const result = await response.json()
        if (response.ok) {
          toast({
            title: 'Plan Submitted Successfully!',
            description: "We'll contact you within 24 hours with a customized itinerary.",
          })
        } else {
          toast({
            title: 'Error submitting the plan',
            description: result.error || 'Something went wrong. Try again.',
            variant: 'destructive',
          })
        }
      } catch (error) {
        toast({
          title: 'Network error',
          description: 'Unable to submit the plan. Try again later.',
          variant: 'destructive',
        })
      }
    } else {
      toast({
        title: 'Please fill in all required fields',
        description: 'Check the form for any missing information.',
        variant: 'destructive',
      })
    }
  }

   return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Make Your Own Plan</h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Create a personalized travel experience tailored to your preferences, budget, and schedule
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Plan Your Dream Trip</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Fill out the form below and our travel experts will create a customized itinerary just for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Destination */}
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-teal-600" />
                      Destination *
                    </Label>
                    <Input
                      id="destination"
                      placeholder="Where would you like to go? (e.g., Hunza Valley, Switzerland, Malaysia)"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className={`text-lg py-3 ${errors.destination ? "border-red-500" : ""}`}
                    />
                    {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
                  </div>

                  {/* Budget */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-teal-600" />
                      Budget Range (PKR)
                    </Label>
                    <div className="px-4">
                      <Slider
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        max={1000000}
                        min={20000}
                        step={10000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>PKR 20,000</span>
                        <span className="font-semibold text-teal-600">PKR {formData.budget[0].toLocaleString()}</span>
                        <span>PKR 1,000,000+</span>
                      </div>
                    </div>
                  </div>

                  {/* Number of Travelers */}
                  <div className="space-y-2">
                    <Label htmlFor="travelers" className="text-lg font-semibold flex items-center gap-2">
                      <Users className="h-5 w-5 text-teal-600" />
                      Number of Travelers *
                    </Label>
                    <Select
                      value={formData.travelers}
                      onValueChange={(value) => setFormData({ ...formData, travelers: value })}
                    >
                      <SelectTrigger className={`text-lg py-3 ${errors.travelers ? "border-red-500" : ""}`} >
                        <SelectValue placeholder="Select number of travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3-4">3-4 People</SelectItem>
                        <SelectItem value="5-8">5-8 People</SelectItem>
                        <SelectItem value="9+">9+ People</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.travelers && <p className="text-red-500 text-sm">{errors.travelers}</p>}
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-teal-600" />
                        Preferred Start Date *
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal py-3 text-lg ${!formData.startDate ? "text-muted-foreground" : ""} ${errors.startDate ? "border-red-500" : ""}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => setFormData({ ...formData, startDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-teal-600" />
                        Preferred End Date
                        {formData.startDate && formData.endDate && (
                          <div className="text-md text-teal-700 font-medium">
                            Trip Duration: {getDurationText(formData.startDate, formData.endDate)}
                          </div>
                        )}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal py-3 text-lg ${!formData.endDate ? "text-muted-foreground" : ""}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => setFormData({ ...formData, endDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {formData.startDate && formData.endDate && (
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-teal-600" />
                        Trip Duration
                      </Label>
                      <p className="text-lg text-gray-700 px-2 py-2 border rounded-md bg-gray-100">
                        {getDurationText(formData.startDate, formData.endDate)}
                      </p>
                    </div>
                  )}

                  {/* Accommodation Preference */}
                  <div className="space-y-2">
                    <Label htmlFor="accommodation" className="text-lg font-semibold">
                      Accommodation Preference
                    </Label>
                    <Select
                      value={formData.accommodation}
                      onValueChange={(value) => setFormData({ ...formData, accommodation: value })}
                    >
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select accommodation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget Hotels/Hostels</SelectItem>
                        <SelectItem value="mid-range">Mid-range Hotels</SelectItem>
                        <SelectItem value="luxury">Luxury Hotels/Resorts</SelectItem>
                        <SelectItem value="mixed">Mix of different types</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Activities */}
                  <div className="space-y-2">
                    <Label htmlFor="activities" className="text-lg font-semibold">
                      Preferred Activities
                    </Label>
                    <Textarea
                      id="activities"
                      placeholder="What activities interest you? (e.g., hiking, cultural tours, adventure sports, photography, relaxation)"
                      value={formData.activities}
                      onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                      className="text-lg min-h-[100px]"
                    />
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="specialRequests" className="text-lg font-semibold">
                      Special Requests or Requirements
                    </Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requirements, dietary restrictions, accessibility needs, or specific requests?"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="text-lg min-h-[100px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div className="pt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-4 text-lg font-semibold"
                    >
                      Submit My Custom Plan Request
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
