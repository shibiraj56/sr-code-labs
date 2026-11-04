import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const LOGO_PATH = process.env.PUBLIC_URL + "/Logo.png";
const COMPANY_EMAIL = "info@srcodelab.space";
const LINKEDIN_URL = "https://www.linkedin.com/company/sr-code-labs/";
const WEBSITE_URL = "https://www.srcodelab.space/";

const NAV_LINKS = ["Home", "Services", "Portfolio", "About", "Contact"];

const SERVICES = [
  {
    id: "websites",
    title: "Business Websites & Landing Pages",
    tag: "Web Engineering & Design",
    icon: "🌐",
    what: "Fast-loading, modern websites and landing pages built to present your business clearly, build credibility, and convert visitors into qualified inquiries.",
    deliverables: [
      "Mobile-first responsive design & high-speed performance",
      "Conversion-focused lead inquiry forms",
      "Direct WhatsApp and phone call quick buttons",
      "Clean technical SEO structure and analytics setup",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Development",
    tag: "Online Storefronts & Catalogs",
    icon: "🛍️",
    what: "Custom online stores and digital product catalogs tailored to how you sell, enabling direct customer orders and wholesale purchasing without high commission fees.",
    deliverables: [
      "Product catalog with category & variant filtering",
      "Frictionless cart and checkout experience",
      "Secure payment gateway integration (UPI, Cards & NetBanking)",
      "Instant WhatsApp order notifications and admin management",
    ],
  },
  {
    id: "webapps",
    title: "Custom Web Applications",
    tag: "Tailored Business Software",
    icon: "💻",
    what: "Purpose-built web applications designed around your company's workflows, giving your team and clients accessible, reliable browser-based tools.",
    deliverables: [
      "Role-based user authentication and security permissions",
      "Structured operational forms and data entry records",
      "Relational database management with fast search",
      "Dedicated portals for clients, staff, or vendors",
    ],
  },
  {
    id: "software",
    title: "Billing, Inventory & Business Management Software",
    tag: "Retail & Wholesale Operations",
    icon: "📦",
    what: "Practical POS and stock management systems that speed up counter billing, eliminate inventory mismatches, and automate tax invoicing.",
    deliverables: [
      "High-speed Point-of-Sale (POS) counter billing",
      "Barcode scanning with instantaneous product lookup",
      "GST-compliant invoice and thermal receipt printing",
      "Daily stock registers and vendor payment tracking",
    ],
  },
  {
    id: "analytics",
    title: "Dashboards, Reporting & Workflow Automation",
    tag: "Business Intelligence & Automation",
    icon: "📊",
    what: "Interactive analytics dashboards and automated reporting scripts that turn operational data into clear, actionable daily business decisions.",
    deliverables: [
      "Executive KPI summary cards for sales, dues, and margins",
      "Interactive charts and multi-period trend comparisons",
      "Automated CSV and Excel data synchronization",
      "Automated summary digests and instant notifications",
    ],
  },
  {
    id: "maintenance",
    title: "Website Maintenance & Redesign",
    tag: "Performance, Security & Upgrades",
    icon: "🛠️",
    what: "Proactive technical upkeep, Core Web Vitals speed optimization, and responsive design modernizations to keep your site modern, secure, and fast.",
    deliverables: [
      "Mobile layout optimization across modern devices",
      "Speed improvements and Core Web Vitals compliance",
      "Content updates, feature enhancements, and rate cards",
      "Reliable hosting transfers, backups, and security monitoring",
    ],
  },
];

const PORTFOLIO = [
  {
    title: "Smart Inventory ERP",
    subtitle: "M.S. Hari Retail Showroom ERP",
    cat: "Billing, Inventory & Business Management Software",
    filter: "software",
    badge: "Client Retail ERP",
    badgeColor: "#10B981",
    desc: "Built for a furniture and electronics showroom to replace manual billing with instant barcode scanning, POS cashier counters, stock registers, and decimal-safe GST tax invoicing for A4 and 80mm thermal receipt printers.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite"],
    statusNote: "Client deployment for retail billing & stock control",
    liveUrl: null,
  },
  {
    title: "Amazon Product Data Analysis",
    subtitle: "E-Commerce Market Intelligence Pipeline",
    cat: "Dashboards, Reporting & Workflow Automation",
    filter: "analytics",
    badge: "Data Analytics Project",
    badgeColor: "#F59E0B",
    desc: "An analytical data pipeline and dashboard built to process product datasets, tracking pricing fluctuations, review distribution, seller ratings, and category demand patterns.",
    tech: ["Python", "Pandas", "Matplotlib", "Streamlit", "SQLite"],
    statusNote: "Data engineering & visual reporting project",
    liveUrl: null,
  },
  {
    title: "Textile Shopping Platform",
    subtitle: "Online Apparel & Fabric Catalog",
    cat: "E-commerce Development",
    filter: "ecommerce",
    badge: "E-Commerce Platform",
    badgeColor: "#EC4899",
    desc: "An online apparel and fabric retail catalog with multi-variant filtering (fabric type, color, GSM), interactive cart, instant WhatsApp inquiry integration, and checkout flow.",
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    statusNote: "E-commerce showcase platform",
    liveUrl: null,
  },
  {
    title: "GymStack",
    subtitle: "Gym Management ERP & Fee Ledger",
    cat: "Custom Web Applications",
    filter: "webapps",
    badge: "Live Web Application",
    badgeColor: "#8B5CF6",
    desc: "A dedicated multi-role gym management ERP handling member registrations, monthly fee subscription collection, daily check-in attendance, and financial income/expense reporting.",
    tech: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Prisma"],
    statusNote: "Live product deployment at gymstack.srcodelab.space",
    liveUrl: "https://gymstack.srcodelab.space/",
  },
  {
    title: "N100 Financial Intelligence Platform",
    subtitle: "Equity Research & Ratio Screener",
    cat: "Dashboards, Reporting & Workflow Automation",
    filter: "analytics",
    badge: "Internal Analytics Tool",
    badgeColor: "#06B6D4",
    desc: "An interactive equity research platform covering 92 constituent companies with automated financial ratio calculation, multi-year historical trend charts, and fundamental screening.",
    tech: ["Python", "SQLite", "Plotly", "Streamlit", "Pandas"],
    statusNote: "Analytical research tool with multi-screen interface",
    liveUrl: null,
  },
  {
    title: "Cloudline Interiors Business Website",
    subtitle: "Interior Design Showcase & Enquiries",
    cat: "Business Websites & Landing Pages",
    filter: "websites",
    badge: "Client Showcase",
    badgeColor: "#10B981",
    desc: "A professional portfolio and lead-generation website designed for an interior design practice to showcase completed residential and commercial projects with clear consultation booking forms.",
    tech: ["React", "Tailwind CSS", "Responsive Web Design"],
    statusNote: "Client showcase & portfolio website",
    liveUrl: null,
  },
  {
    title: "SKS Electronics Services Portal",
    subtitle: "Local Technical Services & Booking",
    cat: "Business Websites & Landing Pages",
    filter: "websites",
    badge: "Client Showcase",
    badgeColor: "#10B981",
    desc: "A fast-loading local service portal for TV and DTH installations, featuring direct customer call/WhatsApp booking buttons, service rate cards, and local area coverage details.",
    tech: ["HTML5", "CSS3", "JavaScript", "Mobile Layout"],
    statusNote: "Local business lead-generation portal",
    liveUrl: null,
  },
  {
    title: "SR CODE LABS Official Platform",
    subtitle: "Agency Website & Enquiries Pipeline",
    cat: "Business Websites & Landing Pages",
    filter: "websites",
    badge: "Live Production Website",
    badgeColor: "#7C3AED",
    desc: "The official agency platform with interactive service breakdowns, verified project showcase, server-side validated contact enquiry pipeline, and responsive mobile-first architecture.",
    tech: ["React", "Node.js", "Vercel Serverless", "CSS3"],
    statusNote: "Live official web property at srcodelab.space",
    liveUrl: WEBSITE_URL,
  },
];

