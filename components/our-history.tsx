import React from "react";

export interface HistoryMilestone {
  year: number;
  info: string;
}

function Timeline({ children }: { children: React.ReactNode }) {
  return <div className={"flex mt-20"}>{children}</div>;
}

function EllipseAndLine() {
  return (
    <div
      className={"mb-4"}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        className={"rounded-full"}
        style={{
          width: 20,
          height: 20,
          display: "block",
          border: "2px solid #881403",
          backgroundColor: "transparent",
        }}
      />
      <hr
        className={"bg-primary"}
        style={{
          width: "100%",
          height: 3,
          marginLeft: -1,
        }}
      />
    </div>
  );
}

function YearBlocks(props: { milestones: HistoryMilestone[] }) {
  return (
    <>
      {props.milestones.map((milestone) => (
        <div key={milestone.year}>
          <h3 className={"text-primary text-3xl mb-4"}>{milestone.year}</h3>
          <EllipseAndLine />
          <p className={"text-primary"}>{milestone.info}</p>
        </div>
      ))}
    </>
  );
}

export default function OurHistory(props: {
  heading: string;
  subheading: string;
  milestones: HistoryMilestone[];
}) {
  return (
    <div className='component-container component-spacer'>
      <div className={"max-w-lg"}>
        <h2 className={"text-primary"}>{props.heading}</h2>
        <p className={"text-primary"}>{props.subheading}</p>
      </div>
      <Timeline>
        <YearBlocks milestones={props.milestones} />
      </Timeline>
    </div>
  );
}
