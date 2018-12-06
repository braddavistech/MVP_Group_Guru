import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import $ from 'jquery';
import './CreatePassword.css';
import apiData from "../../modules/APIcalls";


export default class CreatePassword extends Component {
  state = {
    loggedIn: false,
    login: false
  }

  login = () => {
    sessionStorage.removeItem("currentUserId")
    this.setState({ login: true })
  }

  passwordQuestion = () => {
    this.setState({ passwordQuestion: true })
  }

  checkPassword = () => {
    $(".alert").hide();
    let canSave = true;
    if (this.confirmPassword.value !== this.passwordAnswer.value) {
      $("#passwordMatchAlert").show();
      canSave = false;
      return canSave;
    }
    if (this.confirmPassword.value.length < 6) {
      $("#passwordLengthAlert").show();
      canSave = false
      return canSave;
    }
    if (canSave) {
      let userId = parseInt(sessionStorage.getItem("currentUserId"));
      let data = { password: this.confirmPassword.value }
      apiData.updateItem('users', userId, data).then(username => {
        apiData.getSingleType('users', `id=${userId}`).then(user => {
          sessionStorage.setItem("lastLogin", user[0].lastLogin);
          let newLoginDate = {
            lastLogin: new Date()
          }
          let loginDate = new Date();
          let date = { date: loginDate, userId: userId }
          apiData.newDataPost(date, "loginActivities")
            .then(() => {
              apiData.updateItem("users", userId, newLoginDate).then(() => {
                this.props.user.refresh();
                this.props.user.loggedIn();
                this.setState({loggedIn: true})
              })
            })
        })
      })
    }
  }

  render() {
          if(this.state.loggedIn || this.state.login) {
        return <Redirect to="/" />
      } else {
        return (
          <div id="existingUserForm">
            <section id="logoContainer">
              <img src="../../groupGuruLogo.jpg" id="logoForLogin" alt="Group Guru Logo" />
              <article id="welcomeLoginMessage">
                <p id="welcome">Welcome</p>
                <p id="to">Create A New Password</p>
              </article>
            </section>
            <section className="userLoginSection">
              <label htmlFor="usernameOrEmail" className="newUserLabel">{this.state.securityQuestion}
                <p id="passwordLengthAlert" className="alert hide">Passwords must be at least 6 characters long.</p>
              </label>
              <textarea name="securityAnswer" ref={(userInput) => this.passwordAnswer =
                userInput} className="newUserInput" placeholder="Enter a new password."></textarea>
            </section>
            <section className="userLoginSection">
              <label htmlFor="usernameOrEmail" className="newUserLabel">{this.state.securityQuestion}
                <p id="passwordMatchAlert" className="alert hide">The passwords you entered do not match.</p>
              </label>
              <textarea name="securityAnswer" ref={(userInput) => this.confirmPassword =
                userInput} className="newUserInput" placeholder="Reenter your password."></textarea>
            </section>
            <article id="loginNavButtonContainer">
              <button value="Log In" onClick={this.login} className="loginNavButton">Back to Login</button>
              <button value="New User" onClick={this.checkPassword} className="loginNavButton">Continue</button>
            </article>
          </div>
        )
      }
    }
  }