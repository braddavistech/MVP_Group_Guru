// import React, { Component } from "react"
// import NavBar from "./nav/NavBar"
// import ApplicationViews from "./ApplicationViews"
// import "./ForgotPassword.css";
// import "bootstrap/dist/css/bootstrap.min.css"

// class ForgotPassword extends Component {

//   state = {
//     userName: "",
//     userEmail: "",
//     testName: "UserName"
//   }

  // displayForgot = () => {
  //   return  <section id="test">
  //             <p>{this.state.testName}</p>
  //           </section>
  // }

  // passwordLogin = (event) => {
  //   if (this.userName.value === "" && this.userEmail.value === "") {
  //     return alert("You must enter a username or email.")
  //   } else {
  //     this.setState({
  //       userName: this.userName.value,
  //       userEmail: this.userEmail.value,
  //     })
  //     console.log(this.state)
  //   }
  // }


  // retrievalForm = () => {
  //   return <section id="retrieveForm">
  //     <h1 id="title">Did you forget your password?</h1>
  //     <h3 id="password-Instructions">Enter either your username or email.</h3>
  //     <section className="password-Section">
  //         <label className="password-Labels">Username</label>
  //         <input type="text" id="userName" ref={input => this.userName = input} placeholder="Enter your username" ></input>
  //     </section>
  //     <h3 id="optionConnector">OR</h3>
  //     <section className="password-Section">
  //         <label className="Password-Labels">Email</label>
  //         <input type="text" id="userEmail" ref={input => this.userEmail = input} placeholder="Enter your email" ></input>
  //     </section>
  //     <button className="submitButton" onClick={this.passwordLogin} id="loginSubmit">LOGIN</button>
  //   </section>
  // }

  // render() {
    // const forgot = this.displayForgot();
    // const form = this.retrievalForm();

    // return (
    //   <div className="Main">
    //     {form}
        {/* {forgot} */}
//       </div>

//     );
//   }
// }

// export default ForgotPassword