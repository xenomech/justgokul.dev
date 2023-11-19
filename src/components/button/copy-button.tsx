'use client';
import { CheckedIcon, ClipboardCopy } from '@/assets/icons';
import { useState } from 'react';
import { Button } from './button';

interface CopyButtonProps {
  text: string;
}
export const CopyButton = ({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Button
      disabled={isCopied}
      onClick={copy}
      className="rounded-md border-[1px] border-gray-100/60 p-2 text-gray-100/60"
    >
      {isCopied ? (
        <CheckedIcon className="animate-in animate-out fade-in fade-out h-4 w-4 text-green-700 duration-300 " />
      ) : (
        <ClipboardCopy className="animate-in animate-out fade-in fade-out h-4 w-4 duration-300 " />
      )}
    </Button>
  );
};
