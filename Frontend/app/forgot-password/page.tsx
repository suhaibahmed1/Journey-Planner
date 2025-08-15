"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email) {
    setMessage("Please enter your email.");
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  } catch (err) {
    setMessage("Error sending reset link. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <label htmlFor="email" className="block mb-2 font-semibold">
          Enter your email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
          required
        />
        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
          Send Reset Link
        </Button>
        {message && <p className="mt-4 text-center text-sm text-teal-700">{message}</p>}
      </form>
    </div>
  );
}
