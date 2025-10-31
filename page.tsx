"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import ChatBot from "@/components/chat-bot"
import { Shield, Book, AlertCircle, MessageCircle } from "lucide-react"

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  const features = [
    {
      icon: AlertCircle,
      title: "Mẹo Lái Xe An Toàn",
      description: "Các mẹo thực tế giúp bạn lái xe an toàn hơn trong mọi tình huống",
      href: "/driving-tips",
    },
    {
      icon: Book,
      title: "Luật Giao Thông",
      description: "Tìm hiểu đầy đủ về các luật lệ và quy định giao thông",
      href: "/traffic-laws",
    },
    {
      icon: Shield,
      title: "An Toàn Đôi Khi",
      description: "Các biện pháp bảo vệ và kiến thức giúp bạn an toàn trên đường",
      href: "/safety",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
        {/* Hero Section */}
        <div className="w-full bg-primary text-primary-foreground py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">Hướng Dẫn An Toàn Giao Thông</h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-balance">
                Học hỏi các mẹo lái xe an toàn, hiểu rõ luật giao thông, và trở thành một tài xế tự tin, có trách nhiệm
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link href="/driving-tips">
                  <Button size="lg" variant="secondary" className="text-base">
                    Khám Phá Mẹo
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base bg-primary-foreground/20 hover:bg-primary-foreground/30 border-primary-foreground/50"
                  onClick={() => setShowChat(true)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hỏi Chatbot
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Điều Gì Chúng Tôi Cung Cấp</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.title} href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-secondary/50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
                <p className="text-muted-foreground mt-2">Mẹo Lái Xe</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">30+</p>
                <p className="text-muted-foreground mt-2">Quy Tắc Giao Thông</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
                <p className="text-muted-foreground mt-2">Chatbot Hỗ Trợ</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
                <p className="text-muted-foreground mt-2">Miễn Phí</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </>
  )
}
