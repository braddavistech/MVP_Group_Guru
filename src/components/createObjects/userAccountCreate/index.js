import React, { Component } from 'react';
import { Redirect } from "react-router";
import apiData from "../../../modules/APIcalls";
import testing from "../../../modules/dataFunctions";
import $ from 'jquery';
import "./NewUserCreate.css";

export default class CreateNewUser extends Component {
  state = {
    redirect: false,
    loginMain: false,
    securityQuestionId: 0
  }

  // grabs input values and submits for validation
  gatherInputValues = () => {
    $(".alert").hide()
    let date = new Date();
    if (this.password.value === this.confirmPassword.value) {
      let temp = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        emailSecondary: this.emailSecondary.value,
        username: this.username.value,
        password: this.password.value,
        securityQuestionId: this.state.securityQuestionId,
        securityAnswer: this.securityAnswer.value,
        groupId: 1,
        inGroup: false,
        accountCreationDate: date,
        lastLogin: date,
        deleted: false,
        type: "user"
      }
      this.checkAndSave(temp);
    } else { $("#passwordMatchAlert").show() }
  }

  // validates all entries and then either toggles alerts or saves new user to json and redirects
  checkAndSave = (temp) => {
    let errorFound = false;
    if (temp.firstName === "") {
      $("#firstNameMissingAlert").show();
      errorFound = true;
    }
    if (temp.lastName === "") {
      $("#lastNameMissingAlert").show();
      errorFound = true;
    }
    if (temp.email === "") {
      $("#emailMissingAlert").show();
      errorFound = true;
    } else if (testing.emailAndUsernameValidation(temp.email) === false) {
      $("#emailValidAlert").show();
      errorFound = true;
    }
    if (temp.emailSecondary === "" || !testing.emailAndUsernameValidation(temp.emailSecondary)) {
      temp.emailSecondary = "None Provided"
    }
    if (temp.username === "") {
      $("#usernameMissingAlert").show();
      errorFound = true;
    } else if (temp.username.length < 6 || temp.username.length > 15) {
      $("#usernameLengthAlert").show();
      errorFound = true;
    } else if (!testing.emailAndUsernameValidation(temp.username) === false) {
      $("#usernameValidAlert").show();
      errorFound = true;
    }
    if (temp.password.length < 6) {
      $("#passwordLengthAlert").show();
      errorFound = true;
    }
    if (temp.securityQuestionId === 0) {
      $("#chooseQuestionAlert").show();
      errorFound = true;
    } else if (temp.securityAnswer === "") {
      $("#answerQuestionAlert").show();
      errorFound = true;
    }
    if (!errorFound) {
      apiData.getSingleType('users', `email=${temp.email}`).then(email => {
        if (email.length === 0) {
          apiData.getSingleType('users', `username=${temp.username}`).then(username => {
            if (username.length === 0) {
              apiData.newDataPost(temp, "users").then(currentUser => {
                sessionStorage.setItem("currentUserId", currentUser.id);
                let loginDate = new Date();
                let date = { date: loginDate, userId: currentUser.id}
                apiData.newDataPost(date, "loginActivities")
                  .then(() => {
                    this.props.loggedIn();
                    this.setState({ redirect: true });
                  })
              })
            } else { $("#usernameDupAlert").show() };
          })
        } else { $("#emailDupAlert").show() };
      })
    }
  }


  // returns to login selector page
  backToLogin = () => { this.setState({ loginMain: true }) }

  // changes selected security question
  changeQuestion = (event) => {
    this.setState({ securityQuestionId: parseInt(event.target.value) })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to="/moreInfo" />;
    } else if (this.state.loginMain) {
      return <Redirect to="/" />;
    } else {
      return (
        <article id="newUserFormPage1">
          <section className="newUserInputSection">
            <label htmlFor="firstName" className="newUserLabel">First Name<p id="firstNameMissingAlert" className="alert hide">You must enter a first name.</p></label>
            <input name="firstName" ref={(userInput) => this.firstName =
              userInput} className="newUserInput" placeholder="Enter First Name"></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="lastName" className="newUserLabel">Last Name<p id="lastNameMissingAlert" className="alert hide">You must enter a last name.</p></label>
            <input name="lastName" ref={(userInput) => this.lastName =
              userInput} className="newUserInput" placeholder="Enter Last Name"></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="email" className="newUserLabel">Primary Email<p id="emailMissingAlert" className="alert hide">You must enter your email address.</p><p id="emailValidAlert" className="alert hide">You must enter a valid email address. Please try again.</p><p id="emailDupAlert" className="alert hide">This email address is already registered. Please try again.</p></label>
            <input name="email" ref={(userInput) => this.email =
              userInput} className="newUserInput" placeholder="Enter Email Address"></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="emailSecondary" className="newUserLabel">Alternate Email</label>
            <input name="emailSecondary" ref={(userInput) => this.emailSecondary =
              userInput} className="newUserInput" placeholder="Enter Alternate Email Address"></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="username" className="newUserLabel">Username<p id="usernameMissingAlert" className="alert hide">You must enter a username.</p><p id="usernameLengthAlert" className="alert hide">Your username must be between 6 and 15 characters. Please try again.</p><p id="usernameValidAlert" className="alert hide">The username you entered is not valid in a valid format. Please try again.</p><p id="usernameDupAlert" className="alert hide">This username is already registered. Please try again.</p></label>
            <input name="username" ref={(userInput) => this.username =
              userInput} className="newUserInput" placeholder="Enter Username (6 to 15 characters in length)"></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="password" className="newUserLabel">Password<p id="passwordLengthAlert" className="alert hide">Your password must be at least 6 characters. Please try again.</p></label>
            <input name="password" ref={(userInput) => this.password =
              userInput} className="newUserInput" placeholder="Enter Password"></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="confirmPassword" className="newUserLabel">Confirm Password<p id="passwordMatchAlert" className="alert hide">The passwords that you entered do not match. Please try again.</p></label>
            <input name="confirmPassword" ref={(userInput) => this.confirmPassword =
              userInput} className="newUserInput" placeholder="Re-Enter Password"></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="passwordQuestion" className="newUserLabel">Choose A Security Question<p id="chooseQuestionAlert" className="alert hide">Your must choose a security question.</p><p id="answerQuestionAlert" className="alert hide">Your must answer the security question.</p></label>
            <fieldset>
              <select id="secQuestion" onChange={this.changeQuestion}>
                <option value="0">Select An Option</option>
                <option value="1">What is your mother's maiden name?</option>
                <option value="2">What is the name of your favorite pet?</option>
                <option value="3">What is your favorite hobby?</option>
                <option value="4">What elementary school did you go to?</option>
              </select>
            </fieldset>
            <input name="passwordQuestion" ref={(userInput) => this.securityAnswer =
              userInput} className="newUserInput" placeholder="Enter your answer to your security question."></input>
          </section>
          <section className="newUserDualButtonPage1">
            <button onClick={this.backToLogin} id="newUserBtnPage1">Back</button>
            <button onClick={this.gatherInputValues} id="newUserBtnPage1">Create User</button>
          </section>
        </article>
      )
    }
  }
}

