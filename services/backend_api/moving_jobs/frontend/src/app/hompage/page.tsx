import Image from 'next/image'
import Link from 'next/link'
import './globals.css';  // Adjust the path to where your CSS file is located
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/303MLSlogo.png"
              alt="303 Moving And Labor Solutions Logo"
              width={200}
              height={100}
              className="mr-4"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              303 Moving And Labor Solutions
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="#services" className="text-gray-600 hover:text-gray-900">Services</Link></li>
              <li><Link href="#about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link href="#contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Your Trusted Moving Partner
              </h2>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Professional, reliable, and stress-free moving services in Denver and beyond.
              </p>
              <div className="mt-10 flex justify-center">
                <Button size="lg" asChild>
                  <Link href="#contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Residential Moving</h3>
                  <p className="text-gray-600">Expert packing and transportation for your home move.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Commercial Moving</h3>
                  <p className="text-gray-600">Efficient office and business relocation services.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Packing Services</h3>
                  <p className="text-gray-600">Professional packing to ensure your belongings' safety.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-8">
              About 303 Moving And Labor Solutions
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
              With years of experience and a commitment to excellence, we provide top-notch moving services 
              in the Denver area and beyond. Our team of professionals ensures a smooth and stress-free 
              moving experience for all our clients.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-8">
              Contact Us
            </h2>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
                </div>
                <div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2023 303 Moving And Labor Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

