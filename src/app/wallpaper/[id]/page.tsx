import { WallpaperDetail } from "@/components/wallpaper-detail";

export default async function WallpaperPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-[#0B0B0F]">
            <WallpaperDetail id={id} />
        </main>
    );
}
