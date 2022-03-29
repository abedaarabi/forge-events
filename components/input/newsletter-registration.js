import react from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [input, setInput] = react.useState();
  function registrationHandler(event) {
    event.preventDefault();

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: input }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            // value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
