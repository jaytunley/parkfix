import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { uptimeTrend, failureBreakdown, assets } from "@/lib/parkfix-data";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_app/park/analytics")({
  component: Analytics,
});

const COLORS = ["oklch(0.38 0.09 235)", "oklch(0.62 0.12 210)", "oklch(0.78 0.09 195)", "oklch(0.65 0.16 155)", "oklch(0.78 0.16 75)"];

function Analytics() {
  const stats = [
    { l: "Avg. uptime", v: "98.4%", d: "+0.6 pts vs prev. month" },
    { l: "Mean time to repair", v: "5.2h", d: "−21% vs prev. month" },
    { l: "Recurring failures", v: "8", d: "across 3 assets" },
    { l: "Cost per ride / month", v: "€840", d: "−12% YoY" },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Reliability, response and cost insights across your park." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.l} className="p-5">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="font-display text-3xl font-bold text-gradient mt-1">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.d}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="font-display font-semibold mb-4">Uptime trend</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={uptimeTrend}>
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.12 210)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.62 0.12 210)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="oklch(0.5 0.03 230)" fontSize={12} />
                <YAxis domain={[94, 100]} stroke="oklch(0.5 0.03 230)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Area type="monotone" dataKey="uptime" stroke="oklch(0.62 0.12 210)" strokeWidth={2.5} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="font-display font-semibold mb-4">Failure causes</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={failureBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {failureBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="text-xs space-y-1.5 mt-2">
            {failureBreakdown.map((f, i) => (
              <li key={f.name} className="flex items-center gap-2">
                <span className="size-2.5 rounded-sm" style={{ background: COLORS[i] }} />
                <span className="flex-1">{f.name}</span>
                <span className="text-muted-foreground">{f.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <div className="font-display font-semibold mb-4">Uptime by attraction</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assets.map((a) => ({ name: a.name, uptime: a.uptime }))}>
              <XAxis dataKey="name" stroke="oklch(0.5 0.03 230)" fontSize={11} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis domain={[90, 100]} stroke="oklch(0.5 0.03 230)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
              <Bar dataKey="uptime" fill="oklch(0.62 0.12 210)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
