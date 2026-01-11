
import React, { useEffect, useState } from 'react';

const IPInfoTool: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setInfo({
          ...data,
          userAgent: navigator.userAgent,
          platform: (navigator as any).platform,
          language: navigator.language
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-20"><i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500"></i></div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <InfoCard title="Network Info" items={[
        { label: 'IP Address', value: info.ip },
        { label: 'ISP', value: info.org },
        { label: 'City', value: info.city },
        { label: 'Country', value: info.country_name }
      ]} />
      <InfoCard title="Device Info" items={[
        { label: 'Browser', value: info.userAgent.split(' ').pop() },
        { label: 'OS', value: info.platform },
        { label: 'Language', value: info.language },
        { label: 'Timezone', value: info.timezone }
      ]} />
    </div>
  );
};

const InfoCard = ({ title, items }: { title: string, items: any[] }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm">
    <h3 className="font-bold text-lg mb-4 text-blue-600 border-b pb-2">{title}</h3>
    <div className="space-y-3">
      {items.map(i => (
        <div key={i.label} className="flex justify-between text-sm">
          <span className="text-slate-500 font-medium">{i.label}</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{i.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default IPInfoTool;
