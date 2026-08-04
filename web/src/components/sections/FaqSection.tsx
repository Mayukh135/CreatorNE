"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { homeFaqs } from "@/lib/home-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white border-t border-[#ccc3d8]/30">
      <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-10">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything You Need to Know"
          align="center"
        />

        <div className="space-y-4">
          {homeFaqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-[#ccc3d8]/30 bg-[#f9f9ff] overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#151c27]"
              >
                <span>{faq.question}</span>
                <Icons.ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#7b7487] transition-transform duration-200 shrink-0",
                    activeFaq === index ? "rotate-180 text-[#630ed4]" : ""
                  )}
                />
              </button>

              <AnimatePresence>
                {activeFaq === index ? (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-[#4a4455] leading-relaxed border-t border-[#ccc3d8]/20 pt-4">
                      {faq.answer}
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
