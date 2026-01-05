import { Skeleton } from "@/components/Skeleton";

export const Loading = () => (

    <div className="grid gap-10 mt-8">
        <section className="space-y-6">
            <div className="flex justify-between">
                <Skeleton type="text" lines={2} width={200} />
                <Skeleton type="text" lines={2} width={100} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <Skeleton type="block" height={250} fullWidth />
                <Skeleton type="block" height={250} fullWidth />
            </div>
        </section>

        <section className="space-y-6">
            <Skeleton type="block" height={160} fullWidth />
        </section>

        <section className="space-y-6">
            <Skeleton type="text" lines={2} width={200} />
            <div className="gap-6">
                <Skeleton type="block" height={300} fullWidth />
            </div>
        </section>

        <section className="space-y-6">
            <div className="gap-6">
                <Skeleton type="block" height={600} fullWidth />
            </div>
        </section>

        <section className="space-y-6">
            <div className="gap-6">
                <Skeleton type="block" height={300} fullWidth />
            </div>
        </section>

    </div>
)
