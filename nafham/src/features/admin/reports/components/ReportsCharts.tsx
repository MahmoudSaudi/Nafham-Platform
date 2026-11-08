"use client";

import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip,
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { RegistrationSource, GrowthData } from '../types';

interface Props {
  registrationSources: RegistrationSource[];
  growthData: GrowthData[];
}

export default function ReportsCharts({ registrationSources, growthData }: Props) {
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl text-sm font-bold" dir="rtl">
          <p className="text-slate-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1 text-xs">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="text-slate-700">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Registration Sources (Doughnut Chart) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1">
        <h3 className="text-base font-extrabold text-slate-900 mb-6 text-center">مصادر التسجيل</h3>
        
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={registrationSources}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {registrationSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <PieTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'inherit', fontWeight: 'bold' }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-3">
          {registrationSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between text-sm font-bold">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                <span className="text-slate-700">{source.name}</span>
              </div>
              <span className="text-slate-900">{source.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Users and Revenue Growth (Mixed Chart) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-extrabold text-slate-900">نمو المستخدمين والإيرادات</h3>
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-600/80"></div>
              <span className="text-slate-600">المستخدمين</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-blue-500 rounded"></div>
              <span className="text-slate-600">الإيرادات</span>
            </div>
          </div>
        </div>
        
        <div className="h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={growthData}
              margin={{ top: 20, right: 0, bottom: 0, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={10} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              <Bar yAxisId="left" dataKey="users" name="المستخدمين" fill="#10b981" opacity={0.8} radius={[4, 4, 0, 0]} maxBarSize={60} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="الإيرادات" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
