import React from 'react';

export const GmailLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 5.5V18.5C2 19.6046 2.89543 20.5 4 20.5H7V10.75L2 6.875V5.5Z" fill="#4285F4"/>
    <path d="M17 10.75V20.5H20C21.1046 20.5 22 19.6046 22 18.5V5.5L17 9.375V10.75Z" fill="#34A853"/>
    <path d="M2 5.5L12 13.25L22 5.5V4.5C22 3.39543 21.1046 2.5 20 2.5H18.5L12 7.5L5.5 2.5H4C2.89543 2.5 2 3.39543 2 4.5V5.5Z" fill="#EA4335"/>
    <path d="M22 5.5V4.5C22 3.39543 21.1046 2.5 20 2.5H18.5L22 5.5Z" fill="#FBBC04"/>
    <path d="M2 5.5V4.5C2 3.39543 2.89543 2.5 4 2.5H5.5L2 5.5Z" fill="#C5221F"/>
  </svg>
);

export const DriveLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8.66667 3.5H15.3333L22 15H15.3333L8.66667 3.5Z" fill="#34A853"/>
    <path d="M15.3333 3.5L22 15L18.6667 20.8333L12 9.33333L15.3333 3.5Z" fill="#FBBC04"/>
    <path d="M8.66667 3.5L12 9.33333L5.33333 20.8333L2 15L8.66667 3.5Z" fill="#4285F4"/>
  </svg>
);

export const OutlookLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11 5H18.5C19.6046 5 20.5 5.89543 20.5 7V17C20.5 18.1046 19.6046 19 18.5 19H11" stroke="#0078D4" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 7L13.5 12L10.5 9.5" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3"/>
    <rect x="3.5" y="5" width="12" height="12" rx="1.5" fill="#0078D4"/>
    <text x="9.5" y="13.5" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">O</text>
  </svg>
);

export const WhatsAppLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <img
    src="https://res.cloudinary.com/dfbh21zqc/image/upload/v1767542092/whatsapp_174879_fuq3bw.png"
    alt="WhatsApp"
    width={size}
    height={size}
    className={className}
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
);

export const GoogleCalendarLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="white"/>
    <path d="M2 10V6C2 3.79086 3.79086 2 6 2H10" stroke="#EA4335" strokeWidth="3" strokeLinecap="round"/>
    <path d="M2 14V18C2 20.2091 3.79086 22 6 22H10" stroke="#4285F4" strokeWidth="3" strokeLinecap="round"/>
    <path d="M14 22H18C20.2091 22 22 20.2091 22 18V14" stroke="#34A853" strokeWidth="3" strokeLinecap="round"/>
    <path d="M22 10V6C22 3.79086 20.2091 2 18 2H14" stroke="#FBBC04" strokeWidth="3" strokeLinecap="round"/>
    <text x="12" y="16" textAnchor="middle" fill="#4285F4" fontSize="10" fontFamily="sans-serif" fontWeight="bold">31</text>
  </svg>
);

export const UploadFileLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#6366F1"/>
    <path d="M12 8V16M12 8L9 11M12 8L15 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 16H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const VoiceWave = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="8" x2="8" y1="9" y2="15" />
    <line x1="16" x2="16" y1="9" y2="15" />
    <line x1="4" x2="4" y1="11" y2="13" />
    <line x1="20" x2="20" y1="11" y2="13" />
  </svg>
);

export const ModernMenuIcon = ({ className = "" }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="7" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="15" width="12" height="2" rx="1" fill="currentColor" />
  </svg>
);

export const XLogo = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const ModernAppsIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="3" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="3" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="13" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="13" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const MiniDocLogo = ({ size = 44, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 15H4C4 21 8 25 14 25V15Z" fill="#FF5A36"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M14 14C14 11.7909 15.7909 10 18 10H28C30.2091 10 32 11.7909 32 14V19H44C46.2091 19 48 20.7909 48 23V38C48 40.2091 46.2091 42 44 42H18C15.7909 42 14 40.2091 14 38V14Z" fill="#FF5A36"/>
    <rect x="20" y="27" width="12" height="4" rx="2" fill="white"/>
    <rect x="20" y="34" width="20" height="4" rx="2" fill="white"/>
  </svg>
);
