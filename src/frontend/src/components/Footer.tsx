import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/i18n/LanguageContext";
import { Heart, Linkedin } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer
      className="border-t border-white/10"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/assets/generated/tmu-ai-dao-logo-transparent.dim_200x200.png"
                alt="TMU AI DAO"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-white">TMU AI DAO</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              {t(
                "A global social enterprise DAO on the Internet Computer Protocol (ICP), building the future of decentralized governance and Web3 innovation.",
              )}
            </p>
          </div>

          {/* Quick Links - Two Column Layout */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("Quick Links")}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <a
                href="/"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("Home")}
              </a>
              <a
                href="/whitepaper"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("White Paper")}
              </a>
              <a
                href="/tokenomics"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Tokenomics
              </a>
              <a
                href="/projects"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("Projects/SubDAOs")}
              </a>
              <a
                href="/roadmap"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("Road Map")}
              </a>
              <a
                href="/web2web3bridge"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("Web2-Web3 Bridge")}
              </a>
              <a
                href="/resource"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("Resources")}
              </a>
              <a
                href="/signup"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t("Sign Up")}
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("Connect")}</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SiX size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026 TMU AI DAO</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.tmu.ai/terms.php"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a2744] text-white text-sm rounded-md hover:bg-[#243555] transition-colors"
              >
                {t("Terms")}
              </a>
              <a
                href="https://www.tmu.ai/privacy.php"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a2744] text-white text-sm rounded-md hover:bg-[#243555] transition-colors"
              >
                {t("Privacy")}
              </a>
              <LanguageSwitch />
            </div>
          </div>
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-4 md:mt-0">
            {t("Built with")}{" "}
            <Heart size={14} className="text-red-500 fill-red-500" />{" "}
            {t("using")}{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
