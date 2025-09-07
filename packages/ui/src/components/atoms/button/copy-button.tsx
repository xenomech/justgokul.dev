'use client';

import { Check, Copy } from 'lucide-react';
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
        <Check className="animate-in animate-out fade-in fade-out h-4 w-4 text-green-700 duration-300 " />
      ) : (
        <Copy className="animate-in animate-out fade-in fade-out h-4 w-4 duration-300 " />
      )}
    </button>
  );
}

export default CopyButton;
