'use client';
import { FrontMatterType } from '@/lib/common';
import * as Modal from '@radix-ui/react-alert-dialog';
import { X } from 'lucide-react';
import React from 'react';

type PropType = {
  data: FrontMatterType[];
};
const CommandMenu = ({ data }: PropType) => {
  const [open, setOpen] = React.useState(false);
  // const [search, setSearch] = React.useState('');

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: {
      key: string;
      metaKey: boolean;
      ctrlKey: boolean;
      preventDefault: () => void;
    }) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div>
      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Trigger asChild>
          <button className="flex items-center justify-between rounded-lg border-[1px] border-black border-opacity-10 p-2 text-dawn-900">
            <p>search</p>
            <p className="rounded-lg border-[1px] border-black border-opacity-10 px-2 py-1 text-xs ">
              cmd + k
            </p>
          </button>
        </Modal.Trigger>
        <Modal.Portal>
          <Modal.Overlay className="fixed inset-0 z-20 bg-base-100 bg-opacity-80 backdrop-blur-sm transition-opacity duration-150 ease-in-out" />
          <Modal.Content className="fixed left-1/2 top-1/2 z-30 w-[50vw] max-w-md -translate-x-1/2 -translate-y-1/2 transition-transform">
            <div className="flex flex-col items-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="w-fit rounded-full border-[1px] border-black border-opacity-30 bg-base-100 p-2 shadow-lg"
              >
                <X className="h-6 w-6 text-dawn-900 hover:text-black" />
              </button>
              <div className="flex w-full flex-col items-start justify-center gap-4 rounded-md border-[1px] border-black border-opacity-30 bg-base-100 p-4 shadow-lg">
                <h3 className="rounded-lg border-[1px] border-black border-opacity-10 px-2 py-1  capitalize text-dawn-900">
                  cmd + k
                </h3>
                <input
                  type="text"
                  placeholder="Type actions"
                  className="w-full rounded-lg border-[1px] border-black border-opacity-10 bg-transparent  p-2 transition-all duration-150 ease-in-out hover:border-opacity-100"
                  // onChange={(e) => setSearch(e.target.value)}
                ></input>
                {data.map((item) => (
                  <p key={item.slug}>{item.title}</p>
                ))}
              </div>
            </div>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    </div>
  );
};

export default CommandMenu;
