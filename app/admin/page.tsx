
"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  RefreshCw,
  Check,
  X,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Image
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"

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
  // Additional fields that might be submitted in the form
  business_name?: string
  business_address?: string
  experience_years?: number
  description?: string
  certifications?: string
  portfolio_links?: string
  hourly_rate?: number
  availability?: string
  service_areas?: string
  emergency_services?: boolean
  insurance?: boolean
  license_number?: string
  profile_image?: string
  documents?: string[]
  // New document fields
  id_proof?: string
  address_proof?: string
  photo?: string
  id_proof_type?: string // Aadhar/PAN/Driving License
}

interface Stats {
  total_registrations: number
  total_users: number
  total_vendors: number
}

export default function AdminOverviewPage() {
  const [users, setUsers] = useState<User[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [stats, setStats] = useState<Stats>({
    total_registrations: 0,
    total_users: 0,
    total_vendors: 0,
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [showVendorDialog, setShowVendorDialog] = useState(false)
  const [processingVendor, setProcessingVendor] = useState<number | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const { toast } = useToast()

  // Calculate stats from actual data
  const calculateStats = useCallback((usersData: User[], vendorsData: Vendor[]) => {
    const serviceUsers = usersData.filter(user => user.user_type === "user")
    
    return {
      total_registrations: usersData.length,
      total_users: serviceUsers.length,
      total_vendors: vendorsData.length,
    }
  }, [])

  const fetchData = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      // Fetch both endpoints simultaneously
      const [usersResponse, vendorsResponse] = await Promise.all([
        fetch("/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Prevent caching to ensure fresh data
          cache: "no-store",
        }),
        fetch("/api/admin/vendors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })
      ])

      if (!usersResponse.ok || !vendorsResponse.ok) {
        throw new Error("Failed to fetch data")
      }

      const usersData = await usersResponse.json()
      const vendorsData = await vendorsResponse.json()

      if (usersData.success && vendorsData.success) {
        const freshUsers = usersData.users || []
        const freshVendors = vendorsData.vendors || []
        
        // Update state with fresh data
        setUsers(freshUsers)
        setVendors(freshVendors)
        
        // Calculate stats from the actual data
        const calculatedStats = calculateStats(freshUsers, freshVendors)
        setStats(calculatedStats)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch admin data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [calculateStats, toast])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(true)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [fetchData])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      return "Invalid Date"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      (user.service_type && user.service_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.category && user.category.toLowerCase().includes(searchTerm.toLowerCase()))

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

  const handleRefresh = () => {
    fetchData(true)
  }

  const handleViewVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    setShowVendorDialog(true)
    setRejectionReason("")
  }

  const handleVendorAction = async (vendorId: number, action: 'approve' | 'reject', reason?: string) => {
    setProcessingVendor(vendorId)
    
    try {
      const response = await fetch(`/api/admin/vendors/${vendorId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: action === 'approve' ? 'approved' : 'rejected',
          reason: reason || undefined
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update vendor status")
      }

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: `Vendor ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
        })
        
        // Refresh data to reflect changes
        fetchData(true)
        
        // Close dialog
        setShowVendorDialog(false)
        setSelectedVendor(null)
        setRejectionReason("")
      } else {
        throw new Error(result.message || "Failed to update vendor status")
      }
    } catch (error) {
      console.error("Error updating vendor status:", error)
      toast({
        title: "Error",
        description: "Failed to update vendor status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingVendor(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const handleDownloadDocument = (documentUrl: string, documentName: string) => {
    if (!documentUrl) {
      toast({
        title: "Error",
        description: "Document not available",
        variant: "destructive",
      })
      return
    }
    
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = documentUrl
    link.download = documentName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const DocumentViewer = ({ label, documentUrl, documentType }: { label: string, documentUrl?: string, documentType: string }) => {
    if (!documentUrl) {
      return (
        <div className="border rounded-lg p-4 bg-gray-50">
          <Label className="text-sm font-medium text-gray-700">{label}</Label>
          <p className="text-sm text-gray-500 mt-1">Not provided</p>
        </div>
      )
    }

    return (
      <div className="border rounded-lg p-4">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>{documentType}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDownloadDocument(documentUrl, `${label.toLowerCase().replace(/\s+/g, '_')}`)}
            className="flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(documentUrl, '_blank')}
            className="flex items-center gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        </div>
      </div>
    )
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
              <p className="text-gray-600 mt-2">Complete registration statistics and user management</p>
            </div>
            <div className="flex items-center space-x-2">
              {refreshing && (
                <div className="flex items-center text-sm text-gray-600">
                  <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  Updating...
                </div>
              )}
              <div className="text-xs text-gray-500">
                Auto-refresh: 30s
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <User className="h-8 w-8 text-green-600" />
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
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="flex items-center gap-2 bg-transparent"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
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
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={`user-${user.id}`} className="border-b hover:bg-gray-50">
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
                                <span className="font-medium text-orange-600">{user.service_type || 'N/A'}</span>
                              ) : (
                                <span className="text-gray-600">{user.category || 'N/A'}</span>
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
                                <span className="truncate">{user.address || 'N/A'}</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">
                            {searchTerm ? "No users found matching your search." : "No users registered yet."}
                          </td>
                        </tr>
                      )}
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
                      {filteredUsers.filter((user) => user.user_type === "user").length > 0 ? (
                        filteredUsers
                          .filter((user) => user.user_type === "user")
                          .map((user) => (
                            <tr key={`service-user-${user.id}`} className="border-b hover:bg-gray-50">
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
                                <Badge variant="secondary">{user.category || 'N/A'}</Badge>
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
                                  <span className="truncate">{user.address || 'N/A'}</span>
                                </div>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-500">
                            {searchTerm ? "No service users found matching your search." : "No service users registered yet."}
                          </td>
                        </tr>
                      )}
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
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Applied</th>
                        <th className="text-left p-3 font-semibold">Address</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors.length > 0 ? (
                        filteredVendors.map((vendor) => (
                          <tr key={`vendor-${vendor.vendor_id}`} className="border-b hover:bg-gray-50">
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
                              <div className="flex items-center gap-2">
                                {getStatusIcon(vendor.verification_status)}
                                <Badge 
                                  variant={
                                    vendor.verification_status === "approved" ? "default" : 
                                    vendor.verification_status === "pending" ? "secondary" : 
                                    "destructive"
                                  }
                                  className={
                                    vendor.verification_status === "approved" ? "bg-green-100 text-green-800" :
                                    vendor.verification_status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                    "bg-red-100 text-red-800"
                                  }
                                >
                                  {vendor.verification_status}
                                </Badge>
                              </div>
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
                                <span className="truncate">{vendor.address || 'N/A'}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleViewVendor(vendor)}
                                className="flex items-center gap-2"
                              >
                                <Eye className="h-3 w-3" />
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-gray-500">
                            {searchTerm ? "No vendors found matching your search." : "No vendors registered yet."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Vendor Details Dialog */}
      <Dialog open={showVendorDialog} onOpenChange={setShowVendorDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Vendor Application Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Name</Label>
                      <p className="text-sm text-gray-900">{selectedVendor.name}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Email</Label>
                      <p className="text-sm text-gray-900">{selectedVendor.email}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Phone</Label>
                      <p className="text-sm text-gray-900">{selectedVendor.phone}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Service Type</Label>
                      <Badge className="bg-orange-100 text-orange-800">{selectedVendor.service_type}</Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Current Status</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(selectedVendor.verification_status)}
                        <Badge 
                          variant={
                            selectedVendor.verification_status === "approved" ? "default" : 
                            selectedVendor.verification_status === "pending" ? "secondary" : 
                            "destructive"
                          }
                          className={
                            selectedVendor.verification_status === "approved" ? "bg-green-100 text-green-800" :
                            selectedVendor.verification_status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {selectedVendor.verification_status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Business Name</Label>
                      <p className="text-sm text-gray-900">{selectedVendor.business_name || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Experience</Label>
                      <p className="text-sm text-gray-900">{selectedVendor.experience_years ? `${selectedVendor.experience_years} years` : 'N/A'}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Hourly Rate</Label>
                      <p className="text-sm text-gray-900">{selectedVendor.hourly_rate ? `₹${selectedVendor.hourly_rate}` : 'N/A'}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">License Number</Label>
                      <p className="text-sm text-gray-900">{selectedVendor.license_number || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Emergency Services</Label>
                      <Badge variant={selectedVendor.emergency_services ? "default" : "secondary"}>
                        {selectedVendor.emergency_services ? "Available" : "Not Available"}
                      </Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Insurance</Label>
                      <Badge variant={selectedVendor.insurance ? "default" : "secondary"}>
                        {selectedVendor.insurance ? "Covered" : "Not Covered"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Personal Address</Label>
                    <p className="text-sm text-gray-900">{selectedVendor.address || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Business Address</Label>
                    <p className="text-sm text-gray-900">{selectedVendor.business_address || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Service Areas</Label>
                  <p className="text-sm text-gray-900">{selectedVendor.service_areas || 'N/A'}</p>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Description</Label>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedVendor.description || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Certifications</Label>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedVendor.certifications || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Portfolio Links</Label>
                  <p className="text-sm text-gray-900">{selectedVendor.portfolio_links || 'N/A'}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Availability</Label>
                  <p className="text-sm text-gray-900">{selectedVendor.availability || 'N/A'}</p>
                </div>
              </div>
              
              {/* Application Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Application Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Application Date</Label>
                    <p className="text-sm text-gray-900">{formatDate(selectedVendor.application_date)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Registration Date</Label>
                    <p className="text-sm text-gray-900">{formatDate(selectedVendor.registered_date)}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Section - Only show if vendor is pending */}
              {selectedVendor.verification_status === 'pending' && (
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900">Actions Required</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Rejection Reason (Optional)</Label>
                      <Textarea
                        placeholder="Enter reason for rejection if applicable..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleVendorAction(selectedVendor.id, 'approve')}
                        disabled={processingVendor === selectedVendor.id}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4" />
                        {processingVendor === selectedVendor.id ? 'Processing...' : 'Approve Vendor'}
                      </Button>
                      
                      <Button
                        variant="destructive"
                        onClick={() => handleVendorAction(selectedVendor.id, 'reject', rejectionReason)}
                        disabled={processingVendor === selectedVendor.id}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        {processingVendor === selectedVendor.id ? 'Processing...' : 'Reject Vendor'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Already processed vendors */}
              {selectedVendor.verification_status !== 'pending' && (
                <div className="pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {getStatusIcon(selectedVendor.verification_status)}
                    <span>
                      This vendor has been {selectedVendor.verification_status}. 
                      {selectedVendor.verification_status === 'approved' && ' They can now receive service requests.'}
                      {selectedVendor.verification_status === 'rejected' && ' They cannot receive service requests.'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVendorDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
