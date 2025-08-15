"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const { confirmPassword, agreeToTerms, ...dataToSend } = formData;

    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      toast({
        title: 'Account Created Successfully!',
        description: 'Welcome to Journey Planner!',
      });
      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
      setErrors({});
    } else {
      toast({
        title: 'Signup Failed',
        description: data.message,
        variant: 'destructive',
      });
    }
  } catch (err) {
    toast({
      title: 'Server Error',
      description: 'Could not connect to backend',
      variant: 'destructive',
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center py-12 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Join Journey Planner</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Create your account and start exploring the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-teal-600" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`${errors.firstName ? "border-red-500" : ""}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`${errors.lastName ? "border-red-500" : ""}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-teal-600" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4 text-teal-600" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-teal-600" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pr-12 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`pr-12 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="#" className="text-teal-600 hover:text-teal-700">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-teal-600 hover:text-teal-700">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 text-lg font-semibold"
                >
                  Create Account
                </Button>
              </motion.div>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
