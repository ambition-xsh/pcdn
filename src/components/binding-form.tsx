import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/ui/button"
import { Input } from "../ui/ui/input"
import { Alert, AlertDescription } from "../ui/ui/alert"
import { cn } from "../lib/utils"
import type React from "react" // Import React

interface BindingFormProps {
  key: string
  isBinding: boolean
  feedback: {
    type: "success" | "error" | null
    message: string
  }
  onKeyChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function BindingForm({ key, isBinding, feedback, onKeyChange, onSubmit }: BindingFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.h2 variants={fadeUpVariants} custom={0} className="text-2xl font-bold text-white mb-2">
          绑定设备
        </motion.h2>
        <motion.p variants={fadeUpVariants} custom={1} className="text-white/80">
          请输入您的设备Key完成绑定
        </motion.p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <motion.div variants={fadeUpVariants} custom={2} className="space-y-2">
          <Input
            type="text"
            placeholder="请输入您的Key"
            value={key}
            onChange={(e) => onKeyChange(e.target.value)}
            disabled={isBinding}
            className="bg-white/[0.05] border-white/[0.08] text-white placeholder:text-white/40 h-12 text-lg"
          />
          <div className="text-sm text-white/60">
            <a href="/request-key" className="text-green-400 hover:text-green-300 transition-colors">
              没有Key？点击获取
            </a>
          </div>
        </motion.div>

        {feedback.type && (
          <motion.div variants={fadeUpVariants} custom={3}>
            <Alert
              variant={feedback.type === "success" ? "default" : "destructive"}
              className={cn(
                "border-0",
                feedback.type === "success" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300",
              )}
            >
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div variants={fadeUpVariants} custom={4}>
          <Button
            type="submit"
            className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
            disabled={isBinding || !key.trim()}
          >
            {isBinding ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                正在绑定...
              </>
            ) : (
              "绑定设备"
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.2 + i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

