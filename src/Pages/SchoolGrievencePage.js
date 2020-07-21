import React from "react";
import AddGrievenceButton from "../Components/AddGrievenceButton";
import GrievenceCard from "../Components/GrievenceCard";

export default function SchoolGrievencePage() {
    return(
        <div>
            <AddGrievenceButton />
            <br />
            <h2>List of Previous Grievence</h2>
            <GrievenceCard />
            <br />
            <GrievenceCard />
        </div>
    );
}