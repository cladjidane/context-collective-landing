"use client";

import { useEffect, useRef } from "react";
import { Calendar, MapPin, Users, Video, ExternalLink } from "lucide-react";
import type { Event } from "@/lib/eventlite";
import { formatEventDate, isUpcoming } from "@/lib/eventlite";

interface EventsProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

function EventCard({ event }: { event: Event }) {
  const upcoming = isUpcoming(event.startAt);
  const eventUrl = `https://eventlite.context-collective.org/e/${event.slug}`;

  return (
    <article className="border-t border-border py-8 first:border-t-0">
      <span className="tag">{upcoming ? "Event" : "Replay"}</span>
      <h3 className="text-2xl mb-2">{event.title}</h3>
      {event.subtitle && (
        <p className="text-muted mb-4">{event.subtitle}</p>
      )}
      <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {formatEventDate(event.startAt)}
        </span>
        {event.mode === "IN_PERSON" ? (
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {event.location || "Brest"}
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            En ligne
          </span>
        )}
        {event.capacity && event.registrationsCount !== undefined && (
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {event.registrationsCount}/{event.capacity}
          </span>
        )}
      </div>
      <a
        href={eventUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-arrow inline-flex items-center gap-1"
      >
        {upcoming ? "S'inscrire" : "Voir le replay"}
        <ExternalLink className="w-4 h-4" />
      </a>
    </article>
  );
}

export function Events({ upcomingEvents, pastEvents }: EventsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const hasEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <section
      ref={sectionRef}
      id="community"
      className="fade-up container-main my-16"
    >
      <h2 className="section-title">
        Community
        <br />
        Activity
      </h2>

      {!hasEvents ? (
        <p className="text-muted italic py-8">
          Chargement des événements...
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
