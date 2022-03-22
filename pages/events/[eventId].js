import React from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "../../helper/api-util";

const EventDetails = ({ event }) => {
  if (!event) {
    return <h1>loading...</h1>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  console.log("(Re-)generate");
  const { params } = context;

  const event = await getEventById(params.eventId);
  return {
    props: {
      event,
      revalidate: 20,
    },
  };
}
export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();

  const eventParams = featuredEvents.map((featuredEvent) => {
    return {
      params: { eventId: featuredEvent.id },
    };
  });

  return {
    paths: eventParams,
    fallback: true,
  };
}

export default EventDetails;
