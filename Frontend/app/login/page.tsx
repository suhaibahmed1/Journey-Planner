"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem("isLoggedIn", "true")
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${data.user.firstName}.`,
        })
        router.push("/") // Always go to homepage
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Server Error",
        description: "Failed to connect to backend",
        variant: "destructive",
      })
    }
  }

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
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Sign in to your Journey Planner account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="h-5 w-5 text-teal-600" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`text-lg py-3 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5 text-teal-600" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`text-lg py-3 pr-12 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Forgotten Password Link */}
              <div className="text-right">
                <Link href="/forgot-password" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-4 text-lg font-semibold"
                >
                  Sign In
                </Button>
              </motion.div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {"Don't have an account? "}
                <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
