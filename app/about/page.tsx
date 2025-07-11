import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"

const founders = [
  {
    name: "Pradip Mishra",
    title: "Founder",
    image: "/placeholder-user.jpg",
    description:
      "Pradip brings over 10 years of experience in technology and business development. His vision of connecting communities through technology drives Hindu Seva Kendra.",
  },
  {
    name: "Rahul Shah",
    title: "Founder",
    image: "/placeholder-user.jpg",
    description:
      "Rahul is a seasoned software architect with expertise in building scalable platforms. He leads the technical vision and development of our platform.",
  },
  {
    name: "Kapil Kanodiya",
    title: "Founder",
    image: "/placeholder-user.jpg",
    description:
      "Kapil specializes in operations and vendor management. His deep understanding of service industries helps us maintain quality standards.",
  },
  {
    name: "Durgesh Rajpurohit",
    title: "Founder",
    image: "/placeholder-user.jpg",
    description:
      "Durgesh leads our marketing and community outreach efforts. His passion for social impact drives our mission to serve communities better.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-orange-600">Hindu Seva Kendra</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with a vision to bridge the gap between service seekers and providers, Hindu Seva Kendra is
            revolutionizing how communities access essential services across India.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To create a trusted ecosystem that connects verified service providers with individuals and
                organizations, ensuring quality service delivery while promoting fair compensation and community
                development.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the leading platform for service connections across India, fostering economic growth in local
                communities while maintaining the highest standards of service quality and customer satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values Section */}
        <section className="bg-orange-600 text-white py-16 -mx-4 mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Trust & Verification</h3>
                <p className="text-orange-100 leading-relaxed">
                  Every service provider is thoroughly verified to ensure customer safety and service quality.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Fair Compensation</h3>
                <p className="text-orange-100 leading-relaxed">
                  We believe in fair pricing that benefits both service providers and customers.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Community First</h3>
                <p className="text-orange-100 leading-relaxed">
                  Our platform is designed to strengthen local communities and support local businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Founding Body Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founding Body</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <Image src={founder.image || "/placeholder.svg"} alt={founder.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{founder.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{founder.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{founder.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-4xl mx-auto text-gray-600">
            <p className="mb-6">
              Hindu Seva Kendra was born from a simple yet powerful idea: every community deserves access to reliable,
              verified service providers. Our founders, coming from diverse backgrounds in technology, business, and
              community service, recognized the challenges faced by both service seekers and providers in today's
              fast-paced world.
            </p>
            <p className="mb-6">
              What started as a local initiative to help neighbors find trusted plumbers and electricians has evolved
              into a comprehensive platform serving individuals, societies, factories, colleges, and hospitals across
              multiple cities. We believe in the power of community and the importance of maintaining the highest
              standards of service quality.
            </p>
            <p>
              Today, Hindu Seva Kendra stands as a testament to what can be achieved when technology meets traditional
              values of service and trust. We continue to grow, not just in numbers, but in our commitment to serving
              every corner of our diverse nation.
            </p>
          </div>
        </section>

        {/* Join Our Mission Section */}
        <section className="text-center bg-gray-100 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a platform that's transforming how communities access and provide services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/auth/register">Start Using Our Services</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50 bg-transparent">
              <Link href="/auth/register">Become a Service Provider</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
