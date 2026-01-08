"use client";

import { useState } from "react";
import { ChevronRight, File, Folder, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { FormattedFileType } from "./page";
import { cn } from "@/lib/utils";

interface FileListProps {
  file: FormattedFileType;
  handleOpenModal: (id: number | null) => void;
}

const FileList = ({ file, handleOpenModal }: FileListProps) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {file.type === "folder" && (
            <ChevronRight
              className={cn(
                "cursor-pointer duration-300 transition-all",
                isExpand ? "rotate-z-90" : ""
              )}
              onClick={() => setIsExpand(!isExpand)}
            />
          )}
          {file.type === "file" ? <File className="ml-8 " /> : <Folder />}
          <p className="font-bold text-lg">{file.name}</p>
        </div>
        {file.type === "folder" && (
          <button
            className="p-1 cursor-pointer"
            onClick={() => handleOpenModal(file.id)}
          >
            <Plus />
          </button>
        )}
      </div>
      <AnimatePresence>
        {file.children.length > 0 && isExpand && (
          <motion.div
            className="ml-4"
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {file.children.map((fileChild) => (
              <FileList
                key={fileChild.id}
                file={fileChild}
                handleOpenModal={handleOpenModal}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileList;
