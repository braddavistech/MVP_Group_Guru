import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import apiData from "../../../modules/APIcalls";
import "./MoreInfoForm.css";

export default class MoreInfo extends Component {
  state = {
    skipMoreInfo: false,
    streetAdd: "Enter Your Street Address",
    city: "Enter City",
    stateId: "Enter State (TN, OH, etc)",
    zip: "Enter Zip Code",
    phone: "Enter Phone Number",
    currentUserId: "",
    preferredContact: "Email"
  }

  skipAddInfo = () => {
    let temp = {
      streetAdd: "No Information Provided",
      city: "No Information Provided",
      stateId: "No Information Provided",
      zip: "No Information Provided",
      phone: "No Information Provided",
      preferredContact: "No Information Provided"
    }
    apiData.updateItem("users", this.state.currentUserId, temp).then(() => {
      this.props.refresh();
      this.setState({ skipMoreInfo: true })
    })
  }

  componentDidMount = () => {
    let id = sessionStorage.getItem("currentUserId");
    this.setState({ currentUserId: id })
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      preferredContact: changeEvent.target.value
    });
  }

  gatherInputValues = () => {
    // Need checks for blank fields
    let temp = {
      streetAdd: this.streetAdd.value,
      city: this.city.value,
      stateId: this.stateId.value,
      zip: this.zip.value,
      phone: this.phone.value,
      preferredContact: this.state.preferredContact
    }
    apiData.updateItem("users", this.state.currentUserId, temp).then(() => {
      this.props.refresh();
      this.setState({ skipMoreInfo: true })
    })
  }

  render() {
    if (this.state.skipMoreInfo) {
      return <Redirect to="/" />
    } else {
      return (
        <div id="newUserForm">
          <section className="newUserInputSection">
            <label htmlFor="streetAdd" className="newUserLabel">Address</label>
            <input name="streetAdd" ref={(userInput) => this.streetAdd =
              userInput} className="newUserInput" placeholder={this.state.streetAdd}></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="city" className="newUserLabel">City</label>
            <input name="city" ref={(userInput) => this.city =
              userInput} className="newUserInput" placeholder={this.state.city}></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="stateId" className="newUserLabel">State</label>
            <input name="stateId" ref={(userInput) => this.stateId =
              userInput} className="newUserInput" placeholder={this.state.stateId}></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="zip" className="newUserLabel">Zip</label>
            <input name="zip" ref={(userInput) => this.zip =
              userInput} className="newUserInput" placeholder={this.state.zip}></input>
          </section>
          <section className="newUserInputSection">
            <label htmlFor="phone" className="newUserLabel">Phone</label>
            <input name="phone" ref={(userInput) => this.phone =
              userInput} className="newUserInput" placeholder={this.state.phone}></input>
          </section>
          <p id="alertPreference">Select Perferred Communication</p>
          <section id="newUserGroupRadioSection">
            <label htmlFor="groupStatus" className="newUserRadioLabel">Email
              <input type="radio" name="preferredContact" className="newUserRadioBtn" checked={this.state.preferredContact === "Email"} onChange={this.handleOptionChange} value="Email" /></label>
            <label htmlFor="preferredContact" className="newUserRadioLabel">Text
              <input type="radio" name="preferredContact" className="newUserRadioBtn" checked={this.state.preferredContact === "Text"} onChange={this.handleOptionChange} value="Text" /></label>
            <label htmlFor="groupStatus" className="newUserRadioLabel">None
              <input type="radio" name="preferredContact" className="newUserRadioBtn" checked={this.state.preferredContact === "None"} onChange={this.handleOptionChange} value="None" /></label>
          </section>
          <section className="newUserDualButton">
            <button onClick={this.skipAddInfo} id="newUserBtn">Skip</button>
            <button onClick={this.gatherInputValues} id="newUserBtn">Continue</button>
          </section>
        </div>
      )
    }
  }
}
