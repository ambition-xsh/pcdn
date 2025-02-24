"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Globe, RefreshCw } from "lucide-react"
// import { bindDevice, checkDeviceStatus } from "../actions"
import { Button } from "../ui/ui/button"
import { Input } from "../ui/ui/input"
import { Card, CardContent } from "../ui/ui/card"
import { Alert, AlertDescription } from "../ui/ui/alert"
import { ElegantShape } from "./elegant-background"
import { DeviceStatus } from "./device-status"
import { Footer } from "./footer"
import { cn } from "../lib/utils"
import { useLanguage } from "../contexts/LanguageContext"
import type { DeviceStatus as DeviceStatusType, DynamicObject } from "../types/device"
import type React from "react"
import { GET, POST } from "../request/service"
import { queryBySn, bindBySnAndKey } from "../request/api"

function getQueryParams(): any {
  if (typeof window !== 'undefined') {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const a: DynamicObject = {};
    for (const [key, value] of urlParams.entries()) {
      a[key] = value;
    }
    return a;
  }
}

// 使用示例
const params: DynamicObject = getQueryParams();
const sn = params.sn

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

export default function DeviceBinding() {
  const { t, language, setLanguage } = useLanguage()
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatusType | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const [isBinding, setIsBinding] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [key, setKey] = useState("")

  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const refreshStatus = async () => {
    setIsChecking(true)
    setIsRefreshing(true)
    try {
      // 根据接口处理 setDeviceStatus
      GET(`${queryBySn}?sn_code=${sn}`, '').then((status: any) => {
        if (status.data) {
          setDeviceStatus({ ...status.data, sn, isOnline: status.data.online, isBound: status.data.uuid == '' ? false : true })
        } else {
          setDeviceStatus({
            isOnline: 0, isBound: false, isActivated: false, sn, node_id: ''
          })
        }
      })
      // 清除之前的绑定反馈
      setFeedback({ type: null, message: "" })
    } catch (error) {
      console.error("Failed to refresh status:", error)
    } finally {
      setIsRefreshing(false)
      setIsChecking(false)
    }
  }

  useEffect(() => {
    GET(`${queryBySn}?sn_code=${sn}`, '').then((status: any) => {
      if (status.data) {
        setDeviceStatus({ ...status.data, sn, isOnline: status.data.online, isBound: status.data.uuid == '' ? false : true })
      } else {
        setDeviceStatus({
          isOnline: 0, isBound: false, isActivated: false, sn, node_id: ''
        })
      }
      setIsChecking(false)
    })
  }, [sn])

  const handleBind = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBinding(true)
    setFeedback({ type: null, message: "" })
    // 调起绑定接口
    try {
      POST(bindBySnAndKey, { sn_code:sn, key }).then((result: any) => {
        console.log(result.data);
        if (result.msg === 'OK') {
          setFeedback({
            type: "success",
            message: t("Binding Success"),
          })
          // 更新设备状态
          GET(`${queryBySn}?sn_code=${sn}`, '').then((status: any) => {
            if (status.data) {
              setDeviceStatus({ ...status.data, sn, isOnline: status.data.online, isBound: status.data.uuid == '' ? false : true })
            } else {
              setDeviceStatus({
                isOnline: 0, isBound: false, isActivated: false, sn, node_id: ''
              })
            }
          })
        } else {
          setFeedback({
            type: "error",
            message: t("Binding Failed") + ": " + result.message,
          })
        }
      })
    } catch (error) {
      setFeedback({
        type: "error",
        message: t("An error occurred during binding, please try again"),
      })
    } finally {
      setIsBinding(false)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh")
  }

  const renderContent = () => {
    if (isChecking) {
      return (
        <motion.div
          key="checking"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex flex-col items-center justify-center py-8 text-white/80"
        >
          <Loader2 className="w-6 h-6 animate-spin mb-4" />
          <span>{t("Checking device status...")}</span>
        </motion.div>
      )
    }

    if (!deviceStatus) {
      return (
        <motion.div
          key="error"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-center py-8"
        >
          <div className="text-red-400 font-medium text-lg">{t("Cannot get device status")}</div>
        </motion.div>
      )
    }

    // const showDeviceNotReadyMessage = !deviceStatus.isActivated || !deviceStatus.node_id
    const showDeviceNotReadyMessage = !deviceStatus.node_id


    return (
      <motion.div
        key="status"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{t("Device Status")}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            {isRefreshing ? t("Refreshing") : t("Refresh Status")}
          </Button>
        </div>

        <DeviceStatus status={deviceStatus} />

        {showDeviceNotReadyMessage ? (
          <Alert variant="destructive" className="bg-red-500/20 text-red-300 border-0">
            <AlertDescription>{t("Device Not Ready")}</AlertDescription>
          </Alert>
        ) : deviceStatus.isBound ? (
          <Alert variant="default" className="bg-blue-500/20 text-blue-300 border-0">
            <AlertDescription>{t("Already bound message")}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <Alert variant="default" className="bg-green-500/20 text-green-300 border-0">
              <AlertDescription>{t("Ready to bind")}</AlertDescription>
            </Alert>
            <form onSubmit={handleBind} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder={t("Enter your device key")}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  disabled={isBinding}
                  className="bg-white/10 border-white/[0.08] text-white placeholder:text-white/40"
                />
                <div className="text-sm text-white/60">
                  <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
                    {t("No key? Get one here")}
                  </a>
                </div>
              </div>

              {feedback.type && (
                <Alert
                  variant={feedback.type === "success" ? "default" : "destructive"}
                  className={cn(
                    "border-0",
                    feedback.type === "success" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300",
                  )}
                >
                  <AlertDescription>{feedback.message}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                disabled={isBinding || !key.trim()}
              >
                {isBinding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("Binding...")}
                  </>
                ) : (
                  t("Bind now")
                )}
              </Button>
            </form>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030303] px-4 pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.05] via-transparent to-green-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-green-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-green-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-green-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <img src="/src/assets/logo.png" alt="Titan Network" width={48} height={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Titan PCDN</h1>
          <p className="text-white/60">{t("Device Binding System")}</p>
        </motion.div>
      </div>

      <Card className="relative w-full max-w-md mx-auto bg-black/60 backdrop-blur-xl border-white/[0.08] shadow-xl">
        <CardContent className="p-8">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Globe className="h-5 w-5" />
            </Button>
          </div>
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </CardContent>
      </Card>

      {/* <div className="relative z-10 w-full max-w-md mx-auto mt-4 text-center">
        <a href="#support" className="text-white/60 hover:text-green-400 transition-colors text-sm">
          {t("Need Help")}
        </a>
      </div> */}

      <Footer />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}

