// Country utilities for Step Stars app
// Safe for children - no GPS, only locale-based detection

export interface Country {
  code: string;
  name: string;
  flag: string;
}

// Popular countries list with flags
export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
].sort((a, b) => a.name.localeCompare(b.name));

/**
 * Detect user's country from browser locale
 * Safe for children - no GPS required
 */
export function detectCountryFromLocale(): string {
  try {
    const userLocale = navigator.language || navigator.languages?.[0] || 'en-US';
    const parts = userLocale.split('-');
    
    if (parts.length >= 2) {
      const countryCode = parts[1].toUpperCase();
      
      // Verify it's in our countries list
      const found = COUNTRIES.find(c => c.code === countryCode);
      if (found) {
        return countryCode;
      }
    }
    
    // Default to US if detection fails
    return 'US';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'US';
  }
}

/**
 * Get country info by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

/**
 * Save user's country choice to localStorage
 */
export function saveUserCountry(countryCode: string): void {
  try {
    localStorage.setItem('papi_user_country', countryCode);
  } catch (error) {
    console.error('Error saving country:', error);
  }
}

/**
 * Get saved user country from localStorage
 */
export function getSavedUserCountry(): string | null {
  try {
    return localStorage.getItem('papi_user_country');
  } catch (error) {
    console.error('Error getting saved country:', error);
    return null;
  }
}

/**
 * Check if user has completed country onboarding
 */
export function hasCompletedCountryOnboarding(): boolean {
  return getSavedUserCountry() !== null;
}

/**
 * Get user's country - from saved choice or auto-detect
 */
export function getUserCountry(): string {
  const saved = getSavedUserCountry();
  if (saved) {
    return saved;
  }
  return detectCountryFromLocale();
}
