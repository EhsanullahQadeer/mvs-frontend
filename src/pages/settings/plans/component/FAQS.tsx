import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "How do Credits work?",
      answer:
        "Credits are a monthly allowance provided based on your subscription plan. They serve as a versatile resource for engaging with partners and expanding your opportunities on the platform. With credits, you can submit audio demos for professional feedback, send direct messages to initiate meaningful conversations, and request meetings to explore collaboration opportunities. The number of credits you receive each month varies by plan, empowering you to tailor your experience and maximize your creative potential.",
    },
    {
      question: "What is an Icebreaker Message?",
      answer:
        "An Icebreaker Message is a special tool that helps creators grab a partner's attention and start conversations faster. It’s designed to encourage quick responses and build stronger connections between users.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, we offer 24/7 customer support via email and live chat.",
    },
    {
      question: "Can I upgrade or downgrade my account anytime?",
      answer: "Yes, you can upgrade or downgrade your subscription anytime.",
    },
    {
      question: "What happens if I cancel my MVSSIVE plan?",
      answer:
        "Your subscription will end, and your access to premium features will be revoked.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <h2 className="text-[28px] px-4 font-bold text-white my-5">FAQs</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="flex flex-col p-4 border-b border-[#1c1c1c] gap-4"
        >
          <div
            className="w-full flex items-center justify-between cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h2 className="text-[18px] text-white font-semibold">
              {faq.question}
            </h2>
            <span
              className={`text-xl transition-transform duration-300 ease-in-out ${
                activeIndex === index ? "rotate-90" : "rotate-0"
              }`}
            >
                <MdKeyboardArrowRight className="text-white" />
                </span>
          </div>
          <div
            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <p className="text-[14px] w-1/2 text-mediumGray font-normal mt-2">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default FAQS;
