"use client";

import React, { useState, useRef, useEffect } from "react";
import PhoneInputLib, { getCountryCallingCode, Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ChevronDown } from "lucide-react";

const ARABIC_NAMES: Record<string, string> = {
  EG: "مصر",
  SA: "السعودية",
  AE: "الإمارات",
  KW: "الكويت",
  QA: "قطر",
  BH: "البحرين",
  OM: "عُمان",
  JO: "الأردن",
};

const CustomCountrySelect = ({ value, onChange, options, iconComponent: Icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o: any) => o.value === value);

  return (
    <div 
      className="relative flex items-center h-full border-r border-gray-200/60" 
      ref={ref} 
      dir="rtl"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 h-full hover:bg-gray-100/50 transition-colors"
        dir="ltr"
      >
        <div className="w-6 h-[18px] shadow-sm rounded-sm overflow-hidden flex items-center justify-center shrink-0">
          {Icon && <Icon country={value || "EG"} label={selectedOption?.label} />}
        </div>
        <span className="text-sm font-bold text-gray-600">
          +{value ? getCountryCallingCode(value as Country) : "20"}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 max-h-64 overflow-y-auto">
          {options.filter((o: any) => o.value).map((option: any) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 transition-colors text-right ${value === option.value ? 'bg-emerald-50/50' : ''}`}
            >
              <div className="w-6 h-[18px] shadow-sm rounded-sm overflow-hidden flex items-center justify-center shrink-0">
                {Icon && <Icon country={option.value} label={option.label} />}
              </div>
              <span className="text-sm text-gray-700 font-bold flex-1 text-right">
                {ARABIC_NAMES[option.value] || option.label}
              </span>
              <span className="text-xs text-gray-400 font-sans font-medium" dir="ltr">
                +{getCountryCallingCode(option.value as Country)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  return (
    <div className="relative w-full custom-phone-wrapper" dir="ltr">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-phone-wrapper .PhoneInputCountryIcon {
          display: none !important;
        }
        .custom-phone-wrapper .PhoneInputCountry {
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
        }
        .custom-phone-wrapper button .PhoneInputCountryIcon {
          display: block !important;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none !important;
        }
      `}} />
      <PhoneInputLib
        international={false}
        defaultCountry="EG"
        countries={['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'JO']}
        value={value}
        onChange={onChange}
        countrySelectComponent={CustomCountrySelect}
        className={`flex items-center bg-[#F8FAFC] rounded-xl focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all h-[52px] ${
          error ? 'ring-2 ring-red-500/50' : ''
        }`}
        numberInputProps={{
          className: "flex-1 bg-transparent border-none py-2 px-4 text-sm focus:outline-none focus:ring-0 text-left font-sans font-medium",
        }}
      />
      {error && <span className="text-xs text-red-500 mt-1.5 block px-1 font-medium text-right" dir="rtl">{error}</span>}
    </div>
  );
}
