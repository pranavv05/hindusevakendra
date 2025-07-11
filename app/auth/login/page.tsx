"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showConstruction, setShowConstruction] = useState(false)
  const [activeTab, setActiveTab] = useState("user")
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (userType: "user" | "vendor") => {
    setShowConstruction(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Sign in to your Hindu Seva Kendra account</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user">Service User</TabsTrigger>
                  <TabsTrigger value="vendor">Service Provider</TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="space-y-4">
                  <div className="text-center py-4">
                    <h3 className="text-lg font-semibold text-gray-900">User Login</h3>
                    <p className="text-sm text-gray-600">Access your service requests</p>
                  </div>

                  <div className="space-y-4">
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

                    <div>
                      <Label htmlFor="user-password">Password</Label>
                      <Input
                        id="user-password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <Button
                      onClick={() => handleSubmit("user")}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In as User"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="vendor" className="space-y-4">
                  <div className="text-center py-4">
                    <h3 className="text-lg font-semibold text-gray-900">Provider Login</h3>
                    <p className="text-sm text-gray-600">Access your service dashboard</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="vendor-email">Email</Label>
                      <Input
                        id="vendor-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="vendor-password">Password</Label>
                      <Input
                        id="vendor-password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <Button
                      onClick={() => handleSubmit("vendor")}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In as Provider"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-orange-600 hover:text-orange-700 font-medium">
                    Register here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
