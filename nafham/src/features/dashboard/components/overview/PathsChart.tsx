export default function PathsChart({ data = [] }: { data?: any[] }) {
  // If no data or empty, use fallback
  const chartData = data.length > 0 ? data : [
    { label: "لا يوجد", value: 100, colorClass: "bg-gray-300", hexColor: "#d1d5db" }
  ];

  // Calculate SVG stroke offsets for dynamic donut chart
  // Full circle is ~251.2
  let currentOffset = 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="font-extrabold text-slate-900 text-lg mb-6">توزيع المسارات</h3>
      
      {/* Donut SVG */}
      <div className="relative w-48 h-48 mx-auto my-auto flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          {chartData.map((item, i) => {
            const percentage = item.value / 100;
            const dashArray = 251.2;
            const dashOffset = dashArray - (dashArray * percentage);
            
            // Calculate rotation based on previous offsets
            const rotateAngle = (currentOffset / 100) * 360;
            currentOffset += item.value;

            return (
              <circle 
                key={i}
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke={item.hexColor} 
                strokeWidth="20" 
                strokeDasharray={dashArray} 
                strokeDashoffset={dashOffset} 
                className={rotateAngle > 0 ? `transform origin-center rotate-[${rotateAngle}deg]` : ""}
                style={{ transform: rotateAngle > 0 ? `rotate(${rotateAngle}deg)` : 'none' }}
              />
            );
          })}
        </svg>
        {/* Inner white circle for the Donut effect */}
        <div className="absolute inset-0 bg-white rounded-full scale-50"></div>
      </div>

      {/* Legend */}
      <div className="mt-8 space-y-3">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="font-bold text-slate-900">{item.value}%</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-500">{item.label}</span>
              <span className={`w-3 h-3 rounded-full ${item.colorClass}`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
