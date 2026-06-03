import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { assets } from "@/lib/parkfix-data";
import { Plus, Search, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/park/assets")({
  component: AssetsPage,
});

function AssetsPage() {
  const [q, setQ] = useState("");
  const list = assets.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <PageHeader title="Assets" subtitle={`${assets.length} attractions registered`}>
        <Button className="gradient-ocean text-primary-foreground"><Plus className="size-4" /> Add asset</Button>
      </PageHeader>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search attractions…" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((a) => {
          const tone =
            a.status === "down" ? "text-destructive border-destructive/30 bg-destructive/10" :
            a.status === "maintenance" ? "text-warning border-warning/30 bg-warning/10" :
            "text-success border-success/30 bg-success/10";
          return (
            <Card key={a.id} className="p-5 hover:shadow-soft hover:-translate-y-0.5 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="size-16 rounded-2xl gradient-surf grid place-items-center text-4xl">{a.image}</div>
                <span className={`text-[11px] uppercase font-medium px-2 py-1 rounded-full border ${tone}`}>{a.status}</span>
              </div>
              <div className="font-display font-semibold text-lg">{a.name}</div>
              <div className="text-xs text-muted-foreground">{a.category} · {a.manufacturer}</div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {a.location}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {a.installedYear}</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">Uptime (30d)</div>
                <div className={`font-display font-bold text-lg ${a.uptime < 96 ? "text-destructive" : a.uptime < 98 ? "text-warning" : "text-success"}`}>
                  {a.uptime}%
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
