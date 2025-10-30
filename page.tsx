"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, AlertCircle, BookOpen, Shield } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const trafficSafetyResponses: Record<string, string> = {
  "tốc độ":
    "Tuân thủ giới hạn tốc độ là rất quan trọng! 🚗 Tốc độ an toàn giúp bạn có thời gian phản ứng đủ khi gặp tình huống khẩn cấp. Hãy luôn giảm tốc độ trong khu vực dân cư, gần trường học, và khi thời tiết xấu.",
  "đèn giao thông":
    "Luôn tuân thủ tín hiệu đèn giao thông! 🚦 Đèn đỏ = dừng, đèn vàng = chuẩn bị dừng, đèn xanh = được phép đi. Hãy kiểm tra an toàn trước khi vượt qua ngã tư, ngay cả khi đèn xanh.",
  "dây an toàn":
    "Dây an toàn là bạn của bạn! 🛡️ Luôn thắt dây an toàn trước khi khởi động xe, dù chỉ đi quãng đường ngắn. Nó có thể cứu sống bạn trong trường hợp tai nạn.",
  "rượu lái":
    "KHÔNG bao giờ lái xe sau khi uống rượu! 🚫 Rượu làm giảm khả năng phản ứng và nhận thức. Hãy gọi taxi, Grab hoặc nhờ bạn bè lái xe nếu bạn đã uống rượu.",
  "điện thoại":
    "Không sử dụng điện thoại khi lái xe! 📵 Sử dụng điện thoại làm mất tập trung và tăng nguy cơ tai nạn. Nếu cần, hãy dừng xe ở nơi an toàn để trả lời.",
  mưa: "Lái xe an toàn trong mưa: 🌧️ Giảm tốc độ, tăng khoảng cách với xe phía trước, bật đèn chiếu sáng, và kiểm tra gạt nước. Tránh phanh gấp vì bánh xe có thể trượt.",
  đêm: "Lái xe ban đêm cần cẩn thận: 🌙 Bật đèn chiếu sáng, giảm tốc độ, và tập trung cao độ. Mệt mỏi là nguyên nhân chính gây tai nạn đêm - nếu buồn ngủ, hãy dừng lại nghỉ ngơi.",
  "khoảng cách":
    "Giữ khoảng cách an toàn với xe phía trước! 📏 Quy tắc 3 giây: chọn một điểm, khi xe phía trước vượt qua, đếm 3 giây. Nếu bạn vượt qua trước 3 giây, bạn quá gần.",
  vượt: "Vượt xe an toàn: ✅ Chỉ vượt khi có tầm nhìn rõ ràng, không có xe đối diện, và có đủ khoảng cách. Kiểm tra gương chiếu hậu, báo hiệu, và vượt nhanh chóng.",
  "đỗ xe":
    "Đỗ xe an toàn: 🅿️ Chỉ đỗ ở những nơi được phép, không chắn lối đi, không đỗ gần góc đường. Luôn khóa cửa và kiểm tra xung quanh trước khi mở cửa.",
  "mũ bảo hiểm":
    "Mũ bảo hiểm là bắt buộc! 🏍️ Đối với người đi xe máy, mũ bảo hiểm có thể cứu sống bạn. Hãy chọn mũ chất lượng tốt và đeo đúng cách.",
  "kiểm tra xe":
    "Kiểm tra xe thường xuyên: 🔧 Kiểm tra lốp xe, dầu nhớt, phanh, đèn, và gạt nước. Xe được bảo dưỡng tốt giảm nguy cơ tai nạn do lỗi kỹ thuật.",
  "mệt mỏi":
    "Nếu cảm thấy mệt mỏi khi lái xe: 😴 Hãy dừng lại, uống nước, hoặc ngủ ngắn 15-20 phút. Không bao giờ cố gắng lái xe khi buồn ngủ - đó là rất nguy hiểm!",
  "tâm lý":
    "Giữ bình tĩnh khi lái xe: 😌 Tránh tức giận, lo lắng, hoặc bất kỳ cảm xúc mạnh nào. Tâm lý ổn định giúp bạn đưa ra quyết định đúng đắn trên đường.",
  "xin chào":
    "Xin chào! 👋 Tôi là cố vấn an toàn giao thông của bạn. Tôi sẵn sàng giúp bạn với các mẹo lái xe, luật giao thông, và lời khuyên về an toàn. Bạn muốn hỏi gì?",
  hi: "Xin chào! 👋 Tôi là cố vấn an toàn giao thông của bạn. Tôi sẵn sàng giúp bạn với các mẹo lái xe, luật giao thông, và lời khuyên về an toàn. Bạn muốn hỏi gì?",
  default:
    "Cảm ơn bạn đã hỏi! 😊 Tôi có thể giúp bạn về: tốc độ, đèn giao thông, dây an toàn, rượu lái, điện thoại, lái xe mưa, lái xe đêm, khoảng cách an toàn, vượt xe, đỗ xe, mũ bảo hiểm, kiểm tra xe, mệt mỏi, và tâm lý lái xe. Hãy hỏi về bất kỳ chủ đề nào!",
}

export default function TrafficSafetyChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! 👋 Tôi là cố vấn an toàn giao thông của bạn. Tôi sẵn sàng giúp bạn với các mẹo lái xe, luật giao thông, và lời khuyên về an toàn. Bạn muốn hỏi gì?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim()

    for (const [key, response] of Object.entries(trafficSafetyResponses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response
      }
    }

    return trafficSafetyResponses["default"]
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Cố Vấn An Toàn Giao Thông</h1>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-gray-600 text-sm md:text-base">Lái xe an toàn, bảo vệ bản thân và gia đình</p>
        </div>

        {/* Chat Container */}
        <Card className="h-96 md:h-[500px] flex flex-col bg-white shadow-lg">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hỏi về an toàn giao thông..."
                className="flex-1 text-sm md:text-base"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Luật Giao Thông</h3>
                <p className="text-sm text-gray-600">Tuân thủ các quy tắc giao thông để bảo vệ bản thân</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Mẹo Lái Xe</h3>
                <p className="text-sm text-gray-600">Học các kỹ năng lái xe an toàn và hiệu quả</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">An Toàn Trước Tiên</h3>
                <p className="text-sm text-gray-600">Luôn ưu tiên an toàn cho chính bạn và người khác</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            💡 Hãy hỏi tôi về: tốc độ, đèn giao thông, dây an toàn, rượu lái, điện thoại, mưa, đêm, và nhiều hơn nữa!
          </p>
        </div>
      </div>
    </div>
  )
}
