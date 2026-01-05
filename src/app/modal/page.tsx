"use client";
import React, { useState } from "react";
import Modal from "./modal";

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
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Modal Title to Display"
          onClose={() => setIsModalOpen(false)}
          content="This is a test content"
        />
      )}
    </>
  );
};

export default ModalDisplay;
