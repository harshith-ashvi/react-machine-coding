"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";

import Modal from "./modal";

type FileType = {
  id: number;
  type: "file" | "folder";
  name: string;
  parentId: null | number;
};

// type FormattedFileType = {
//   id: number;
//   type: "file" | "folder";
//   name: string;
//   children: FormattedFileType[];
// };

const FileTree = () => {
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [parentId, setParentId] = useState<null | number>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<"file" | "folder">("file");

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleOpenModal = (id: number | null) => {
    setParentId(id);
    handleModalToggle();
  };

  const onCloseModal = () => {
    setParentId(null);
    handleModalToggle();
  };

  const handleSaveDetails = () => {
    const newFile = {
      id: fileList.length + 1,
      type: fileType,
      name: fileName,
      parentId: parentId,
    };
    setFileList((prevState) => [...prevState, newFile]);
    onCloseModal();
  };

  return (
    <>
      <div className="max-w-4xl mx-auto min-h-screen flex justify-center items-center">
        <button
          onClick={() => handleOpenModal(null)}
          className="cursor-pointer"
        >
          Open
        </button>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title="Create file/folder"
            onClose={handleModalToggle}
            onSubmit={handleSaveDetails}
            className="h-56 w-4xl"
          >
            <div className="w-full h-full p-4 flex items-start justify-center gap-2">
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="file" className="text-sm">
                  File/Folder Name
                </label>
                <input
                  name="file"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file/folder name"
                  className="border border-neutral-400 px-2 py-1 rounded-lg"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="type" className="text-sm">
                  File/Folder Type
                </label>
                <select
                  name="type"
                  value={fileType}
                  onChange={(e) =>
                    setFileType(e.target.value as "file" | "folder")
                  }
                  className="w-36 px-2 py-[6] rounded-lg border border-neutral-400"
                >
                  <option value="file">File</option>
                  <option value="folder">Folder</option>
                </select>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default FileTree;
