import React, { Component } from 'react';
import "./NewGroupCreate.css";
import apiData from "../../../modules/APIcalls";
import $ from "jquery";

export default class CreateNewGroup extends Component {
  state = {
    userId: 0,
    groupType: "Other",
    // uniqueGroupName: false,
    backToMain: false
  }

  componentDidMount = () => {
    let userId = sessionStorage.getItem("currentUserId")
    this.setState({ userId: userId })
  }

  gatherGroupInputValues = () => {
    $(".alert").hide();
    let temp = {
      groupName: this.groupName.value,
      groupDescription: this.groupDescription.value,
      groupType: this.state.groupType
    }
    if (temp.groupName.length < 4 || temp.groupName.length > 20) {
      $("#nameLengthAlert").show();
    } else if (temp.groupDescription === "") {
      $("#descriptionAlert").show();
    } else {
      apiData.getSingleType('groups', `groupName=${temp.groupName}`).then(sameGroup => {
        if (sameGroup.length === 0) {
          // this.setState({ uniqueGroupName: true })
          this.saveGroup(temp);
        } else {
          $("#nameTakenAlert").show();
        }
      })

    }
  }

  saveGroup = (temp) => {
    apiData.newDataPost(temp, "groups").then(currentGroup => {
      let data = { groupId: currentGroup.id, inGroup: true }
      sessionStorage.setItem("groupId", currentGroup.id);
      sessionStorage.setItem("inGroup", true)
      apiData.updateItem("users", this.state.userId, data).then(() => {
        this.props.refresh();
        this.props.mainPage();
      })
    })
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      groupType: changeEvent.target.value
    });
  }

  render() {
    return (
      <article id="newUserForm">
        <section className="newUserInputSection">
          <label htmlFor="groupName" className="newUserLabel">Group Name
            <p id="nameLengthAlert" className="alert hide">Your group name must be between 4 and 20 characters. Please try again.</p>
            <p id="nameTakenAlert" className="alert hide">That group name is already taken. Please try again.</p>
          </label>
          <input name="groupName" ref={(userInput) => this.groupName =
            userInput} className="newUserInput" placeholder="Enter The Name For Your Group"></input>
        </section>
        <section className="newUserInputSection">
          <label htmlFor="groupDescription" className="newUserLabel">Brief Description
            <p id="descriptionAlert" className="alert hide">You must enter a description for your group.</p>
          </label>
          <textarea name="groupDescription" ref={(userInput) => this.groupDescription =
            userInput} id="newGroupDescription" placeholder="Enter A Brief Description To Display In A Search"></textarea>
        </section>
        <section id="newGroupTypeRadioSection">
          <label htmlFor="groupType" className="newUserRadioLabel">Family
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Family"} onChange={this.handleOptionChange} value="Family" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Social
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Social"} onChange={this.handleOptionChange} value="Social" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Work
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Work"} onChange={this.handleOptionChange} value="Work" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Special Intrest
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Special Interest"} onChange={this.handleOptionChange} value="Special Interest" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Religious
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Religious"} onChange={this.handleOptionChange} value="Religious" /></label>
          <label htmlFor="groupType" className="newUserRadioLabel">Other
            <input type="radio" name="groupType" className="newUserRadioBtn" checked={this.state.groupType === "Other"} onChange={this.handleOptionChange} value="Other" /></label>
        </section>
        <section className="newUserDualButton">
          <button onClick={this.gatherGroupInputValues} id="newUserBtn">Create This Group</button>
          <button onClick={this.props.mainPage} id="newUserBtn">Back To Main</button>
        </section>
      </article>
    )
  }
}

