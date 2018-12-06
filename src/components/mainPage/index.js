import React, { Component } from 'react';
import "./MainPage.css";
import CreateNewGroup from "../createObjects/group";
import OldMessages from "./oldMessages";
import JoinGroup from "../joinGroup";
import OldPhotos from "./oldPhotos";
import NewPhotoModular from "../modulars/newPhoto";
import NewMessageModular from "../modulars/newMessage";
import NewEventModular from "../modulars/newEvent";
import Calendar from "./calendar";
import apiData from "../../modules/APIcalls";
import jstz from "jstz";
import moment from "moment-timezone";
import { confirmAlert } from "react-confirm-alert";
import $ from "jquery";



export default class MainPage extends Component {
  state = {
    webAddress: "",
    photoDescription: "",
    photoTitle: "",
    messageTitle: "",
    messageBody: "",
    eventStart: "",
    eventEnd: "",
    eventTitle: "",
    eventDescription: "",
    eventLocation: "",
    eventStreetAdd: "",
    eventCity: "",
    eventState: "",
    eventZip: "",
    eventNotes: "",
    eventDuration: false
  }

  handleChange = (stateToChange) => {
    this.setState(stateToChange)
  }

  addBlur = () => {
    $(".navbar").addClass("isBlurred");
    $(".topLeft").addClass("isBlurred");
    $(".topRight").addClass("isBlurred");
    $(".middleRow").addClass("isBlurred");
    $(".alertBottom").addClass("isBlurred");
  }

  removeBlur = () => {
    $(".navbar").removeClass("isBlurred");
    $(".topLeft").removeClass("isBlurred");
    $(".topRight").removeClass("isBlurred");
    $(".middleRow").removeClass("isBlurred");
    $(".alertBottom").removeClass("isBlurred");
  }

  gatherMessageValues = () => {
    let message = {
      messageDate: new Date(),
      messageTitle: this.state.messageTitle,
      messageBody: this.state.messageBody,
      userId: this.props.user.main.currentUser.id,
      groupId: this.props.user.main.currentUser.groupId
    }
    if (this.state.messageTitle !== "" && this.state.messageBody !== "") {
      apiData.newDataPost(message, "messages").then(() => {
        this.setState({ messageTitle: "", messageBody: "", goodToSave: false });
        this.props.user.refresh();
      })
    }
    else { this.messageDetails() }
  }

