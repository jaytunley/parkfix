import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusPill } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tickets, assets, statusMeta, priorityMeta, uptimeTrend } from "@/lib/parkfix-data";
import { TrendingUp, AlertTriangle, Clock, Euro, ArrowRight, Plus } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_app/park/")({
  component: ParkDashboard,
});

function ParkDashboard() {
  const open = tickets.filter((t) => t.status !== "resolved");
  const critical = tickets.filter((t) => t.priority === "critical").length;
  const downAssets = assets.filter((a) => a.status === "down");

  const stats = [
    { label: "Open tickets", value: open.length, sub: `${critical} critical`, icon: AlertTriangle, tone: "text-destructive" },
    { label: "Avg. response", value: "2.1h", sub: "↓ 18% vs last month", icon: Clock, tone: "text-teal" },
    { label: "Uptime (30d)", value: "98.4%", sub: "↑ 0.6 pts", icon: TrendingUp, tone: "text-success" },
    { label: "Maintenance spend", value: "€12.4k", sub: "this month", icon: Euro, tone: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Good morning, Marco" subtitle="Here's what needs your attention today.">
        <Button asChild className="gradient-ocean text-primary-foreground">
          <Link to="/park/tickets/new"><Plus className="size-4" /> Report issue</Link>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="font-display text-3xl font-bold mt-1">{s.value}</div>
                  <div className={`text-xs mt-1 ${s.tone}`}>{s.sub}</div>
                </div>
                <div className="size-9 rounded-lg bg-secondary grid place-items-center text-muted-foreground">
                  <Icon className="size-4" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Critical row */}
      {downAssets.length > 0 && (
        <Card className="p-5 border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-lg bg-destructive/15 grid place-items-center text-destructive">
              <AlertTriangle className="size-4" />
            </div>
            <div className="flex-1">
              <div className="font-display font-semibold">
                {downAssets.length} attraction{downAssets.length > 1 ? "s" : ""} currently down
              </div>
              <div className="text-sm text-muted-foreground">
                {downAssets.map((a) => a.name).join(", ")} — affecting today's guest experience.
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/park/tickets">View tickets</Link>
            </Button>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Uptime chart */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-display font-semibold">Park uptime</div>
              <div className="text-xs text-muted-foreground">Rolling monthly average</div>
            </div>
            <div className="text-xs text-muted-foreground">Last 7 months</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={uptimeTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.12 210)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.62 0.12 210)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="oklch(0.5 0.03 230)" fontSize={12} />
                <YAxis domain={[94, 100]} stroke="oklch(0.5 0.03 230)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Area type="monotone" dataKey="uptime" stroke="oklch(0.62 0.12 210)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent tickets */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display font-semibold">Active tickets</div>
            <Link to="/park/tickets" className="text-xs text-teal hover:underline inline-flex items-center gap-1">
              All <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {open.slice(0, 4).map((t) => (
              <Link
                key={t.id}
                to="/park/tickets/$id"
                params={{ id: t.id }}
                className="block group"
              >
                <div className="flex items-start gap-3">
                  <div className={`size-2 rounded-full mt-2 ${t.priority === "critical" ? "bg-destructive" : t.priority === "high" ? "bg-warning" : "bg-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate group-hover:text-teal">{t.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{t.assetName} · {t.createdAt}</div>
                  </div>
                  <StatusPill {...statusMeta[t.status]} />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Problematic rides */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-display font-semibold">Attractions at a glance</div>
            <div className="text-xs text-muted-foreground">Sorted by lowest uptime</div>
          </div>
          <Link to="/park/assets" className="text-xs text-teal hover:underline">View all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...assets].sort((a, b) => a.uptime - b.uptime).slice(0, 6).map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
              <div className="size-12 rounded-lg bg-secondary grid place-items-center text-2xl">{a.image}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{a.name}</div>
                <div className="text-xs text-muted-foreground truncate">{a.location}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-display font-bold ${a.uptime < 96 ? "text-destructive" : a.uptime < 98 ? "text-warning" : "text-success"}`}>
                  {a.uptime}%
                </div>
                <div className="text-[10px] text-muted-foreground uppercase">{a.status}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
