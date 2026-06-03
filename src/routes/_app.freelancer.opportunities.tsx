import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { freelancerOpportunities, priorityMeta, type Priority } from "@/lib/parkfix-data";

export const Route = createFileRoute("/_app/freelancer/opportunities")({
  component: Opps,
});

function Opps() {
  return (
    <div className="space-y-6">
      <PageHeader title="Opportunities" subtitle="Public tickets matching your certifications." />
      <div className="grid md:grid-cols-2 gap-4">
        {freelancerOpportunities.map((o) => (
          <Card key={o.id} className="p-5 hover:shadow-soft transition-all">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display font-semibold">{o.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{o.park} · {o.posted}</div>
              </div>
              <span className={`text-xs font-medium ${priorityMeta[o.priority as Priority].tone}`}>
                {priorityMeta[o.priority as Priority].label}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{o.bidders} bid{o.bidders !== 1 ? "s" : ""}</span>
              <Button size="sm" className="gradient-ocean text-primary-foreground">Place bid</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
