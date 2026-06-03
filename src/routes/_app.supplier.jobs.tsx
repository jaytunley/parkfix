import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supplierJobs } from "@/lib/parkfix-data";

export const Route = createFileRoute("/_app/supplier/jobs")({
  component: Jobs,
});

function Jobs() {
  return (
    <div className="space-y-6">
      <PageHeader title="Jobs" subtitle="Open requests and active work." />
      <Card className="divide-y divide-border overflow-hidden">
        {supplierJobs.map((j) => (
          <div key={j.id} className="p-5 flex flex-wrap items-center gap-4">
            <div className="size-12 rounded-xl gradient-surf grid place-items-center text-deep text-xl">🛠️</div>
            <div className="flex-1 min-w-[200px]">
              <div className="font-medium">{j.asset}</div>
              <div className="text-xs text-muted-foreground">{j.park}</div>
            </div>
            <div className="text-sm">{j.status}</div>
            <div className="font-display font-semibold">€{j.value.toLocaleString()}</div>
            <Button size="sm" variant="outline">Open</Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
