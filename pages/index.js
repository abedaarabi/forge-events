import Head from "next/head";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helper/api-util";

export default function Home({ featuredEvents }) {
  return (
    <div>
      <Head>
        <title>SF Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  console.log("(Re-)generate");
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
      revalidate: 20,
    },
  };
}
