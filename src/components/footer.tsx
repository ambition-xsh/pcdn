import { useLanguage } from "../contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/[0.08] p-4">
      <div className="container mx-auto max-w-md flex flex-col items-center gap-2 text-sm text-white/60">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://titannet.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors whitespace-nowrap"
          >
            {t("Official Website")}: titannet.io
          </a>
          <a href="#" className="hover:text-green-400 transition-colors whitespace-nowrap">
            TG: @TitanNetwork
          </a>
          <a href="#" className="hover:text-green-400 transition-colors whitespace-nowrap">
            DC: @Titan
          </a>
        </div>
        <div className="text-white/40 text-xs">© 2024 Titan Network. {t("All rights reserved")}</div>
      </div>
    </footer>
  )
}