  messageDetails = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        $(".navbar").addClass("isBlurred");
        $(".topLeft").addClass("isBlurred");
        $(".topRight").addClass("isBlurred");
        $(".middleRow").addClass("isBlurred");
        $(".alertBottom").addClass("isBlurred");
        return (
          <div id="newMessage">
            <NewMessageModular props={this.props} handleChange={this.handleChange} state={this.state} />
            <section id="newButtonContainer">
              <button className="newCreateBtn" onClick={() => {
                $(".navbar").removeClass("isBlurred");
                $(".topLeft").removeClass("isBlurred");
                $(".topRight").removeClass("isBlurred");
                $(".middleRow").removeClass("isBlurred");
                $(".alertBottom").removeClass("isBlurred");
                onClose();
              }}>Back</button>
              <button className="newCreateBtn" onClick={() => {
                $(".navbar").removeClass("isBlurred");
                $(".topLeft").removeClass("isBlurred");
                $(".topRight").removeClass("isBlurred");
                $(".middleRow").removeClass("isBlurred");
                $(".alertBottom").removeClass("isBlurred");
                this.gatherMessageValues()
                onClose();
              }}>Save Message</button>
            </section>
          </div>
        )
      }
    })
  }

  gatherPhotoValues = () => {
    let image = {
      addedDate: new Date(),
      title: this.state.photoTitle,
      webAddress: this.state.webAddress,
      description: this.state.photoDescription,
      userId: this.props.user.main.currentUser.id,
      groupId: this.props.user.main.currentUser.groupId
    }
    if (this.state.title !== "" && this.state.webAddress !== "" && this.state.description !== "") {
      apiData.newDataPost(image, "photos").then(() => {
        this.setState({ webAddress: "", description: "", title: "", goodToSave: false });
        this.props.user.refresh();
      })
    }
    else { this.photoDetails() }
  }


  photoDetails = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        this.addBlur();
        return (
          <div id="newImage">
            <NewPhotoModular props={this.props} handleChange={this.handleChange} state={this.state} />
            <section id="newButtonContainer">
              <button className="newCreateBtn" onClick={() => {
                this.removeBlur();
                onClose();
              }}>Back</button>
              <button className="newCreateBtn" onClick={() => {
                this.removeBlur();
                this.gatherPhotoValues()
                onClose();
              }}>Save Photo</button>
            </section>
          </div>
        )
      }
    })
  }

  gatherEventValues = () => {
    let event = {
      addedDate: new Date(),
      start: this.state.eventStart,
      end: this.state.eventEnd,
      title: this.state.eventTitle,
      description: this.state.eventDescription,
      location: this.state.eventLocation,
      streetAdd: this.state.eventStreetAdd,
      city: this.state.eventCity,
      state: this.state.eventState,
      zip: this.state.eventZip,
      notes: this.state.eventNotes,
      allDay: this.state.eventDuration,
      userId: this.props.user.main.currentUser.id,
      groupId: this.props.user.main.currentUser.groupId
    }

    if (event.title !== "" && event.start !== "" && event.end !== "") {
      if (event.description === "") event.description = "No description provided.";
      if (event.location === "") event.location = "No location provided.";
      if (event.streetAdd === "") event.streetAdd = "No street address provided.";
      if (event.city === "") event.city = "No city provided.";
      if (event.state === "") event.state = "No state provided.";
      if (event.zip === "") event.zip = "No zip provided.";
      if (event.notes === "") event.notes = "No notes provided.";
      let TimeZone = jstz.determine();
      let TimeZoneName = TimeZone.name();
      let monthDate = event.start.split("T");
      monthDate = monthDate[0] + " " + monthDate[1];
      let tempValue = moment(monthDate).tz(TimeZoneName)
      tempValue = tempValue.utc().format()
      event.start = tempValue;
      monthDate = event.end.split("T");
      monthDate = monthDate[0] + " " + monthDate[1];
      tempValue = moment(monthDate).tz(TimeZoneName)
      tempValue = tempValue.utc().format()
      event.end = tempValue;
      apiData.newDataPost(event, "events").then(() => {
        this.setState({ eventStart: "", eventEnd: "", eventTitle: "", eventDescription: "", eventLocation: "", eventStreetAdd: "", eventCity: "", eventState: "", eventZip: "", eventNotes: "", eventDuration: false});
        this.props.user.refresh();
      })
    }
    else { this.eventDetails() }
  }

  eventDetails = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        this.addBlur();
        return (
          <div id="newEvent">
            <NewEventModular props={this.props} handleChange={this.handleChange} info={this.state} />
            <section id="newButtonContainer">
              <button className="newCreateBtn" onClick={() => {
                this.removeBlur();
                onClose();
              }}>Back</button>
              <button className="newCreateBtn" onClick={() => {
                this.removeBlur();
                this.gatherEventValues();
                onClose();
              }}>Save Event</button>
            </section>
          </div>
        )
      }
    })
  }

  render() {
    if (this.props.user.main.sendToGroup) {
      return <CreateNewGroup mainPage={this.props.user.stayAtMain} refresh={this.props.user.refresh} />;
    } else if (this.props.user.main.joinGroup) {
      return <JoinGroup mainPage={this.props.user.stayAtMain} joinGroup={this.props.user.main.joinGroup} refresh={this.props.user.refresh} />;
    } else if (this.props.user.main.profileLoaded) {
      if (!this.props.user.main.inGroup && !this.props.user.main.closeGroup) {
        return (
          <React.Fragment>
            <div className="topLeft">
              <p id="messageWindow">MESSAGES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.messageDetails} className="addIcon" />
              </p>
              <OldMessages messages={this.props.user.main.groupMessages} refresh={this.props.user.refresh} user={this.props.user.main.currentUser} />
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.eventDetails} className="addIcon" />
              </p>
              <Calendar events={this.props.user.main.groupEvents} refresh={this.props.user.refresh} user={this.props.user.main.currentUser}/>
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.photoDetails} className="addIcon" />
              </p>
              <OldPhotos photos={this.props.user.main.groupPhotos} refresh={this.props.user.refresh} user={this.props.user.main.currentUser} />
            </div>
            <div className="alertBottom">
              <article id="noGroupAlert">
                <h1 className="mainTitle">Welcome {this.props.user.main.currentUser.firstName}!</h1>
                <div id="groupOptions">
                  <section>
                    <h2 className="subTitle">You are not in any groups currently.</h2>
                    <h3 className="subTitle">Would you like to create or join a group?</h3>
                  </section>
                  <article id="alertNavButtonContainer">
                    <button value="noGroup" onClick={this.props.user.closeGroupMessage} className="alertNavButton">Not Now</button>
                    <button value="joinGroup" onClick={this.props.user.joinGroup} className="alertNavButton">Join</button>
                    <button value="createGroup" onClick={this.props.user.createJoinGroup} className="alertNavButton">Create</button>
                  </article>
                </div>
              </article>
            </div>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <div className="topLeft">
              <p id="messageWindow">MESSAGES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.messageDetails} className="addIcon" />
              </p>
              <OldMessages messages={this.props.user.main.groupMessages} refresh={this.props.user.refresh} user={this.props.user.main.currentUser} />
            </div>
            <div className="topRight">
              <p id="messageWindow">CALENDAR
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.eventDetails} className="addIcon" />
              </p>
              <Calendar events={this.props.user.main.groupEvents} refresh={this.props.user.refresh} user={this.props.user.main.currentUser} />
            </div>
            <div className="middleRow">
              <p id="messageWindow">PICTURES
              <img src="../../../addIconImage.png" alt="Add Item" onClick={this.photoDetails} className="addIcon" />
              </p>
              <section id="photoSection">
                <OldPhotos photos={this.props.user.main.groupPhotos} refresh={this.props.user.refresh} user={this.props.user.main.currentUser} />
              </section>
            </div>
            <div className="alertBottom">
              <article id="noGroupAlert">
                <h1>This is where info on events for this group since last login will appear.</h1>
              </article>
            </div>
          </React.Fragment>
        )
      }
    } else {
      return (
        <React.Fragment>
          <div className="topLeft">Test Area</div>
          <div className="topRight">Test</div>
          <div className="middleRow">
            <h1 className="mainTitle">Welcome to Group Guru. We are loading your profile.</h1>
          </div>
          <div className="alertBottom">
            {this.noGroupAlert}
          </div>
        </React.Fragment>
      )
    }
  }
}