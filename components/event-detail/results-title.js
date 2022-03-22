import { Fragment } from "react";
import Button from "../ui/Button";
import classes from "./results-title.module.css";

function ResultsTitle({ date }) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Fragment>
      <section className={classes.title}>
        <h1>Events in {humanReadableDate}</h1>
        <Button link="/events">Show all events</Button>
      </section>
    </Fragment>
  );
}

export default ResultsTitle;
