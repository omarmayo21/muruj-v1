import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/tracking';

export const FloatingContactBar: React.FC = () => {
  const { lang } = useLanguage();

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappE164}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappDefaultMessage[lang]
  )}`;

  return (
    /* Mobile-only Bottom Floating Action Bar (hidden on md+ desktop screens per Task 9) */
    <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 gap-2 border-t border-hairline bg-limestone/95 p-2.5 shadow-desk backdrop-blur-md md:hidden">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('click_whatsapp', { whatsapp_location: 'floating_mobile' })}
        className="flex items-center justify-center gap-2 rounded-lg bg-cypress-900 py-3 text-sm font-bold text-limestone shadow-sm active:scale-[0.99]"
      >
        <MessageCircle className="h-4 w-4 text-bronze-400" strokeWidth={1.75} />
        <span>{lang === 'ar' ? 'واتساب المبيعات' : 'WhatsApp'}</span>
      </a>

      <a
        href={`tel:${SITE_CONFIG.contact.phoneE164}`}
        onClick={() => trackEvent('click_call', { call_location: 'floating_mobile' })}
        className="flex items-center justify-center gap-2 rounded-lg border border-cypress-900 bg-travertine py-3 text-sm font-bold text-cypress-950 active:scale-[0.99]"
      >
        <PhoneCall className="h-4 w-4 text-cypress-900" strokeWidth={1.75} />
        <span>{lang === 'ar' ? 'اتصل الآن' : 'Call Now'}</span>
      </a>
    </div>
  );
};
