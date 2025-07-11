"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  CheckCircle,
  DollarSign,
  MapPin,
  Shield,
  TrendingUp,
  Users,
  Wrench,
  XCircle,
  Eye,
  Phone,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"

export default function AdminDashboard() {
  const [commissionRate, setCommissionRate] = useState("2")
  const [registrationFee, setRegistrationFee] = useState("500")
  const { toast } = useToast()

  const [pendingVendors, setPendingVendors] = useState([])
  const [activeServices, setActiveServices] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    activeServices: 0,
    completedServices: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [vendorsRes, servicesRes, statsRes] = await Promise.all([
          fetch("/api/vendors/pending"),
          fetch("/api/services/active"),
          fetch("/api/platform/stats"),
        ])

        const vendorsData = await vendorsRes.json()
        const servicesData = await servicesRes.json()
        const statsData = await statsRes.json()

        setPendingVendors(vendorsData)
        setActiveServices(servicesData)
        setStats(statsData)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        })
      }
    }

    fetchDashboardData()
  }, [])

  const handleVendorApproval = async (vendorId, approved) => {
    const action = approved ? "approved" : "rejected"

    try {
      await fetch(`/api/vendors/${vendorId}/${approved ? "approve" : "reject"}`, {
        method: "POST",
      })

      setPendingVendors((prev) => prev.filter((v) => v.id !== vendorId))
      toast({
        title: `Vendor ${action}`,
        description: `Vendor has been ${action}.`,
      })
    } catch {
      toast({
        title: "Error",
        description: `Failed to ${action} vendor.`,
        variant: "destructive",
      })
    }
  }

  const handleAssignVendor = async (serviceId) => {
    try {
      await fetch(`/api/services/${serviceId}/assign`, { method: "POST" })
      toast({
        title: "Vendor Assigned",
        description: "Vendor has been assigned to the service request.",
      })
      // Optionally refresh active services
    } catch {
      toast({
        title: "Error",
        description: "Failed to assign vendor",
        variant: "destructive",
      })
    }
  }

  const updateCommissionRate = () => {
    toast({
      title: "Commission Rate Updated",
      description: `Set to ${commissionRate}%`,
    })
    // TODO: Save to backend
  }

  const updateRegistrationFee = () => {
    toast({
      title: "Registration Fee Updated",
      description: `Set to ₹${registrationFee}`,
    })
    // TODO: Save to backend
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="admin" userName="Administrator" showNotifications showProfile />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Platform stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Users className="h-8 w-8 text-blue-600" />} label="Total Users" value={stats.totalUsers} />
          <StatCard icon={<Wrench className="h-8 w-8 text-green-600" />} label="Total Vendors" value={stats.totalVendors} />
          <StatCard icon={<Shield className="h-8 w-8 text-orange-600" />} label="Active Services" value={stats.activeServices} />
          <StatCard icon={<DollarSign className="h-8 w-8 text-purple-600" />} label="Total Revenue" value={`₹${stats.totalRevenue}`} />
        </div>

        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
            <TabsTrigger value="services">Service Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Tracking</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          {/* Render each tab content just like your previous implementation */}
          {/* Keep using `pendingVendors`, `activeServices`, `stats` in the UI below */}
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          {icon}
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
