"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, CheckCircle, Clock, DollarSign, MapPin, Phone, Star, Wrench } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"; 


const serviceRequests = [
  {
    id: 1,
    service: "Plumbing",
    customer: "Ramesh Gupta",
    address: "123 MG Road, Sector 15",
    phone: "+91 98765 43210",
    date: "2024-01-16",
    time: "10:00 AM",
    status: "assigned",
    amount: 500,
    description: "Kitchen sink pipe leakage repair needed urgently",
  },
  {
    id: 2,
    service: "Plumbing",
    customer: "Priya Sharma",
    address: "456 Park Street, Block A",
    phone: "+91 87654 32109",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "pending",
    amount: 800,
    description: "Bathroom renovation - new fittings installation",
  },
  {
    id: 3,
    service: "Plumbing",
    customer: "Suresh Kumar",
    address: "789 Gandhi Nagar, Phase 2",
    phone: "+91 76543 21098",
    date: "2024-01-15",
    time: "11:00 AM",
    status: "completed",
    amount: 300,
    description: "Toilet flush repair",
  },
]

const earnings = {
  today: 800,
  thisWeek: 4500,
  thisMonth: 18500,
  total: 125000,
}

export default function VendorDashboard() {
  const [happyCode, setHappyCode] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const { toast } = useToast()

  const handleAcceptRequest = (requestId: number) => {
    toast({
      title: "Request Accepted",
      description: "You have accepted the service request. Customer has been notified.",
    })
  }

  const handleCompleteService = (requestId: number) => {
    if (!happyCode) {
      toast({
        title: "Happy Code Required",
        description: "Please enter the Happy Code provided by the customer.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Service Completed",
      description: "Service marked as completed. Payment will be processed shortly.",
    })
    setHappyCode("")
    setSelectedRequest(null)
  }

  const handleCallCustomer = (phone: string) => {
    toast({
      title: "Calling Customer",
      description: `Initiating call to ${phone}...`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header userType="vendor" userName="Rajesh Kumar" showNotifications={true} showProfile={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Welcome, Rajesh Kumar!
                </CardTitle>
                <CardDescription>Manage your service requests and track your earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{earnings.today}</div>
                    <div className="text-sm text-gray-600">Today's Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Pending Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">15</div>
                    <div className="text-sm text-gray-600">Completed Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4.8</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>Manage your assigned and pending service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{request.service} Service</h4>
                          <p className="text-gray-600">Customer: {request.customer}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.address}
                          </p>
                        </div>
                        <Badge
                          variant={
                            request.status === "completed"
                              ? "default"
                              : request.status === "assigned"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>

                      <p className="text-gray-700 mb-3">{request.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {request.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {request.time}
                          </span>
                          <span className="flex items-center font-semibold text-green-600">
                            <DollarSign className="h-4 w-4 mr-1" />₹{request.amount}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleCallCustomer(request.phone)}>
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>

                          {request.status === "pending" && (
                            <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                              Accept
                            </Button>
                          )}

                          {request.status === "assigned" && (
                            <Button size="sm" onClick={() => setSelectedRequest(request.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>

                      {selectedRequest === request.id && (
                        <div className="mt-4 p-3 bg-gray-50 rounded border-t">
                          <h5 className="font-semibold mb-2">Complete Service</h5>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1">Happy Code from Customer</label>
                              <Input
                                placeholder="Enter the Happy Code provided by customer"
                                value={happyCode}
                                onChange={(e) => setHappyCode(e.target.value)}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button onClick={() => handleCompleteService(request.id)} className="flex-1">
                                Mark as Completed
                              </Button>
                              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Today</span>
                  <span className="font-semibold text-green-600">₹{earnings.today}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold">₹{earnings.thisWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold">₹{earnings.thisMonth}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-bold text-lg">₹{earnings.total}</span>
                </div>
                <Button className="w-full">View Detailed Report</Button>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Services Completed</span>
                  <span className="font-semibold">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">12 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-green-600">98%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Update Availability
                </Button>
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Update Location
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
