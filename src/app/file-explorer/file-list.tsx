import { File, Folder } from "lucide-react";
import { FolderType } from "./page";

interface FileListProps {
  fileList: FolderType[];
  handleFolderNavigation: (folder: FolderType) => void;
}

const FileList = ({ fileList, handleFolderNavigation }: FileListProps) => {
  return (
    <div className="pt-2">
      <div className="flex items-center gap-2 flex-wrap">
        {fileList.length ? (
          <>
            {fileList.map((file) => {
              return (
                <div key={file.id} className="flex flex-col items-center gap-1">
                  {file.type === "file" ? (
                    <File className="size-12" />
                  ) : (
                    <Folder
                      className="cursor-pointer size-12"
                      onClick={() => handleFolderNavigation(file)}
                    />
                  )}
                  <p className="font-medium text-sm">{file.name}</p>
                </div>
              );
            })}
          </>
        ) : (
          <h4 className="font-bold text-lg">No Files</h4>
        )}
      </div>
    </div>
  );
};

export default FileList;
