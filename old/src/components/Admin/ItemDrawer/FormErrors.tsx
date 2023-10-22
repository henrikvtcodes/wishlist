import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import type { FieldErrorsImpl } from "react-hook-form";
import type { CreateItemType, UpdateItemType } from "schemas/item";

export const FormErrors = ({
  errors,
}: {
  errors: Partial<FieldErrorsImpl<CreateItemType | UpdateItemType>>;
}) => {
  return (
    <>
      {Object.keys(errors).length > 0 && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There {Object.keys(errors).length > 1 ? "were" : "was"}{" "}
                {Object.keys(errors).length}{" "}
                {Object.keys(errors).length > 1 ? "errors" : "error"} with your
                submission
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  {errors.name && (
                    <li>
                      <span className="font-semibold">{`Name - ${errors.name.type}: `}</span>
                      {errors.name.message}
                    </li>
                  )}
                  {errors.description && (
                    <li>
                      <span className="font-semibold">{`Description - ${errors.description.type}: `}</span>
                      {errors.description.message}
                    </li>
                  )}

                  {errors.imgUrl && (
                    <li>
                      <span className="font-semibold">{`Image URL - ${errors.imgUrl.type}: `}</span>
                      {errors.imgUrl.message}
                    </li>
                  )}

                  {errors.itemUrl && (
                    <li>
                      <span className="font-semibold">{`Item URL - ${errors.itemUrl.type}: `}</span>
                      {errors.itemUrl.message}
                    </li>
                  )}

                  {errors.price && (
                    <li>
                      <span className="font-semibold">{`Price - ${errors.price.type}: `}</span>
                      {errors.price.message}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
