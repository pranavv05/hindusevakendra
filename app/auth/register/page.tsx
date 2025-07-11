"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Construction } from "lucide-react"

const serviceTypes = [
  "Electrician",
  "Plumbing",
  "Tiles & Flooring",
  "Hair & Spa",
  "Car & Bike Repair",
  "Legal Services",
  "Digital Marketing",
  "Web Developer",
  "Mobile Repair",
  "Computer Repair/Solutions",
  "Carpenter",
  "Painting Services",
  "Tours & Travels",
  "Catering",
  "AC & Fridge Repair",
  "House Keeping",
  "Electrician (Industrial/Household)",
  "Retailers",
  "Event Organizer",
  "Video & Photography",
  "Fire & Safety",
  "General Insurance",
]

const userCategories = [
  "Individual/Personal",
  "Residential Society",
  "Factory/Industry",
  "College/University",
  "Hospital/Healthcare",
  "Office/Commercial",
]

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    category: "",
    serviceType: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConstruction, setShowConstruction] = useState(false)
  const [activeTab, setActiveTab] = useState("user")
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (userType: "user" | "vendor") => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address,
          category: formData.category,
          userType: userType,
          serviceType: userType === "vendor" ? formData.serviceType : undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setShowSuccess(true)
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "Something went wrong",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginClick = () => {
    setShowConstruction(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Join Hindu Seva Kendra</CardTitle>
              <CardDescription>Register as a service provider and start earning</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user">Service User</TabsTrigger>
                  <TabsTrigger value="vendor">Service Provider</TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="space-y-4">
                  <div className="text-center py-4">
                    <h3 className="text-lg font-semibold text-gray-900">Register as Service User</h3>
                    <p className="text-sm text-gray-600">Request services from verified providers</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="user-name">Full Name</Label>
                      <Input
                        id="user-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="user-email">Email</Label>
                      <Input
                        id="user-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="user-phone">Phone Number</Label>
                      <Input
                        id="user-phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="user-category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {userCategories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase().replace(/[^a-z0-9]/g, "-")}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="user-address">Address</Label>
                    <Textarea
                      id="user-address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="user-password">Password</Label>
                      <Input
                        id="user-password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="user-confirm-password">Confirm Password</Label>
                      <Input
                        id="user-confirm-password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSubmit("user")}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Register as User"}
                  </Button>
                </TabsContent>

                <TabsContent value="vendor" className="space-y-4">
                  {/* Vendor Benefits Section */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-3">
                      <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center mr-2">
                        <span className="text-white text-xs">🎁</span>
                      </div>
                      <h3 className="font-semibold text-green-800">Vendor Benefits</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-700">
                      <div className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        Free Starter Kit (T-shirt, Cap, ID Card)
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        Regular Work Assignments
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        Fair Payment System
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        Community Support
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vendor-name">Full Name *</Label>
                      <Input
                        id="vendor-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vendor-email">Email *</Label>
                      <Input
                        id="vendor-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vendor-phone">Phone Number *</Label>
                      <Input
                        id="vendor-phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vendor-service">Service Type *</Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => handleInputChange("serviceType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vendor-password">Password *</Label>
                      <Input
                        id="vendor-password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vendor-confirm-password">Confirm Password *</Label>
                      <Input
                        id="vendor-confirm-password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vendor-address">Address *</Label>
                    <Textarea
                      id="vendor-address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your complete address"
                      rows={4}
                      required
                    />
                  </div>

                  {/* File Upload Sections */}
                  <div>
                    <Label htmlFor="vendor-id-proof">ID Proof (Aadhar/PAN/Driving License) *</Label>
                    <div className="mt-1">
                      <Input
                        id="vendor-id-proof"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Upload clear image/PDF of your ID proof</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vendor-address-proof">Address Proof *</Label>
                    <div className="mt-1">
                      <Input
                        id="vendor-address-proof"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload electricity bill, lease papers, rent agreement, or any government-issued address proof
                      </p>
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div>
                    <Label htmlFor="vendor-photo">Photo (Passport Size) *</Label>
                    <div className="mt-1">
                      <Input
                        id="vendor-photo"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload a clear passport size photo (JPG, JPEG, or PNG format)
                      </p>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="vendor-terms" className="mt-1" required />
                    <Label htmlFor="vendor-terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <span className="text-orange-600 hover:underline cursor-pointer">Terms and Conditions</span> and{" "}
                      <span className="text-orange-600 hover:underline cursor-pointer">Privacy Policy</span>
                    </Label>
                  </div>

                  <Button
                    onClick={() => handleSubmit("vendor")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>

                  {/* Important Notes Section */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-yellow-800 mb-3">Important Notes:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Admin approval is required before you can start receiving work</li>
                      <li>• Registration fee may apply (decided by admin)</li>
                      <li>• You'll receive a starter kit upon approval</li>
                      <li>• Platform commission: 1-3% per completed job</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button onClick={handleLoginClick} className="text-orange-600 hover:text-orange-700 font-medium">
                    Sign in here
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center">Registration Successful!</DialogTitle>
            <DialogDescription className="text-center">
              Your account has been created successfully.
              {activeTab === "vendor" && " Your application is pending admin approval."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={() => setShowSuccess(false)} className="bg-orange-600 hover:bg-orange-700">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Under Construction Dialog */}
      <Dialog open={showConstruction} onOpenChange={setShowConstruction}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full">
              <Construction className="w-6 h-6 text-orange-600" />
            </div>
            <DialogTitle className="text-center">Under Construction</DialogTitle>
            <DialogDescription className="text-center">
              The login functionality is currently under development. Please check back soon!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={() => setShowConstruction(false)} className="bg-orange-600 hover:bg-orange-700">
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
