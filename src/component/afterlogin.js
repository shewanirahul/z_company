import React from "react";
import { Button } from "react-bootstrap";

export class afterlogin extends React.Component {
  printUser() {
    console.log("Called print user");
    let userID = localStorage.getItem("user");

    var jobDetailsArr = JSON.parse(localStorage.getItem("jobDetails"));

    console.log("Job Details Array: " + jobDetailsArr);
    console.log("User name-->" + userID);

    var json = {};
    json.userId = userID;
    json.partsToBook = jobDetailsArr;

    console.log(json);

    fetch(
      "http://cloud6a-env.eba-t7ffpjmv.us-east-1.elasticbeanstalk.com/companyz/book",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(json),
      }
    ).then((res) => {
      if (res) {
        if (res.status == 200) {
          this.props.history.push("/bookSuccess");
        } else {
          this.props.history.push("/bookFailure");
        }
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Successfully Logged In</h3>
        <p>Do you want to confirm Order?</p>
        <br></br>
        <br></br>
        <br></br>
        <Button
          size="sm"
          variant="dark"
          type="submit"
          onClick={() => this.printUser()}
        >
          Confirm booking
        </Button>
      </div>
    );
  }
}

export default afterlogin;
