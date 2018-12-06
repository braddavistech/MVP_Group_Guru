import React, { Component } from 'react';
import { Redirect } from "react-router";
import "./JoinGroup.css";
import apiData from "../../modules/APIcalls";
import $ from "jquery";

export default class JoinGroup extends Component {
  state = {
    userId: 0,
    backToMain: false,
    groups: [],
    groupOption: { groupDescription: "When you select a group from the dropdown, a brief description of the group will appear here." }
  }

  componentDidMount = () => {
    apiData.getData("groups").then(existingGroups => {
      this.setState({ groups: existingGroups })
    })
    let userId = sessionStorage.getItem("currentUserId")
    this.setState({ userId: userId })
  }

  printGroupOption = () => {
    return (this.state.groups.map(group => (
      <option key={group.id} value={group.id} className="groupOption">{group.groupName}</option>
    )))
  }

  printGroupDescription = () => {
    return (<section id="groupDescription" > Group Description
        <p id="groupDescriptionText" > {this.state.groupOption.groupDescription}</p>
    </section >
    )
  }

  saveGroup = (temp) => {
    $("#groupSelectAlert").hide()
    if (this.state.groupOption.id !== 1) {
      sessionStorage.setItem("groupId", this.state.groupOption.id);
      sessionStorage.setItem("inGroup", true)
      let groupData = {
        groupId: this.state.groupOption.id,
        inGroup: true
      }
      apiData.updateItem("users", this.state.userId, groupData)
        .then(() => {
          this.props.refresh()
          this.setState({backToMain: true});
          this.props.mainPage();
        })
    } else { $("#groupSelectAlert").show() }
  }

  handleOptionChange = (changeEvent) => {
    $(".groupButton").show();
    $(".groupButtonSingle").hide();
    let currentGroupOption = this.state.groups[changeEvent.target.value - 1];
    this.setState({
      groupOption: currentGroupOption
    });
  }

  backToMain = () => {
    this.setState({backToMain: true})
  }

  mainPage = () => {
    return <Redirect to="/" />
  }


  render() {
    let mainLandingPage = this.mainPage();
    if (this.state.backToMain) {
      return mainLandingPage
    } else {
      return (
        <article id="joinGroupForm">
          <p id="joinGroupTitle">Join A Group</p>
          <section className="groupInputSection">
            <label htmlFor="groupSelect" className="joinGroup">Select Existing Group
            <p id="groupSelectAlert" className="alert hide">You must select a group to join.</p>
            </label>
            <select id="groupSelect" onChange={this.handleOptionChange}>
              {this.printGroupOption()}
            </select>
            {this.printGroupDescription()}
          </section>
          <section className="joinGroupDualButton">
            <button onClick={this.saveGroup} className="groupButton hide">Join This Group</button>
            <button onClick={() => {
              this.props.mainPage()
              this.backToMain()}} className="groupButton hide">Back To Main</button>
            <button onClick={() => {
              this.props.mainPage()
              this.backToMain()}} className="groupButtonSingle">Return To Main Page</button>
          </section>
        </article>
      )
    }
  }
}