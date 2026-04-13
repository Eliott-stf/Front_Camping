import React from "react";
import PageHeader from "../../../components/AdminDashboard/PageHeader";
import BookingPlanner from "../../../components/AdminDashboard/BookingPlanner";


export default function AdminPlanning() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <PageHeader 
          title="Planning des réservations" 
          subtitle="Gérez et visualisez l'occupation de vos biens"
        />
        
        <div className="mt-8">
          {/* Le composant BookingCalendar exporte par défaut PropertyList */}
          <BookingPlanner />
        </div>
      </div>
    </div>
  );
}