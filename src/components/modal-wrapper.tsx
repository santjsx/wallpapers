"use client";

import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

export function ModalWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <Dialog as="div" className="relative z-[100]" open onClose={handleClose}>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity" aria-hidden="true" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-0 md:p-4 text-center sm:p-0">
                    <Dialog.Panel className="relative transform overflow-hidden rounded-t-3xl md:rounded-3xl bg-[#0B0B0F] text-left shadow-2xl transition-all w-full max-w-[95vw] lg:max-w-screen-2xl">
                        {children}
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}
