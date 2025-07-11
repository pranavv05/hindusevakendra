"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const handleCallNow = () => {
    window.open("tel:+916359220055", "_self")
  }

  const handleSendEmail = () => {
    window.open("mailto:helpskhelp@gmail.com", "_self")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for support, partnerships, or general inquiries
          </p>
        </div>

        {/* Get in Touch Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600">We're here to help! Reach out to us through any of the following channels.</p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Phone Support */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-lg font-semibold text-gray-900 mb-1">+91 6359220055</p>
                    <p className="text-sm text-gray-600">24/7 Emergency Support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Support */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-lg font-semibold text-gray-900 mb-1">helpskhelp@gmail.com</p>
                    <p className="text-sm text-gray-600">Response within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Address */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Office Address</h3>
                    <p className="text-gray-900 mb-1">Shop no. 5 V-Raj Darshan Complex</p>
                    <p className="text-gray-900 mb-1">Samarvani Silvassa- 396230</p>
                    <p className="text-sm text-gray-600">Dadra and Nagar Haveli, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Business Hours</h3>
                    <p className="text-gray-900 mb-1">Monday - Friday: 9:00 AM - 9:00 PM</p>
                    <p className="text-sm text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                onClick={handleCallNow}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
              <Button
                onClick={handleSendEmail}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium bg-transparent"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
