import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { freelancerOpportunities, priorityMeta, type Priority } from "@/lib/parkfix-data";
import { Sparkles, Star, Euro, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_app/freelancer/")({
  component: FreelancerDashboard,
});

function FreelancerDashboard() {
  const stats = [
    { l: "Open opportunities", v: freelancerOpportunities.length, i: Sparkles, t: "text-teal" },
    { l: "Rating", v: "4.8", i: Star, t: "text-warning" },
    { l: "Earnings MTD", v: "€6.4k", i: Euro, t: "text-success" },
    { l: "Next job", v: "Today 18:00", i: Calendar, t: "text-primary" },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Hello Luca" subtitle="New ticket near you matches your specialties.">
        <Button asChild className="gradient-ocean text-primary-foreground">
          <Link to="/freelancer/opportunities">Browse opportunities <ArrowRight className="size-4" /></Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.i;
          return (
            <Card key={s.l} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                  <div className="font-display text-2xl font-bold mt-1">{s.v}</div>
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
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold">Public tickets you can bid on</div>
          <Link to="/freelancer/opportunities" className="text-xs text-teal hover:underline">All opportunities</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {freelancerOpportunities.map((o) => (
            <div key={o.id} className="rounded-xl border border-border p-4 hover:border-teal hover:shadow-soft transition-all">
              <div className="flex items-start justify-between">
                <div className="font-medium text-sm">{o.title}</div>
                <span className={`text-xs font-medium ${priorityMeta[o.priority as Priority].tone}`}>
                  {priorityMeta[o.priority as Priority].label}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{o.park} · {o.posted}</div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-xs text-muted-foreground">{o.bidders} bid{o.bidders !== 1 ? "s" : ""} so far</div>
                <Button size="sm" className="gradient-ocean text-primary-foreground">Place bid</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
