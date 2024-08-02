import React from "react";

interface HistoryMilestone {
  year: number;
  info: string;
}

export default function OurHistory() {
  let years: Array<HistoryMilestone> = [
    {
      year: 2005,
      info: "Fart fart test",
    },
    {
      year: 2006,
      info: "Fart fart test",
    },
  ];

  function YearsBlock(milestones: Array<HistoryMilestone>) {
    for (let i = 0; i < milestones.length; i++) {
      let { year, info } = milestones[i];
      return (
        <div>
          <h3>{year}</h3>
          <p>{info}</p>
        </div>
      );
    }
  }

  return (
    <div>
      <h2>Our History</h2>
      <p>
        Since 2005, the Portland Immigrant Rights Coalition (PIRC) has been
        defending the rights of immigrants in our community through education,
        rapid response, and legal support.
      </p>
      <YearsBlock milestones={years} />
    </div>
  );
}
