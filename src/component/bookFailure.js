import React from "react";

export class bookFailure extends React.Component {
    render() {
        return(
            <div>
                <h3>Your Job Order cannot be completed since you have already ordered it before!!
                    Try ordering other Jobs 
                </h3>
                <a href="/">Home</a>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
      }
}

export default bookFailure;