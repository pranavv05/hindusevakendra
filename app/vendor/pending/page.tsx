import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header";


export default function VendorPendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Header userType="guest" />

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl">Application Under Review</CardTitle>
            <CardDescription>
              Thank you for applying to become a service provider with Hindu Seva Kendra
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-4 py-2">
                Pending Admin Approval
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">What happens next?</h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Document Verification</p>
                    <p className="text-sm text-gray-600">
                      Our team will verify your submitted documents and credentials
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Background Check</p>
                    <p className="text-sm text-gray-600">
                      We'll conduct a thorough background verification for customer safety
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Approval & Welcome Kit</p>
                    <p className="text-sm text-gray-600">
                      Upon approval, you'll receive your digital welcome kit and can start accepting requests
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Expected Timeline</h4>
              <p className="text-blue-800 text-sm">
                The verification process typically takes 2-3 business days. We'll notify you via email and SMS once your
                application is reviewed.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Need Help?</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support: 1800-123-4567
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email: support@hindusevaKendra.com
                </Button>
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">
                We appreciate your patience and look forward to welcoming you to our platform!
              </p>
              <Link href="/">
                <Button>Return to Homepage</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
