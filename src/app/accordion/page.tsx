"use client";

import { useState } from "react";
import Accordion from "./accordion";

const AccordionComponents = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAccordionToggle = (accordionId: boolean) =>
    setIsOpen(accordionId);

  return (
    <div className="max-w-4xl mx-auto pt-20 min-h-screen">
      <Accordion
        title="Lorem Ipsem"
        isOpen={isOpen}
        onChange={handleAccordionToggle}
      >
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </Accordion>
    </div>
  );
};

export default AccordionComponents;
