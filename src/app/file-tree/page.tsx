"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import { FolderPlus } from "lucide-react";

import Modal from "./modal";
import FileList from "./file-list";

export type FileType = {
  id: number;
  type: "file" | "folder";
  name: string;
  parentId: null | number;
};

export type FormattedFileType = {
  id: number;
  type: "file" | "folder";
  name: string;
  children: FormattedFileType[];
};

const getFormattedFileList = (data: FileType[]): FormattedFileType[] => {
  const map = new Map<number, FormattedFileType>();
  const result: FormattedFileType[] = [];

  for (let i = 0; i < data.length; i++) {
    map.set(data[i].id, { ...data[i], children: [] });
  }

  data.forEach((item) => {
    const file = map.get(item.id);
    if (!file) return;
    if (!item.parentId) {
      result.push(file);
    } else {
      const parent = map.get(item.parentId);
      parent?.children.push(file);
    }
  });

  return result;
};

const FileTree = () => {
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [parentId, setParentId] = useState<null | number>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<"file" | "folder">("file");

  const formattedFiles = useMemo(() => {
    return getFormattedFileList(fileList);
  }, [fileList]);

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleOpenModal = (id: number | null) => {
    setFileName("");
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
      <div className="max-w-lg mx-auto min-h-screen pt-40 flex flex-col items-center justify-start">
        <div className="flex items-center justify-between w-full mb-2">
          <p className="font-bold text-2xl">File Tree</p>{" "}
          <button
            className="cursor-pointer"
            onClick={() => handleOpenModal(null)}
          >
            <FolderPlus />
          </button>
        </div>
        <AnimatePresence>
          {formattedFiles.map((file) => (
            <FileList
              key={file.id}
              file={file}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </AnimatePresence>
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
