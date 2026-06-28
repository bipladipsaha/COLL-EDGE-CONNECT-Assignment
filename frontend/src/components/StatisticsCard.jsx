const StatisticsCard = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
      </div>
    </div>
  );
};

export default StatisticsCard;
