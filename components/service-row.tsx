import { FaHouseChimney } from "react-icons/fa6";

export default function ServiceRow(props: {
  heading1: string;
  subheading1: string;
  heading2: string;
  subheading2: string;
  heading3: string;
  subheading3: string;
}) {
  return (
    <div className="w-full flex flex-row justify-center max-w-full px-32">
      <section className="text-center">
        <div className="rounded-full w-16 h-16 bg-background"><FaHouseChimney className="items-center" /></div>
        <h2 className="font-semibold text-lg pb-2">{props.heading1}</h2>
        <p>{props.subheading1}</p>
      </section>
      <section className="text-center">
        <div className="rounded-full w-16 h-16 bg-background"><FaHouseChimney className="items-center" /></div>
        <h2 className="font-semibold text-lg pb-2">{props.heading2}</h2>
        <p>{props.subheading2}</p>
      </section>
      <section className="text-center">
        <div className="rounded-full w-16 h-16 bg-background"><FaHouseChimney className="items-center" /></div>
        <h2 className="font-semibold text-lg pb-2">{props.heading3}</h2>
        <p>{props.subheading3}</p>
      </section>
    </div>
  )
}