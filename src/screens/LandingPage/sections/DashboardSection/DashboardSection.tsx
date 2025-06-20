import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const DashboardSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-16 py-14 px-8 md:px-16 lg:px-36 w-full">
      <div className="flex flex-col items-center gap-2.5 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white font-inter">
          Bento-Style Dashboard
        </h2>
        <p className="text-base font-medium text-[#ffffffb2] font-inter">
          A modular, customizable interface providing comprehensive mine
          management
        </p>
      </div>

      <Card className="w-full max-w-[1156px] rounded-[10px] overflow-hidden border-8 border-solid border-[#7b7b7b] p-0">
        <CardContent className="p-0">
          <img
            className="w-full h-auto object-cover"
            alt="Dashboard interface showing mining operations data in a bento-style layout"
            src="/dashboard--worker-1.png"
          />
        </CardContent>
      </Card>
    </section>
  );
};
