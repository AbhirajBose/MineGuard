import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center w-full py-[215px] px-20 relative [background:url(..//home.png)_50%_50%_/_cover]">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-20 w-[599px]">
          <div className="flex flex-col items-start gap-[30px] w-full">
            <Badge className="px-6 py-1.5 bg-[#ff6b0024] text-[#ff6b00] rounded-[20px] border border-solid border-[#ff6b00] font-medium">
              Next gen Mine Mangement
            </Badge>

            <h1 className="font-bold text-[64px] leading-[64px] tracking-[0]">
              <span className="text-white leading-[66px]">
                Revolutionize Your <br />
              </span>
              <span className="text-[#ff6b00] leading-[66px]">
                Coal Mine
                <br />
              </span>
              <span className="text-white leading-[66px]">Operations</span>
            </h1>

            <p className="text-white text-base font-medium">
              Comprehensive management platform integrating Al, Web3, <br />
              and IOT for safer, more efficient mining operations.
            </p>
          </div>

          <div className="flex items-center gap-10">
            <Button className="px-[30px] py-2.5 bg-[#ff6b00] text-black rounded-[10px] font-button-large font-[number:var(--button-large-font-weight)] text-[length:var(--button-large-font-size)] tracking-[var(--button-large-letter-spacing)] leading-[var(--button-large-line-height)] [font-style:var(--button-large-font-style)]">
              Get Started
            </Button>

            <Button
              variant="outline"
              className="px-[30px] py-2.5 bg-[#2c2c2c] text-white rounded-[10px] font-button-large font-[number:var(--button-large-font-weight)] text-[length:var(--button-large-font-size)] tracking-[var(--button-large-letter-spacing)] leading-[var(--button-large-line-height)] [font-style:var(--button-large-font-style)]"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="w-[612px] h-[487.3px] rounded-[32.82px] bg-[url(/frame-7.png)] bg-cover bg-[50%_50%]" />
      </div>
    </section>
  );
};
