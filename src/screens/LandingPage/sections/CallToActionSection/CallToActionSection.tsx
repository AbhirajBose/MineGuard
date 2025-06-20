import { Button } from "../../../../components/ui/button";

export const CallToActionSection = (): JSX.Element => {
  // Data for statistics cards
  const stats = [
    {
      icon: "/material-symbols-exclamation-rounded.svg",
      iconBg: "bg-[#15ff0024]",
      iconBorder: "border-[#15ff00]",
      percentage: "35%",
      description: "Improved Safety",
    },
    {
      icon: "/mdi-graph-box.svg",
      iconBg: "bg-[#0066ff24]",
      iconBorder: "border-[#0066ff]",
      percentage: "22%",
      description: "Increase Efficiency",
    },
    {
      icon: "/mdi-dollar.svg",
      iconBg: "bg-[#ff6b0033]",
      iconBorder: "border-[#ff6b00]",
      percentage: "10%",
      description: "Cost Reduction",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-[125px] w-full bg-cover bg-center [background:url(/Readyframe.png)_50%_50%_/_cover]">
      <div className="flex flex-col items-center justify-center gap-[50px] max-w-4xl mx-auto text-center">
        <h2 className="font-['Inter',Helvetica] font-bold text-white text-5xl">
          Ready to Transform Your Mining <br />
          Operations?
        </h2>

        <p className="font-['Inter',Helvetica] font-medium text-2xl">
          <span className="text-[#ffffffb2]">
            Join industry leaders who have increased safety compliance by 35%{" "}
            <br />
            and operational efficiency by 28% with{" "}
          </span>
          <span className="text-[#ff6b00]">MineGuard</span>
          <span className="text-[#ffffffb2]">.</span>
        </p>

        <div className="flex items-center gap-10">
          <Button className="px-[30px] py-2.5 bg-[#ff6b00] text-black rounded-[10px] hover:bg-[#ff6b00]/90 font-button-large font-[number:var(--button-large-font-weight)] text-[length:var(--button-large-font-size)] tracking-[var(--button-large-letter-spacing)] leading-[var(--button-large-line-height)] [font-style:var(--button-large-font-style)]">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-[30px] py-2.5 bg-[#2c2c2c] text-white rounded-[10px] hover:bg-[#2c2c2c]/90 border-none font-button-large font-[number:var(--button-large-font-weight)] text-[length:var(--button-large-font-size)] tracking-[var(--button-large-letter-spacing)] leading-[var(--button-large-line-height)] [font-style:var(--button-large-font-style)]"
          >
            Watch Demo
          </Button>
        </div>

        <div className="flex items-center gap-[60px] flex-wrap justify-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3.5">
              <div
                className={`relative w-10 h-10 ${stat.iconBg} rounded-[30px] overflow-hidden border border-solid ${stat.iconBorder}`}
              >
                <img
                  className="absolute w-6 h-6 top-2 left-2"
                  alt="Icon"
                  src={stat.icon}
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="font-['Inter',Helvetica] font-bold text-white text-base tracking-[0.20px] leading-6">
                  {stat.percentage}
                </div>
                <div className="font-['Inter',Helvetica] font-normal text-[#ffffffb2] text-base tracking-[0.20px] leading-6 -mt-1.5">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
