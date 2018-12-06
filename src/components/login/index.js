import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './LoginMain.css';


export default class LoginMain extends Component {
  state = {
    newUser: false,
    existingUser: false
  }

  existingUserForm = () => {
    this.setState({
      existingUser: true
    })
  }

  newUserForm = () => {
    this.setState({
      newUser: true
    })
  }



  render() {
    if (this.state.newUser) {
      return <Redirect to="/newUser" />
    } else if (this.state.existingUser) {
      return <Redirect to="/login" forgotPassword={this.forgotPasswordForm}/>
    }  else {
      return (
        <div id="newUserForm">
          <section id="logoContainer">
            <img src="../../groupGuruLogo.jpg" id="logoForLogin" alt="Group Guru Logo" />
            <article id="welcomeLoginMessage">
              <p id="welcome">Welcome</p>
              <p id="to">Let's Get Started</p>
            </article>
          </section>
          <article id="loginNavButtonContainer">
            <button value="Log In" onClick={this.existingUserForm} className="loginNavButton">Log In</button>
            <button value="Create Account" onClick={this.newUserForm} className="loginNavButton">Create New User</button>
          </article>
        </div>
      )
    }
  }
}