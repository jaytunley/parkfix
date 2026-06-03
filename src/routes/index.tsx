import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Boxes, BarChart3, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "ParkFix — Maintenance for Family Entertainment Parks" },
      { name: "description", content: "Report issues, manage assets, compare quotes, and track uptime across your theme park." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="absolute top-0 inset-x-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl gradient-surf grid place-items-center font-display font-bold text-deep">PF</div>
            <span className="font-display font-bold text-lg">ParkFix</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#roles" className="hover:text-foreground">For your team</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
          </nav>
          <Button asChild className="gradient-ocean text-primary-foreground">
            <Link to="/onboarding">Get started <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-[600px] rounded-full bg-teal/20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs font-medium text-teal mb-6">
              <span className="size-1.5 rounded-full bg-success animate-pulse" /> Trusted by 120+ parks across Europe
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              Keep the magic <span className="text-gradient">running.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              ParkFix is the maintenance & repair platform built for family entertainment parks.
              Report issues in seconds, compare quotes from trusted suppliers and certified freelancers,
              and track every asset's reliability — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-ocean text-primary-foreground">
                <Link to="/onboarding">Start free trial <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/park">View live demo</Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 max-w-md gap-6">
              {[
                ["98.4%", "avg. uptime"],
                ["–37%", "downtime"],
                ["2.1h", "avg. response"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Everything maintenance needs.</h2>
            <p className="mt-4 text-muted-foreground text-lg">From the first photo of a leaking brake to the final signed-off invoice — without a single spreadsheet.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { i: Wrench, t: "Smart ticketing", d: "Photo, video and voice input. Auto-routed to the right supplier." },
              { i: MessageSquare, t: "In-app chat", d: "Every ticket has its own thread — park and supplier on the same page." },
              { i: Boxes, t: "Asset registry", d: "Rides, attractions, manuals, warranties and locations — always up to date." },
              { i: ShieldCheck, t: "Vetted suppliers", d: "Certified freelancers and OEM service teams, rated by parks." },
              { i: BarChart3, t: "Reliability analytics", d: "Uptime, MTTR, recurring failures and cost per ride." },
              { i: Zap, t: "Real-time alerts", d: "Push notifications the moment something needs attention." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="group rounded-2xl bg-card border border-border p-6 hover:shadow-glow transition-all hover:-translate-y-0.5">
                <div className="size-11 rounded-xl gradient-surf grid place-items-center text-deep mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display font-semibold text-lg">{t}</h3>
                <p className="text-sm text-muted-foreground mt-1.5">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">Built for everyone on the job.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              { role: "park", title: "Parks", desc: "Owners, managers and staff who run the park day-to-day.", to: "/park" },
              { role: "supplier", title: "Suppliers", desc: "OEMs and service companies dispatching certified technicians.", to: "/supplier" },
              { role: "freelancer", title: "Freelancers", desc: "Independent certified technicians bidding on public tickets.", to: "/freelancer" },
            ].map((r) => (
              <Link
                key={r.role}
                to={r.to}
                className="group rounded-2xl border border-border p-8 bg-card hover:border-teal hover:shadow-soft transition-all"
              >
                <div className="text-xs uppercase tracking-wider text-teal font-medium">{r.role}</div>
                <h3 className="font-display text-2xl font-bold mt-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{r.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Open dashboard <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl gradient-ocean text-primary-foreground p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 size-72 rounded-full bg-accent/40 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Ready to cut downtime in half?</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">Onboard your park in under 10 minutes. No credit card needed.</p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/onboarding">Start free trial <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>© {new Date().getFullYear()} ParkFix</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
