import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader, StatusPill } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { tickets, statusMeta, priorityMeta, type Ticket } from "@/lib/parkfix-data";
import { Star, Check, ArrowLeft, Send, Paperclip } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/park/tickets/$id")({
  component: TicketDetail,
  loader: ({ params }) => {
    const t = tickets.find((x) => x.id === params.id);
    if (!t) throw notFound();
    return { ticket: t };
  },
  notFoundComponent: () => (
    <div className="p-12 text-center">
      <h2 className="font-display text-xl font-semibold">Ticket not found</h2>
      <Button asChild variant="outline" className="mt-4">
        <Link to="/park/tickets">Back to tickets</Link>
      </Button>
    </div>
  ),
});

function TicketDetail() {
  const { ticket } = Route.useLoaderData() as { ticket: Ticket };
  const [accepted, setAccepted] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <Link to="/park/tickets" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-3">
          <ArrowLeft className="size-3" /> All tickets
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">#{ticket.id}</span>
              <StatusPill {...statusMeta[ticket.status]} />
              <span className={`text-xs font-medium ${priorityMeta[ticket.priority].tone}`}>
                · {priorityMeta[ticket.priority].label} priority
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{ticket.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {ticket.assetName} · Reported by {ticket.reporter} · {ticket.createdAt}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Mark resolved</Button>
            <Button className="gradient-ocean text-primary-foreground">Update status</Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="p-6">
            <div className="font-display font-semibold mb-3">Description</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{ticket.description}</p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {["🎢", "🔧", "💧"].map((e, i) => (
                <div key={i} className="aspect-video rounded-lg bg-secondary grid place-items-center text-3xl">{e}</div>
              ))}
            </div>
          </Card>

          {/* Quotes */}
          {ticket.quotes.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display font-semibold">Quotes received</div>
                  <div className="text-xs text-muted-foreground">Compare side-by-side and approve digitally.</div>
                </div>
                <span className="text-sm text-muted-foreground">{ticket.quotes.length} quotes</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {ticket.quotes.map((q) => {
                  const isAccepted = accepted === q.id;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl border p-4 transition-all ${isAccepted ? "border-success bg-success/5" : "border-border hover:border-teal"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-sm">{q.vendor}</div>
                          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{q.vendorType}</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="size-3 fill-warning text-warning" />
                          {q.rating}
                        </div>
                      </div>
                      <div className="font-display text-2xl font-bold text-gradient mt-3">€{q.price.toLocaleString()}</div>
                      <dl className="text-xs text-muted-foreground space-y-1 mt-3">
                        <div className="flex justify-between"><dt>ETA</dt><dd className="text-foreground font-medium">{q.eta}</dd></div>
                        <div className="flex justify-between"><dt>Warranty</dt><dd className="text-foreground font-medium">{q.warranty}</dd></div>
                      </dl>
                      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{q.notes}</p>
                      <Button
                        size="sm"
                        className={`w-full mt-4 ${isAccepted ? "bg-success text-success-foreground" : "gradient-ocean text-primary-foreground"}`}
                        onClick={() => {
                          setAccepted(q.id);
                          toast.success(`Accepted quote from ${q.vendor}`);
                        }}
                      >
                        {isAccepted ? <><Check className="size-4" /> Accepted</> : "Accept quote"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Chat */}
          <Card className="p-6">
            <div className="font-display font-semibold mb-4">Conversation</div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {ticket.messages.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-8">No messages yet.</div>
              )}
              {ticket.messages.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs bg-teal/15 text-teal">{m.from[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">{m.from}</span>
                      <span className="text-xs text-muted-foreground">{m.time}</span>
                    </div>
                    <div className="text-sm mt-1 bg-secondary/60 rounded-lg rounded-tl-none px-3 py-2 inline-block">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="ghost" size="icon"><Paperclip className="size-4" /></Button>
              <Input
                placeholder="Type a message…"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && msg.trim()) {
                    toast.success("Message sent");
                    setMsg("");
                  }
                }}
              />
              <Button className="gradient-ocean text-primary-foreground" onClick={() => { if (msg.trim()) { toast.success("Message sent"); setMsg(""); }}}>
                <Send className="size-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Details</div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Asset</dt><dd className="font-medium">{ticket.assetName}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Reporter</dt><dd className="font-medium">{ticket.reporter}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Public</dt><dd className="font-medium">{ticket.isPublic ? "Yes" : "No"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Created</dt><dd className="font-medium">{ticket.createdAt}</dd></div>
            </dl>
          </Card>
          <Card className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Timeline</div>
            <ol className="space-y-3 text-sm">
              {[
                ["Reported", ticket.createdAt],
                ["Suppliers notified", "5 min after"],
                [`${ticket.quotes.length} quotes received`, "within 2h"],
                ["Awaiting approval", "now"],
              ].map(([l, t], i) => (
                <li key={i} className="flex gap-3">
                  <div className="size-2 rounded-full bg-teal mt-1.5" />
                  <div className="flex-1">
                    <div className="font-medium">{l}</div>
                    <div className="text-xs text-muted-foreground">{t}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
