import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Clock, Phone } from 'lucide-react'

export function TopBanner() {
  return (
    <Alert className="rounded-none border-t-0 border-x-0 transition-transform duration-300 hover:scale-105 bg-black text-white ">
      <AlertDescription className="flex flex-col sm:flex-row justify-center items-center gap-4 text-lg">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          <span>Denver, Colorado, USA</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          <span>Open 24/7</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-6 w-6" />
          <a href="tel:7208372463" className="hover:underline">
            (720)-837-2463
          </a>
        </div>
      </AlertDescription>
    </Alert>
  )
}

