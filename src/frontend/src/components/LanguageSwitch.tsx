import { type Language, useLanguage } from "@/i18n/LanguageContext";

const options: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center" data-ocid="language.switch">
      {options.map((option, index) => (
        <span key={option.code} className="flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="text-gray-500 text-sm">
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={language === option.code}
            aria-label={
              option.code === "en" ? "Switch to English" : "Passer au français"
            }
            data-ocid={`language.${option.code}_button`}
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
              language === option.code
                ? "text-white bg-white/10"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
