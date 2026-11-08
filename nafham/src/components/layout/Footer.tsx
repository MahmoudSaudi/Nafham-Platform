import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-12 pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <Link href="/" className="flex items-center gap-3 mb-6 h-16">
              <Image src="/images/logo.svg" alt="Nafham Logo" width={64} height={64} className="brightness-0 invert w-16 h-16" />
              <span className="text-white font-bold text-4xl tracking-tight">نفهم</span>
            </Link>
            <p className="text-base text-gray-400 leading-relaxed mb-6 flex-1">
              منصة تعليمية رائدة تقدم محتوى عالي الجودة لتمكين الشباب وتطوير مهاراتهم في مجالات التكنولوجيا، الإدارة، والتصميم بأفضل الوسائل الحديثة.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <Link href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <TwitterIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <LinkedinIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col h-full">
            <h3 className="text-white font-bold text-xl mb-6 relative flex items-center h-16 w-fit">
              روابط سريعة
              <span className="absolute bottom-2 right-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <ul className="flex-1 flex flex-col gap-4">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors inline-block">الرئيسية</Link></li>
              <li><Link href="/courses" className="hover:text-emerald-400 transition-colors inline-block">مسارات التعلم</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors inline-block">المدونة التعليمية</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors inline-block">عن نفهم</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col h-full">
            <h3 className="text-white font-bold text-xl mb-6 relative flex items-center h-16 w-fit">
              الدعم والمساعدة
              <span className="absolute bottom-2 right-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <ul className="flex-1 flex flex-col gap-4">
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors inline-block">الشروط والأحكام</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors inline-block">سياسة الخصوصية</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors inline-block">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col h-full">
            <h3 className="text-white font-bold text-xl mb-6 relative flex items-center h-16 w-fit">
              تواصل معنا
              <span className="absolute bottom-2 right-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <ul className="flex-1 flex flex-col justify-between">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col items-start flex-1 mt-1">
                  <p className="text-sm text-gray-400 mb-1">البريد الإلكتروني</p>
                  <a href="mailto:info@nafham.com" className="hover:text-emerald-400 transition-colors font-sans text-base">
                    info@nafham.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col items-start flex-1 mt-1">
                  <p className="text-sm text-gray-400 mb-1">الهاتف / واتساب</p>
                  <a href="tel:+966501234567" className="hover:text-emerald-400 transition-colors font-sans text-base" dir="ltr">
                    +966 50 123 4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="mt-1">
                  <p className="text-sm text-gray-400 mb-1">العنوان</p>
                  <p className="text-base">الرياض، المملكة العربية السعودية<br/>شارع العليا العام</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-base text-gray-500">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لمنصة نفهم.</p>
          <div className="flex gap-4 items-center">
            {/* Mada */}
            <div className="bg-white px-2 py-1 rounded flex items-center justify-center">
              <svg viewBox="0 0 50 16" width="40" height="16">
                <text x="25" y="14" fontSize="16" fontWeight="900" fill="#009A44" textAnchor="middle" fontFamily="sans-serif">mada</text>
              </svg>
            </div>
            {/* Visa */}
            <div className="bg-[#1434CB] px-2 py-1 rounded flex items-center justify-center">
              <svg viewBox="0 0 320 100" width="40" height="16">
                <path fill="#FFF" d="M141.5 97.4l13.5-84.3h21.4l-13.5 84.3h-21.4zm95.1-82.5c-4-1.5-10.7-3.1-19.4-3.1-21.1 0-36 11.2-36.1 27.2-.1 11.8 10.6 18.4 18.7 22.3 8.3 4 11.1 6.6 11.1 10.2-.1 5.5-6.6 8-12.7 8-8.5 0-13.1-1.3-20.1-4.4l-2.8-1.3-3 18.8c5 2.3 14.2 4.3 23.7 4.4 22.5 0 37.1-11.1 37.3-28.3.1-9.4-5.3-16.5-18-22.5-7.5-3.8-12-6.4-12-10.3 0-3.5 4-7.2 12.2-7.2 6.8-.1 11.6 1.4 15.6 3l2.2 1L236.6 14.9zM98.6 14.9l-17 58.1-1.8-9.3C76.4 46 63 30 42.6 21.3l13.5 76H78l20.6-82.4H98.6zm139.7 0l-20.1 82.4h22.6l4.5-12.4h27.6l2.6 12.4h19.9l-19.2-82.4h-17.9c-4.2 0-7.6 2.3-9.3 6.3L238.3 14.9zm13.1 52l6.5-17.8c.1 0 1.3-3.6 2.1-5.9l1.1 5.4 3.7 18.3h-13.4z"/>
                <path fill="#F7B600" d="M68.7 14.9H22L0 97.4h21.4l4-10.9h30.2L68.7 14.9z"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="bg-transparent flex items-center justify-center">
              <svg viewBox="0 0 32 20" width="36" height="24">
                <circle fill="#EB001B" cx="10" cy="10" r="10"/>
                <circle fill="#F79E1B" cx="22" cy="10" r="10"/>
                <path fill="#FF5F00" d="M16 18c-3.1-2-5-5.3-5-8.8s1.9-6.8 5-8.8c3.1 2 5 5.3 5 8.8s-1.9 6.8-5 8.8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
