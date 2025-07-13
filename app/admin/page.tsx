"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Wrench,
  Search,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import { User } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  phone: string
  address: string
  category: string
  user_type: string
  status: string
  created_at: string
  service_type?: string
  verification_status?: string
  vendor_applied_date?: string
}

interface Vendor {
  id: number
  vendor_id: number
  name: string
  email: string
  phone: string
  address: string
  category: string
  registered_date: string
  service_type: string
  verification_status: string
  application_date: string
}

interface Stats {
  total_registrations: number
  total_users: number
  total_vendors: number
  approved_vendors: number
  pending_vendors: number
  rejected_vendors: number
}

export default function AdminOverviewPage() {
  const [users, setUsers] = useState<User[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [stats, setStats] = useState<Stats>({
    total_registrations: 0,
    total_users: 0,
    total_vendors: 0,
    approved_vendors: 0,
    pending_vendors: 0,
    rejected_vendors: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      const usersResponse = await fetch("/api/admin/users")
      const usersData = await usersResponse.json()

      const vendorsResponse = await fetch("/api/admin/vendors")
      const vendorsData = await vendorsResponse.json()

      if (usersData.success) {
        setUsers(usersData.users)
        setStats(usersData.stats)
      }

      if (vendorsData.success) {
        setVendors(vendorsData.vendors)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)

    return matchesSearch
  })

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm) ||
      vendor.service_type.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="admin" userName="Administrator" showNotifications showProfile />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-600 mt-2">Complete registration statistics and user management</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_registrations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="w-5 h-5" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Service Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_users}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Wrench className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_vendors}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Refresh */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, phone, or service type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button onClick={fetchData} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all-users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-users">All Registrations ({stats.total_registrations})</TabsTrigger>
            <TabsTrigger value="users-only">Service Users ({stats.total_users})</TabsTrigger>
            <TabsTrigger value="vendors-only">Vendors ({stats.total_vendors})</TabsTrigger>
          </TabsList>

          {/* All Users */}
          <TabsContent value="all-users">
            <Card>
              <CardHeader>
                <CardTitle>All Registrations</CardTitle>
                <CardDescription>Complete list of all users and vendors registered on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Contact</th>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Category/Service</th>
                        <th className="text-left p-3 font-semibold">Registered</th>
                        <th className="text-left p-3 font-semibold">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-xs text-gray-500">ID: {user.id}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="h-3 w-3 mr-1 text-gray-400" />
                                {user.email}
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="h-3 w-3 mr-1 text-gray-400" />
                                {user.phone}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant={user.user_type === "vendor" ? "default" : "secondary"}>
                              {user.user_type === "vendor" ? "Service Provider" : "Service User"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {user.user_type === "vendor" ? (
                              <span className="font-medium text-orange-600">{user.service_type}</span>
                            ) : (
                              <span className="text-gray-600">{user.category}</span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(user.created_at)}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-start text-sm text-gray-600 max-w-xs">
                              <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                              <span className="truncate">{user.address}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Users Only */}
          <TabsContent value="users-only">
            <Card>
              <CardHeader>
                <CardTitle>Service Users</CardTitle>
                <CardDescription>Users who request services on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Contact</th>
                        <th className="text-left p-3 font-semibold">Category</th>
                        <th className="text-left p-3 font-semibold">Registered</th>
                        <th className="text-left p-3 font-semibold">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers
                        .filter((user) => user.user_type === "user")
                        .map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div>
                                <div className="font-medium text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">ID: {user.id}</div>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="space-y-1">
                                <div className="flex items-center text-sm">
                                  <Mail className="h-3 w-3 mr-1 text-gray-400" />
                                  {user.email}
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="h-3 w-3 mr-1 text-gray-400" />
                                  {user.phone}
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="secondary">{user.category}</Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(user.created_at)}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-start text-sm text-gray-600 max-w-xs">
                                <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                                <span className="truncate">{user.address}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendors Only */}
          <TabsContent value="vendors-only">
            <Card>
              <CardHeader>
                <CardTitle>Service Providers (Vendors)</CardTitle>
                <CardDescription>All vendors registered on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Contact</th>
                        <th className="text-left p-3 font-semibold">Service Type</th>
                        <th className="text-left p-3 font-semibold">Applied</th>
                        <th className="text-left p-3 font-semibold">Address</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors.map((vendor) => (
                        <tr key={vendor.vendor_id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium text-gray-900">{vendor.name}</div>
                              <div className="text-xs text-gray-500">ID: {vendor.id}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="h-3 w-3 mr-1 text-gray-400" />
                                {vendor.email}
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="h-3 w-3 mr-1 text-gray-400" />
                                {vendor.phone}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className="bg-orange-100 text-orange-800">{vendor.service_type}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(vendor.application_date)}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-start text-sm text-gray-600 max-w-xs">
                              <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                              <span className="truncate">{vendor.address}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
