import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRole } from "@/lib/role-context";
import { ArrowRight, Building2, Wrench, User, Check } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

type Role = "park" | "supplier" | "freelancer";

function Onboarding() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Role>("park");
  const { setRole } = useRole();
  const nav = useNavigate();

  const roleCards = [
    { id: "park" as const, title: "I run a park", desc: "Manage assets, report issues and approve quotes.", icon: Building2 },
    { id: "supplier" as const, title: "I'm a supplier", desc: "Receive jobs, send quotes, dispatch technicians.", icon: Wrench },
    { id: "freelancer" as const, title: "I'm a freelancer", desc: "Bid on public tickets from certified parks.", icon: User },
  ];

  const finish = () => {
    setRole(picked);
    nav({ to: `/${picked}` });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl gradient-surf grid place-items-center font-display font-bold text-deep">PF</div>
          <span className="font-display font-bold">ParkFix</span>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {["Role", "Profile", "Done"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`size-6 rounded-full grid place-items-center text-xs font-medium ${i <= step ? "gradient-surf text-deep" : "bg-muted"}`}>
                {i < step ? <Check className="size-3" /> : i + 1}
              </div>
              <span className={i === step ? "text-foreground font-medium" : ""}>{s}</span>
              {i < 2 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          {step === 0 && (
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Welcome to ParkFix</h1>
              <p className="text-muted-foreground mt-2">Choose how you'll be using the platform.</p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {roleCards.map((c) => {
                  const Icon = c.icon;
                  const active = picked === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setPicked(c.id)}
                      className={`text-left p-6 rounded-2xl border-2 transition-all ${active ? "border-teal bg-card shadow-glow" : "border-border bg-card hover:border-teal/50"}`}
                    >
                      <div className={`size-11 rounded-xl grid place-items-center mb-4 ${active ? "gradient-surf text-deep" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="size-5" />
                      </div>
                      <div className="font-display font-semibold">{c.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{c.desc}</div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end mt-8">
                <Button onClick={() => setStep(1)} size="lg" className="gradient-ocean text-primary-foreground">
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Set up your profile</h1>
              <p className="text-muted-foreground mt-2">A few details to personalize your workspace.</p>
              <div className="grid md:grid-cols-2 gap-5 mt-8 bg-card border border-border rounded-2xl p-6">
                <div className="space-y-2">
                  <Label>{picked === "freelancer" ? "Full name" : "Organization name"}</Label>
                  <Input defaultValue={picked === "park" ? "Adventureland Milano" : picked === "supplier" ? "VekomaWorks Service" : "Luca Bianchi"} />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input defaultValue="Italy" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue="demo@parkfix.app" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+39 02 1234 5678" />
                </div>
                {picked === "park" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label>Number of attractions</Label>
                    <Input type="number" defaultValue={12} />
                  </div>
                )}
                {picked !== "park" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label>Specialties</Label>
                    <Input defaultValue="Hydraulics, PLC controls, structural inspection" />
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={() => setStep(2)} size="lg" className="gradient-ocean text-primary-foreground">
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <div className="size-16 mx-auto rounded-full gradient-surf grid place-items-center mb-6">
                <Check className="size-8 text-deep" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">You're all set</h1>
              <p className="text-muted-foreground mt-2">Jump into your workspace and explore.</p>
              <Button size="lg" onClick={finish} className="gradient-ocean text-primary-foreground mt-8">
                Open dashboard <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
