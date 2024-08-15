import React from "react";

export interface StatBlock {
  stat: string;
  description: string;
}

function StatisticBlock(props: { block: StatBlock }) {
  return (
    <div>
      <h2 className={"text-5xl pb-8"}>{props.block.stat}</h2>
      <p>{props.block.description}</p>
    </div>
  );
}

function QuickStatisticsBlock(props: { heading: string; blocks: StatBlock[] }) {
  return (
    <section className='component-container component-spacer flex flex-col md:flex-row items-start text-primary'>
      <h1 className={"w-1/2 text-6xl font-bold"}>{props.heading}</h1>

      <div className={"w-1/2 flex flex-row"}>
        {props.blocks.map((block: StatBlock, index) => (
          <StatisticBlock key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

export default QuickStatisticsBlock;
