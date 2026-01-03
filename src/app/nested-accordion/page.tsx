"use client";

import AccordionItem from "./accordion-item";

export interface NestedAccordionInterface {
  id: number;
  name: string;
  parentId: null | number;
}

export interface AccordionNode {
  id: number;
  name: string;
  children: AccordionNode[];
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

export function buildAccordionTree(
  data: NestedAccordionInterface[]
): AccordionNode[] {
  const map = new Map<number, AccordionNode>();
  const roots: AccordionNode[] = [];

  for (let i = 0; i < data.length; i++) {
    const { id, name } = data[i];
    map.set(id, {
      id,
      name,
      children: [],
    });
  }

  // Step 2: link children to parents
  data.forEach((item) => {
    const node = map.get(item.id)!;

    if (item.parentId === null) {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      parent?.children.push(node);
    }
  });

  return roots;
}

const NestedAccordion = () => {
  const treeData = buildAccordionTree(nestedAccordionData);

  return (
    <div className="max-w-4xl mx-auto min-h-screen pt-20">
      <h1 className="font-bold text-4xl pb-2">Nested Accordions</h1>
      {treeData.map((acc) => {
        return <AccordionItem key={acc.id} node={acc} />;
      })}
    </div>
  );
};

export default NestedAccordion;
