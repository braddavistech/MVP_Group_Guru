import React, { Component } from "react";
import BigCalendar from "react-big-calendar"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { confirmAlert } from "react-confirm-alert";
import $ from "jquery";
import jstz from "jstz";
import APIcalls from "../../../modules/APIcalls";

export default class Calendar extends Component {
  state = {
    localizer: BigCalendar.momentLocalizer(moment),
    message: null,
    messageLoaded: false,
    editProcess: false,
    title: "",
    start: "",
    end: "",
    description: "",
    location: "",
    streetAdd: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    allDay: {}
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

  messageNull = () => {
    this.setState({ message: null })
  }

  saveEventEdit = () => {
    let TimeZone = jstz.determine();
    let TimeZoneName = TimeZone.name();
    let monthDate = this.start.value.split("T");
    monthDate = monthDate[0] + " " + monthDate[1];
    let tempValue = moment(monthDate).tz(TimeZoneName)
    tempValue = tempValue.utc().format()
    let start = tempValue;
    monthDate = this.end.value.split("T");
    monthDate = monthDate[0] + " " + monthDate[1];
    tempValue = moment(monthDate).tz(TimeZoneName)
    tempValue = tempValue.utc().format()
    let end = tempValue;
    let eventUpdate = { id: this.state.message.id }
    if (this.title.value !== "") eventUpdate.title = this.title.value;
    if (this.start.value !== "") eventUpdate.start = start;
    if (this.end.value !== "") eventUpdate.end = end;
    if (this.description.value !== "") eventUpdate.description = this.description.value;
    if (this.location.value !== "") eventUpdate.location = this.location.value;
    if (this.streetAdd.value !== "") eventUpdate.streetAdd = this.streetAdd.value;
    if (this.city.value !== "") eventUpdate.city = this.city.value;
    if (this.stateInput.value !== "") eventUpdate.state = this.stateInput.value;
    if (this.state.zip !== "") eventUpdate.zip = this.state.zip;
    if (this.notes.value !== "") eventUpdate.notes = this.notes.value;
    if (this.allDay.value === "false") eventUpdate.allDay = false;
    if (this.allDay.value === "true") eventUpdate.allDay = true;
    APIcalls.updateItem("events", this.state.message.id, eventUpdate)
  }

  endEdit = () => {
    this.setState({ editProcess: false }, () => {
      this.props.refresh();
    })
  }

  editEvent = () => {
    if (this.state.editProcess === false) {
      this.setState({ editProcess: true })
      return (
        confirmAlert({
          customUI: ({ onClose }) => {
            let startTime = moment(this.state.message.start).format("YYYY-MM-DDTHH:mm").toString();
            let endTime = moment(this.state.message.end).format("YYYY-MM-DDTHH:mm").toString()
            return (
              <div className="eventEditDetailsAlert">
                <section className="eventInputContainer">
                  <label className="newEventLabel" htmlFor="title">Title</label>
                  <input className="newEventInput" type="text" required={true} defaultValue={this.state.message.title} ref={input => this.title = input} id="title" name="title" placeholder="Enter Event Title"></input>
                </section>
                <section className="dateSelectContainer">
                  <section className="dateSelect">
                    <label className="newEventLabel" htmlFor="start">Start</label>
                    <input className="newEventDate" type="datetime-local" required={true} defaultValue={startTime} ref={input => this.start = input} id="start" name="start" min={new Date()} max="2023-12-31T00:00"></input>
                  </section>
                  <section className="dateSelect">
                    <label className="newEventLabel" htmlFor="end">End</label>
                    <input className="newEventDate" type="datetime-local" required={true} defaultValue={endTime} ref={input => this.end = input} id="end" name="end" min={new Date()} max="2023-12-31T00:00"></input>
                  </section>
                </section>
                <section className="eventDurationContainer">
                  <label className="newEventLabel" htmlFor="duration">Will This Last All Day?</label>
                  <select className="durationSelect" defaultValue={this.state.message.allDay} ref={input => this.allDay = input} id="allDay">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </section>
                <section className="eventInputContainer">
                  <label className="newEventLabel" htmlFor="description">Description</label>
                  <input className="newEventInput" type="text" name="description" defaultValue={this.state.message.description} ref={input => this.description = input} id="description" placeholder="Enter Event Description"></input>
                </section>
                <section className="eventInputContainer">
                  <label className="newEventLabel" htmlFor="location">Location of Event</label>
                  <input className="newEventInput" type="text" name="location" defaultValue={this.state.message.location} ref={input => this.location = input} id="location" placeholder="Enter Event Location"></input>
                </section>
                <section className="addressInputContainer">
                  <label className="newEventLabel" htmlFor="streetAdd">Street Address</label>
                  <input className="newEventInput" type="text" name="streetAdd" defaultValue={this.state.message.streetAdd} ref={input => this.streetAdd = input} id="streetAdd" placeholder="Enter Street Address for Event"></input>
                  <article className="addressDetails">
                    <input className="newEventCity" type="text" name="city" defaultValue={this.state.message.city} ref={input => this.city = input} id="city" placeholder="Enter City"></input>
                    <input className="newEventState" type="text" name="state" defaultValue={this.state.message.state} ref={input => this.stateInput = input} id="state" placeholder="State"></input>
                    <input className="newEventZip" type="text" name="zip" defaultValue={this.state.message.zip} ref={input => this.zip = input} id="zip" placeholder="Zip Code"></input>
                  </article>
                </section>
                <section className="eventInputContainer">
                  <label className="newEventLabel" htmlFor="notes">Notes/Comments</label>
                  <textarea className="newEventTextarea" type="text" name="notes" defaultValue={this.state.message.notes} ref={input => this.notes = input} id="notes" placeholder="Enter Any Additional Details"></textarea>
                </section>
                <section id="newButtonContainer">
                  <button className="newCreateBtn" onClick={() => {
                    this.removeBlur();
                    this.messageNull();
                    this.setState({ editProcess: false })
                    onClose();
                  }}>Back</button>
                  <button className="newCreateBtn" onClick={() => {
                    this.saveEventEdit();
                    onClose();
                    this.messageNull();
                    this.removeBlur();
                    this.endEdit();
                  }}>Save</button>
                </section>
              </div>
            )
          }
        })
      )
    }
  }

  showDetails = () => {
    if (!this.state.editProcess) {
      return (
        confirmAlert({
          customUI: ({ onClose }) => {
            this.addBlur();
            if (this.state.message.userId === this.props.user.id) {
              return (
                <div className="eventDetailsAlert">
                  <p className="eventTitleDetails">{this.state.message.title}</p>
                  <p className="eventTitleDetails">{this.state.message.description}</p>
                  <p className="eventTitleDetails">Begins {moment(this.state.message.start, "d, MM-Do-YYYY hh:mm:ss.sss").format("dddd, MMMM Do, YYYY @ h:mm A")
                  }</p>
                  <p className="eventTitleDetails">Ends {moment(this.state.message.end, "d, MM-Do-YYYY hh:mm:ss.sss").format("dddd, MMMM Do, YYYY @ h:mm A")}</p>
                  <p className="eventTitleDetails">Details/Notes</p>
                  <p className="eventTitleDetails">{this.state.message.notes}</p>
                  <p className="eventTitleDetails">Location</p>
                  <p className="eventTitleDetails">{this.state.message.location}</p>
                  <p className="eventTitleDetails">{this.state.message.streetAdd}</p>
                  <p className="eventTitleDetails">{this.state.message.city}, {this.state.message.state} {this.state.message.zip}</p>
                  <section id="newButtonContainer">
                    <button className="newCreateBtn" onClick={() => {
                      this.removeBlur();
                      this.messageNull();
                      onClose();
                    }}>Back</button>
                    <button className="newCreateBtn" onClick={() => {
                      onClose();
                      this.editEvent();
                    }}>Edit</button>
                  </section>
                </div>
              )
            } else {
              return (
                <div className="eventDetailsAlert">
                  <p className="eventTitleDetails">{this.state.message.title}</p>
                  <p className="eventTitleDetails">{this.state.message.description}</p>
                  <p className="eventTitleDetails">Begins {moment(this.state.message.start, "d, MM-Do-YYYY hh:mm:ss.sss").format("dddd, MMMM Do, YYYY @ h:mm A")
                  }</p>
                  <p className="eventTitleDetails">Ends {moment(this.state.message.end, "d, MM-Do-YYYY hh:mm:ss.sss").format("dddd, MMMM Do, YYYY @ h:mm A")}</p>
                  <p className="eventTitleDetails">Details/Notes</p>
                  <p className="eventTitleDetails">{this.state.message.notes}</p>
                  <p className="eventTitleDetails">Location</p>
                  <p className="eventTitleDetails">{this.state.message.location}</p>
                  <p className="eventTitleDetails">{this.state.message.streetAdd}</p>
                  <p className="eventTitleDetails">{this.state.message.city}, {this.state.message.state} {this.state.message.zip}</p>
                  <section id="newButtonContainer">
                    <button className="newCreateBtn" onClick={() => {
                      this.removeBlur();
                      this.messageNull();
                      onClose();
                    }}>Back</button>
                  </section>
                </div>
              )
            }
          }
        })
      )
    }
  }

  eventDetails = (event) => {
    console.log("slot", event)
  }

  render() {
    if (this.state.message !== null) {
      this.showDetails()
      return (
        <React.Fragment>
          <BigCalendar id="smallCalendar" selectable onSelectSlot={(slot) => this.eventDetails(slot)} onSelectEvent={(event) => { this.setState({ message: event }) }} localizer={this.state.localizer} defaultView="agenda" events={this.props.events} startAccessor="start" endAccessor="end" />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <BigCalendar id="smallCalendar" selectable onSelectSlot={(slot) => this.eventDetails(slot)} onSelectEvent={(event) => { this.setState({ message: event }) }} localizer={this.state.localizer} defaultView="agenda" events={this.props.events} startAccessor="start" endAccessor="end" />
        </React.Fragment>
      )
    }
  }
}