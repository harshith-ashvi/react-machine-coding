"use client";

import { useState } from "react";
import Accordion from "./accordion";

interface AccordionData {
  title: string;
  content: string;
}

const accordionData: AccordionData[] = [
  {
    title: "What is this platform used for?",
    content:
      "This platform helps users manage tasks, access useful tools, and find information in one place. It is designed to be simple, fast, and easy to use for everyday needs.",
  },
  {
    title: "How do I create an account?",
    content:
      "To create an account, click on the sign-up button, enter your basic details, and follow the on-screen instructions. Once registered, you can log in and start using all available features.",
  },
  {
    title: "Is my data safe?",
    content:
      "Yes, we take data security seriously. Your information is protected using standard security measures and is only used according to our privacy policy.",
  },
  {
    title: "How can I contact customer support?",
    content:
      "You can reach customer support through the help section of the platform. Our support team is available to assist with questions, issues, or feedback and aims to respond within 24–48 hours.",
  },
];

const MultipleAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAccordionToggle = (accordionId: number | null) =>
    setOpenIndex(accordionId === openIndex ? null : accordionId);

  return (
    <div className="py-8">
      <h4 className="font-bold text-4xl pb-2">
        Multiple Accordion with single open
      </h4>
      {accordionData.map((data, index) => {
        return (
          <Accordion
            key={index}
            title={data.title}
            isOpen={openIndex === index}
            onChange={() => handleAccordionToggle(index)}
          >
            <p>{data.content}</p>
          </Accordion>
        );
      })}
    </div>
  );
};

export default MultipleAccordion;
