import React, { useState } from "react";
import classes from "./new-comment.module.css";

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [commentInput, setCommentInput] = React.useState({
    email: "",
    name: "",
    comment: "",
  });

  function sendCommentHandler(event) {
    event.preventDefault();

    if (
      !commentInput ||
      commentInput.email.trim() === "" ||
      !commentInput.email.includes("@") ||
      !commentInput.comment ||
      commentInput.comment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment(commentInput);
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={commentInput.email}
            onChange={(e) =>
              setCommentInput({ ...commentInput, email: e.target.value })
            }
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={commentInput.name}
            onChange={(e) =>
              setCommentInput({ ...commentInput, name: e.target.value })
            }
          />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          id="comment"
          rows="5"
          value={commentInput.comment}
          onChange={(e) =>
            setCommentInput({ ...commentInput, comment: e.target.value })
          }
        ></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
