
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearchParams } from 'next/navigation'

const pakistanTours = [
  { id: 1, name: 'Hunza Valley Explorer' },
  { id: 2, name: 'Skardu Adventure' },
  { id: 3, name: 'Naran Kaghan Valley' },
  { id: 4, name: 'Swat Valley Paradise' },
  { id: 5, name: 'Fairy Meadows Trek' },
  { id: 6, name: 'Neelum Valley Getaway' },
]

const internationalTours = [
  { id: 7, name: 'Umrah Package Premium' },
  { id: 8, name: 'Hajj Package Deluxe' },
  { id: 9, name: 'Switzerland Alpine Tour' },
  { id: 10, name: 'Italy Cultural Experience' },
  { id: 11, name: 'Malaysia Singapore Delight' },
  { id: 12, name: 'Vietnam Adventure' },
]

export default function BookPage() {
  const [category, setCategory] = useState<'' | 'pak' | 'intl'>('')
  const [selectedTour, setSelectedTour] = useState<string>('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const params = useSearchParams()

  useEffect(() => {
    const tourId = params.get('tour')
    if (tourId) {
      const found = [...pakistanTours, ...internationalTours].find(t => t.id.toString() === tourId)
      if (found) {
        setSelectedTour(found.name)
        setCategory(pakistanTours.some(t => t.id.toString() === tourId) ? 'pak' : 'intl')
      }
    }
  }, [params])

  const validate = () => {
    const errs: { [key: string]: string } = {}
    const phoneRegex = /^\+\d{10,15}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!emailRegex.test(email)) errs.email = 'Invalid email format'

    if (!phone.trim()) errs.phone = 'Phone number is required'
    else if (!phoneRegex.test(phone)) errs.phone = 'Use international format (e.g., +923001234567)'

    if (!category) errs.category = 'Category is required'
    if (!selectedTour) errs.tour = 'Please select a tour'

    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formErrors = validate();
  setErrors(formErrors);

  if (Object.keys(formErrors).length === 0) {
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, category, selectedTour }),
      });
      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        console.log(data);
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting booking. Try again later!');
    }
  }
};
  const filteredTours = category === 'pak' ? pakistanTours : category === 'intl' ? internationalTours : []

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Book a Tour</h1>
      {submitted && <p className="text-green-600">✅ Booking submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Select Category</Label>
          <Select value={category} onValueChange={(value: 'pak' | 'intl') => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Pakistan or International" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pak">Pakistan</SelectItem>
              <SelectItem value="intl">International</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {category && (
          <div>
            <Label>Select Tour</Label>
            <Select value={selectedTour} onValueChange={setSelectedTour}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a tour" />
              </SelectTrigger>
              <SelectContent>
                {filteredTours.map(tour => (
                  <SelectItem key={tour.id} value={tour.name}>
                    {tour.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tour && <p className="text-red-500 text-sm mt-1">{errors.tour}</p>}
          </div>
        )}

        <div>
          <Label>Your Name</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label>Email</Label>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+923001234567" />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
          Confirm Booking
        </Button>
      </form>
    </div>
  )
}

