import { Users, BookOpen, Clock, Wallet } from "lucide-react";

interface StatItem {
  id: number;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconType: string;
}

export default function StatCards({ stats }: { stats: StatItem[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "users": return <Users className="w-5 h-5 text-emerald-600" />;
      case "courses": return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case "time": return <Clock className="w-5 h-5 text-emerald-600" />;
      case "revenue": return <Wallet className="w-5 h-5 text-emerald-600" />;
      default: return <Users className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={stat.id} 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              stat.isPositive ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
            }`}>
              {stat.change}
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              {getIcon(stat.iconType)}
            </div>
          </div>
          <div className="mt-auto">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
