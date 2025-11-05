import React, { useState, useEffect } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { HeartIcon, StarIcon } from '../KawaiiIcons';
import { 
  COUNTRIES, 
  detectCountryFromLocale, 
  saveUserCountry,
  getCountryByCode,
  type Country 
} from '../../utils/countryUtils';

interface CountryOnboardingScreenProps {
  onComplete: (countryCode: string) => void;
}

export function CountryOnboardingScreen({ onComplete }: CountryOnboardingScreenProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Auto-detect country from locale
    const detected = detectCountryFromLocale();
    setSelectedCountry(detected);
  }, []);
  
  const selectedCountryInfo = getCountryByCode(selectedCountry);
  
  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleConfirm = () => {
    saveUserCountry(selectedCountry);
    onComplete(selectedCountry);
  };
  
  const handleSkip = () => {
    const detected = detectCountryFromLocale();
    saveUserCountry(detected);
    onComplete(detected);
  };
  
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFE9EE] via-[#F5E9FF] to-[#D7F2F7] overflow-hidden flex flex-col">
      {/* Decorative floating hearts */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#FFB3C6] opacity-60 animate-bounce" style={{ animationDuration: '3s' }}>
        <HeartIcon size={16} />
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#D7C4F3] opacity-70 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <StarIcon size={12} />
      </div>
      <div className="absolute bottom-32 right-20 w-3 h-3 text-[#B8E3FF] opacity-50 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
        <HeartIcon size={12} />
      </div>
      <div className="absolute top-40 right-32 w-3 h-3 text-[#FFD66C] opacity-60 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
        <StarIcon size={12} />
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-['Nunito'] text-3xl text-[#2C2C2E] mb-3">
            Where are you from? 🌍
          </h1>
          <p className="font-['Nunito'] text-[#8E8E93] max-w-sm mx-auto">
            Choose your country to join local Step Stars 💛
          </p>
        </div>
        
        {/* Papi with Globe Illustration */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 bg-white/50 backdrop-blur-sm rounded-[32px] flex items-center justify-center shadow-lg">
            <div className="text-7xl animate-bounce" style={{ animationDuration: '2s' }}>
              🐾
            </div>
            <div className="absolute -right-2 -top-2 text-4xl animate-spin" style={{ animationDuration: '10s' }}>
              🌎
            </div>
          </div>
        </div>
        
        {/* Country Selector */}
        <div className="w-full max-w-md">
          <div className="kawaii-card p-6 bg-white/80 backdrop-blur-md mb-6">
            <label className="font-['Nunito'] text-sm text-[#8E8E93] mb-2 block">
              Your Country
            </label>
            
            {/* Selected Country Display / Dropdown Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-4 bg-white rounded-[20px] border-2 border-[#FFB7C5]/30 hover:border-[#FFB7C5] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCountryInfo?.flag || '🌍'}</span>
                <span className="font-['Nunito'] text-[#2C2C2E]">
                  {selectedCountryInfo?.name || 'Select a country'}
                </span>
              </div>
              <span className="text-[#8E8E93]">{isOpen ? '▲' : '▼'}</span>
            </button>
            
            {/* Dropdown List */}
            {isOpen && (
              <div className="mt-3 bg-white rounded-[20px] shadow-xl max-h-[300px] overflow-hidden border-2 border-[#FFB7C5]/30">
                {/* Search */}
                <div className="p-3 border-b border-[#F5F5F5] sticky top-0 bg-white">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-[#F5F5F5] rounded-full font-['Nunito'] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7C5]"
                  />
                </div>
                
                {/* Countries List */}
                <div className="overflow-y-auto max-h-[240px]">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full p-3 flex items-center gap-3 hover:bg-[#FFE9EE] transition-colors ${
                        selectedCountry === country.code ? 'bg-[#FFE9EE]' : ''
                      }`}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-['Nunito'] text-[#2C2C2E] text-left">
                        {country.name}
                      </span>
                      {selectedCountry === country.code && (
                        <span className="ml-auto text-[#FFB7C5]">✓</span>
                      )}
                    </button>
                  ))}
                  
                  {filteredCountries.length === 0 && (
                    <div className="p-6 text-center">
                      <p className="font-['Nunito'] text-[#8E8E93]">
                        No countries found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Auto-detected info */}
            <p className="font-['Nunito'] text-xs text-[#8E8E93] mt-3 text-center">
              We detected {getCountryByCode(detectCountryFromLocale())?.name} based on your device language
            </p>
          </div>
          
          {/* Buttons */}
          <div className="space-y-3">
            <KawaiiButton
              variant="primary"
              size="lg"
              onClick={handleConfirm}
              className="w-full"
            >
              💛 Confirm
            </KawaiiButton>
            
            <button
              onClick={handleSkip}
              className="w-full py-3 font-['Nunito'] text-[#8E8E93] hover:text-[#2C2C2E] transition-colors"
            >
              Skip for now
            </button>
          </div>
          
          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-[20px] border border-white/60">
            <p className="font-['Nunito'] text-xs text-[#8E8E93] text-center leading-relaxed">
              🔒 We don't use GPS or location tracking. Your country choice is only used for Step Stars rankings and is stored safely on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
