import { Skeleton } from "@/components/Skeleton";

export const Loading = () => (

    <div className="grid gap-10 mt-8">
        <section className="space-y-6">
            <div className="grid gap-2">
                <Skeleton type="block" height={400} fullWidth />
            </div>
        </section>

    </div>
)
