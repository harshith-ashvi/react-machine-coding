"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "./breadcrumb";
import FileList from "./file-list";

export type FolderType = {
  id: number;
  name: string;
  type: "file" | "folder";
  parentId: null | number;
};

const folders: FolderType[] = [
  { id: 1, name: "Home", type: "folder", parentId: null },
  { id: 2, name: "Root", type: "folder", parentId: 1 },
  { id: 3, name: "Folder 1", type: "folder", parentId: 2 },
  { id: 4, name: "Folder 2", type: "folder", parentId: 2 },
  { id: 5, name: "File 1", type: "file", parentId: 2 },
  { id: 6, name: "PDF 1", type: "file", parentId: 3 },
  { id: 7, name: "Video 1", type: "file", parentId: 3 },
  { id: 8, name: "File 2-1", type: "file", parentId: 4 },
  { id: 9, name: "File 2-2", type: "file", parentId: 4 },
  { id: 10, name: "Folder 2-1", type: "folder", parentId: 4 },
];

const FileExplorer = () => {
  const [currentFolder, setCurrentFolder] = useState(1);
  const [folderPath, setFolderPath] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Home" },
  ]);

  const filesList = useMemo(() => {
    return folders.filter((file) => file.parentId === currentFolder);
  }, [currentFolder]);

  const updateFolderPath = (folder: { id: number; name: string }) => {
    setCurrentFolder(folder.id);
    setFolderPath((prev) => {
      const foldersList = [];
      for (let i = 0; i < prev.length - 1; i++) {
        foldersList.push(prev[i]);
        if (prev[i].id === folder.id) {
          break;
        }
      }
      return foldersList;
    });
  };

  const handleFolderNavigation = (folder: FolderType) => {
    setCurrentFolder(folder.id);
    setFolderPath((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-screen pt-20">
      <Breadcrumb folderPath={folderPath} updateFolderPath={updateFolderPath} />
      <FileList
        fileList={filesList}
        handleFolderNavigation={handleFolderNavigation}
      />
    </div>
  );
};

export default FileExplorer;
