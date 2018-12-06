import React, { Component } from 'react';

export default class NewEventModular extends Component {

  handleChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.props.handleChange(stateToChange);
  }

  alert = () => {
    return (
      <React.Fragment>
        <section className="eventInputContainer">
          <label className="newEventLabel" htmlFor="title">Title</label>
          <input className="newEventInput" type="text" required={true} defaultValue={this.props.info.eventTitle} onChange={this.handleChange} id="eventTitle" name="title" placeholder="Enter Event Title"></input>
        </section>
        <section className="dateSelectContainer">
          <section className="dateSelect">
            <label className="newEventLabel" htmlFor="start">Start</label>
            <input className="newEventDate" type="datetime-local" required={true} defaultValue={new Date()} onChange={this.handleChange} id="eventStart" name="start" min={new Date()} max="2023-12-31T00:00"></input>
          </section>
          <section className="dateSelect">
            <label className="newEventLabel" htmlFor="end">End</label>
            <input className="newEventDate" type="datetime-local" required={true} defaultValue={new Date().toString("yyyy-MM-dd")} onChange={this.handleChange} id="eventEnd" name="end" min={new Date()} max="2023-12-31T00:00"></input>
          </section>
        </section>
        <section className="eventDurationContainer">
          <label className="newEventLabel" htmlFor="duration">Will This Last All Day?</label>
          <select className="durationSelect" value={this.props.info.eventDuration} onChange={this.handleChange} id="eventDuration">
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </section>
        <section className="eventInputContainer">
          <label className="newEventLabel" htmlFor="description">Description</label>
          <input className="newEventInput" type="text" name="description" defaultValue={this.props.info.eventDescription} onChange={this.handleChange} id="eventDescription" placeholder="Enter Event Description"></input>
        </section>
        <section className="eventInputContainer">
          <label className="newEventLabel" htmlFor="location">Location of Event</label>
          <input className="newEventInput" type="text" name="location" defaultValue={this.props.info.eventLocation} onChange={this.handleChange} id="eventLocation" placeholder="Enter Event Location"></input>
        </section>
        <section className="addressInputContainer">
          <label className="newEventLabel" htmlFor="streetAdd">Street Address</label>
          <input className="newEventInput" type="text" name="streetAdd" defaultValue={this.props.info.eventStreetAdd} onChange={this.handleChange} id="eventStreetAdd" placeholder="Enter Street Address for Event"></input>
          <article className="addressDetails">
            <input className="newEventCity" type="text" name="city" defaultValue={this.props.info.eventCity} onChange={this.handleChange} id="eventCity" placeholder="Enter City"></input>
            <input className="newEventState" type="text" name="state" defaultValue={this.props.info.eventState} onChange={this.handleChange} id="eventState" placeholder="State"></input>
            <input className="newEventZip" type="text" name="zip" defaultValue={this.props.info.eventZip} onChange={this.handleChange} id="eventZip" placeholder="Zip Code"></input>
          </article>
        </section>
        <section className="eventInputContainer">
          <label className="newEventLabel" htmlFor="notes">Notes/Comments</label>
          <textarea className="newEventTextarea" type="text" name="notes" defaultValue={this.props.info.eventNotes} onChange={this.handleChange} id="eventNotes" placeholder="Enter Any Additional Details"></textarea>
        </section>
      </React.Fragment>
    )
  }

  render() {
    console.log("NewEventModular: ", this.props)
    return (
      <React.Fragment>
        {this.alert()}
      </React.Fragment>
    )
  }
}