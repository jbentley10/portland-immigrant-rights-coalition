import React from "react";

export interface HistoryMilestone {
  year: number;
  info: string;
}

function Timeline({ children }: { children: React.ReactNode }) {
  return <div className={"flex"}>{children}</div>;
}

function YearBlocks(props: { milestones: HistoryMilestone[] }) {
  return (
    <>
      {props.milestones.map((milestone) => (
        <div key={milestone.year}>
          <h3>{milestone.year}</h3>
          <p>{milestone.info}</p>
        </div>
      ))}
    </>
  );
}

export default function OurHistory(props: { milestones: HistoryMilestone[] }) {
  return (
    <div className='component-container component-spacer'>
      <h2>Our History</h2>
      <p>
        Since 2005, the Portland Immigrant Rights Coalition (PIRC) has been
        defending the rights of immigrants in our community through education,
        rapid response, and legal support.
      </p>
      <Timeline>
        <YearBlocks milestones={props.milestones} />
      </Timeline>
    </div>
  );
}
