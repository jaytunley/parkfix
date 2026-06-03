import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { assets } from "@/lib/parkfix-data";
import { Camera, Mic, Video, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/park/tickets/new")({
  component: NewTicket,
});

function NewTicket() {
  const nav = useNavigate();
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("high");
  const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader title="Report an issue" subtitle="The more detail, the faster suppliers can respond." />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Ticket submitted", { description: "Notified suppliers in your network." });
          nav({ to: "/park/tickets" });
        }}
      >
        <Card className="p-6 space-y-5">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required placeholder="e.g. Hydraulic brake leak on Car 3" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Asset</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                {assets.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex gap-2">
                {(["low", "medium", "high", "critical"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 h-10 rounded-md text-sm capitalize border transition ${priority === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
                  >{p}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea rows={4} placeholder="What did you observe? When did it start?" />
          </div>

          <div className="space-y-2">
            <Label>Attach evidence</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { i: Camera, l: "Photo" },
                { i: Video, l: "Video" },
                { i: Mic, l: "Voice note" },
              ].map(({ i: Icon, l }) => (
                <button
                  key={l}
                  type="button"
                  className="aspect-[5/3] rounded-xl border-2 border-dashed border-border hover:border-teal hover:bg-secondary/30 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-teal transition"
                >
                  <Icon className="size-5" />
                  <span className="text-xs font-medium">{l}</span>
                </button>
              ))}
            </div>
            <button type="button" className="text-xs text-teal hover:underline inline-flex items-center gap-1 mt-1">
              <Upload className="size-3" /> Upload file
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
            <div>
              <div className="font-medium text-sm">Open to certified freelancers</div>
              <div className="text-xs text-muted-foreground">Independent technicians in your area can bid.</div>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button asChild variant="ghost" type="button">
              <Link to="/park/tickets">Cancel</Link>
            </Button>
            <Button type="submit" className="gradient-ocean text-primary-foreground">Submit ticket</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
