import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import React from "react";

type Event = {
  sys: { id: string };
  fields: { title: string; link: string };
};

type EventsBlockProps = {
  title: string;
  description?: Document;
  events: Event[];
};

function EventsBlock({ title, description, events }: EventsBlockProps) {
  return (
    <section className="my-8 atf-container text-primary">
      <h2 className="mb-4">{title}</h2>
      {description && (
        <div className="mb-6">{documentToReactComponents(description)}</div>
      )}
      <ul className="p-0 m-0 ml-4 space-y-3">
        {events.map(({ sys, fields }) => (
          <li key={sys.id} className="p-0 m-0">
            <a
              href={fields.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {fields.title} {fields.link ? <>&rarr;</> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventsBlock;
