import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import "../App.css";

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  componentDidMount() {
    const url = "http://129.173.67.163:1337/getJobsParts";

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            jobs: result,
          });
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }

  renderTable() {
    const { jobs } = this.state;
    console.log(jobs);
    if (jobs.length > 0) {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job</th>
              <th>Parts</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderJobs()}</tbody>
        </Table>
      );
    } else {
      return <div>No Jobs</div>;
    }
  }

  orderJob(index) {
    console.log(index);
    localStorage.setItem("jobID", index.jobName);
    console.log("jobID : " + index.jobName);
    this.props.history.push("/orderParts");
  }
  renderJobs() {
    const { jobs } = this.state;
    if (jobs.length > 0) {
      return jobs.map((index) => (
        <>
          <tr>
            <td>{index.jobName}</td>
            <td>{index.parts}</td>
            <td>
              <Button variant="dark" onClick={() => this.orderJob(index)}>
                Get Job
              </Button>
            </td>
          </tr>
        </>
      ));
    } else {
      return <div>No jobs</div>;
    }
  }

  filterJobs() {
    console.log(this.refs.job.value);
    this.setState({
      jobs: this.state.jobs.filter(
        (item) => item.jobName === this.refs.job.value
      ),
    });
    let jobInfo = {
      jobName: this.refs.job.value,
    };
    fetch(
      "http://cloud6a-env.eba-t7ffpjmv.us-east-1.elasticbeanstalk.com/companyz/insertSearch",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(jobInfo),
      }
    )
      .then((r) => r.json())
      .then((res) => {
        if (res) {
          console.log("search logged successfully");
        }
      });
  }

  reset() {
    window.location.reload();
  }
  render() {
    return (
      <React.Fragment>
        <div className="inner">
          <h2>Jobs</h2>
          <br />
          <br />
          <input
            type="text"
            ref="job"
            placeholder="Enter Job Name"
            aria-label="Search"
          />{" "}
          {"    "}
          <Button
            variant="dark"
            type="submit"
            onClick={() => this.filterJobs()}
          >
            Search
          </Button>
          {"    "}
          <Button variant="dark" onClick={() => this.reset()}>
            Reset
          </Button>
          <br />
          <br />
          {this.renderTable()}
        </div>
      </React.Fragment>
    );
  }
}

export default search;
