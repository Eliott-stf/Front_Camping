import { useMemo } from 'react';
import { FaEuroSign } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import PageHeader from '../../../components/DashboardAdmin/PageHeader';
import BanniereSaison from '../../../components/DashboardAdmin/BanniereSaison';
import InfoCard from '../../../components/DashboardAdmin/InfoCard';

export default function DashboardOverview() {
  const kpis = useMemo(() => computeKPIs(), []);

  const monthlyData = useMemo(() => {
    const months = ['Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct'];
    return months.map((name, i) => {
      const m = i + 5;
      const count = reservations.filter(r => {
        const month = new Date(r.dateDebut).getMonth() + 1;
        return month === m && r.statut === 'confirmée';
      }).length;
      return { name, reservations: count };
    });
  }, []);

  return (
    <div className="animate-slideup2">
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble — Saison 2025"
      />

      <BanniereSaison rules={SEASON_RULES} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <InfoCard icon={FaEuroSign} label="Chiffre d'affaires" value={kpis.totalRevenue.toLocaleString('fr-FR')} suffix="€" trend={12} color="plum" />
        <InfoCard icon={CiCalendar} label="Réservations actives" value={kpis.activeReservations} trend={8} color="emerald" />
      </div>

      <div className="carte">
        <h3 className="text-lg font-semibold text-plum-950 mb-4 font-display">Réservations par mois</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee4f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#5d4360' }} />
              <YAxis tick={{ fontSize: 12, fill: '#5d4360' }} />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #eee4f0',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="reservations" fill="#a47dab" radius={[6, 6, 0, 0]} name="Réservations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}