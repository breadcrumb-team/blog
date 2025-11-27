import { useMemo, useState } from "react";
import cls from "../styles/header-main-local.module.css";

type HeaderMainLocalProps = {
  isActive?: string;
  logoOnly?: boolean;
  className?: string;
};

export default function HeaderMainLocal(props: HeaderMainLocalProps) {
  const { isActive, logoOnly, className } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usecasesOpen, setUsecasesOpen] = useState(false);
  const [mobileUsecasesOpen, setMobileUsecasesOpen] = useState(false);

  const rootClass = useMemo(() => {
    const extra = [cls.root];
    if (logoOnly) extra.push(cls.logoOnly);
    if (className) extra.push(className);
    return extra.join(" ");
  }, [className, logoOnly]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className={rootClass} role="banner">
      <div className={cls.container}>
        <div className={cls.logoWrap}>
          <a href="https://breadcrumb.ai/" className={cls.logo} aria-label="Breadcrumb AI - Go to homepage">
            <img
              src="/blog/images/breadcrumb-logo.svg"
              alt="Breadcrumb AI"
              width={120}
              height={24}
              className={cls.logoImage}
            />
          </a>
        </div>

        <button
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          className={cls.menuToggle}
          onClick={() => setMobileOpen((v) => !v)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className={cls.menu}> 
          <nav className={cls.nav} aria-label="Main navigation">
            <div className={cls.usecases}>
              <button 
                className={cls.navLink} 
                onClick={() => setUsecasesOpen((v) => !v)}
                aria-expanded={usecasesOpen}
                aria-haspopup="true"
              >
                Solutions ▾
              </button>
              <div 
                className={`${cls.usecasesMenu} ${usecasesOpen ? cls.usecasesMenuOpen : cls.usecasesMenuHidden}`}
                onMouseLeave={() => setUsecasesOpen(false)}
                role="menu"
              >
                <div className={cls.usecasesGrid}>
                  <a href="https://breadcrumb.ai/usecase/marketing" className={cls.usecaseCard} role="menuitem">
                    <div className={cls.usecaseIcon} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className={cls.usecaseTitle}>Marketing</h3>
                    <p className={cls.usecaseDescription}>Engage stakeholders with interactive dashboards and data visualization</p>
                  </a>
                  <a href="https://breadcrumb.ai/usecase/sales" className={cls.usecaseCard} role="menuitem">
                    <div className={cls.usecaseIcon} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M2 12h20"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <h3 className={cls.usecaseTitle}>Sales & Revenue</h3>
                    <p className={cls.usecaseDescription}>Track performance and optimize revenue with real-time insights</p>
                  </a>
                  <a href="https://breadcrumb.ai/usecase/business-operations" className={cls.usecaseCard} role="menuitem">
                    <div className={cls.usecaseIcon} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M9 9h6v6H9z"/>
                      </svg>
                    </div>
                    <h3 className={cls.usecaseTitle}>Business Operations</h3>
                    <p className={cls.usecaseDescription}>Streamline operations with automated reporting and analytics</p>
                  </a>
                  <a href="https://breadcrumb.ai/usecase/live-events" className={cls.usecaseCard} role="menuitem">
                    <div className={cls.usecaseIcon} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                      </svg>
                    </div>
                    <h3 className={cls.usecaseTitle}>Live Events</h3>
                    <p className={cls.usecaseDescription}>Monitor event performance and engagement in real-time</p>
                  </a>
                  <a href="https://breadcrumb.ai/usecase/embedded-analytics-reporting" className={cls.usecaseCard} role="menuitem">
                    <div className={cls.usecaseIcon} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3v18h18"/>
                        <path d="M7 16l4-4 4 4 6-6"/>
                      </svg>
                    </div>
                    <h3 className={cls.usecaseTitle}>Embedded Analytics</h3>
                    <p className={cls.usecaseDescription}>Build custom reports from your data and analyze them as you see fit</p>
                  </a>
                  <a href="https://breadcrumb.ai/partner-engagement" className={cls.usecaseCard} role="menuitem">
                    <div className={cls.usecaseIcon} aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h3 className={cls.usecaseTitle}>Partner Engagement</h3>
                    <p className={cls.usecaseDescription}>Transform reports into relationships for every partner and customer</p>
                  </a>
                </div>
              </div>
            </div>

            <a href="https://breadcrumb.ai/pricing" className={`${cls.navLink} ${isActive === 'pricing' ? cls.navLinkActive : ''}`}>
              Pricing
            </a>
            <a href="https://breadcrumb.ai/blog" className={`${cls.navLink} ${isActive === 'blog' ? cls.navLinkActive : ''}`}>
              Blog
            </a>
            <a href="https://docs.breadcrumb.ai/" target="_blank" rel="noopener noreferrer" className={cls.navLink}>
              Docs
            </a>
          </nav>

          <div className={cls.right}>
            {!logoOnly && (
              <a href="https://app.breadcrumb.ai/signin" className={cls.navLink}>Sign In</a>
            )}
            {logoOnly ? (
              <a href="https://breadcrumb.ai/request-demo" className={cls.buttonPrimary}>Book a demo</a>
            ) : (
              <a href="https://app.breadcrumb.ai/signup" className={cls.buttonPrimary}>Get access</a>
            )}
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileOpen && <div className={cls.mobileBackdrop} onClick={() => setMobileOpen(false)} />}
        <div className={`${cls.mobileMenu} ${mobileOpen ? cls.mobileMenuOpen : ''}`}>
          <div className={cls.mobileMenuHeader}>
            <a href="/blog/" className={cls.logo} onClick={closeMobileMenu}>
              <img
                src="/blog/images/breadcrumb-logo.svg"
                alt="Breadcrumb"
                width={120}
                height={24}
                className={cls.logoImage}
              />
            </a>
            <button
              aria-label="Close menu"
              className={cls.mobileMenuClose}
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <nav className={cls.mobileNav}>
            <div className={cls.mobileNavSection}>
              <button
                className={cls.mobileNavLink}
                onClick={() => setMobileUsecasesOpen((v) => !v)}
              >
                Solutions
                <span className={cls.mobileNavArrow}>{mobileUsecasesOpen ? '−' : '+'}</span>
              </button>
              {mobileUsecasesOpen && (
                <div className={cls.mobileSubMenu}>
                  <a href="https://breadcrumb.ai/usecase/marketing" className={cls.mobileSubLink} onClick={closeMobileMenu}>Marketing</a>
                  <a href="https://breadcrumb.ai/usecase/sales" className={cls.mobileSubLink} onClick={closeMobileMenu}>Sales & Revenue</a>
                  <a href="https://breadcrumb.ai/usecase/business-operations" className={cls.mobileSubLink} onClick={closeMobileMenu}>Business Operations</a>
                  <a href="https://breadcrumb.ai/usecase/live-events" className={cls.mobileSubLink} onClick={closeMobileMenu}>Live Events</a>
                  <a href="https://breadcrumb.ai/usecase/embedded-analytics-reporting" className={cls.mobileSubLink} onClick={closeMobileMenu}>Embedded Analytics</a>
                  <a href="https://breadcrumb.ai/partner-engagement" className={cls.mobileSubLink} onClick={closeMobileMenu}>Partner Engagement</a>
                </div>
              )}
            </div>
            <a href="https://breadcrumb.ai/pricing" className={cls.mobileNavLink} onClick={closeMobileMenu}>Pricing</a>
            <a href="https://breadcrumb.ai/blog" className={cls.mobileNavLink} onClick={closeMobileMenu}>Blog</a>
            <a href="https://docs.breadcrumb.ai/" target="_blank" rel="noopener noreferrer" className={cls.mobileNavLink}>Docs</a>
          </nav>

          <div className={cls.mobileMenuFooter}>
            {!logoOnly && (
              <a href="https://app.breadcrumb.ai/signin" className={cls.mobileNavLink}>Sign In</a>
            )}
            {logoOnly ? (
              <a href="https://breadcrumb.ai/request-demo" className={cls.mobileButtonPrimary} onClick={closeMobileMenu}>Book a demo</a>
            ) : (
              <a href="https://app.breadcrumb.ai/signup" className={cls.mobileButtonPrimary}>Get access</a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}






