import SingleAccordion from "./single-accordion";
import MultipleAccordion from "./multiple-accordion";

const AccordionComponents = () => {
  return (
    <div className="max-w-4xl mx-auto pt-20 min-h-screen">
      <SingleAccordion />
      <MultipleAccordion />
    </div>
  );
};

export default AccordionComponents;
