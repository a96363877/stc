import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, CreditCard, ChevronRight } from "lucide-react"
import { ServiceCard } from "@/components/service-card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { Footer } from "@/components/footer"
import { GiftCard } from "@/components/gift-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center">
          <Menu className="w-7 h-7 text-purple-800" />
        </div>

        <div className="flex items-center">
          <img src="/next.svg" alt="STC Logo" width={80} height={40} className="h-10 w-auto" />
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
        <Image
          src="/hero-banner.jpg"
          alt="Hero Banner"
          width={700}
          height={400}
          className="w-full h-[280px] object-cover rounded-3xl"
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="bg-white/90 p-2 rounded-lg w-32 text-center">
            <div className="text-red-500 font-bold text-xl">خلك ON</div>
            <div className="text-red-500 text-[8px] mt-1">باقات الدفع المسبقة الجديدة كلياً</div>
          </div>

          <div className="space-y-2">
            <h1 className="text-purple-900 font-bold text-3xl leading-tight">
              تواصل بدون انقطاع
              <br />
              مع باقات الدفع الآجل
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
      <div className="grid grid-cols-5 gap-2 px-4 mt-6">
        <ServiceCard icon="store" title="e-store" titleAlignment="center" />
        <ServiceCard icon="shield" title="تحديث البطاقة المدنية" />
        <ServiceCard icon="arrow-right" title="نقل إلى stc" />
        <ServiceCard icon="plus-circle" title="احصل على خط جديد" />
        <ServiceCard icon="download" title="تحميل التطبيق" />
      </div>

      {/* Quick Payment */}
      <div className="mx-4 mt-8 p-6 bg-white rounded-xl shadow-sm">
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

      {/* Quick Access */}
      <div className="mx-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">الوصول السريع</h2>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <CategoryCard icon="phone" label="الأجهزة" />
          <CategoryCard icon="wifi" label="الإنترنت" />
          <CategoryCard icon="mobile" label="الجوال" />
          <CategoryCard icon="tv" label="التلفزيون" />
          <CategoryCard icon="headphones" label="الترفيه" />
        </div>
      </div>

      {/* Featured Products */}
      <div className="mx-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">تسوق أجهزة الجوال</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProductCard
            image="/samsung-s23.png"
            title="Samsung S23 Ultra"
            price="999.00"
            currency="د.ك"
            installment="41.63"
          />
          <ProductCard image="/s25-Ultra-silver-blue-700x700.webp" title="Samsung S25" price="799.00" currency="د.ك" installment="33.29" />
        </div>
      </div>

      {/* Samsung Banner */}
      <div className="mx-4 mt-8">
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src="/samsung-banner.jpg"
            alt="Samsung Banner"
            width={700}
            height={200}
            className="w-full h-[120px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-1 text-sm">تسوق الآن</Button>
            <div className="text-white text-right">
              <h3 className="font-bold text-lg">سامسونج جالكسي</h3>
              <p className="text-sm">اكتشف المجموعة الجديدة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Cards */}
      <div className="mx-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">تسوق البطاقات و الألعاب الإلكترونية</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GiftCard image="/pla.webp" title="Google Play" />
          <GiftCard image="/itun.webp" title="iTunes" />
        </div>
      </div>

      {/* Accessories */}
      <div className="mx-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">الأجهزة</h2>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <CategoryCard image="/router.png" label="راوتر" bgColor="bg-purple-100" />
          <CategoryCard image="/earbuds.png" label="سماعات" bgColor="bg-purple-100" />
          <CategoryCard image="/watch.png" label="ساعات" bgColor="bg-purple-100" />
        </div>
      </div>

      {/* Entertainment */}
      <div className="mx-4 mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-purple-800 p-0 flex items-center">
            المزيد <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
          <h2 className="text-xl font-bold text-gray-800">تسوق خدمات الترفيه</h2>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <CategoryCard image="/netflix.png" label="Netflix" bgColor="bg-purple-100" />
          <CategoryCard image="/shahid.png" label="Shahid" bgColor="bg-purple-100" />
          <CategoryCard image="/spotify.png" label="Spotify" bgColor="bg-purple-100" />
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-red-500 to-red-400 py-6 px-4">
        <div className="text-white text-center mb-4">
          <h3 className="font-bold text-lg">انضم إلى نشرتنا الإخبارية</h3>
          <p className="text-sm">احصل على آخر العروض والأخبار</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-white text-red-500 hover:bg-gray-100 flex-1">اشترك الآن</Button>
          <Input placeholder="البريد الإلكتروني" className="flex-1 bg-white text-right" />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
