export default function ActivityChart({ data = [0, 0, 0, 0, 0, 0, 0] }: { data?: number[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-extrabold text-slate-900 text-lg">نشاط التعلم الأسبوعي</h3>
        <select className="bg-gray-50 border border-gray-200 text-sm font-medium text-slate-600 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/20">
          <option>هذا الأسبوع</option>
          <option>الأسبوع الماضي</option>
          <option>هذا الشهر</option>
        </select>
      </div>
      
      {/* SVG Chart Container */}
      <div className="flex-1 relative w-full min-h-[200px] mt-4 flex items-end">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs font-medium text-slate-400 w-8 text-left">
          <span>250</span>
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        
        {/* Grid Lines */}
        <div className="absolute left-8 right-0 top-2 bottom-8 flex flex-col justify-between pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full border-t border-gray-100 border-dashed"></div>
          ))}
        </div>

        {/* The SVG Area Chart */}
        <div className="absolute left-8 right-0 top-0 bottom-8 overflow-hidden rounded-b-sm">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* The curve path mimicking the design */}
            <path 
              d="M0,70 C15,60 25,45 40,45 C50,45 55,60 65,60 C75,60 85,30 100,45 L100,100 L0,100 Z" 
              fill="url(#gradient)" 
            />
            <path 
              d="M0,70 C15,60 25,45 40,45 C50,45 55,60 65,60 C75,60 85,30 100,45" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="3" 
              vectorEffect="non-scaling-stroke"
            />
            {/* Adding the solid fill underneath like the image */}
             <path 
              d="M0,70 C15,60 25,45 40,45 C50,45 55,60 65,60 C75,60 85,30 100,45 L100,100 L0,100 Z" 
              fill="#148043" 
            />
          </svg>
        </div>

        {/* X-Axis Labels */}
        <div className="absolute left-8 right-0 bottom-0 h-8 flex justify-between items-end text-xs font-medium text-slate-400">
          <span>السبت</span>
          <span>الأحد</span>
          <span>الإثنين</span>
          <span>الثلاثاء</span>
          <span>الأربعاء</span>
          <span>الخميس</span>
          <span>جمعة</span>
        </div>
      </div>
    </div>
  );
}
