import { Skeleton } from "@/components/Skeleton";

export const Loading = () => (

    <div className="grid gap-10 mt-8">
        <section className="space-y-6">
            <Skeleton type="block" height={200} fullWidth />
        </section>
        <section className="space-y-6">
            <Skeleton type="text" lines={2} width={150} />
            <div className="grid gap-2">
                <Skeleton type="block" height={400} fullWidth />
            </div>
        </section>
        <section className="space-y-6">
            <div className="grid gap-2">
                <Skeleton type="block" height={100} fullWidth />
            </div>
        </section>
        <section className="space-y-6">
            <div className="grid gap-2">
                <Skeleton type="block" height={600} fullWidth />
            </div>
        </section>
    </div>
)
