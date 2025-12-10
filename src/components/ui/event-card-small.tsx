import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { formatEventDate, type Event } from "@/lib/eventlite";

interface EventCardSmallProps {
    event: Event;
}

export function EventCardSmall({ event }: EventCardSmallProps) {
    return (
        <div className="my-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/20">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 space-y-3">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Événement lié
                    </div>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                        {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{formatEventDate(event.startAt)}</span>
                        </div>
                        {event.location && (
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                <Link
                    href={`https://eventlite.context-collective.org/events/${event.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
                >
                    Voir l'événement
                </Link>
            </div>
        </div>
    );
}
