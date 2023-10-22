import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

export const UrlCopyBox = ({ userRef }: { userRef: string }) => {
  const urlToCopy = new URL(window.location.origin);

  urlToCopy.searchParams.set("userRef", userRef);

  const onCopy = async () => {
    await navigator.clipboard.writeText(urlToCopy.toString());
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex w-fit rounded-md shadow-sm">
      <input
        type="url"
        className="block overflow-x-scroll rounded-l-md border-gray-300 p-1 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        disabled
        value={urlToCopy.toString()}
      />
      <button
        type="button"
        title="Copy URL"
        onClick={onCopy}
        className=" inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <ClipboardDocumentListIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
