'use client';

import { CheckedIcon, ClipboardCopy } from '@/assets/icons';
import { useState } from 'react';

function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="rounded-md border-[1px] border-gray-100/60 p-2 text-gray-100/60"
    >
      {isCopied ? (
        <CheckedIcon className="h-4 w-4 text-green-700 animate-in animate-out fade-in fade-out duration-300 " />
      ) : (
        <ClipboardCopy className="h-4 w-4 animate-in animate-out fade-in fade-out duration-300 " />
      )}
    </button>
  );
}

export default CopyButton;
