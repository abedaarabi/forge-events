import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helper/api-util";

export default function Home({ featuredEvents }) {
  return (
    <div>
      <ul>
        <EventList items={featuredEvents} />
      </ul>
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
