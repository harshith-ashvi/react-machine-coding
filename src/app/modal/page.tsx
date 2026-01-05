"use client";
import { useState } from "react";
import Modal from "./modal";
import { AnimatePresence } from "motion/react";

const ModalDisplay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center">
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Open
        </button>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title="Modal Title to Display"
            onClose={() => setIsModalOpen(false)}
          >
            <p>This is test content</p>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalDisplay;
