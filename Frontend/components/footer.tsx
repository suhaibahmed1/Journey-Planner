import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-teal-400" />
              <span className="text-xl font-bold">Journey Planner</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for unforgettable travel experiences across Pakistan and around the world.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/plan" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Custom Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Hunza Valley</span>
              </li>
              <li>
                <span className="text-gray-400">Skardu</span>
              </li>
              <li>
                <span className="text-gray-400">Switzerland</span>
              </li>
              <li>
                <span className="text-gray-400">Malaysia</span>
              </li>
              <li>
                <span className="text-gray-400">Umrah & Hajj</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <span className="text-gray-400">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <span className="text-gray-400">info@journeyplannerpro.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 mt-1" />
                <span className="text-gray-400">Plot #B-45, Block 5, Gulshan-e-Iqbal, Near Sir Syed University, Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Journey Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
