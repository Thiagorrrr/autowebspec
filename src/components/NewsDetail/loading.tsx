import { Skeleton } from "@/components/Skeleton";

export const Loading = () => (
    <div className="grid gap-10 mt-8">
        <section className="space-y-6">
            <Skeleton type="text" lines={2} width={200} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton type="block" height={500} fullWidth />
            </div>
        </section>

        <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton type="block" height={180} fullWidth />
                <Skeleton type="block" height={180} fullWidth />
                <Skeleton type="block" height={180} fullWidth />
            </div>
        </section>

    </div>
)
