"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bell, Home, Phone, Plus, Search, Star, Wrench } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"


const services = [
  { id: 1, name: "Electrician", icon: "⚡", available: 15 },
  { id: 2, name: "Plumbing", icon: "🔧", available: 12 },
  { id: 3, name: "Hair & Spa", icon: "💇", available: 10 },
  { id: 4, name: "Car Repair", icon: "🚗", available: 6 },
  { id: 5, name: "Legal Services", icon: "⚖️", available: 5 },
  { id: 6, name: "House Keeping", icon: "🧹", available: 15 },
  { id: 7, name: "AC Repair", icon: "❄️", available: 5 },
  { id: 8, name: "Mobile Repair", icon: "📱", available: 9 },
  { id: 9, name: "Web Development", icon: "💻", available: 4 },
  { id: 10, name: "Digital Marketing", icon: "📱", available: 7 },
  { id: 11, name: "Carpentry", icon: "🔨", available: 8 },
  { id: 12, name: "Painting", icon: "🎨", available: 11 },
]

const recentBookings = [
  {
    id: 1,
    service: "Plumbing",
    vendor: "Rajesh Kumar",
    date: "2024-01-15",
    status: "completed",
    rating: 5,
    amount: 500,
  },
  {
    id: 2,
    service: "Electrical",
    vendor: "Amit Sharma",
    date: "2024-01-10",
    status: "completed",
    rating: 4,
    amount: 800,
  },
  {
    id: 3,
    service: "Cleaning",
    vendor: "Priya Singh",
    date: "2024-01-08",
    status: "pending",
    rating: null,
    amount: 300,
  },
]

export default function UserDashboard() {
  const [selectedService, setSelectedService] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleServiceRequest = (serviceId: number, serviceName: string) => {
    toast({
      title: "Service Request Initiated",
      description: `Looking for available ${serviceName} providers in your area...`,
    })

    // Simulate finding a vendor
    setTimeout(() => {
      toast({
        title: "Vendor Found!",
        description: `A ${serviceName} provider has been assigned to your request.`,
      })
    }, 2000)
  }

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Support",
      description: "Connecting you to our 24/7 support team...",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header userType="user" userName="John Doe" showNotifications={true} showProfile={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Welcome Back!
                </CardTitle>
                <CardDescription>Book services from verified providers in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1" onClick={() => handleEmergencyCall()}>
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Support: 1800-123-4567
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service Search */}
            <Card>
              <CardHeader>
                <CardTitle>Find Services</CardTitle>
                <CardDescription>Search and book services from verified providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Search for services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleServiceRequest(service.id, service.name)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{service.icon}</div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.available} available</p>
                        <Button size="sm" className="mt-2 w-full">
                          <Plus className="h-3 w-3 mr-1" />
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your service booking history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{booking.service}</h4>
                          <p className="text-sm text-gray-600">by {booking.vendor}</p>
                          <p className="text-xs text-gray-500">{booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === "completed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                        <p className="text-sm font-semibold mt-1">₹{booking.amount}</p>
                        {booking.rating && (
                          <div className="flex items-center mt-1">
                            {[...Array(booking.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-orange-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold">₹8,500</span>
                </div>
              </CardContent>
            </Card>

            {/* Happy Code Section */}
            <Card>
              <CardHeader>
                <CardTitle>Service Completion</CardTitle>
                <CardDescription>Enter the Happy Code provided by your service provider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Enter Happy Code" />
                  <Button className="w-full">Confirm Service Completion</Button>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
