"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export const CopyComponent = ({ value }: { value: string }) => {
  const [hasCopy, setCopy] = useState(false);

  const onCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopy((v) => !v);
    }
  };

  useEffect(() => {
    const timeoutUnCopy = () =>
      setTimeout(() => {
        setCopy((v) => !v);
      }, 1000);

    if (hasCopy) {
      timeoutUnCopy();
    }

    return () => {
      clearTimeout(timeoutUnCopy());
    };
  }, [hasCopy]);

  return (
    <>
      {hasCopy ? (
        <Check width={24} height={24} />
      ) : (
        <Copy width={24} height={24} onClick={onCopy} />
      )}
    </>
  );
};
