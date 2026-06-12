import React from 'react';

/* ---------------------------------------------------------------- */
/*  Advanced CoverView brand mark — a miniature cover card with     */
/*  an image, title bars and a spark for the "Advanced" part.       */
/* ---------------------------------------------------------------- */

export const AcvMark = ({ className = '', style }) => (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="acvMarkGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E8475F" />
                <stop offset="100%" stopColor="#FF8E47" />
            </linearGradient>
        </defs>
        <rect x="4" y="12" width="50" height="42" rx="11" fill="url(#acvMarkGrad)" />
        <rect x="33" y="21" width="14" height="4.5" rx="2.25" fill="#FFF9F1" opacity="0.95" />
        <rect x="33" y="29" width="9" height="4.5" rx="2.25" fill="#FFF9F1" opacity="0.7" />
        <circle cx="17.5" cy="25.5" r="4.8" fill="#FFF9F1" opacity="0.95" />
        <path d="M10 49 L21 37.5 L28 44.5 L36.5 35.5 L48 47 V48.5 Q48 50 46.5 50 H11.5 Q10 50 10 48.5 Z" fill="#FFF9F1" opacity="0.9" />
        <path d="M53 2.5 C53.9 6.8 56.2 9.1 60.5 10 C56.2 10.9 53.9 13.2 53 17.5 C52.1 13.2 49.8 10.9 45.5 10 C49.8 9.1 52.1 6.8 53 2.5 Z" fill="#E8475F" />
    </svg>
);

/* ---------------------------------------------------------------- */
/*  Garnish                                                         */
/* ---------------------------------------------------------------- */

export const Sparkle = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 C13 8 16 11 22 12 C16 13 13 16 12 22 C11 16 8 13 2 12 C8 11 11 8 12 2 Z" fill="currentColor" />
    </svg>
);

export const Squiggle = ({ className = '' }) => (
    <svg viewBox="0 0 220 18" preserveAspectRatio="none" className={className} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 13 C30 4 55 4 78 11 C101 18 130 16 152 9 C174 2 200 4 217 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
);

export const Wave = ({ className = '', fill }) => (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 52 C180 92 330 8 520 36 C700 62 860 12 1040 32 C1210 51 1340 28 1440 44 L1440 0 L0 0 Z" fill={fill} />
    </svg>
);

/* ---------------------------------------------------------------- */
/*  Stroke icon set (24×24, currentColor)                           */
/* ---------------------------------------------------------------- */

const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

export const IconBolt = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2 L4.5 13.5 H11 L9.5 22 L19.5 10 H13 Z" fill="currentColor" />
    </svg>
);

export const IconHeart = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21 C7 17 3 13.5 3 9.5 A4.5 4.5 0 0 1 12 7 A4.5 4.5 0 0 1 21 9.5 C21 13.5 17 17 12 21 Z" fill="currentColor" />
    </svg>
);

export const IconType = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <path d="M5 7 V4.5 H19 V7 M12 4.5 V19.5 M9 19.5 H15" />
    </svg>
);

export const IconPalette = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.5 A9.5 9.5 0 1 1 21.5 12 C21.5 14.2 19.7 16 17.5 16 H15.3 A1.8 1.8 0 0 0 13.9 18.9 C14.6 19.8 14 21.5 12 21.5 Z" {...strokeProps} />
        <circle cx="8" cy="10" r="1.3" fill="currentColor" />
        <circle cx="12" cy="7.5" r="1.3" fill="currentColor" />
        <circle cx="16" cy="10" r="1.3" fill="currentColor" />
    </svg>
);

export const IconDownload = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <path d="M12 3.5 V14.5 M7.5 10.5 L12 15 L16.5 10.5 M4 17.5 V18.5 A2 2 0 0 0 6 20.5 H18 A2 2 0 0 0 20 18.5 V17.5" />
    </svg>
);

export const IconBot = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <rect x="5" y="8" width="14" height="11" rx="3" />
        <path d="M12 8 V5 M5 13 H3 M19 13 H21" />
        <circle cx="12" cy="3.5" r="1.4" />
        <circle cx="9.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
        <path d="M9.5 16.2 H14.5" />
    </svg>
);

export const IconCode = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <path d="M8.5 7 L4 12 L8.5 17 M15.5 7 L20 12 L15.5 17" />
    </svg>
);

export const IconLayers = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <path d="M12 3 L21 8 L12 13 L3 8 Z" />
        <path d="M4.5 12 L12 16.2 L19.5 12" />
        <path d="M4.5 16 L12 20.2 L19.5 16" />
    </svg>
);

export const IconImage = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        <circle cx="8.5" cy="10" r="1.6" />
        <path d="M5 18 L10.5 12.5 L14 16 L16.5 13.5 L20.5 17.5" />
    </svg>
);

export const IconDevice = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M12 8.5 V13.5 M9.8 11.3 L12 13.5 L14.2 11.3 M10.8 17.5 H13.2" />
    </svg>
);

export const IconGrid = ({ className = '', style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
);
