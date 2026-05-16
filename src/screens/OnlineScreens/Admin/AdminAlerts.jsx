import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserX, FileText, ScrollText } from 'lucide-react';
import { 
  fetchTenantAlerts, 
  fetchOwnerAlerts, 
  fetchInvoiceAlerts, 
  purgeUser, 
  archiveInvoice 
} from '../../../store/Alert/alertSlice';
import AlertSummaryBanner from '../../../components/AdminDashboard/Alert/AlertSummaryBanner';
import AlertSection from '../../../components/AdminDashboard/Alert/AlertSection';
import AlertItemRow from '../../../components/AdminDashboard/Alert/AlertItemRow';
import PageHeader from '../../../components/AdminDashboard/PageHeader';
import RegulatoryReminder from '../../../components/AdminDashboard/Alert/RegulatoryReminder';

export default function AdminAlerts() {
  const dispatch = useDispatch();
  
  const { tenantAlerts, ownerAlerts, invoiceAlerts } = useSelector(state => state.alerts);
  
  const [deletedItems, setDeletedItems] = useState(new Set());
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchTenantAlerts());
    dispatch(fetchOwnerAlerts());
    dispatch(fetchInvoiceAlerts());
  }, [dispatch]);

  const handlePurgeUser = (id) => {
    dispatch(purgeUser(id));
    setDeletedItems(prev => new Set([...prev, `user-${id}`]));
    setConfirmDelete(null);
  };

  const handleArchiveInvoice = (id) => {
    dispatch(archiveInvoice(id, { isArchived: true }));
    setDeletedItems(prev => new Set([...prev, `invoice-${id}`]));
    setConfirmDelete(null);
  };

  // Consolidation des locataires (Warning + Absolute) pour l'affichage unifié
  const rawTenantAlerts = [...(tenantAlerts?.absolute || []), ...(tenantAlerts?.warning || [])];
  const allTenantAlerts = Array.from(new Map(rawTenantAlerts.map(item => [item.id, item])).values());

  
  const totalAlerts = allTenantAlerts.length + invoiceAlerts.length + ownerAlerts.length;
  const activeAlerts = totalAlerts - deletedItems.size;


  return (
    <div className="animate-slideup2">
      <PageHeader title="Conformité RGPD" subtitle="Gestion des données personnelles et obligations légales" />

      <AlertSummaryBanner activeAlertsCount={activeAlerts} />

      <div className="space-y-6">
        <AlertSection
          title="Locataires obsolètes"
          description="Données personnelles des locataires dépassant les délais de conservation (7j sans consentement ou > 1 an)"
          icon={UserX}
          count={allTenantAlerts.filter(item => !deletedItems.has(`user-${item.id}`)).length}
          severity="danger"
        >
          {allTenantAlerts.map(item => (
            <AlertItemRow
              key={`user-${item.id}`}
              isDeleted={deletedItems.has(`user-${item.id}`)}
              isConfirming={confirmDelete === `user-${item.id}`}
              onDeleteTrigger={() => setConfirmDelete(`user-${item.id}`)}
              onConfirmDelete={() => handlePurgeUser(item.id)}
              onCancelDelete={() => setConfirmDelete(null)}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-plum-900">{item.name} {item.lastname}</p>
                <p className="text-xs text-plum-500">{item.email} — Inscrit le: {new Date(item.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </AlertItemRow>
          ))}
        </AlertSection>

        <AlertSection
          title="Factures > 3 ans"
          description="Factures dépassant la durée légale de conservation nécessitant un archivage numérique"
          icon={FileText}
          count={invoiceAlerts.filter(item => !deletedItems.has(`invoice-${item.id}`)).length}
          severity="warning"
        >
          {invoiceAlerts.map(item => (
            <AlertItemRow
              key={`invoice-${item.id}`}
              isDeleted={deletedItems.has(`invoice-${item.id}`)}
              isConfirming={confirmDelete === `invoice-${item.id}`}
              onDeleteTrigger={() => setConfirmDelete(`invoice-${item.id}`)}
              onConfirmDelete={() => handleArchiveInvoice(item.id)}
              onCancelDelete={() => setConfirmDelete(null)}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-plum-900">{item.client}</p>
                <p className="text-xs text-plum-500">{item.name} — Créée le: {new Date(item.dateCreation || item.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </AlertItemRow>
          ))}
        </AlertSection>

        <AlertSection
          title="Contrats propriétaires échus > 1 an"
          description="Contrats expirés depuis plus d'un an nécessitant la suppression des données du partenaire"
          icon={ScrollText}
          count={ownerAlerts.filter(item => !deletedItems.has(`user-${item.id}`)).length}
          severity="warning"
        >
          {ownerAlerts.map(item => (
            <AlertItemRow
              key={`owner-${item.id}`}
              isDeleted={deletedItems.has(`user-${item.id}`)}
              isConfirming={confirmDelete === `user-${item.id}`}
              onDeleteTrigger={() => setConfirmDelete(`user-${item.id}`)}
              onConfirmDelete={() => handlePurgeUser(item.id)}
              onCancelDelete={() => setConfirmDelete(null)}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-plum-900">{item.name} {item.lastname}</p>
                <p className="text-xs text-plum-500">Fin contrat: {new Date(item.contractDate).toLocaleDateString('fr-FR')}</p>
              </div>
            </AlertItemRow>
          ))}
        </AlertSection>
      </div>

      <RegulatoryReminder />
    </div>
  );
}