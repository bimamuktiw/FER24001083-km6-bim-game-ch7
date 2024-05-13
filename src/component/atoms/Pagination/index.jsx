import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

export default function Pagination({
  className,
  disabled,
  page,
  maxPage,
  onPrev,
  onNext,
  onSubmit,
}) {
  const [pageNow, setPageNow] = useState(0);

  useEffect(() => {
    setPageNow(page);
  }, [page]);

  return (
    <div
      className={cn(
        "flex items-center overflow-hidden w-fit",
        className
      )}
    >
      <button
        className={cn(
          "w-[40px] h-[40px] flex justify-center items-center cursor-pointer text-white rounded-full : hover:bg-gray-200  hover:text-black",
        )}
        disabled={disabled || page <= 1}
        onClick={onPrev}
      >
        <Icon icon="tabler:chevron-left" height={25} />
      </button>
      <div className="h-[40px] w-[80px] flex justify-center items-center text-center text-white">
        {pageNow}
      </div>
      <button
        className={cn(
          "w-[40px] h-[40px] flex justify-center items-center cursor-pointer text-white",
          disabled || (maxPage && page >= maxPage) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 hover:text-black ",
          "rounded-full" 
        )}
        disabled={disabled || (maxPage && page >= maxPage)}
        onClick={onNext}
      >
        <Icon icon="tabler:chevron-right" height={25} />
      </button>
    </div>
  );
}
