import { ChevronRight } from "lucide-react";

interface BreadCrumbProps {
  folderPath: { id: number; name: string }[];
  updateFolderPath: (folder: { id: number; name: string }) => void;
}

const Breadcrumb = ({ folderPath, updateFolderPath }: BreadCrumbProps) => {
  return (
    <div className="w-full p-2 rounded bg-neutral-600">
      <div className="flex items-center">
        {folderPath.map((folder, i) => (
          <div key={folder.id} className="flex items-center gap-2">
            <p
              className="font-bold text-lg cursor-pointer hover:underline"
              onClick={() => updateFolderPath(folder)}
            >
              {folder.name}
            </p>
            {folderPath.length - 1 > i && <ChevronRight />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
