import type { DeviceStatus } from "../types/device"
import { Badge } from "../ui/ui/badge"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

interface DeviceStatusProps {
  status: DeviceStatus
}

export function DeviceStatus({ status }: DeviceStatusProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 rounded-lg bg-white/[0.02]"
    >
      <div className="flex items-center justify-between">
        <span className="text-white/80 font-medium">{t("Device Status")}</span>
        <Badge
          variant={status.isOnline == 1? "success" : "destructive"}
          className={`px-3 py-1 text-sm ${
            status.isOnline == 1
              ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
              : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
          }`}
        >
          {t(status.isOnline == 1 ? "Online" : status.isOnline == 2 ?"Offline":"fault")}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-white/[0.08]">
          <span className="text-white/80">{t("Serial Number")}</span>
          <span className="text-white font-mono text-sm bg-white/[0.05] px-3 py-1.5 rounded w-full sm:w-auto text-center sm:text-left">
            {status.sn}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-white/[0.08]">
          <span className="text-white/80">Agent ID</span>
          <span className="text-white font-mono text-sm bg-white/[0.05] px-3 py-1.5 rounded w-full sm:w-auto text-center sm:text-left">
            {status.node_id || t("Not Available")}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
          <span className="text-white/80">{t("Binding Status")}</span>
          <Badge
            variant={status.isBound ? "default" : "secondary"}
            className={`px-3 py-1 text-sm ${
              status.isBound
                ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                : "bg-orange-500/20 text-orange-300 hover:bg-orange-500/30"
            }`}
          >
            {t(status.isBound ? "Bound" : "Unbound")}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}

