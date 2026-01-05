import { Skeleton } from "@/components/Skeleton";

export const Loading = () => (

    <div className="grid gap-10 mt-8">
        <section className="space-y-6">
            <Skeleton type="text" lines={2} width={150} />
            <div className="grid  gap-6">
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
            </div>
        </section>
    </div>
)
