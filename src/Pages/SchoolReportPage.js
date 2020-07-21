import React from "react";
import InaccurateReportButton from "../Components/InaccurateReportButton";
import VisitCard from "../Components/VisitCard";

export default function SchoolReportPage() {
    return (
        <div>
            <InaccurateReportButton />
            <br />
            <h2>Previous Visits</h2>
            <VisitCard />
            <br />
            <h2>Graphical Stats</h2>
            {/*Graph should be added here*/}
        </div>
    );
}