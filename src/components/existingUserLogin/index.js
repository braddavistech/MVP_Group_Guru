import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import testing from "../../modules/dataFunctions";
import $ from 'jquery';
import './ExistingUserLogin.css';
import apiData from "../../modules/APIcalls";


export default class LoginMain extends Component {
  state = {
    loggedIn: false,
    newUser: false,
    forgotPassword: false,
    saveLogin: "option2"
  }

  componentDidMount = () => {
    let storedUser = localStorage.getItem("passwordUsername");
    if (storedUser !== null) {
      this.setState({saveLogin: "option1"})
    }
  }

  toggleLogin = () => {
    if (this.state.saveLogin === "option2") {
      this.setState({ saveLogin: "option1" })
    } else {
      this.setState({ saveLogin: "option2" });
      localStorage.removeItem("passwordUsername");
    }
  }

  forgotPassword = () => {
    localStorage.removeItem("passwordUsername")
    this.setState({forgotPassword: true})
  }

  loginForm = () => {
    this.setState({forgotPassword: false})
  }

  authenticateUser = () => {
    $(".alert").hide();
    let temp = {
      usernameOrEmail: this.usernameOrEmail.value,
      password: this.password.value
    }
    if (temp.usernameOrEmail.length < 6) {
      $("#invalidEmailAlert").show();
    } else if (temp.password.length < 6) {
      $("#passwordLengthAlert").show();
    } else if (testing.emailAndUsernameValidation(temp.usernameOrEmail)) {
      apiData.getSingleType('users', `email=${temp.usernameOrEmail}`).then(email => {
        if (email.length === 0) {
          $("#noEmailFoundAlert").show();
        } else if (email[0].password === temp.password) {
          if (this.state.saveLogin === "option1") {
            localStorage.setItem("passwordUsername", temp.usernameOrEmail)
          }
          sessionStorage.setItem("currentUserId", email[0].id);
          sessionStorage.setItem("lastLogin", email[0].lastLogin);
          let newLoginDate = {
            lastLogin: new Date()
          }
          let loginDate = new Date();
          let date = { date: loginDate, userId: email[0].id }
          apiData.newDataPost(date, "loginActivities")
            .then(() => {
              apiData.updateItem("users", email[0].id, newLoginDate).then(() => {
                this.props.user.refresh();
                this.props.user.loggedIn();
              })
            })
        } else { $("#wrongPasswordAlert").show(); }
      })
    } else {
      apiData.getSingleType('users', `username=${temp.usernameOrEmail}`).then(username => {
        if (username.length === 0) {
          $("#noUsernameFoundAlert").show();
        } else if (username[0].password === temp.password) {
          if (this.state.saveLogin === "option1") {
            localStorage.setItem("passwordUsername", temp.usernameOrEmail)
          }
          sessionStorage.setItem("currentUserId", username[0].id);
          sessionStorage.setItem("lastLogin", username[0].lastLogin);
          let newLoginDate = {
            lastLogin: new Date()
          }
          let loginDate = new Date();
          let date = { date: loginDate, userId: username[0].id }
          apiData.newDataPost(date, "loginActivities")
            .then(() => {
              apiData.updateItem("users", username[0].id, newLoginDate).then(() => {
                this.props.user.refresh();
                this.props.user.loggedIn();
              })
            })
        } else {
          $("#wrongPasswordAlert").show();
        }
      })
    }
  }


  newUserForm = (event) => {
    this.setState({
      newUser: true
    })
  }

  render() {
    let storedUser = localStorage.getItem("passwordUsername");
    if (this.props.user.main.loggedIn) {
      return <Redirect to="/" />
    } else if (this.state.newUser) {
      return <Redirect to="/newUser" />
    } else if (this.state.forgotPassword) {
      return <Redirect to="/forgotPassword" login={this.loginForm} user={this.props.user} />
    } else if (storedUser !== undefined) {
      return (
        <div id="existingUserForm">
          <section id="logoContainer">
            <img src="../../groupGuruLogo.jpg" id="logoForLogin" alt="Group Guru Logo" />
            <article id="welcomeLoginMessage">
              <p id="welcome">Welcome</p>
              <p id="to">Let's Get Started</p>
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
              userInput} defaultValue={storedUser} className="newUserInput" placeholder="Enter Username/Email"></input>
          </section>
          <section className="userLoginSection">
            <label htmlFor="password" className="newUserLabel">Enter Your Password
            <p id="wrongPasswordAlert" className="alert hide">The password entered is incorrect.</p>
              <p id="passwordLengthAlert" className="alert hide">The password entered is too short. Please try again.</p>
            </label>
            <input name="password" ref={(userInput) => this.password =
              userInput} className="newUserInput" placeholder="Enter Password"></input>
          </section>
          <p id="saveLoginInfoLabel" >Remember Me</p>
          <article id="saveLoginInfo">
            <section className="indivRadioBtn">
              <label className="newUserRadioLabel">Yes</label>
              <input className="existingUserRadio" type="radio" id="option1" checked={this.state.saveLogin === "option1"} onChange={() => this.toggleLogin()}></input>
            </section>
            <section className="indivRadioBtn">
              <label className="newUserRadioLabel">No</label>
              <input className="existingUserRadio" type="radio" id="option2" checked={this.state.saveLogin === "option2"} onChange={() => this.toggleLogin()}></input>
            </section>
          </article>
          <article id="loginNavButtonContainer">
            <button value="Log In" onClick={this.authenticateUser} className="loginNavButton">Log In</button>
            <button value="New User" onClick={this.newUserForm} className="loginNavButton">Create New Account</button>
          </article>
          <p className="forgotPassword" onClick={this.forgotPassword}>Forgot Password?</p>
        </div>
      )
    } else {
      return (
        <div id="existingUserForm">
          <section id="logoContainer">
            <img src="../../groupGuruLogo.jpg" id="logoForLogin" alt="Group Guru Logo" />
            <article id="welcomeLoginMessage">
              <p id="welcome">Welcome</p>
              <p id="to">Let's Get Started</p>
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
          <section className="userLoginSection">
            <label htmlFor="password" className="newUserLabel">Enter Your Password
            <p id="wrongPasswordAlert" className="alert hide">The password entered is incorrect.</p>
              <p id="passwordLengthAlert" className="alert hide">The password entered is too short. Please try again.</p>
            </label>
            <input name="password" ref={(userInput) => this.password =
              userInput} className="newUserInput" placeholder="Enter Password"></input>
          </section>
          <p id="saveLoginInfoLabel" >Remember Me</p>
          <article id="saveLoginInfo">
            <section className="indivRadioBtn">
              <label className="newUserRadioLabel">Yes</label>
              <input className="existingUserRadio" type="radio" id="option1" checked={this.state.saveLogin === "option1"} onChange={() => this.toggleLogin()}></input>
            </section>
            <section className="indivRadioBtn">
              <label className="newUserRadioLabel">No</label>
              <input className="existingUserRadio" type="radio" id="option2" checked={this.state.saveLogin === "option2"} onChange={() => this.toggleLogin()}></input>
            </section>
          </article>
          <article id="loginNavButtonContainer">
            <button value="Log In" onClick={this.authenticateUser} className="loginNavButton">Log In</button>
            <button value="New User" onClick={this.newUserForm} className="loginNavButton">Create New Account</button>
          </article>
          <p className="forgotPassword" onClick={this.forgotPassword}>Forgot Password?</p>
        </div>
      )
    }
  }
}