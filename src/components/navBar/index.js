import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import apiData from "../../modules/APIcalls";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import { confirmAlert } from "react-confirm-alert";

class NavBar extends Component {
  state = {
    loggedIn: false,
    profileLoaded: false,
    deleteText: ""
  }

  clearBlur = () => {
    $(".navbar").removeClass("isBlurred");
    $(".topLeft").removeClass("isBlurred");
    $(".topRight").removeClass("isBlurred");
    $(".middleRow").removeClass("isBlurred");
    $(".alertBottom").removeClass("isBlurred");
  }

  addBlur = () => {
    $(".navbar").addClass("isBlurred");
    $(".topLeft").addClass("isBlurred");
    $(".topRight").addClass("isBlurred");
    $(".middleRow").addClass("isBlurred");
    $(".alertBottom").addClass("isBlurred");
  }

  logOut = () => {
    let newLoginDate = {
      lastLogin: new Date()
    }
    let userId = sessionStorage.getItem("currentUserId");
    apiData.updateItem("users", userId, newLoginDate).then(() => {
      this.props.logOut();
      sessionStorage.removeItem("currentUserId");
      sessionStorage.removeItem("lastLogin");
      sessionStorage.removeItem("groupId");
      sessionStorage.removeItem("inGroup");
      this.props.openGroup();
      this.setState({ currentUser: {}, profileLoaded: false })
    })
  }

  goHome = () => {
    $(".-toggle").hide();
    this.props.stayAtMain();
  }

  addGroup = () => {
    $(".-toggle").hide()
    this.props.joinGroup();
  }

  grabProfileInfo = () => {
    let userId = sessionStorage.getItem("currentUserId")
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      let newUser = user[0];
      this.setState({ currentUser: newUser, profileLoaded: true })
    })
    this.props.refresh()
  }

  removeUser = () => {
    if (this.state.deleteText === "DELETE") {
      let user = parseInt(sessionStorage.getItem("currentUserId"))
      apiData.getSingleType("users", `id=${user}`).then(data => {
        data = data[0];
        let contact = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          username: data.username,
          groupId: data.groupId,
          streetAdd: data.streetAdd,
          city: data.city,
          stateId: data.stateId,
          zip: data.zip,
          phone: data.phone,
          preferredContact: data.preferredContact,
          type: "contact"
        }
        apiData.newDataPost(contact, "addedContacts")
      })
      apiData.updateItem("users", user, {deleted: true, groupId: 0, password: "Account Deleted", securityQuestionId: 0, securityAnswer: "Account Deleted", inGroup: false}).then(() => {
        localStorage.removeItem("passwordUsername");
        sessionStorage.removeItem("currentUserId");
        sessionStorage.removeItem("lastLogin");
        sessionStorage.removeItem("groupId");
        sessionStorage.removeItem("inGroup");
        this.props.openGroup();
        this.props.stayAtMain();
        this.setState({ currentUser: {}, deleteText: "", profileLoaded: false })
      })
    }
  }

  deleteInput = () => {
    this.setState({ deleteText: this.delete.value })
  }

  deleteAccount = () => {
    this.addBlur();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="deleteAlert">
            <img src="../../../groupGuruLogo.jpg" id="logoForLoginAlert" alt="Group Guru Logo" />
            <div id="deleteTextDiv">
              <h1 id="areYouSure">Are you sure?</h1>
              <p id="deleteFile">This will permanently delete your account.</p>
            </div>
            <div id="deleteUserInputDiv">
              {/* <h1 id="deleteUserInstructions">Type DELETE to delete account.</h1> */}
              <input id="deleteUserInput" ref={input => this.delete = input} onChange={this.deleteInput} placeholder='Type "DELETE" to delete account.'></input>
            </div>
            <div id="deleteBtnSection">
              <button className="deleteConfirmation" onClick={() => {
                this.clearBlur();
                onClose()
              }}>No, Keep Account</button>
              <button className="deleteConfirmation" onClick={() => {
                this.removeUser();
                this.clearBlur();
                onClose()
              }}>Yes, Delete Me</button>
            </div>
          </div>
        )
      }
    })
  }

  render() {
    if (this.props.loggedInStatus) {
      if (this.state.profileLoaded) {
        return (
          <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link className="navLink" onClick={() => { this.goHome() }} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="navLink" onClick={() => { $(".-toggle").hide() }} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="navLink" onClick={() => { this.addGroup() }} to="/joinGroup">Groups</Link>
              </li>
              <li className="nav-item">
                <Link className="navLink" onClick={() => { $(".-toggle").hide() }} to="/addressBook">Address Book</Link>
              </li>
            </ul>
            <section id="logOutDropdown">
              <li className="navLink" onClick={() => { $(".-toggle").toggle() }} id="loggedInButton">{this.state.currentUser.username}</li>
              <p className="navLinkP -toggle hide" >Edit Profile</p>
              <p className="navLinkP -toggle hide" >Settings Preferences</p>
              <Link className="navLink -toggle hide" id="logOutBtn" onClick={this.logOut} to="/">Log Out</Link>
              <p className="navLinkP -toggle hide" onClick={() => {
                $(".-toggle").hide();
                this.deleteAccount()
              }} to="/">Delete Account</p>
            </section>

          </nav>
        )
      } else {
        this.grabProfileInfo();
        return (<div><h1>Loading</h1></div>)
      }
    } else {
      return (
        <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="navLink" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="navLink" to="/">Login</Link>
            </li>
          </ul>
        </nav>
      )
    }

  }
}

export default NavBar