import React, { Component } from "react";
import NavBar from "./navBar";
import ApplicationViews from "./ApplicationViews";
import apiData from "../modules/APIcalls";
import moment from "moment";
import "./GroupGuru.css";
import "bootstrap/dist/css/bootstrap.min.css"

class GroupGuru extends Component {
  state = {
    loggedIn: false,
    inGroup: false,
    joinGroup: false,
    closeGroup: false,
    groupId: 0,
    sendToGroup: false,
    groupMessages: [],
    groupPhotos: [],
    groupEvents: [],
    groupMembers: [],
    profileLoaded: false
  }

  componentDidMount = () => {
    this.checkUserState()
  }

  checkUserState = () => {
    const userId = sessionStorage.getItem("currentUserId");
    if (userId !== null) {
      apiData.getSingleType("users", `id=${userId}`).then(user => {
        let newUser = user[0];
        this.setState({ currentUser: newUser, profileLoaded: true, loggedIn: true })
      })
    }
  }

  refreshData = () => {
    let userId = sessionStorage.getItem("currentUserId");
    apiData.getSingleType("users", `id=${userId}`).then(user => {
      let newUser = user[0];
      return newUser;
    })
      .then(newUser => {
        apiData.getSingleType("messages", `_expand=user&groupId=${newUser.groupId}`).then(messages => {
          messages.map(message => {
            message.user.password = "HIDDEN";
            message.user.securityAnswer = "HIDDEN";
            message.user.securityQuestionId = "HIDDEN";
            return messages;
          })
          this.setState({ groupMessages: messages, currentUser: newUser, groupId: newUser.groupId, profileLoaded: true, inGroup: newUser.inGroup })
        })
          .then(() => {
            apiData.getSingleType("photos", `_expand=user&groupId=${newUser.groupId}`).then(photos => {
              photos.map(photo => {
                photo.user.password = "HIDDEN";
                photo.user.securityAnswer = "HIDDEN";
                photo.user.securityQuestionId = "HIDDEN";
                return photos;
              })
              this.setState({ groupPhotos: photos })
            })
          })
          .then(() => {
            apiData.getSingleType("events", `_expand=user&groupId=${newUser.groupId}`).then(events => {
              events.map(event => {
                event.start = moment(event.start).toDate();
                 event.end = moment(event.end).toDate();
                // console.log("eventStart", event.start);
                // let date = moment(event.start, "d, MM-Do-YYYY hh:mm:ss.sss").format("dddd, MMMM Do, YYYY h:mm A")
                // console.log("formattedDate", date)
                event.user.password = "HIDDEN";
                event.user.securityAnswer = "HIDDEN";
                event.user.securityQuestionId = "HIDDEN";
                return event;
              })
              this.setState({ groupEvents: events })
            })
          })
          .then(() => {
            apiData.getSingleType("users", `groupId=${newUser.groupId}`).then(members => {
              members.map(member => {
                member.password = "HIDDEN";
                member.securityAnswer = "HIDDEN";
                member.securityQuestionId = "HIDDEN";
                return member;
              })
              this.setState({ groupMembers: members })
            })
          })
          .then(() => {
            apiData.getSingleType("addedContacts", `groupId=${newUser.groupId}`).then(members => {
              let users = []
              this.state.groupMembers.forEach(member => users.push(member))
              members.forEach(member => users.push(member))
              console.log("allUsers: ", users)
              this.setState({ allUsers: users })
            })
          })
      })
  }


  grabMessages = () => {

  }


  closeGroupMessage = () => {
    this.setState({ closeGroup: true })
  }

  openGroupMessage = () => {
    this.setState({ loggedIn: false, groupId: 0, inGroup: false, joinGroup: false, closeGroup: false, sendToGroup: false, groupMessages: [], currentUser: {}, groupPhotos: [], groupEvents: [] })
  }

  joinGroup = () => {
    this.setState({ joinGroup: true })
  }

  noJoinGroup = () => {
    this.setState({ joinGroup: false })
  }

  createJoinGroup = () => {
    this.setState({ sendToGroup: true, closeGroup: false })
  }

  stayAtMain = () => {
    this.setState({ sendToGroup: false, joinGroup: false });
  }

  logOut = () => {
    this.setState({ loggedIn: false })
  }

  toggleLogin = () => {
    this.setState({ loggedIn: true })
  }


  render() {
    return (
      <React.Fragment>
        <NavBar logOut={this.logOut} openGroup={this.openGroupMessage} refresh={this.refreshData} joinGroup={this.joinGroup} stayAtMain={this.stayAtMain} noJoinGroup={this.noJoinGroup} loggedInStatus={this.state.loggedIn} />
        <ApplicationViews loggedIn={this.toggleLogin} refresh={this.refreshData} joinGroup={this.joinGroup} createJoinGroup={this.createJoinGroup} closeGroupMessage={this.closeGroupMessage} stayAtMain={this.stayAtMain} main={this.state} />
      </React.Fragment>
    )
  }
}

export default GroupGuru