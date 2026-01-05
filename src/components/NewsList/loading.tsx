import { Skeleton } from "@/components/Skeleton";

export const Loading = () => (

    <div className="grid gap-10 mt-8">
        <section className="space-y-6">
            <Skeleton type="text" lines={2} width={150} />
            <div className="grid  gap-6">
                <Skeleton type="block" height={200} fullWidth />
            </div>
        </section>

        <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <Skeleton type="block" height={200} fullWidth />
                <Skeleton type="block" height={200} fullWidth />
                <Skeleton type="block" height={200} fullWidth />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <Skeleton type="block" height={200} fullWidth />
                <Skeleton type="block" height={200} fullWidth />
                <Skeleton type="block" height={200} fullWidth />
            </div>

        </section>




    </div>
)
