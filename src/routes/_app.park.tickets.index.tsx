import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusPill } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { tickets, statusMeta, priorityMeta } from "@/lib/parkfix-data";
import { Search, Plus, Filter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/park/tickets/")({
  component: TicketsList,
});

function TicketsList() {
  const [q, setQ] = useState("");
  const filtered = tickets.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()) || t.assetName.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Tickets" subtitle={`${filtered.length} tickets · ${filtered.filter(t => t.status !== "resolved").length} active`}>
        <Button asChild className="gradient-ocean text-primary-foreground">
          <Link to="/park/tickets/new"><Plus className="size-4" /> Report issue</Link>
        </Button>
      </PageHeader>

      <Card className="p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search tickets…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm"><Filter className="size-4" /> Status</Button>
        <Button variant="outline" size="sm"><Filter className="size-4" /> Priority</Button>
      </Card>

      <Card className="overflow-hidden">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground bg-secondary/50 border-b border-border">
          <div className="col-span-5">Issue</div>
          <div className="col-span-2">Asset</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Quotes</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((t) => (
            <Link
              key={t.id}
              to="/park/tickets/$id"
              params={{ id: t.id }}
              className="grid grid-cols-1 md:grid-cols-12 px-5 py-4 hover:bg-secondary/30 transition-colors items-center gap-2"
            >
              <div className="md:col-span-5">
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-muted-foreground">#{t.id} · {t.reporter} · {t.createdAt}</div>
              </div>
              <div className="md:col-span-2 text-sm text-muted-foreground">{t.assetName}</div>
              <div className={`md:col-span-2 text-sm font-medium ${priorityMeta[t.priority].tone}`}>
                {priorityMeta[t.priority].label}
              </div>
              <div className="md:col-span-2"><StatusPill {...statusMeta[t.status]} /></div>
              <div className="md:col-span-1 text-right text-sm font-display font-semibold">{t.quotes.length || "—"}</div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
