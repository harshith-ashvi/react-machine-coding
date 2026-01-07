"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal = ({
  children,
  title,
  className,
  onClose,
  onSubmit,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed z-10 inset-0 bg-black/50 backdrop-blur-sm w-full h-full flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "w-[80%] h-[80%] border border-neutral-800 rounded-lg flex flex-col ",
          className
        )}
        initial={{ opacity: 0, height: 0, width: 0 }}
        exit={{ opacity: 0, height: 0, width: 0 }}
        animate={{ opacity: 1, height: "80%", width: "80%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal={true}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-600">
          <h4 className="font-bold text-2xl">{title}</h4>
          <button
            className="p-2 rounded-lg bg-neutral-600 cursor-pointer"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1">{children}</div>
        <div className="flex items-end justify-end gap-4 p-4 border-t border-neutral-600">
          <button className="px-2 py-1 cursor-pointer" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-2 py-1 bg-blue-600 cursor-pointer rounded"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
