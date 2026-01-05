"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  title: string;
  className?: string;
  content: React.ReactNode | string;
  onClose: () => void;
}

const useClickOutside = (onClose: () => void) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
};

const Modal = ({ isOpen, title, className, content, onClose }: ModalProps) => {
  const containerRef = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-black/50 backdrop-blur-sm fixed z-10, inset-0 flex items-center justify-center">
      <motion.div
        ref={containerRef}
        className={cn(
          "rounded-lg w-[80%] h-[80%] border border-neutral-600 ",
          className
        )}
        initial={{ opacity: 0, width: 0, height: 0 }}
        exit={{ opacity: 0, width: 0, height: 0 }}
        animate={{ opacity: 1, height: "80%", width: "80%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
          <h4 className="font-bold text-2xl">{title}</h4>
          <button
            className="p-2 rounded-lg bg-neutral-400 cursor-pointer"
            onClick={onClose}
          >
            <X className="size-4 " />
          </button>
        </div>
        <div className="p-2">{content}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
