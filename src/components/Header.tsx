import React from 'react';
import { 
  Menu, 
  PanelLeft, 
  Layout, 
  Layers, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Home, 
  PlusCircle, 
  Radio,
  Thermometer
} from 'lucide-react';
import { ViewType, Animal } from '../types';

interface HeaderProps {
  currentView: ViewType;
  selectedAnimal?: Animal | null;
  onOpenMobileNav: () => void;
  healthyCount: number;
  attentionCount: number;
  isSimulating: boolean;
  layoutMode: 'sidebar' | 'topnav';
  onToggleLayoutMode: () => void;
  onNavigate: (view: ViewType) => void;
  unresolvedAlertCount: number;
  onOpenAddModal: () => void;
  tempUnit: 'C' | 'F';
  onToggleTempUnit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  selectedAnimal,
  onOpenMobileNav,
  healthyCount,
  attentionCount,
  isSimulating,
  layoutMode,
  onToggleLayoutMode,
  onNavigate,
  unresolvedAlertCount,
  onOpenAddModal,
  tempUnit,
  onToggleTempUnit,
}) => {
  const getTitles = () => {
    switch (currentView) {
      case 'home':
        return {
          title: 'Farm Overview',
          subtitle: 'Real-time livestock health monitoring active.',
        };
      case 'animals':
        return {
          title: 'Livestock Directory',
          subtitle: 'Manage your animal population records.',
        };
      case 'alerts':
        return {
          title: 'Alert Center',
          subtitle: 'Comprehensive log of all health anomalies.',
        };
      case 'analytics':
        return {
          title: 'Farm Analytics',
          subtitle: 'Long-term population health trends & correlations.',
        };
      case 'settings':
        return {
          title: 'System Settings',
          subtitle: 'Configure monitoring thresholds and user preferences.',
        };
      case 'details':
        return {
          title: selectedAnimal ? `Animal Details - #${selectedAnimal.id} (${selectedAnimal.name})` : 'Animal Details',
          subtitle: 'Comprehensive health and history records.',
        };
      default:
        return {
          title: 'INGEN',
          subtitle: 'Livestock Health & Telemetry Hub',
        };
    }
  };

  const { title, subtitle } = getTitles();
  const isAllOptimal = attentionCount === 0;

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const navItems = [
    { id: 'home' as ViewType, label: 'Dashboard', icon: Home },
    { id: 'animals' as ViewType, label: 'Animals', icon: Layers },
    { id: 'alerts' as ViewType, label: 'Alerts', icon: AlertTriangle, badge: unresolvedAlertCount },
    { id: 'analytics' as ViewType, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as ViewType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* If layoutMode is 'topnav', render top horizontal navbar bar */}
      {layoutMode === 'topnav' && (
        <div className="bg-white/95 backdrop-blur-md p-3 md:px-6 rounded-2xl flex items-center justify-between border border-[#e2dacf] shadow-sm gap-4">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30 text-xs tracking-wider">
              IN
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">INGEN</h1>
              <p className="text-[10px] text-slate-500 font-medium">Biometric Telemetry</p>
            </div>
          </div>

          {/* Top navigation links with original Lucide icons */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {navItems.map((item) => {
              const isActive = currentView === item.id || (item.id === 'animals' && currentView === 'details');
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <IconComponent size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-rose-500 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions on right */}
          <div className="flex items-center gap-2.5">
            {/* Quick Temp Unit Toggle */}
            <button
              onClick={onToggleTempUnit}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all group"
              title={`Change temperature unit to ${tempUnit === 'F' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}`}
              aria-label="Change temperature unit"
            >
              <Thermometer size={14} className="text-indigo-600 transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-0.5">
                <span className={`px-1 py-0.5 rounded text-[10px] font-bold ${tempUnit === 'F' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                  °F
                </span>
                <span className="text-slate-300 text-[10px]">/</span>
                <span className={`px-1 py-0.5 rounded text-[10px] font-bold ${tempUnit === 'C' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                  °C
                </span>
              </div>
            </button>

            <button
              onClick={onOpenAddModal}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle size={14} />
              <span className="hidden sm:inline">Add Livestock</span>
            </button>

            <button
              onClick={onToggleLayoutMode}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 flex items-center gap-1 cursor-pointer"
              title="Switch to Sidebar Layout"
            >
              <PanelLeft size={14} className="text-indigo-600" />
              <span className="hidden lg:inline">Sidebar View</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Header Row */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e2dacf]">
        <div className="flex items-center gap-3">
          {layoutMode === 'sidebar' && (
            <button
              onClick={onOpenMobileNav}
              className="p-2 text-slate-700 hover:text-slate-900 bg-white rounded-xl hover:bg-slate-100 lg:hidden border border-slate-300"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          )}

          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>{title}</span>
              {isSimulating && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  IoT Live
                </span>
              )}
            </h2>
            <p className="text-slate-600 mt-1 text-base md:text-lg">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 self-end md:self-auto flex-wrap sm:flex-nowrap">
          {/* Temperature Unit Toggle with Thermometer Icon */}
          <button
            onClick={onToggleTempUnit}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-[#e2dacf] flex items-center gap-2 transition-all shadow-sm cursor-pointer hover:border-slate-400 group"
            title={`Current unit is ${tempUnit === 'F' ? 'Fahrenheit' : 'Celsius'}. Click to switch to ${tempUnit === 'F' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}`}
            aria-label="Change temperature unit between Fahrenheit and Celsius"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <Thermometer size={15} className="stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1">
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all ${tempUnit === 'F' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}>
                °F
              </span>
              <span className="text-slate-300 text-xs">/</span>
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all ${tempUnit === 'C' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}>
                °C
              </span>
            </div>
          </button>

          {/* Quick Layout Mode Switcher */}
          <button
            onClick={onToggleLayoutMode}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            title="Toggle between Sidebar and Top-Nav Layout"
          >
            {layoutMode === 'sidebar' ? (
              <>
                <Layout size={14} className="text-indigo-600" />
                <span className="hidden sm:inline">Top-Nav View</span>
              </>
            ) : (
              <>
                <PanelLeft size={14} className="text-indigo-600" />
                <span className="hidden sm:inline">Sidebar View</span>
              </>
            )}
          </button>

          {/* Date and system health indicator */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{todayFormatted}</p>
            <p className="text-xs text-slate-500 flex items-center justify-end gap-1.5 mt-0.5">
              System:{' '}
              {isAllOptimal ? (
                <span className="text-emerald-600 font-bold inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Optimal
                </span>
              ) : (
                <span className="text-rose-600 font-bold inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  {attentionCount} Alert{attentionCount > 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>

          {/* Ambient sensor pill */}
          <div className="hidden xl:flex items-center gap-2 bg-white border border-[#e2dacf] px-3 py-1.5 rounded-xl text-xs text-slate-600 shadow-sm">
            <span className="text-amber-600 font-semibold">☀️ {tempUnit === 'C' ? '22.2°C' : '72.0°F'}</span>
            <span className="text-slate-400">•</span>
            <span>58% RH</span>
          </div>

          {/* User profile avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-300">
            <div className="w-11 h-11 rounded-2xl bg-white border-2 border-indigo-600 overflow-hidden shadow-md p-0.5">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Farmer"
                alt="Herdsman Dave"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
