import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((metrics) => {
        setData({
          labels: metrics.labels,
          datasets: [
            {
              label: 'Tržby (Kč)',
              data: metrics.revenues,
              fill: false,
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Tržby posledních 7 dnů
          </h2>
          {loading ? (
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <Line
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          )}
        </div>
        <div className="space-y-6">
          <KpiCard title="Počet jízd" value={data ? data.datasets[0].data.reduce((a,b)=>a+b,0) : '--'} loading={loading} />
          <KpiCard title="Průměrná tržba/jízdu (Kč)" value={data ? (data.datasets[0].data.reduce((a,b)=>a+b,0)/data.datasets[0].data.length).toFixed(2) : '--'} loading={loading} />
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h3>
        {loading ? (
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
        ) : (
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}