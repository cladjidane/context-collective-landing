import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Events } from "@/components/sections/events";
import { News } from "@/components/sections/news";
import { Formats } from "@/components/sections/formats";
import { Join } from "@/components/sections/join";
import { getLatestEvents, getPastEvents } from "@/lib/eventlite";
import { getLatestNews } from "@/lib/mdx";

export default async function Home() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getLatestEvents(3),
    getPastEvents(3),
  ]);
  const latestNews = getLatestNews(3);

  return (
    <>
      <Hero />
      <Manifesto />
      <Events upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <News articles={latestNews} />
      <Formats />
      <Join />
    </>
  );
}
