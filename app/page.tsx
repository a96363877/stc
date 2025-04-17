import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, CreditCard } from "lucide-react"
import { ServiceCard } from "@/components/serv-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 bg-white border-b">
        <div className="flex items-center">
          <Menu className="w-7 h-7 text-purple-800" />
        </div>

        <div className="flex items-center">
          <Image src="/next.svg" alt="STC Logo" width={80} height={40} className="h-10 w-auto" />
        </div>

        <div className="flex items-center space-x-reverse space-x-6">
          <button className="p-1">
            <Search className="w-6 h-6 text-gray-800" />
          </button>
          <button className="p-1">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
          </button>
          <button className="p-1">
            <User className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative mx-4 my-6 rounded-3xl overflow-hidden shadow-md">
        <img
          src="/banner.webp"
          alt="Hero Banner"
          width={700}
          height={400}
          className="w-full h-[330px] object-cover rounded-3xl"
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="bg-white/90 p-2 rounded-lg w-32 text-center">
            <div className="text-red-500 font-bold text-xl">خلك ON</div>
            <div className="text-red-500 text-[8px] mt-1">باقات الدفع المسبقة الجديدة كلياً</div>
          </div>

          <div className="space-y-2">
            <h1 className="text-purple-900 font-bold text-3xl leading-tight">
            </h1>
            <div className="flex justify-end mt-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-2 font-medium">
                اعرف أكثر
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Icons */}
      <div className="grid grid-cols-4 gap-4 px-4 mt-6">
        <ServiceCard icon="store" title="e-store" titleAlignment="center" />
        <ServiceCard icon="shield" title="تحديث البطاقة المدنية" />
        <ServiceCard icon="arrow-right" title="نقل إلى stc" />
        <ServiceCard icon="plus-circle" title="احصل على خط جديد" />
      </div>

      {/* Quick Payment */}
      <div className="mx-4 mt-12 p-6 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <CreditCard className="w-8 h-8 text-purple-800" />
          <h2 className="text-2xl font-bold text-gray-800">الدفع السريع</h2>
        </div>

        <Input
          placeholder="رقم الجوال/البطاقة المدنية أو رقم العقد"
          className="text-right border-b border-gray-300 rounded-none focus:ring-0 mb-6 py-6 px-0"
        />

        <Button className="w-full bg-red-400 hover:bg-red-500 text-white rounded-full py-6 font-medium text-lg">
          تابع الآن
        </Button>
      </div>

      {/* WhatsApp Button */}
      
    </div>
  )
}
