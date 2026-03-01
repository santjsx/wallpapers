import { ModalWrapper } from "@/components/modal-wrapper";
import { WallpaperDetail } from "@/components/wallpaper-detail";

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <ModalWrapper>
            <WallpaperDetail id={id} isModal={true} />
        </ModalWrapper>
    );
}
