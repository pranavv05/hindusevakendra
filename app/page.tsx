"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Link from "next/link"
import {
  Wrench,
  Users,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building,
  Home,
  User,
} from "lucide-react"

const premiumServices = [
  {
    name: "Tiles & Flooring",
    icon: "🏠",
    category: "Construction",
    description: "Flooring and tiling services",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Hair & Spa",
    icon: "💇",
    category: "Personal Care",
    description: "Unisex salon and spa services",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Car & Bike Repair",
    icon: "🚗",
    category: "Automotive",
    description: "Vehicle maintenance and repair",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Legal Services",
    icon: "⚖️",
    category: "Professional",
    description: "Professional legal consultation",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Electrician",
    icon: "⚡",
    category: "Home Services",
    description: "Professional electrical solutions",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Plumbing",
    icon: "🔧",
    category: "Home Services",
    description: "Expert plumbing solutions",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Digital Marketing",
    icon: "📱",
    category: "Technology",
    description: "Online marketing solutions",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Web Developer",
    icon: "💻",
    category: "Technology",
    description: "Website development services",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Mobile Repair",
    icon: "📱",
    category: "Technology",
    description: "Mobile and smartphone repair",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    name: "Computer Repair",
    icon: "🖥️",
    category: "Technology",
    description: "Computer repair and solutions",
    color: "bg-slate-100 text-slate-600",
  },
  {
    name: "Carpenter",
    icon: "🔨",
    category: "Home Services",
    description: "Wood work and carpentry",
    color: "bg-amber-100 text-amber-600",
  },
  {
    name: "Painting Services",
    icon: "🎨",
    category: "Home Services",
    description: "Interior and exterior painting",
    color: "bg-teal-100 text-teal-600",
  },
  {
    name: "Tours & Travels",
    icon: "✈️",
    category: "Travel",
    description: "Travel planning and booking",
    color: "bg-sky-100 text-sky-600",
  },
  {
    name: "Catering",
    icon: "🍽️",
    category: "Food & Events",
    description: "Event catering services",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "AC & Fridge Repair",
    icon: "❄️",
    category: "Appliance",
    description: "Cooling appliance repair",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "House Keeping",
    icon: "🧹",
    category: "Home Services",
    description: "Professional cleaning services",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Electrician (Industrial)",
    icon: "⚡",
    category: "Industrial",
    description: "Industrial electrical services",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Retailers",
    icon: "🏪",
    category: "Business",
    description: "Retail business solutions",
    color: "bg-violet-100 text-violet-600",
  },
  {
    name: "Event Organizer",
    icon: "🎉",
    category: "Events",
    description: "Complete event management",
    color: "bg-rose-100 text-rose-600",
  },
  {
    name: "Video & Photography",
    icon: "📸",
    category: "Media",
    description: "Professional photography services",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Fire & Safety",
    icon: "🚨",
    category: "Safety",
    description: "Fire safety and security services",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "General Insurance",
    icon: "🛡️",
    category: "Insurance",
    description: "Insurance consultation and services",
    color: "bg-gray-100 text-gray-600",
  },
]

const features = [
  {
    icon: Users,
    title: "1. Request Service",
    description: "Choose your category and request the service you need through our platform",
  },
  {
    icon: Phone,
    title: "2. We Connect",
    description: "Our team connects you with verified local service providers in your area",
  },
  {
    icon: MapPin,
    title: "3. Real-time Tracking",
    description: "Track your service provider in real-time and get updates on service progress",
  },
  {
    icon: CreditCard,
    title: "4. Secure Payment",
    description: "Pay securely through our platform after service completion with transparent pricing",
  },
]

const categories = [
  {
    title: "Individual Users",
    icon: User,
    description: "Personal service needs",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Societies",
    icon: Home,
    description: "Residential community services",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Industries",
    icon: Building,
    description: "Industrial maintenance services",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Educational Institutes",
    icon: GraduationCap,
    description: "School and college services",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Hospitals",
    icon: Phone,
    description: "Healthcare facility services",
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Others",
    icon: Building,
    description: "Custom business solutions",
    color: "bg-gray-100 text-gray-600",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const servicesPerSlide = 4
  const totalSlides = Math.ceil(premiumServices.length / servicesPerSlide)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  const nextSlide = () => {
    setIsAutoPlaying(false) // Pause auto-play when user interacts
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false) // Pause auto-play when user interacts
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false) // Pause auto-play when user interacts
    setCurrentSlide(index)
    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const getCurrentServices = () => {
    const start = currentSlide * servicesPerSlide
    return premiumServices.slice(start, start + servicesPerSlide)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Trusted <span className="text-orange-600">Service Marketplace</span>
            <br />
            Connecting Communities
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hindu Seva Kendra is your one-stop platform for all service needs. We connect verified service providers
            with individuals, societies, industries, hospitals, and educational institutes across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/auth/register">
                <Users className="mr-2 h-5 w-5" />
                Request a Service
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/register">
                <Wrench className="mr-2 h-5 w-5" />
                Become a Service Provider
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Hindu Seva Kendra Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Hindu Seva Kendra?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Providers</h3>
                <p className="text-gray-600">
                  All service providers go through rigorous verification including ID proof, address proof, and
                  background checks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Local & Reliable</h3>
                <p className="text-gray-600">
                  Get connected with trusted local service providers who understand your area and needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support to assist you with any queries or emergency services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Premium Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of professional services delivered by verified experts in your area
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            {/* Services Slider */}
            <div className="px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getCurrentServices().map((service, index) => (
                  <Card
                    key={index}
                    className="bg-white text-center hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full mb-3">
                        {service.category}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-6">{service.description}</p>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-lg">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-orange-600" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* We Serve All Categories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Serve All Categories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Hindu Seva Kendra Works</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>



      {/* Ready to Experience Quality Service CTA Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Quality Service?</h2>
            <p className="text-orange-100 mb-8">
              Join thousands of satisfied customers and verified service providers across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/auth/register">Get Started as User</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                <Link href="/auth/register">Join as Service Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🕉</span>
                </div>
                <h3 className="text-xl font-bold">Hindu Seva Kendra</h3>
              </div>
              <p className="text-gray-400">Connecting communities through trusted service providers across India.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/auth/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/auth/register" className="hover:text-white">
                    Join as Vendor
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Hindu Seva Kendra. Created by Pradip Mishra, Rahul Shah, Kapil Kanodiya, and Durgesh
              Rajpurohit.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
