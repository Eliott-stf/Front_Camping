import React from "react";
import PageHeader from "../../../components/AdminDashboard/PageHeader";
import BookingPlanner from "../../../components/AdminDashboard/BookingPlanner";


export default function AdminPlanning() {
    return (

        <>
            <PageHeader
                title="Planning des réservations"
                subtitle="Gérez et visualisez l'occupation de vos biens"
            />

            <div className="mt-8">
                <BookingPlanner />
            </div>
        </>

    );
}