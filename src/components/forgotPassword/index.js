import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import testing from "../../modules/dataFunctions";
import $ from 'jquery';
import './ForgotPassword.css';
import apiData from "../../modules/APIcalls";


export default class ForgotPassword extends Component {
  state = {
    loggedIn: false,
    newUser: false,
    login: false,
    userId: 0,
    makePassword: false
  }

  login = () => {
    this.setState({ login: true })
  }

  passwordQuestion = () => {
    this.setState({ passwordQuestion: true })
  }

  authenticateUser = () => {
    $(".alert").hide();
    let temp = {
      usernameOrEmail: this.usernameOrEmail.value,
    }
    if (temp.usernameOrEmail.length < 6) {
      $("#invalidEmailAlert").show();
    } else if (testing.emailAndUsernameValidation(temp.usernameOrEmail)) {
      apiData.getSingleType('users', `email=${temp.usernameOrEmail}`).then(email => {
        if (email.length === 0) {
          $("#noEmailFoundAlert").show();
        } else {
          this.setState({userId: email[0].id}, () => {
          apiData.getSingleType('securityQuestions', `id=${email[0].securityQuestionId}`).then(securityQuestion => {
            this.setState({securityQuestion: securityQuestion[0].question})
          })
        })
        }
      })
    } else {
      apiData.getSingleType('users', `username=${temp.usernameOrEmail}`).then(username => {
        if (username.length === 0) {
          $("#noUsernameFoundAlert").show();
        } else {
          this.setState({userId: username[0].id}, () => {
          apiData.getSingleType('securityQuestions', `id=${username[0].securityQuestionId}`).then(securityQuestion => {
            this.setState({securityQuestion: securityQuestion[0].question})
          })
        })
        }
      })
    }
  }

  checkQuestion = () => {
    $(".alert").hide();
    let passwordAnswer = this.passwordAnswer.value;
      apiData.getSingleType('users', `id=${this.state.userId}`).then(user => {
        if (user[0].securityAnswer !== passwordAnswer) {
          $("#passwordWrongAlert").show();
        } else {
          sessionStorage.setItem("currentUserId", this.state.userId)
          this.setState({makePassword: true})
        }
      })
  }


  newUserForm = (event) => {
    this.setState({
      newUser: true
    })
  }

  render() {
    if (this.state.login) {
      return <Redirect to="/login" />
    } else if (this.props.user.newUser) {
      return <Redirect to="/newUser" />
    } else if (this.state.makePassword) {
      return <Redirect to="/createPassword" />
    } else if (this.state.securityQuestion !== undefined ) {
      return (
        <div id="existingUserForm">
          <section id="logoContainer">
            <img src="../../groupGuruLogo.jpg" id="logoForLogin" alt="Group Guru Logo" />
            <article id="welcomeLoginMessage">
              <p id="welcome">Welcome</p>
              <p id="to">Let's Get Your Password</p>
            </article>
          </section>
          <section className="userLoginSection">
            <label htmlFor="usernameOrEmail" className="newUserLabel">{this.state.securityQuestion}
            <p id="passwordWrongAlert" className="alert hide">The answer you entered is not correct.</p>
            </label>
            <textarea name="securityAnswer" ref={(userInput) => this.passwordAnswer =
              userInput} className="newUserInput" placeholder="Enter Answer to Security Question"></textarea>
          </section>
          <article id="loginNavButtonContainer">
            <button value="Log In" onClick={this.login} className="loginNavButton">Back to Login</button>
            <button value="New User" onClick={this.checkQuestion} className="loginNavButton">Continue</button>
          </article>
        </div>
      )
    } else {
      return (
        <div id="existingUserForm">
          <section id="logoContainer">
            <img src="../../groupGuruLogo.jpg" id="logoForLogin" alt="Group Guru Logo" />
            <article id="welcomeLoginMessage">
              <p id="welcome">Welcome</p>
              <p id="to">Let's Get Your Password</p>
            </article>
          </section>
          <section className="userLoginSection">
            <label htmlFor="usernameOrEmail" className="newUserLabel">Enter Username or Email
            <p id="noEmailFoundAlert" className="alert hide">The email you entered is not registered.</p>
              <p id="noUsernameFoundAlert" className="alert hide">The username you entered is not registered.</p>
              <p id="invalidEmailAlert" className="alert hide">Please enter a valid email address.</p>
              <p id="invalidUsernameAlert" className="alert hide">Please enter a valid username.</p>
            </label>
            <input name="usernameOrEmail" ref={(userInput) => this.usernameOrEmail =
              userInput} className="newUserInput" placeholder="Enter Username/Email"></input>
          </section>
          <article id="loginNavButtonContainer">
            <button value="Log In" onClick={this.login} className="loginNavButton">Back To Login</button>
            <button value="New User" onClick={this.authenticateUser} className="loginNavButton">Continue</button>
          </article>
        </div>
      )
    }
  }
}