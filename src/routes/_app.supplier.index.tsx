import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supplierJobs } from "@/lib/parkfix-data";
import { Briefcase, Star, TrendingUp, Euro, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_app/supplier/")({
  component: SupplierDashboard,
});

function SupplierDashboard() {
  const stats = [
    { l: "Active jobs", v: 7, i: Briefcase, t: "text-primary" },
    { l: "Win rate", v: "62%", i: TrendingUp, t: "text-success" },
    { l: "Rating", v: "4.9", i: Star, t: "text-warning" },
    { l: "Revenue MTD", v: "€48k", i: Euro, t: "text-teal" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Welcome back, VekomaWorks" subtitle="3 new requests since yesterday.">
        <Button asChild className="gradient-ocean text-primary-foreground"><Link to="/supplier/jobs">View jobs <ArrowRight className="size-4" /></Link></Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.i;
          return (
            <Card key={s.l} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                  <div className="font-display text-3xl font-bold mt-1">{s.v}</div>
                </div>
                <div className={`size-9 rounded-lg bg-secondary grid place-items-center ${s.t}`}>
                  <Icon className="size-4" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5">
        <div className="font-display font-semibold mb-4">Recent jobs</div>
        <div className="divide-y divide-border">
          {supplierJobs.map((j) => (
            <div key={j.id} className="py-3 flex items-center gap-3">
              <div className="size-10 rounded-lg gradient-surf grid place-items-center text-deep">🔧</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{j.asset}</div>
                <div className="text-xs text-muted-foreground">{j.park} · {j.status}</div>
              </div>
              <div className="text-right">
                <div className="font-display font-semibold">€{j.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{j.due}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
