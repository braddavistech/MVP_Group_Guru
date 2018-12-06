// import React, { Component } from 'react';
// import logo from './groupGuruLogo.jpg';
// import APIcalls from './modules/APIcalls';
// import './App.css';

// const dataURL = "http://localhost:8088/user"

// class App extends Component {
//   state = {
//     userName: "",
//     password: "",
//     newUser: true,
//     checkUserProcess: false
//   }

  // getData = () => {
  //   return fetch(dataURL)
  //     .then(user => user.json())
  // }

  // newUserData = (data) => {
  //   return fetch(dataURL, {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data), // body data type must match "Content-Type" header
  //   })
  //     .then(response => response.json()); // parses response to JSON
  // }
  // checkUserExists = (tempName) => {
  //   this.checkUserProcess = false;
  //   let alreadyUser = false;
  //   // this.getData().then(thisData => {
  //   APIcalls.getData().then(thisData => {
  //     thisData.forEach(existingUser => {
  //       if (existingUser.userName === tempName.userName) {
  //         this.setState({ newUser: false })
  //         alreadyUser = true;
  //         return alreadyUser;
  //       }
  //     })
  //   }).then(() => {
  //     if (alreadyUser) {
  //       alert(`${this.state.userName} already exists. Did you forget your password?`)
  //     } else {
  //       APIcalls.newUserData(tempName).then(() => {APIcalls.getData()})
  //     }
  //   }).then(() => this.setState({checkUserProcess: false}))
  // }

  // userLogin = (event) => {
  //   if (this.userName.value === "" || this.password.value === "") {
  //     return alert("You must enter a username/email and a password.")
  //   } else {
  //     this.checkUserProcess = true;
  //     this.setState({
  //       userName: this.userName.value,
  //       password: this.password.value,
  //       checkUserProcess: true,
  //       newUser: true
  //     })
  //     let tempUser = {};
  //     tempUser.userName = this.userName.value;
  //     tempUser.password = this.password.value;
  //     this.checkUserExists(tempUser);
  //   }
  // }



  // displayUserName = () => {
  //   if (this.state.newUser === false || this.state.userName === "" || this.state.checkUserProcess === true) {
  //     return null
  //   } else {
  //     return <h3>Welcome, {this.state.userName}, let's see what's going on.</h3>
  //   }
  // }

  // loadLogin = () => {
  //   return <section>
  //     <img src={logo} className="Main-Logo" alt="Group Guru" />
  //     <p className="Main-Greeting">Welcome To Group Guru</p>
  //     <div className="Login">
  //       <h1 className="Login-Header">Existing User Login </h1>
  //       <section className="Login-Individual-Sections">
  //         <label className="Login-Labels">Username</label>
  //         <input type="text" id="userName" ref={input => this.userName = input} placeholder="Create your username" ></input>
  //       </section>
  //       <section className="Login-Individual-Sections">
  //         <label className="Login-Labels">Password</label>
  //         <input type="text" id="password" ref={password => this.password = password} placeholder="Create your password"></input>
  //       </section>
  //       <button className="submitButton" onClick={this.userLogin} id="loginSubmit">LOGIN</button>
  //     </div>
  //   </section>
  // }





//   render() {
//     const mainLogin = this.loadLogin();
//     const username = this.displayUserName();

//     return (
//       <div className="Main">
//         {username}
//         {mainLogin}
//       </div>

//     );
//   }
// }

// export default App;
