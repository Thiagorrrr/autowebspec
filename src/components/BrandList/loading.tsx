import { Skeleton } from "@/components/Skeleton";

export const Loading = () => (

    <div className="grid gap-10 mt-8">
        <section className="space-y-6">
            <Skeleton type="text" lines={2} width={150} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
                <Skeleton type="block" height={100} fullWidth />
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