const STATS = [
  { val: "10+", label: "Completed Projects" },
  { val: "< 24h", label: "Response Time" },
  { val: "Direct", label: "Developer Access" },
  { val: "100%", label: "Code Ownership" },
];

const PROCESS_STEPS = [
  {
    num: "1",
    phase: "Discovery",
    title: "Understand Business Requirements",
    desc: "Understand your business and requirements to define goals, daily workflows, and technical scope.",
  },
  {
    num: "2",
    phase: "Planning",
    title: "Agree on Scope, Deliverables & Cost",
    desc: "Define the scope, features and timeline with transparent milestone dates and predictable pricing.",
  },
  {
    num: "3",
    phase: "Design",
    title: "Design & Develop the Solution",
    desc: "Create a clear and intuitive user experience with responsive, modern interfaces designed to convert.",
  },
  {
    num: "4",
    phase: "Development",
    title: "Test & Review with You",
    desc: "Build, test and refine the solution using clean code standards and regular preview walk-throughs.",
  },
  {
    num: "5",
    phase: "Launch & Support",
    title: "Deploy & Provide Agreed Support",
    desc: "Deploy your product and provide ongoing assistance to ensure uninterrupted operational reliability.",
  },
];

const STANDARDS = [
  {
    icon: "💬",
    title: "Direct Technical Communication",
    desc: "Speak directly with the developer building your software. No confusing technical jargon or layers of middlemen.",
  },
  {
    icon: "📋",
    title: "Transparent Scope & Pricing",
    desc: "Clear milestone agreements with honest timelines and no unexpected hidden charges.",
  },
  {
    icon: "🧱",
    title: "Clean, Maintainable Code",
    desc: "Built with standard technologies so your software is reliable, easy to update, and prepared for future growth.",
  },
  {
    icon: "🔑",
    title: "Complete Code & IP Ownership",
    desc: "You retain full ownership of all source code, assets, and data with zero vendor lock-in.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  const handleLinkClick = (name) => {
    setActive(name);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className="nav-container"
        style={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.96)"
            : "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(124, 58, 237, 0.12)",
          boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
        }}
      >
        {/* Brand Logo (Far Left) */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            textDecoration: "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("Home");
          }}
        >
          <img
            src={LOGO_PATH}
            alt="SR CODE LABS - Software Development Company in Tiruppur"
            className="nav-logo-img"
            width="180"
            height="44"
            onError={(e) => {
              e.target.style.display = "none";
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = "flex";
              }
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: 21,
                letterSpacing: 1.5,
                color: "#0F172A",
              }}
            >
              SR CODE{" "}
              <span style={{ color: "#7C3AED" }}>
                LABS
              </span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links & CTA (Right Aligned) */}
        <div className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                setActive(l);
              }}
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active === l ? "#7C3AED" : "#475569",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: active === l ? 800 : 700,
                fontSize: 15,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "6px 0",
                position: "relative",
                borderBottom:
                  active === l
                    ? "2.5px solid #7C3AED"
                    : "2.5px solid transparent",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (active !== l) e.target.style.color = "#7C3AED";
              }}
              onMouseLeave={(e) => {
                if (active !== l) e.target.style.color = "#475569";
              }}
            >
              {l}
            </a>
          ))}

          <a
            href="#contact"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setActive("Contact");
            }}
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)",
              color: "#FFFFFF",
              border: "none",
              padding: "10px 24px",
              borderRadius: 8,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 1.5,
              cursor: "pointer",
              textTransform: "uppercase",
              boxShadow: "0 4px 18px rgba(124, 58, 237, 0.25)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(124, 58, 237, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 18px rgba(124, 58, 237, 0.25)";
            }}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`mobile-nav-toggle ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile Drawer Menu & Overlay */}
      <div
        className={`mobile-menu-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-menu-drawer ${mobileOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(l);
            }}
            className={`mobile-nav-item ${active === l ? "active" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <span>{l}</span>
            <span style={{ fontSize: 13, opacity: 0.5 }}>→</span>
          </a>
        ))}
        <a
          href="#contact"
          role="button"
          className="mobile-cta-btn"
          style={{ textDecoration: "none", textAlign: "center", display: "block" }}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("Contact");
          }}
        >
          Start a Project
        </a>
      </div>
    </>
  );
}

function HeroSection({ setActive }) {
  return (
    <section className="hero-section">
      {/* Background Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(rgba(124, 58, 237, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Soft Glow Orb */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 360,
          maxWidth: "80vw",
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.08), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow Status Pill */}
      <div className="hero-pill">
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#7C3AED",
            display: "inline-block",
            boxShadow: "0 0 8px #7C3AED",
            flexShrink: 0,
          }}
        />
        <span
          className="hero-pill-text"
          style={{
            color: "#7C3AED",
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: 2,
            fontFamily: "'Rajdhani', sans-serif",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          BUILD. INNOVATE. SCALE.
        </span>
      </div>

      {/* Direct, Natural Headline */}
      <h1 className="hero-heading">
        We Build{" "}
        <span style={{ color: "#7C3AED" }}>
          Digital Solutions
        </span>{" "}
        That Help Businesses Grow.
      </h1>

      {/* Supporting Description */}
      <p className="hero-subtext">
        From business websites and e-commerce platforms to custom software, ERP systems, and business automation, we create digital solutions that move your business forward.
      </p>

      {/* Location Trust Pill */}
      <div className="hero-location-pill">
        <span style={{ color: "#7C3AED" }}>📍</span>
        <span>Based in Tiruppur, Tamil Nadu · Serving Businesses Across India.</span>
      </div>

      {/* Action Buttons: START A PROJECT & EXPLORE OUR WORK */}
      <div className="hero-actions">
        <a
          href="#contact"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            setActive("Contact");
          }}
          className="hero-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)",
            color: "#FFFFFF",
            border: "none",
            boxShadow: "0 8px 25px rgba(124, 58, 237, 0.28)",
            letterSpacing: "1.5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(124, 58, 237, 0.38)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 25px rgba(124, 58, 237, 0.28)";
          }}
        >
          START A PROJECT
        </a>

        <a
          href="#portfolio"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            setActive("Portfolio");
          }}
          className="hero-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            background: "#FFFFFF",
            color: "#0F172A",
            border: "1.5px solid rgba(124, 58, 237, 0.25)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
            letterSpacing: "1.5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7C3AED";
            e.currentTarget.style.color = "#7C3AED";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(124, 58, 237, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.25)";
            e.currentTarget.style.color = "#0F172A";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.04)";
          }}
        >
          EXPLORE OUR WORK
        </a>
      </div>

      {/* Verified Key Metrics Strip */}
      <div className="stats-strip">
        {STATS.map((s, i) => (
          <div key={i} className="stat-item">
            <div
              className="stat-val"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: 30,
                color: "#7C3AED",
                lineHeight: 1,
              }}
            >
              {s.val}
            </div>
            <div
              className="stat-label"
              style={{
                fontSize: 13,
                color: "#64748B",
                letterSpacing: 0.8,
                fontWeight: 600,
                marginTop: 6,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection({ onSelectService }) {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      id="services"
      className="responsive-section"
      style={{
        background: "#F8FAFC",
        position: "relative",
      }}
    >
      <div className="section-header-block">
        <div className="section-eyebrow">
          WHAT WE DO
        </div>
        <h2 className="section-heading">
          Technology Solutions for Growing Businesses
        </h2>
        <p className="section-subtext">
          We design and develop practical digital products that simplify operations, improve efficiency, and help businesses scale.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div
            key={s.id}
            className="service-card"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${i * 0.06}s`,
            }}
          >
            <div>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  marginBottom: 16,
                  background: "rgba(124, 58, 237, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {s.icon}
              </div>

              <div className="service-card-header">
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 21,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h3>
                <span
                  style={{
                    fontSize: 11,
                    color: "#7C3AED",
                    background: "rgba(124, 58, 237, 0.08)",
                    border: "1px solid rgba(124, 58, 237, 0.18)",
                    borderRadius: 20,
                    padding: "3px 10px",
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontFamily: "'Rajdhani', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.tag}
                </span>
              </div>

              <p
                style={{
                  color: "#475569",
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  margin: "0 0 16px",
                }}
              >
                {s.what}
              </p>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontFamily: "'Rajdhani', sans-serif",
                  marginBottom: 8,
                }}
              >
                What You Receive:
              </div>
              <ul className="service-bullets">
                {s.deliverables.map((item, idx) => (
                  <li key={idx} className="service-bullet-item">
                    <span className="service-bullet-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectService(s.title)}
              className="service-enquire-btn"
            >
              <span>Enquire About This Service</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState("all");

  const filteredProjects = PORTFOLIO.filter((p) => {
    if (filter === "all") return true;
    return p.filter === filter;
  });

  return (
    <section
      ref={ref}
      id="portfolio"
      className="responsive-section"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
      }}
    >
      <div className="section-header-block">
        <div className="section-eyebrow">
          Verified Projects & Work
        </div>
        <h2 className="section-heading">
          Ideas We've Turned Into Digital Products
        </h2>
        <p className="section-subtext">
          Explore real software platforms, retail management tools, web applications, and digital products engineered by SR CODE LABS.
        </p>
      </div>

      {/* Realistic Category Filters */}
      <div className="portfolio-filters">
        {[
          { key: "all", label: `All Projects (${PORTFOLIO.length})` },
          { key: "websites", label: "Business Websites" },
          { key: "ecommerce", label: "E-Commerce" },
          { key: "software", label: "Management Software" },
          { key: "webapps", label: "Custom Web Apps" },
          { key: "analytics", label: "Dashboards & Analytics" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`portfolio-filter-btn ${filter === tab.key ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filteredProjects.map((p, i) => (
          <div
            key={p.title}
            className="portfolio-project-card"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.35s ease ${i * 0.05}s`,
            }}
          >
            {/* Visual UI Preview Header */}
            <div className="portfolio-card-preview">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="preview-browser-dots">
                  <span className="preview-dot" style={{ background: "#EF4444" }} />
                  <span className="preview-dot" style={{ background: "#F59E0B" }} />
                  <span className="preview-dot" style={{ background: "#10B981" }} />
                  <span
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      fontFamily: "monospace",
                      marginLeft: 8,
                    }}
                  >
                    srcodelab.space / {p.filter}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontFamily: "'Rajdhani', sans-serif",
                    textTransform: "uppercase",
                    color: p.badgeColor,
                    background: "rgba(255, 255, 255, 0.1)",
                    padding: "2px 8px",
                    borderRadius: 10,
                  }}
                >
                  {p.badge}
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "#94A3B8",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {p.cat}
                </span>
                <h3
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#FFFFFF",
                    margin: "2px 0 0",
                  }}
                >
                  {p.title}
                </h3>
              </div>
            </div>

            {/* Project Details */}
            <div className="portfolio-card-body">
              <div>
                <p
                  style={{
                    color: "#475569",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>

                {/* Tech Stack Chips */}
                <div className="portfolio-tech-tags">
                  {p.tech.map((t) => (
                    <span key={t} className="portfolio-tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Links & Status */}
              <div className="portfolio-card-links">
                {(p.liveUrl || p.githubUrl) ? (
                  <a
                    href={p.liveUrl || p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link-btn"
                  >
                    <span>Visit Website</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700,
                      color: "#7C3AED",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Showcase Project
                  </span>
                )}
                <span
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textAlign: "right",
                  }}
                >
                  {p.statusNote}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      id="about"
      className="responsive-section"
      style={{
        background: "#FFFFFF",
        position: "relative",
      }}
    >
      <div className="section-header-block">
        <div className="section-eyebrow">
          ABOUT SR CODE LABS
        </div>
        <h2 className="section-heading">
          Technology Built Around Your Business
        </h2>
        <p className="section-subtext">
          SR CODE LABS builds websites, custom applications, and business management software for companies looking to work smarter and grow faster. We combine thoughtful design with practical engineering to solve real business challenges.
        </p>
      </div>

      {/* 3 Pillars: Industries, Locations, Capabilities */}
      <div className="about-pillars-grid">
        <div className="about-pillar-card">
          <div className="about-pillar-header">
            <span className="about-pillar-icon">🏭</span>
            <h3 className="about-pillar-title">Industries We Serve</h3>
          </div>
          <ul className="about-pillar-list">
            <li className="about-pillar-item"><span className="about-pillar-dot" />Textile & Garment Manufacturing</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Retail & Wholesale</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Fitness & Gym Management</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Startups & Growing Businesses</li>
          </ul>
        </div>

        <div className="about-pillar-card">
          <div className="about-pillar-header">
            <span className="about-pillar-icon">📍</span>
            <h3 className="about-pillar-title">Locations We Serve</h3>
          </div>
          <ul className="about-pillar-list">
            <li className="about-pillar-item"><span className="about-pillar-dot" />Tiruppur</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Coimbatore</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Erode</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Tamil Nadu</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Bangalore</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Kerala</li>
          </ul>
        </div>

        <div className="about-pillar-card">
          <div className="about-pillar-header">
            <span className="about-pillar-icon">⚡</span>
            <h3 className="about-pillar-title">Our Capabilities</h3>
          </div>
          <ul className="about-pillar-list">
            <li className="about-pillar-item"><span className="about-pillar-dot" />Custom Web Applications</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Business Websites & Landing Pages</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Retail & Wholesale ERP Software</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />E-Commerce Storefronts & Catalogs</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Dashboards & Workflow Automation</li>
            <li className="about-pillar-item"><span className="about-pillar-dot" />Speed & Architecture Optimization</li>
          </ul>
        </div>
      </div>

      {/* 5-Step Process */}
      <div style={{ textAlign: "center", marginBottom: 32, marginTop: 12 }}>
        <div className="section-eyebrow">
          OUR 5-STEP DEVELOPMENT PROCESS
        </div>
        <h3
          className="section-heading"
          style={{
            fontSize: "clamp(24px, 3.5vw, 38px)",
            marginTop: 6,
            marginBottom: 8,
          }}
        >
          From First Conversation to Successful Launch
        </h3>
        <p
          className="section-subtext"
          style={{
            maxWidth: 620,
            marginTop: 0,
          }}
        >
          A clear, collaborative process that keeps every project moving in the right direction.
        </p>
      </div>

      <div className="process-grid">
        {PROCESS_STEPS.map((step, idx) => (
          <div
            key={step.num}
            className="process-step-card"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.35s ease ${idx * 0.08}s`,
            }}
          >
            <div className="process-step-badge">{step.num}</div>
            <div
              style={{
                color: "#7C3AED",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontFamily: "'Rajdhani', sans-serif",
                marginBottom: 4,
              }}
            >
              {step.phase}
            </div>
            <h4
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: "#0F172A",
                marginBottom: 8,
              }}
            >
              {step.title}
            </h4>
            <p
              style={{
                color: "#475569",
                fontSize: 13.5,
                lineHeight: 1.55,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                margin: 0,
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 4 Working Standards */}
      <div style={{ textAlign: "center", marginBottom: 24, marginTop: 40 }}>
        <h3
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#0F172A",
          }}
        >
          How We Work With You
        </h3>
      </div>

      <div className="about-standards-grid">
        {STANDARDS.map((s, idx) => (
          <div key={idx} className="standard-card">
            <div className="standard-icon">{s.icon}</div>
            <div>
              <h4
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#0F172A",
                  marginBottom: 6,
                }}
              >
                {s.title}
              </h4>
              <p
                style={{
                  color: "#475569",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ selectedService }) {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    consent: true,
    _gotcha: "",
  });

  const [status, setStatus] = useState({
    state: "idle", // 'idle' | 'submitting' | 'success' | 'error'
    message: "",
  });

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!form.name || !form.email || !form.service || !form.message) {
      setStatus({
        state: "error",
        message: "Please complete all required fields (Name, Email, Service, and Project Description).",
      });
      return;
    }

    setStatus({ state: "submitting", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          service: form.service,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          _gotcha: form._gotcha,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.success) {
        setStatus({
          state: "success",
          message: data.message || "Your enquiry has been received successfully.",
        });
      } else {
        const errorMsg =
          (data && data.error) ||
          "We could not process your enquiry through the email service. Please send your project details directly to " +
            COMPANY_EMAIL;
        setStatus({
          state: "error",
          message: errorMsg,
        });
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setStatus({
        state: "error",
        message:
          "Unable to reach the server. Please email your project requirements directly to " +
          COMPANY_EMAIL +
          ".",
      });
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
      consent: true,
      _gotcha: "",
    });
    setStatus({ state: "idle", message: "" });
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="responsive-section"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
      }}
    >
      <div className="contact-container">
        <div className="section-header-block">
          <div className="section-eyebrow">
            START A PROJECT
          </div>
          <h2 className="section-heading">
            Let's Build Something Great Together
          </h2>
          <p className="section-subtext">
            Have an idea or a business challenge? Let's discuss how technology can help you move forward.
          </p>
        </div>

        {/* Direct Contact Pills */}
        <div className="contact-direct-strip">
          <a href={`mailto:${COMPANY_EMAIL}`} className="contact-pill-link">
            <span>✉</span>
            <span>{COMPANY_EMAIL}</span>
          </a>
          <div
            className="contact-pill-link"
            style={{
              cursor: "default",
              borderColor: "rgba(124, 58, 237, 0.25)",
            }}
          >
            <span>📍</span>
            <span>Based in Tiruppur, Tamil Nadu · Serving India</span>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill-link"
          >
            <span>💼</span>
            <span>LinkedIn Profile</span>
          </a>
        </div>

        {status.state === "success" ? (
          <div className="contact-sent-card">
            <div
              style={{
                fontSize: 50,
                color: "#7C3AED",
                marginBottom: 16,
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: 28,
                color: "#0F172A",
                marginBottom: 12,
              }}
            >
              Enquiry Transmitted Successfully
            </h3>
            <p
              style={{
                color: "#475569",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 15,
                maxWidth: 480,
                margin: "0 auto 24px",
                lineHeight: 1.6,
              }}
            >
              Thank you for reaching out to SR CODE LABS. Your project requirements have been received and sent to <strong>{COMPANY_EMAIL}</strong>. We will review your details and get back to you within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="hero-btn"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 28px",
                fontSize: 14,
              }}
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="contact-card"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.5s ease",
            }}
          >
            {/* Error Notification Alert Banner */}
            {status.state === "error" && (
              <div className="alert-error" role="alert">
                <span style={{ fontSize: 18 }}>⚠️</span>
                <div>
                  <strong>Notice:</strong> {status.message}{" "}
                  <div>
                    You can also reach us directly:{" "}
                    <a href={`mailto:${COMPANY_EMAIL}?subject=Project%20Enquiry%20from%20Website`}>
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Spam Trap Honeypot (Hidden from real users and screen readers) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <label htmlFor="contact-gotcha">Leave this empty</label>
              <input
                id="contact-gotcha"
                type="text"
                name="_gotcha"
                tabIndex="-1"
                autoComplete="off"
                value={form._gotcha}
                onChange={(e) => setForm({ ...form, _gotcha: e.target.value })}
              />
            </div>

            {/* Row 1: Full Name & Contact Email */}
            <div className="form-row-2col">
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: "block",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    color: "#475569",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Full Name <span style={{ color: "#7C3AED" }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  required
                  style={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    borderRadius: 9,
                    padding: "13px 16px",
                    color: "#0F172A",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14.5,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#7C3AED";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#CBD5E1";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: "block",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    color: "#475569",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Contact Email <span style={{ color: "#7C3AED" }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    borderRadius: 9,
                    padding: "13px 16px",
                    color: "#0F172A",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14.5,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#7C3AED";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#CBD5E1";
                  }}
                />
              </div>
            </div>

            {/* Row 2: Company Name (Optional) & Phone Number (Optional) */}
            <div className="form-row-2col">
              <div>
                <label
                  htmlFor="contact-company"
                  style={{
                    display: "block",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    color: "#475569",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Company / Business Name{" "}
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>(Optional)</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g. Acme Retail or Studio Name"
                  style={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    borderRadius: 9,
                    padding: "13px 16px",
                    color: "#0F172A",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14.5,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#7C3AED";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#CBD5E1";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  style={{
                    display: "block",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    color: "#475569",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Phone / WhatsApp{" "}
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>(Optional)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  style={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    borderRadius: 9,
                    padding: "13px 16px",
                    color: "#0F172A",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14.5,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#7C3AED";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#CBD5E1";
                  }}
                />
              </div>
            </div>

            {/* Row 3: Service Required (Required) & Estimated Budget (Optional) */}
            <div className="form-row-2col">
              <div>
                <label
                  htmlFor="contact-service"
                  style={{
                    display: "block",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    color: "#475569",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Service Required <span style={{ color: "#7C3AED" }}>*</span>
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    borderRadius: 9,
                    padding: "13px 16px",
                    color: form.service ? "#0F172A" : "#94A3B8",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14.5,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="" disabled>
                    Select the service you need
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title} style={{ color: "#0F172A" }}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other / General Consultation" style={{ color: "#0F172A" }}>
                    Other / General Consultation
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-budget"
                  style={{
                    display: "block",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    color: "#475569",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Estimated Budget{" "}
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>(Optional)</span>
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    borderRadius: 9,
                    padding: "13px 16px",
                    color: form.budget ? "#0F172A" : "#94A3B8",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14.5,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Flexible / Exploring options</option>
                  <option value="Under ₹25,000 / $300" style={{ color: "#0F172A" }}>Under ₹25,000 (~$300)</option>
                  <option value="₹25,000 – ₹50,000 / $300 – $600" style={{ color: "#0F172A" }}>₹25,000 – ₹50,000 (~$300 – $600)</option>
                  <option value="₹50,000 – ₹1,00,000 / $600 – $1,200" style={{ color: "#0F172A" }}>₹50,000 – ₹1,00,000 (~$600 – $1,200)</option>
                  <option value="₹1,00,000+ / $1,200+" style={{ color: "#0F172A" }}>₹1,00,000+ ($1,200+)</option>
                </select>
              </div>
            </div>

            {/* Row 4: Expected Timeline (Optional) */}
            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor="contact-timeline"
                style={{
                  display: "block",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 1.5,
                  color: "#475569",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Expected Timeline{" "}
                <span style={{ fontSize: 11, color: "#94A3B8" }}>(Optional)</span>
              </label>
              <select
                id="contact-timeline"
                name="timeline"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                style={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                  borderRadius: 9,
                  padding: "13px 16px",
                  color: form.timeline ? "#0F172A" : "#94A3B8",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14.5,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Flexible / Exploring timelines</option>
                <option value="Within 2 to 4 weeks" style={{ color: "#0F172A" }}>Within 2 to 4 weeks</option>
                <option value="1 to 2 months" style={{ color: "#0F172A" }}>1 to 2 months</option>
                <option value="3+ months" style={{ color: "#0F172A" }}>3+ months</option>
              </select>
            </div>

            {/* Row 5: Project Description (Required) */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="contact-message"
                style={{
                  display: "block",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 1.5,
                  color: "#475569",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Project Description & Scope <span style={{ color: "#7C3AED" }}>*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what you want to build, key features needed, and any current pain points you want to solve..."
                rows={4}
                required
                style={{
                  width: "100%",
                  background: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                  borderRadius: 9,
                  padding: "13px 16px",
                  color: "#0F172A",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14.5,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#7C3AED";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#CBD5E1";
                }}
              />
            </div>

            {/* Privacy & Consent Notice */}
            <div
              style={{
                fontSize: 12.5,
                color: "#64748B",
                lineHeight: 1.5,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: 24,
              }}
            >
              🔒 <strong>Privacy Notice:</strong> Your information is used solely by SR CODE LABS to review and respond to your project enquiry. We never share your details with third parties or send unsolicited marketing.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.state === "submitting"}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)",
                color: "#FFFFFF",
                border: "none",
                padding: "16px",
                borderRadius: 9,
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: status.state === "submitting" ? "not-allowed" : "pointer",
                boxShadow: "0 6px 22px rgba(124, 58, 237, 0.28)",
                transition: "all 0.25s ease",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                opacity: status.state === "submitting" ? 0.8 : 1,
              }}
              onMouseEnter={(e) => {
                if (status.state !== "submitting") {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(124, 58, 237, 0.38)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 22px rgba(124, 58, 237, 0.28)";
              }}
            >
              {status.state === "submitting" ? (
                <>
                  <span className="spinner-icon" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <span>Send Project Enquiry →</span>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer({ setActive }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-brand">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <img
              src={LOGO_PATH}
              alt="SR CODE LABS - Software Development Company in Tiruppur"
              width="180"
              height="38"
              loading="lazy"
              decoding="async"
              style={{
                height: 38,
                width: "auto",
                maxWidth: 180,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: 1.5,
                color: "#0F172A",
              }}
            >
              SR CODE <span style={{ color: "#7C3AED" }}>LABS</span>
            </span>
          </div>

          <p
            style={{
              color: "#64748B",
              fontSize: 13.5,
              lineHeight: 1.6,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: 12,
            }}
          >
            Building practical websites, e-commerce stores, custom web applications, and business management software.
          </p>

          <div
            style={{
              fontSize: 13,
              color: "#475569",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: 6,
            }}
          >
            📍 Based in Tiruppur, Tamil Nadu · Serving Businesses Across India
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#475569",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Slogan:{" "}
            <strong style={{ color: "#7C3AED" }}>
              BUILD. INNOVATE. SCALE.
            </strong>
          </div>
        </div>

        <div className="footer-links-group">
          <div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 1.5,
                color: "#475569",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Navigation
            </div>
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(l);
                }}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#64748B",
                  fontSize: 14,
                  marginBottom: 10,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#7C3AED")}
                onMouseLeave={(e) => (e.target.style.color = "#64748B")}
              >
                {l}
              </a>
            ))}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 1.5,
                color: "#475569",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Connect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                style={{
                  color: "#64748B",
                  fontSize: 14,
                  textDecoration: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#7C3AED")}
                onMouseLeave={(e) => (e.target.style.color = "#64748B")}
              >
                {COMPANY_EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#64748B",
                  fontSize: 14,
                  textDecoration: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#7C3AED")}
                onMouseLeave={(e) => (e.target.style.color = "#64748B")}
              >
                LinkedIn ↗
              </a>
              <a
                href={WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#7C3AED",
                  fontSize: 13.5,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                srcodelab.space ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span
          style={{
            color: "#64748B",
            fontSize: 13,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          © {currentYear} SR CODE LABS. All rights reserved.
        </span>
        <span
          style={{
            color: "#64748B",
            fontSize: 13,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          BUILD. INNOVATE. SCALE. ⚡
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  const [selectedService, setSelectedService] = useState("");

  const scrollTo = (section) => {
    setActive(section);
    const id = section.toLowerCase();
    const el = document.getElementById(id);
    if (el) {
      const navHeight = window.innerWidth <= 860 ? 68 : 74;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    scrollTo("contact");
  };

  return (
    <div
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <Navbar active={active} setActive={scrollTo} />
      <div id="home">
        <HeroSection setActive={scrollTo} />
      </div>
      <div id="services">
        <ServicesSection onSelectService={handleSelectService} />
      </div>
      <div id="portfolio">
        <PortfolioSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection selectedService={selectedService} />
      </div>
      <Footer setActive={scrollTo} />
    </div>
  );
}
