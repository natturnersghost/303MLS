'use client';
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import './globals.css';  // Adjust the path to where your CSS file is located
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DM_Serif_Text } from 'next/font/google'
import { TopBanner } from "@/components/ui/top-banner";

const dmSerifText = DM_Serif_Text({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export default function HomePage() {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-black-50 to-gray-100 ${dmSerifText.className}`}>
      <TopBanner />
      <header className="bg-gradient-to-b from-black to-gray-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Image
                src="/303MLSlogo.png"
                alt="303 Moving And Labor Solutions Logo"
                width={150}
                height={75}
                className="w-auto h-auto rounded-lg"
              />
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center md:text-left">
                303 Moving And Labor Solutions
              </h1>
              <p className="text-white text-sm"></p>
            </div>
            <nav className="flex-shrink-0">
              <ul className="flex flex-wrap items-center gap-4 text-base md:text-xl">
                <li><Link href="#services" className="text-white hover:text-gray-300">Services</Link></li>
                <li><Link href="#about" className="text-white hover:text-gray-300">About Us</Link></li>
                <li><Link href="#contact" className="text-white hover:text-gray-300">Contact</Link></li>
                <li><Link href="sign_in" className="text-white hover:text-gray-300">Sign In</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-4 shadow-lg border-y border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-center text-xl font-semibold tracking-wide">
            <span className="text-gray-400"></span>{" "}
            Serving Colorado and beyond since 2020{" "}
            <span className="text-gray-400"></span>
          </p>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section 
          className="relative bg-cover bg-center min-h-[600px] text-white py-16 md:py-24"
          style={{ backgroundImage: 'url("/denverpic.jpeg")' }}
        >
          {/* Add an overlay to ensure text remains readable */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                Your Trusted Moving Partner
              </h2>
              <p className="max-w-4xl mx-auto text-2xl sm:text-3xl">
                Providing professional, reliable, and stress-free moving services in Denver and beyond.
              </p>
              <div className="space-y-4">
                <a href="tel:7208372463" className="block">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold transition-transform duration-300 hover:scale-110 cursor-pointer">
                    720-837-2463
                  </h3>
                </a>
                <p className="text-2xl sm:text-3xl">
                  Call now or request a free quote below
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-gradient-to-r from-gray-700 to-gray-500 hover:from-gray-600 hover:to-gray-400 text-white text-xl px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-200 animate-pulse border-2 border-white"
                >
                  <Link href="#contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-extrabold text-center text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-lg transition-transform duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Full Service Moving</h3>
                  <p className="text-black">Our Full Service Package takes care of your entire move. From carefully wrapping your furniture, 
                    to providing the truck and transportation along with moving supplies.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg transition-transform duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Labor Only</h3>
                  <p className="text-black">This affordable option includes professional movers for labor-only services, starting at just $220.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg transition-transform duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Commercial / Long-Distance</h3>
                  <p className="text-black">Ask about our special pricing for commercial and long-distance service</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-8">
              About 303 Moving And Labor Solutions
            </h2>
            <p className="text-xl text-black-600 text-center max-w-3xl mx-auto">
              Serving the Denver area since 2020, we bring years of experience and a 
              genuine commitment to excellence to every move. Our dedicated team works hard 
              to ensure a smooth, stress-free moving experience for each and every client.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-8">
              Contact Us
            </h2>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto transition-transform duration-300 hover:scale-105">
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2023 303 Moving And Labor Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}