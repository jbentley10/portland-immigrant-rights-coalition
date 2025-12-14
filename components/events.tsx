import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ListIcon, CalendarIcon } from "lucide-react";
import Calendar, { EventType } from "./calendar";

type Event = {
  sys: { id: string };
  fields: {
    title: string;
    link: string;
    description: { json: Document }; // Assumed structure based on Calendar needs
    dateAndTime: string;
  };
};

type EventsBlockProps = {
  title: string;
  description?: Document;
  events: Event[];
};

function EventsBlock({ title, description, events }: EventsBlockProps) {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const handleViewChange = (value: string) => {
    setView(value as 'list' | 'calendar');
  };

  // Transform events for Calendar if needed, but EventType matches roughly what we expect now
  const calendarEvents: EventType[] = events.map(e => ({
    id: e.sys.id,
    name: e.fields.title,
    link: e.fields.link,
    description: e.fields.description,
    dateAndTime: e.fields.dateAndTime
  }));

  return (
    <section className="my-8 atf-container text-primary">
      <h2 className="mb-4">{title}</h2>
      {description && (
        <div className="mb-6">{documentToReactComponents(description)}</div>
      )}

      {/* View Type */}
      <div className='mb-6 flex flex-row justify-start'>
        <RadioGroup onValueChange={handleViewChange} defaultValue='list' className="flex flex-row gap-4">
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='list' id='r1' />
            <ListIcon className="h-4 w-4" />
            <Label className={"font-hand cursor-pointer"} htmlFor='r1'>
              List View
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='calendar' id='r2' />
            <CalendarIcon className="h-4 w-4" />
            <Label className={"font-hand cursor-pointer"} htmlFor='r2'>
              Calendar View
            </Label>
          </div>
        </RadioGroup>
      </div>

      {view === 'list' ? (
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
      ) : (
        <Calendar events={calendarEvents} />
      )}
    </section>
  );
}

export default EventsBlock;
