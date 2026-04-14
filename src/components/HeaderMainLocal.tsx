import React, { useEffect, useMemo, useRef, useState } from "react";
import cls from "../styles/header-main-local.module.css";

const SITE_BASE = "https://breadcrumb.ai";
const SCHEDULE_DEMO_URL = "https://savvycal.com/breadcrumbai/bc-demo";
const AT_TOP_PX = 80;

type HeaderScrollMode = "top" | "elevated" | "hidden";

type HeaderMainLocalProps = {
  isActive?: string;
  logoOnly?: boolean;
  className?: string;
  overDarkHero?: boolean;
};

export default function HeaderMainLocal(props: HeaderMainLocalProps) {
  const { logoOnly, className, overDarkHero } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usecasesOpen, setUsecasesOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileUsecasesOpen, setMobileUsecasesOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [scrollMode, setScrollMode] = useState<HeaderScrollMode>("top");
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
    setScrollMode(lastScrollY.current <= AT_TOP_PX ? "top" : "elevated");
  }, []);

  useEffect(() => {
    if (mobileOpen) return;

    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;

      if (y <= AT_TOP_PX) {
        setScrollMode("top");
        return;
      }
      if (y > prev) {
        setScrollMode("hidden");
        return;
      }
      if (y < prev) {
        setScrollMode("elevated");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  const rootClass = useMemo(() => {
    const extra = [cls.root];
    if (logoOnly) extra.push(cls.logoOnly);
    if (mobileOpen) {
      extra.push(cls.rootElevated);
    } else {
      if (scrollMode === "hidden") extra.push(cls.rootHidden);
      if (scrollMode === "elevated") extra.push(cls.rootElevated);
    }
    if (overDarkHero && scrollMode === "top" && !mobileOpen) {
      extra.push(cls.rootOverDarkHero);
    }
    if (className) extra.push(className);
    return extra.join(" ");
  }, [className, logoOnly, mobileOpen, overDarkHero, scrollMode]);

  const closeMobileMenu = () => setMobileOpen(false);

  const rawBase = (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";
  const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
  const logoSrc = `${base}images/breadcrumb-logo.svg`;

  return (
    <header className={rootClass} role="banner">
      <div className={cls.container}>
        <div className={cls.logoWrap}>
          <a href={SITE_BASE} className={cls.logo} aria-label="Breadcrumb AI - Go to homepage">
            <img
              src={logoSrc}
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className={cls.menu}>
          <nav className={cls.nav} aria-label="Main navigation">
            <div
              className={cls.dropdown}
              onMouseEnter={() => { setUsecasesOpen(true); setLearnOpen(false); setCompanyOpen(false); }}
              onMouseLeave={() => setUsecasesOpen(false)}
            >
              <button
                className={cls.navLink}
                onClick={() => { setUsecasesOpen((v) => !v); setLearnOpen(false); setCompanyOpen(false); }}
                aria-expanded={usecasesOpen}
                aria-haspopup="true"
              >
                Solutions
              </button>
              <div
                className={`${cls.dropdownPanel} ${usecasesOpen ? cls.dropdownPanelOpen : ''}`}
                role="menu"
              >
                <div className={cls.usecasesGrid}>
                  <a href={`${SITE_BASE}/sports-teams`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Sports Teams & Leagues</h3>
                    <p className={cls.usecaseDescription}>Personalize fan engagement, support better revenue decisions, and increase fan lifetime value.</p>
                  </a>
                  <a href={`${SITE_BASE}/hospitality`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Travel & Hospitality</h3>
                    <p className={cls.usecaseDescription}>Increase bookings, personalize offers, and build lasting customer loyalty.</p>
                  </a>
                  <a href={`${SITE_BASE}/music`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Music Labels</h3>
                    <p className={cls.usecaseDescription}>Identify high-value audiences, sharpen release and marketing strategy, and grow artist revenue.</p>
                  </a>
                  <a href={`${SITE_BASE}/media`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Media Networks</h3>
                    <p className={cls.usecaseDescription}>Strengthen sponsorship strategy, surface high-value audiences, and grow advertiser revenue.</p>
                  </a>
                </div>
              </div>
            </div>

            <div
              className={cls.dropdown}
              onMouseEnter={() => { setLearnOpen(true); setUsecasesOpen(false); setCompanyOpen(false); }}
              onMouseLeave={() => setLearnOpen(false)}
            >
              <button
                className={cls.navLink}
                onClick={() => { setLearnOpen((v) => !v); setUsecasesOpen(false); setCompanyOpen(false); }}
                aria-expanded={learnOpen}
                aria-haspopup="true"
              >
                Learn
              </button>
              <div
                className={`${cls.dropdownPanel} ${learnOpen ? cls.dropdownPanelOpen : ''}`}
                role="menu"
              >
                <div className={cls.learnGrid}>
                  <a href={`${SITE_BASE}/blog`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Blog</h3>
                    <p className={cls.usecaseDescription}>Insights, updates, and stories from the Breadcrumb team.</p>
                  </a>
                  <a href="https://docs.breadcrumb.ai/" target="_blank" rel="noopener noreferrer" className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Docs</h3>
                    <p className={cls.usecaseDescription}>Technical documentation, guides, and API reference.</p>
                  </a>
                </div>
              </div>
            </div>

            <div
              className={cls.dropdown}
              onMouseEnter={() => { setCompanyOpen(true); setUsecasesOpen(false); setLearnOpen(false); }}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button
                className={cls.navLink}
                onClick={() => { setCompanyOpen((v) => !v); setUsecasesOpen(false); setLearnOpen(false); }}
                aria-expanded={companyOpen}
                aria-haspopup="true"
              >
                Company
              </button>
              <div
                className={`${cls.dropdownPanel} ${companyOpen ? cls.dropdownPanelOpen : ''}`}
                role="menu"
              >
                <div className={cls.companyGrid}>
                  <a href={`${SITE_BASE}/about-us`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>About Us</h3>
                    <p className={cls.usecaseDescription}>Our mission, story, and the team behind Breadcrumb.</p>
                  </a>
                  <a href={`${SITE_BASE}/careers`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Careers</h3>
                    <p className={cls.usecaseDescription}>Join us and help shape the future of data intelligence.</p>
                  </a>
                  <a href={`${SITE_BASE}/contact-us`} className={cls.usecaseCard} role="menuitem">
                    <h3 className={cls.usecaseTitle}>Contact</h3>
                    <p className={cls.usecaseDescription}>Get in touch with our team for questions or partnerships.</p>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <div className={cls.right}>
            {!logoOnly && (
              <a href="https://app.breadcrumb.ai/signin" className={cls.navLink}>Sign in</a>
            )}
            {logoOnly ? (
              <a href={`${SITE_BASE}/contact-us`} className={cls.buttonPrimary}>Contact us</a>
            ) : (
              <a href={`${SITE_BASE}/contact-us`} className={cls.buttonPrimary}>
                Learn more
              </a>
            )}
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileOpen && <div className={cls.mobileBackdrop} onClick={() => setMobileOpen(false)} />}
        <div className={`${cls.mobileMenu} ${mobileOpen ? cls.mobileMenuOpen : ''}`}>
          <div className={cls.mobileMenuHeader}>
            <a href={SITE_BASE} className={cls.logo} onClick={closeMobileMenu}>
              <img
                src={logoSrc}
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <nav className={cls.mobileNav}>
            <div className={cls.mobileNavSection}>
              <button
                className={cls.mobileNavLink}
                onClick={() => setMobileUsecasesOpen((v) => !v)}
              >
                Solutions
                <svg className={`${cls.mobileNavChevron} ${mobileUsecasesOpen ? cls.mobileNavChevronOpen : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div className={`${cls.mobileSubMenu} ${mobileUsecasesOpen ? cls.mobileSubMenuOpen : ''}`}>
                <div>
                  <a href={`${SITE_BASE}/sports-teams`} className={cls.mobileSubLink} onClick={closeMobileMenu}>Sports Teams</a>
                  <a href={`${SITE_BASE}/hospitality`} className={cls.mobileSubLink} onClick={closeMobileMenu}>Hospitality</a>
                  <a href={`${SITE_BASE}/music`} className={cls.mobileSubLink} onClick={closeMobileMenu}>Music</a>
                  <a href={`${SITE_BASE}/media`} className={cls.mobileSubLink} onClick={closeMobileMenu}>Media</a>
                </div>
              </div>
            </div>
            <div className={cls.mobileNavSection}>
              <button
                className={cls.mobileNavLink}
                onClick={() => setMobileLearnOpen((v) => !v)}
              >
                Learn
                <svg className={`${cls.mobileNavChevron} ${mobileLearnOpen ? cls.mobileNavChevronOpen : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div className={`${cls.mobileSubMenu} ${mobileLearnOpen ? cls.mobileSubMenuOpen : ''}`}>
                <div>
                  <a href={`${SITE_BASE}/blog`} className={cls.mobileSubLink} onClick={closeMobileMenu}>Blog</a>
                  <a href="https://docs.breadcrumb.ai/" target="_blank" rel="noopener noreferrer" className={cls.mobileSubLink} onClick={closeMobileMenu}>Docs</a>
                </div>
              </div>
            </div>
            <div className={cls.mobileNavSection}>
              <button
                className={cls.mobileNavLink}
                onClick={() => setMobileCompanyOpen((v) => !v)}
              >
                Company
                <svg className={`${cls.mobileNavChevron} ${mobileCompanyOpen ? cls.mobileNavChevronOpen : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div className={`${cls.mobileSubMenu} ${mobileCompanyOpen ? cls.mobileSubMenuOpen : ''}`}>
                <div>
                  <a href={`${SITE_BASE}/about-us`} className={cls.mobileSubLink} onClick={closeMobileMenu}>About Us</a>
                  <a href={`${SITE_BASE}/careers`} className={cls.mobileSubLink} onClick={closeMobileMenu}>Careers</a>
                  <a href={`${SITE_BASE}/contact-us`} className={cls.mobileSubLink} onClick={closeMobileMenu}>Contact</a>
                </div>
              </div>
            </div>
          </nav>

          <div className={cls.mobileMenuFooter}>
            {logoOnly ? (
              <a href={`${SITE_BASE}/request-demo`} className={cls.mobileButtonPrimary} onClick={closeMobileMenu}>Book a demo</a>
            ) : (
              <a
                href={SCHEDULE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cls.mobileButtonPrimary}
              >
                Contact Sales
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
