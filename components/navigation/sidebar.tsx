'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, Navigation, Zap, MessageSquare, BarChart3, LogOut } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Disruptions', href: '/dashboard/disruptions', icon: AlertTriangle },
  { name: 'Cascade Prediction', href: '/dashboard/cascades', icon: Zap },
  { name: 'Route Optimization', href: '/dashboard/routes', icon: Navigation },
  { name: 'AI Copilot', href: '/dashboard/copilot', icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [captainData, setCaptainData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('captainData');
    if (data) setCaptainData(JSON.parse(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('captainData');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-border border-r flex flex-col">
      <div className="flex h-16 items-center border-border border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <BarChart3 className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">Global Fleet</span>
        </div>
      </div>

      <nav className="space-y-1 px-3 py-6 flex-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-accent/15 text-accent' : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-accent'
              }`}>
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-border border-t bg-sidebar p-4 space-y-3">
        {captainData && (
          <div>
            <p className="text-sm font-semibold text-foreground">Capt. {captainData.captainName}</p>
            <p className="text-xs text-muted-foreground">{captainData.company}</p>
            <p className="text-xs text-muted-foreground">{captainData.vesselName}</p>
          </div>
        )}
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors w-full">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
