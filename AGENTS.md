# Project Guidance

## User Preferences

- English output must stay 100% identical to the current site
- Do not change any image, CSS, class, layout, spacing or colour
- Dictionary entries must be copied exactly, with no modification, shortening or re-translation

## Accepted Requirements

- Create fr.json with all 457 entries copied exactly, preserving line breaks
- Language context defaulting to English, persisted in localStorage under 'tmu-dao-language' and restored on every page and visit
- <html lang> set to 'en' or 'fr'
- Translate matching visible text, placeholders, titles, alt and aria-labels to French; unmatched text stays English; numbers, amounts and percentages unchanged
- Text-only EN | FR switch styled like existing header nav links, in exactly three places: desktop header before Join (xl only), next to the mobile menu button below lg, and footer next to Privacy
- English output stays 100% identical with no image, CSS, class, layout, spacing or colour changes

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- The site's translation layer lives in src/frontend/src/i18n/: fr.json is a flat English-to-French map and LanguageContext.tsx exports Language, LanguageProvider, useLanguage and LanguageContextValue; translation is applied at render time with t() so English output stays byte-identical.
- The language choice is stored in localStorage under 'tmu-dao-language' and document.documentElement.lang is synced to 'en' or 'fr'.
- The EN | FR switch is src/frontend/src/components/LanguageSwitch.tsx, mounted in Header.tsx (desktop actions before the Join button, and beside the mobile hamburger) and in Footer.tsx next to Privacy.
- The dictionary lookup is exact-key first, then tolerant of trailing colons and of the warning-sign variation selector; a missing key silently falls back to English, so every rendered literal needs a matching entry.
- ProjectsPage renderDescription branches compare the English project names, so those comparisons must never be translated.
- The TeleMeetUp and TMU-IRES descriptions are single strings with \n and \n\n separators split at runtime; translate the whole string before splitting.
- Header.tsx and Footer.tsx now render their labels through useLanguage().t(); navItems stays module-level with English labels and is translated only at render time.
- The Footer description paragraph is a multi-line JSX text node that collapses to the single-line fr.json key, so pass it to t() as one string.
- The desktop header language control in Header.tsx is now a single compact button showing only the other language (FR when English, EN when French) with classes px-1.5 py-1 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-md; the mobile block and Footer still render the shared LanguageSwitch component.
- fr.json values are single-line JSON strings; multi-paragraph French text needs real backslash-n escapes written via a script, since the edit tool escapes backslashes.
