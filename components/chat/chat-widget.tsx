"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, User, Bot, Loader2, Minus, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "bot"
  text: string
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hello! I'm the YESJ Assistant. Ask me anything about our programs, mission, or how to get involved!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
    }
  }, [messages, isOpen, isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: "I'm sorry, I'm having trouble connecting right now. Please check your connection and try again.",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[110] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              filter: "blur(0px)",
              height: isMinimized ? "64px" : "min(85vh, 600px)"
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
            className={cn(
               "mb-4 w-[calc(100vw-32px)] sm:w-[400px] pointer-events-auto overflow-hidden flex flex-col transition-all duration-300 ease-in-out shadow-2xl rounded-md border border-white/20",
               isMinimized ? "bg-primary text-white" : "glass-card bg-white/95 backdrop-blur-md"
            )}
          >
            {/* Header */}
            <div 
              className={cn(
                "p-4 flex items-center justify-between transition-colors",
                isMinimized ? "bg-primary" : "bg-primary text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner overflow-hidden">
                  <motion.div
                    animate={isLoading ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Bot className="w-6 h-6" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-black tracking-tight text-sm">YESJ Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 border border-white/20 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-hide flex flex-col">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        msg.role === "user" ? "flex-row-reverse self-end" : "flex-row self-start"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-md flex items-center justify-center shrink-0 shadow-sm",
                        msg.role === "user" ? "bg-secondary text-white" : "bg-white text-primary border border-gray-100"
                      )}>
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={cn(
                        "p-3 text-sm shadow-sm",
                        msg.role === "user"
                          ? "bg-primary text-white rounded-md rounded-tr-none"
                          : "bg-white border border-gray-100 text-gray-800 rounded-md rounded-tl-none"
                      )}>
                        <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                        <div className={cn(
                          "text-[9px] mt-1.5 opacity-50 font-medium uppercase tracking-tighter text-right",
                          msg.role === "user" ? "text-white" : "text-gray-400"
                        )}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 self-start"
                    >
                      <div className="w-8 h-8 rounded-md bg-white text-primary border border-gray-100 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white border border-gray-100 rounded-md p-3 rounded-tl-none shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask YESJ Assistant..."
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-4 h-11 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="w-11 h-11 rounded-md bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-primary/20 active:scale-95 shrink-0"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                  </form>
                  <div className="mt-3 flex items-center justify-center gap-2 grayscale opacity-40">
                    <div className="h-[1px] w-8 bg-gray-300"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">YESJ INTELLIGENCE</p>
                    <div className="h-[1px] w-8 bg-gray-300"></div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-md shadow-2xl flex items-center justify-center bg-primary text-white transition-all overflow-hidden relative group"
          aria-label="Open chat"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          
          <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8" />
        </motion.button>
      )}
    </div>
  )
}
