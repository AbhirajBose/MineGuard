import React from "react";

export const FooterSection = (): JSX.Element => {
  // Navigation links data
  const navLinks = [
    { text: "About.", href: "#" },
    { text: "Features.", href: "#" },
    { text: "Contacts.", href: "#" },
  ];

  // Language options data
  const languages = [
    { code: "En", active: true },
    { code: "Es", active: false },
    { code: "Fr", active: false },
    { code: "De", active: false },
    { code: "Ru", active: false },
  ];

  // Social media icons data
  const socialIcons = [
    { src: "/col.svg", alt: "Social media icon" },
    { src: "/col-1.svg", alt: "Social media icon" },
    { src: "/item.svg", alt: "Social media icon" },
  ];

  return (
    <footer className="flex items-center justify-between px-20 py-14 relative self-stretch w-full flex-[0_0_auto] bg-transparent">
      {/* Left Column */}
      <div className="flex flex-col w-[546px] items-start gap-10 relative">
        {/* Logo and Description */}
        <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div className="relative w-[30px] h-[30px] bg-[#ff6b00] rounded-md overflow-hidden">
              <img
                className="absolute w-[22px] h-[22px] top-1 left-1"
                alt="Game icons mine"
                src="/game-icons-mine-truck.svg"
              />
            </div>

            <div className="flex flex-col w-[126px] items-start relative">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-xs tracking-[0] leading-[normal]">
                <span className="text-white">Mine</span>
                <span className="text-[#ff6b00]">Guard</span>
              </div>

              <div className="relative self-stretch [font-family:'Inter',Helvetica] font-medium text-white text-[8px] tracking-[0] leading-[normal]">
                Advance Coal Mine Management
              </div>
            </div>
          </div>

          {/* Description and CTA */}
          <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
            <p className="relative w-[420px] mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal]">
              Comprehensive management platform integrating Al, QR tracking, and IOT
              for safer, more efficient mining operations.
            </p>

            <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Semibold',Helvetica] font-normal text-white text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                More about us
              </div>

              <div className="relative w-2.5 h-2.5 bg-white rounded-[10px]" />
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="flex h-[140px] items-end justify-between relative self-stretch w-full">
          <div className="inline-flex items-end gap-2.5 relative flex-[0_0_auto]">
            {socialIcons.map((icon, index) => (
              <React.Fragment key={`social-icon-${index}`}>
                {index === 1 ? (
                  <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                    <img
                      className="relative w-10 h-10"
                      alt={icon.alt}
                      src={icon.src}
                    />
                  </div>
                ) : index === 2 ? (
                  <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
                    <img
                      className="relative w-10 h-10"
                      alt={icon.alt}
                      src={icon.src}
                    />
                  </div>
                ) : (
                  <img
                    className="relative w-10 h-10"
                    alt={icon.alt}
                    src={icon.src}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-[#8e9ea3] text-xs tracking-[0] leading-[16.8px]">
            © 2021 — Copyright
            <br />
            All Rights reserved
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col w-[530px] items-start gap-[99px] relative">
        {/* Navigation Links */}
        <div className="inline-flex items-start gap-[41px] relative flex-[0_0_auto]">
          {navLinks.map((link, index) => (
            <a
              key={`nav-link-${index}`}
              href={link.href}
              className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#8e9ea3] text-base tracking-[0] leading-[22.4px] whitespace-nowrap hover:text-white transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* Contact and Language */}
        <div className="flex items-end justify-between relative self-stretch w-full flex-[0_0_auto]">
          {/* Contact and Location */}
          <div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto]">
            {/* Contact Us */}
            <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
              <h3 className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-xl tracking-[-0.20px] leading-[22px] whitespace-nowrap">
                Contact Us
              </h3>

              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <a
                  href="tel:+19998887766"
                  className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#8e9ea3] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap hover:text-white transition-colors"
                >
                  +1 (999) 888-77-66
                </a>

                <a
                  href="mailto:hello@logoipsum.com"
                  className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-[#8e9ea3] text-sm tracking-[0] leading-[22.4px] whitespace-nowrap hover:text-white transition-colors"
                >
                  hello@logoipsum.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
              <h3 className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-xl tracking-[-0.20px] leading-[22px] whitespace-nowrap">
                Location
              </h3>

              <address className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-[#8e9ea3] text-sm tracking-[0] leading-[22.4px] not-italic">
                483920, Moscow,
                <br />
                Myasnitskaya 22/2/5, Office 4
              </address>
            </div>
          </div>

          {/* Language Selector */}
          <div className="inline-flex flex-col items-end gap-[15px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Semibold',Helvetica] font-normal text-white text-xs text-right tracking-[0] leading-[16.8px] whitespace-nowrap">
              Languages
            </div>

            <div className="inline-flex items-start gap-5 relative flex-[0_0_auto]">
              {languages.map((lang, index) => (
                <button
                  key={`lang-${index}`}
                  className={`relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-${lang.active ? "white" : "[#8e9ea3]"} text-sm tracking-[0] leading-[22.4px] whitespace-nowrap hover:text-white transition-colors`}
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
