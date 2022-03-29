import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helper/api-util";
import NewsletterRegistration from "../../components/input/newsletter-registration";

const AllEvensPage = ({ events }) => {
  const router = useRouter();

  const eventSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <EventSearch onSearch={eventSearch} />
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,

      revalidate: 10,
    },
  };
}
export default AllEvensPage;
