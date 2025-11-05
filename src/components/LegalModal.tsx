import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-gradient-to-br from-[#FFE5EC] via-[#F3E5FF] to-[#E5F3FF] rounded-[28px] p-6 max-w-md w-full max-h-[80vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Nunito'] text-[22px] text-[#2C2C2E]">
            {isTerms ? 'Terms of Service' : 'Privacy Policy'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white active:scale-95 transition-all"
          >
            <span className="text-[#666] text-xl leading-none">×</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-5 shadow-sm">
            <p className="font-['Nunito'] text-[#8E8E93] text-xs mb-4">
              Last updated: November 2025
            </p>

            <div className="space-y-4 font-['Nunito'] text-[#2C2C2E] text-sm leading-relaxed">
              {isTerms ? (
                <>
                  <p>
                    Welcome to Papi Steps ("the App"). By downloading or using the App, you agree to these Terms. If you do not agree, please do not use the App.
                  </p>

                  <div>
                    <h3 className="font-semibold text-base mb-2">1. Use of the App</h3>
                    <ul className="space-y-1 list-none pl-0">
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Personal, non-commercial use only.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Do not copy, modify, distribute, sell, or lease any part of the App.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Use the App lawfully and respectfully.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">2. Accounts & Data</h3>
                    <p>
                      Certain features may access fitness/step data from your device (only with your permission). We do not collect personally identifying information unless you choose to provide it.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">3. Virtual Currency & Rewards</h3>
                    <p>
                      The App may include virtual coins/points with no real-world value. We may adjust rewards, limits, and events to maintain fair play.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">4. Intellectual Property</h3>
                    <p>
                      All graphics, animations, sounds, and designs are owned by the App's creator. Do not reuse without written permission.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">5. Warranty Disclaimer</h3>
                    <p>
                      The App is provided "as is" and "as available," without warranties of any kind.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">6. Limitation of Liability</h3>
                    <p>
                      To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from use of the App.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">7. Changes</h3>
                    <p>
                      We may update these Terms. Continued use after changes means you accept the updated Terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">8. Contact</h3>
                    <p>
                      Questions? Email:{' '}
                      <a 
                        href="mailto:marialobatsevych@gmail.com"
                        className="text-[#FFB7C5] underline"
                      >
                        marialobatsevych@gmail.com
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Your privacy matters. This Policy explains how we collect, use, and protect information.
                  </p>

                  <div>
                    <h3 className="font-semibold text-base mb-2">1. Information We Collect</h3>
                    <ul className="space-y-1 list-none pl-0">
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Step/fitness data from device sensors or health APIs (only with your permission).</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Basic device info (OS version, device type, country).</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Anonymous usage stats to improve performance.</span>
                      </li>
                    </ul>
                    <p className="mt-2">
                      We do not collect names, emails, GPS, or contact data unless you voluntarily provide them.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">2. How We Use Information</h3>
                    <ul className="space-y-1 list-none pl-0">
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Display progress and achievements.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#FFB7C5]">•</span>
                        <span>Improve UX, fix bugs, and maintain fair reward balance.</span>
                      </li>
                    </ul>
                    <p className="mt-2">
                      We do not sell or trade your data.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">3. Third-Party Services</h3>
                    <p>
                      We may use trusted analytics/ad tools that process non-identifiable data (e.g., device type, usage stats).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">4. Data Security</h3>
                    <p>
                      We apply reasonable safeguards, but no system is 100% secure. Use the App at your own risk.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">5. Children's Privacy</h3>
                    <p>
                      Not directed to children under 13. If you believe a child provided personal data, contact us for removal.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">6. Your Rights</h3>
                    <p>
                      You can delete local data by uninstalling the App. If account features are introduced, you will be able to access, correct, or delete your data.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">7. Changes</h3>
                    <p>
                      We may update this Policy. Continued use after updates signifies acceptance.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base mb-2">8. Contact</h3>
                    <p>
                      Privacy questions? Email:{' '}
                      <a 
                        href="mailto:marialobatsevych@gmail.com"
                        className="text-[#FFB7C5] underline"
                      >
                        marialobatsevych@gmail.com
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
