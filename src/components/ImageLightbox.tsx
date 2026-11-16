import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface LightboxImageItem {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

interface ImageLightboxProps {
  images: LightboxImageItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const { lang } = useLanguage();
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex! + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex! - 1 + images.length) % images.length);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null || !images[currentIndex]) {
    return null;
  }

  const current = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title || current.alt}
      className="fixed inset-0 z-50 flex flex-col bg-cypress-950/95 backdrop-blur-md"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-limestone/15 px-4 py-3 text-limestone sm:px-6">
        <div className="flex items-center gap-3">
          <span className="rounded bg-cypress-800 px-2.5 py-1 text-xs font-bold tabular-nums text-bronze-300">
            {currentIndex + 1} / {images.length}
          </span>
          <p className="truncate text-sm font-semibold text-limestone">
            {current.title || current.alt}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomed((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-md border border-limestone/20 bg-cypress-900 px-3 py-1.5 text-xs font-semibold text-limestone hover:bg-cypress-800"
          >
            {zoomed ? (
              <>
                <ZoomOut className="h-4 w-4" strokeWidth={1.75} />
                <span>{lang === 'ar' ? 'تصغير' : 'Zoom Out'}</span>
              </>
            ) : (
              <>
                <ZoomIn className="h-4 w-4" strokeWidth={1.75} />
                <span>{lang === 'ar' ? 'تكبير' : 'Zoom In'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'ar' ? 'إغلاق المعرض' : 'Close Lightbox'}
            className="rounded-md border border-limestone/20 bg-cypress-900 p-1.5 text-limestone hover:bg-cypress-800"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8"
        onClick={onClose}
      >
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            aria-label={lang === 'ar' ? 'الصورة السابقة' : 'Previous image'}
            className="fixed start-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-limestone/25 bg-cypress-900/90 p-3 text-limestone shadow-lg transition hover:bg-cypress-800"
          >
            {lang === 'ar' ? (
              <ChevronRight className="h-6 w-6" strokeWidth={1.75} />
            ) : (
              <ChevronLeft className="h-6 w-6" strokeWidth={1.75} />
            )}
          </button>
        )}

        <img
          src={current.src}
          alt={current.alt}
          width={current.width || 1400}
          height={current.height || 900}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed((prev) => !prev);
          }}
          className={`rounded-lg bg-white/5 object-contain transition-transform duration-200 ${
            zoomed ? 'max-h-none max-w-none scale-125 cursor-zoom-out' : 'max-h-[78vh] max-w-[90vw] cursor-zoom-in'
          }`}
        />

        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
            aria-label={lang === 'ar' ? 'الصورة التالية' : 'Next image'}
            className="fixed end-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-limestone/25 bg-cypress-900/90 p-3 text-limestone shadow-lg transition hover:bg-cypress-800"
          >
            {lang === 'ar' ? (
              <ChevronLeft className="h-6 w-6" strokeWidth={1.75} />
            ) : (
              <ChevronRight className="h-6 w-6" strokeWidth={1.75} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

