import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  className?: string;
  content: React.ReactNode | string;
  onClose: () => void;
}

const Modal = ({ isOpen, title, className, content, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-black/50 backdrop-blur-sm fixed z-10, inset-0 flex items-center justify-center">
      <div
        className={cn(
          "rounded-lg w-[80%] h-[80%] border border-neutral-600 ",
          className
        )}
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
      </div>
    </div>
  );
};

export default Modal;
