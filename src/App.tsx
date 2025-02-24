"use client"
// import './globals.css'

// import { useState, useEffect } from "react"
import DeviceBinding from "./components/device-binding"
import { Button } from "./ui/ui/button"
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext"


function PageContent() {
  // const [deviceId, setDeviceId] = useState(generateRandomDeviceId())
  const { language, setLanguage } = useLanguage()

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // setDeviceId(generateRandomDeviceId())
  //   }, 30000) // 每30秒更新一次设备ID

  //   return () => clearInterval(intervalId)
  // }, [])

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center px-4">
      <div className="fixed top-4 right-4 flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          {language === "zh" ? "EN" : "中"}
        </Button>
      </div>

      <DeviceBinding />

      {/* <div className="fixed bottom-4 left-4 text-white/60 text-sm">Current Device ID: {deviceId}</div> */}
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  )
}

