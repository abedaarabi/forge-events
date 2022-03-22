import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import { Fragment } from "react";
import ResultsTitle from "../../components/event-detail/results-title";
import EventList from "../../components/events/EventList";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helper/api-util";

const FilteredEventPage = (props) => {
  const { hasError, filterEvents, numYear, numMonth } = props;
  if (hasError) {
    return (
      <div className="center">
        <ErrorAlert> Invalid URL</ErrorAlert>
        <Button link={"/events"}> Show All Events</Button>
      </div>
    );
  }
  if (!filterEvents || filterEvents.length === 0) {
    return (
      <div className="center">
        <ErrorAlert> No Event found</ErrorAlert>
        <Button link={"/events"}> Show All Events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All event for ${numMonth}/ ${numYear}.`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filterEvents} />
    </Fragment>
  );
};

export default FilteredEventPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  if (!filterData) {
    return <p className="center">Loading</p>;
  }

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      //Here we could redirect
      //   notFound: true,
      //   redirect:{
      //     destination:"/error"
      //   }
      // };
    };
  }

  const filterEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: { filterEvents, numYear, numMonth },
  };
}
