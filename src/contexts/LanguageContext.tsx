"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  zh: {
    "Device Binding": "设备绑定",
    "Device Binding System": "设备绑定系统",
    "Enter your device key": "请输入您的设备Key",
    "No key? Get one here": "没有Key？点击获取",
    "Bind Device": "绑定设备",
    "Binding...": "正在绑定...",
    "Device Status": "设备状态",
    "Serial Number": "序列号",
    "Binding Status": "绑定状态",
    Online: "在线",
    Offline: "离线",
    Bound: "已绑定",
    Unbound: "未绑定",
    fault: "故障",
    "Not Available": "未获取",
    "Checking device status...": "正在检查设备状态...",
    "Cannot get device status": "无法获取设备状态",
    "Please power on and connect": "请将设备通电通网10min后，再次进行绑定",
    "Device is already bound": "该设备已被绑定",
    "Enter your key to bind": "请输入您的设备Key完成绑定",
    "Binding successful": "恭喜您，设备绑定成功！",
    "Device already bound error": "抱歉，该设备已被绑定，请尝试其他设备。",
    "Binding failed": "绑定失败，请检查您的网络连接并重试。",
    "Invalid key": "无效的Key，请确保输入正确的设备Key。",
    "Network error": "网络错误，请检查您的网络连接并重试。",
    "System error": "系统错误，请稍后重试。",
    "Official Website": "官网",
    "All rights reserved": "版权所有",
    "Device not activated": "设备未激活",
    "Device activation message": "设备未激活，请将设备通电通网10min后，再次进行绑定",
    "Cannot bind": "无法绑定",
    "Already bound message": "该设备已被绑定，无法再次绑定",
    "Ready to bind": "可以绑定",
    "Bind now": "立即绑定",
    "Binding Success": "绑定成功",
    "Binding Failed": "绑定失败",
    "Device Not Ready": "设备未激活，请将设备通电通网10min-30min后，再次进行绑定",
    "Refresh Status": "刷新状态",
    "Need Help": "遇到问题？点击获取支持！",
    Refreshing: "正在刷新...",
  },
  en: {
    "Device Binding": "Device Binding",
    "Device Binding System": "Device Binding System",
    "Enter your device key": "Enter your device key",
    "No key? Get one here": "No key? Get one here",
    "Bind Device": "Bind Device",
    "Binding...": "Binding...",
    "Device Status": "Device Status",
    "Serial Number": "Serial Number",
    "Binding Status": "Binding Status",
    Online: "Online",
    Offline: "Offline",
    Bound: "Bound",
    Unbound: "Unbound",
    fault: "fault",
    "Not Available": "N/A",
    "Checking device status...": "Checking device status...",
    "Cannot get device status": "Cannot get device status",
    "Please power on and connect": "Please power on and connect the device for 10 minutes before trying again",
    "Device is already bound": "This device is already bound",
    "Enter your key to bind": "Enter your key to complete binding",
    "Binding successful": "Congratulations! Device binding successful!",
    "Device already bound error": "Sorry, this device is already bound. Please try another device.",
    "Binding failed": "Binding failed. Please check your network connection and try again.",
    "Invalid key": "Invalid key. Please make sure you enter the correct device key.",
    "Network error": "Network error. Please check your connection and try again.",
    "System error": "System error. Please try again later.",
    "Official Website": "Official Website",
    "All rights reserved": "All rights reserved",
    "Device not activated": "Device not activated",
    "Device activation message":
      "Device is not activated. Please power on and connect the device for 10 minutes before trying again",
    "Cannot bind": "Cannot bind",
    "Already bound message": "This device is already bound and cannot be bound again",
    "Ready to bind": "Ready to bind",
    "Bind now": "Bind now",
    // "Binding Status": "Binding Status",
    "Binding Success": "Binding Successful",
    "Binding Failed": "Binding Failed",
    "Device Not Ready":
      "Device not activated. Please power on and connect the device for 10-30 minutes before trying again",
    "Refresh Status": "Refresh Status",
    "Need Help": "Need help? Click for support!",
    Refreshing: "Refreshing...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

