"use client";

import { useState } from "react";

import FolderAccordion from "./folder-accordion";

export interface NestedAccordionInterface {
  id: number;
  name: string;
  parentId: null | number;
}

const nestedAccordionData: NestedAccordionInterface[] = [
  { id: 1, name: "Parent 1", parentId: null },
  { id: 2, name: "Child 1.1", parentId: 1 },
  { id: 3, name: "Child 1.2", parentId: 1 },
  { id: 4, name: "Parent 2", parentId: null },
  { id: 5, name: "Child 2.1", parentId: 4 },
  { id: 6, name: "Child 2.2", parentId: 4 },
  { id: 7, name: "Child 1.1.1", parentId: 2 },
  { id: 8, name: "Child 1.2.1", parentId: 3 },
];

function formatAccordionData(data: NestedAccordionInterface[]) {
  return data.reduce(
    (acc, current) => {
      if (!current.parentId) {
        acc.parentAccordion.push(current);
      } else {
        if (!acc.childAccordions[`${current.parentId}`]) {
          acc.childAccordions[`${current.parentId}`] = [];
        }
        acc.childAccordions[`${current.parentId}`].push(current);
      }
      return acc;
    },
    { parentAccordion: [], childAccordions: {} } as {
      parentAccordion: NestedAccordionInterface[];
      childAccordions: Record<string, NestedAccordionInterface[]>;
    }
  );
}

const NestedAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number[]>([]);

  const { parentAccordion, childAccordions } =
    formatAccordionData(nestedAccordionData);

  const handleToggle = (id: number) => {
    if (openIndex.includes(id)) {
      setOpenIndex((prev) => {
        return prev.filter((index) => index !== id);
      });
    } else {
      setOpenIndex((prev) => [...prev, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen pt-20">
      <h1 className="font-bold text-4xl pb-2">Nested Accordions</h1>
      {parentAccordion.map((acc) => {
        return (
          <FolderAccordion
            key={acc.id}
            accordionId={acc.id}
            openIndex={openIndex}
            title={acc.name}
            childAccordions={childAccordions}
            handleToggle={handleToggle}
          />
        );
      })}
    </div>
  );
};

export default NestedAccordion;
