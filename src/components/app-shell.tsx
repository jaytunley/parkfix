import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wrench,
  Boxes,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Search,
  LogOut,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/role-context";

const navByRole = {
  park: [
    { to: "/park", label: "Dashboard", icon: LayoutDashboard },
    { to: "/park/tickets", label: "Tickets", icon: Wrench },
    { to: "/park/assets", label: "Assets", icon: Boxes },
    { to: "/park/analytics", label: "Analytics", icon: BarChart3 },
  ],
  supplier: [
    { to: "/supplier", label: "Dashboard", icon: LayoutDashboard },
    { to: "/supplier/jobs", label: "Jobs", icon: Briefcase },
  ],
  freelancer: [
    { to: "/freelancer", label: "Dashboard", icon: LayoutDashboard },
    { to: "/freelancer/opportunities", label: "Opportunities", icon: Sparkles },
  ],
} as const;

const roleMeta = {
  park: { name: "Adventureland Milano", sub: "Park · Operations" },
  supplier: { name: "VekomaWorks Service", sub: "Supplier" },
  freelancer: { name: "Luca Bianchi", sub: "Certified Freelancer" },
};

export function AppShell() {
  const { role, setRole } = useRole();
  const loc = useLocation();
  const nav = useNavigate();
  const items = navByRole[role];
  const meta = roleMeta[role];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar text-sidebar-foreground p-4 gap-2">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="size-9 rounded-xl gradient-surf grid place-items-center font-display font-bold text-deep">PF</div>
          <div>
            <div className="font-display font-bold text-lg leading-none">ParkFix</div>
            <div className="text-xs text-sidebar-foreground/60">Keep the magic running</div>
          </div>
        </Link>

        <div className="mt-4 mb-2 px-2 text-[11px] uppercase tracking-wider text-sidebar-foreground/50">
          {role === "park" ? "Park" : role === "supplier" ? "Supplier" : "Freelancer"} menu
        </div>

        <nav className="flex flex-col gap-1">
          {items.map((it) => {
            const active = loc.pathname === it.to || (it.to !== `/${role}` && loc.pathname.startsWith(it.to));
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                )}
              >
                <Icon className="size-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl bg-sidebar-accent p-3">
          <div className="text-xs text-sidebar-foreground/60 mb-2">Switch role (demo)</div>
          <div className="flex gap-1">
            {(["park", "supplier", "freelancer"] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  nav({ to: `/${r}` });
                }}
                className={cn(
                  "flex-1 text-xs py-1.5 rounded-md capitalize transition",
                  role === r ? "bg-accent text-accent-foreground font-medium" : "hover:bg-sidebar-border/50"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 py-3 border-t border-sidebar-border">
          <Avatar className="size-9">
            <AvatarFallback className="bg-accent text-accent-foreground text-xs font-medium">
              {meta.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{meta.name}</div>
            <div className="text-xs text-sidebar-foreground/60 truncate">{meta.sub}</div>
          </div>
          <Link to="/" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <LogOut className="size-4" />
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 backdrop-blur bg-background/80 border-b border-border">
          <div className="flex items-center gap-3 px-4 md:px-8 h-16">
            <div className="lg:hidden flex items-center gap-2">
              <div className="size-8 rounded-lg gradient-surf grid place-items-center font-display font-bold text-deep text-sm">PF</div>
              <span className="font-display font-bold">ParkFix</span>
            </div>
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search tickets, assets, suppliers…" className="pl-9 bg-secondary border-0" />
              </div>
            </div>
            <div className="flex-1 md:hidden" />
            {role === "park" && (
              <Button asChild className="gradient-surf text-deep hover:opacity-90 font-medium">
                <Link to="/park/tickets/new"><Plus className="size-4" /> Report issue</Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Settings className="size-5" />
            </Button>
          </div>
          {/* Mobile bottom-nav offset via top tabs */}
          <div className="lg:hidden flex gap-1 px-3 pb-2 overflow-x-auto">
            {items.map((it) => {
              const active = loc.pathname === it.to || (it.to !== `/${role}` && loc.pathname.startsWith(it.to));
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={cn(
                    "text-xs whitespace-nowrap px-3 py-1.5 rounded-full border",
                    active ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                  )}
                >
                  {it.label}
                </Link>
              );
            })}
            <div className="ml-auto flex gap-1">
              {(["park", "supplier", "freelancer"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); nav({ to: `/${r}` }); }}
                  className={cn(
                    "text-xs px-2 py-1.5 rounded-full capitalize border",
                    role === r ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground"
                  )}
                >
                  {r[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

export function StatusPill({ tone, label }: { tone: string; label: string }) {
  return (
    <Badge variant="outline" className={cn("border font-medium", tone)}>
      {label}
    </Badge>
  );
}
