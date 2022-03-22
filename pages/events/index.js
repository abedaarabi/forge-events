import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helper/api-util";

const AllEvensPage = ({ events }) => {
  const router = useRouter();

  const eventSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSearch={eventSearch} />
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
      revalidate: 60,
    },
  };
}
export default AllEvensPage;
