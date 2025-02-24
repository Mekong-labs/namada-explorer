import clsx from "clsx";
import { Loader } from "lucide-react";

export default function LoadingDefault({ style }: { style?: string }) {
  return (
    <Loader
      className={clsx(
        "text-yellow-1 absolute bottom-0 left-0 right-0 top-0 z-[999] m-auto h-20 w-20 animate-spin",
        {
          [`${style}`]: !!style,
        }
      )}
    />
  );
}
