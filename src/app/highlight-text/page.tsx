"use client";

import { RefObject, useEffect, useRef, useState } from "react";

type SelectionData = {
  showTools: boolean;
  x: number;
  y: number;
  width: number;
  selectedText: string;
};

const initialData: SelectionData = {
  showTools: false,
  x: 0,
  y: 0,
  width: 0,
  selectedText: "",
};

const useSelectionText = (containerRef: RefObject<HTMLElement | null>) => {
  const [data, setData] = useState<SelectionData>(initialData);

  const handleMouseUp = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      setData(initialData);
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    if (!selectedText) {
      setData(initialData);
      return;
    }

    // Ensure selection is inside container
    const container = containerRef.current;
    if (!container) return;

    const startNode = range.startContainer;
    const endNode = range.endContainer;

    if (!container.contains(startNode) || !container.contains(endNode)) {
      setData(initialData);
      return;
    }

    const rect = range.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      setData(initialData);
      return;
    }

    setData({
      showTools: true,
      selectedText,
      x: rect.left + rect.width / 2,
      y: rect.top - 40,
      width: rect.width,
    });
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};

export default function HighlightText() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selection = useSelectionText(containerRef);

  return (
    <div className="relative max-w-4xl mx-auto pt-24 px-4">
      {selection.showTools && (
        <div
          style={{
            position: "fixed",
            left: selection.x,
            top: selection.y,
            transform: "translateX(-50%)",
          }}
          className="flex gap-2 items-center bg-white shadow-lg border rounded-lg px-3 py-2 z-50"
        >
          {/* Twitter */}
          <button
            onClick={() => {
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                selection.selectedText,
              )}`;
              window.open(url, "_blank");
            }}
            className="hover:opacity-70"
          >
            🐦
          </button>

          {/* Example extra action */}
          <button className="hover:opacity-70">✏️</button>
        </div>
      )}

      <div
        ref={containerRef}
        className="selection:bg-yellow-200 selection:text-black leading-relaxed"
      >
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s.
        </p>

        <p className="mt-4">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC.
        </p>

        <p className="mt-4">
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced
          below for those interested.
        </p>
      </div>
    </div>
  );
}
