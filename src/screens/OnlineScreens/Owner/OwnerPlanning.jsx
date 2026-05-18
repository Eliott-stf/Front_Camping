import React from "react";
import PageHeader from "../../..//components/AdminDashboard/PageHeader";
import BookingPlannerOwner from "../../../components/AdminDashboard/BookingPlannerOwner";


export default function OwnerPlanning() {
    return (
        <>
            <PageHeader
                title="Planning de mes hébergements"
                subtitle="Visualisez en temps réel l'occupation de vos biens"
            />

            <div className="mt-8">
               <BookingPlannerOwner/>
            </div>
        </>
    );
}