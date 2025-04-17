"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const searchParams = useSearchParams()

  const reasons = searchParams.get("reasons")?.split(",") || []
  const from = searchParams.get("from") || "/"

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and authenticate here
    // For demo purposes, we'll just redirect to the home page
    window.location.href = from
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image src="/next.svg" alt="STC Logo" width={120} height={60} className="h-16 w-auto" />
        </div>

        {reasons.length > 0 && (
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <Info className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-700">تنبيه الوصول</AlertTitle>
            <AlertDescription className="text-amber-600">
              {reasons.includes("location") && <p>يبدو أنك تتصفح من خارج الكويت. يرجى تسجيل الدخول للمتابعة.</p>}
              {reasons.includes("source") && <p>يبدو أنك لم تصل من إعلانات جوجل. يرجى تسجيل الدخول للمتابعة.</p>}
              {reasons.includes("device") && <p>يبدو أنك تتصفح من جهاز غير محمول. يرجى تسجيل الدخول للمتابعة.</p>}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>أدخل بيانات حسابك للوصول إلى خدمات STC</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="أدخل رقم الهاتف"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-right"
                />
              </div>
              <div className="text-left">
                <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                  نسيت كلمة المرور؟
                </a>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-purple-700 hover:bg-purple-800" onClick={handleLogin}>
              تسجيل الدخول
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-gray-600">ليس لديك حساب؟</p>
          <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">
            إنشاء حساب جديد
          </a>
        </div>
      </div>
    </div>
  )
}
