import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface BreadCrumbProps {
  folderPath: { id: number; name: string }[];
  updateFolderPath: (folder: { id: number; name: string }) => void;
}

const Breadcrumb = ({ folderPath, updateFolderPath }: BreadCrumbProps) => {
  return (
    <div className="w-full p-2 rounded bg-neutral-600">
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
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
      </motion.div>
    </div>
  );
};

export default Breadcrumb;
