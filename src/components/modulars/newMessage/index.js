import React, { Component } from 'react';

export default class NewMessageModular extends Component {
  state = {
    messageBody: "",
    messageTitle: ""
  }

  componentDidMount () {
    this.setState(this.props.state)
  }

  handleChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
    this.props.handleChange(stateToChange);
  }

  alert = () => {
    return (
      <React.Fragment>
        <section className="messageInputContainer">
          <label className="newMessageLabel" htmlFor="newMessageTitle">Title</label>
          <input className="newMessageInput" type="text" required={true} defaultValue={this.state.messageTitle} onChange={this.handleChange} id="messageTitle" name="messageTitle" placeholder="Enter Message Title"></input>
        </section>
        <section className="messageInputContainer">
          <label className="newMessageLabel" htmlFor="newMessageBody">Message</label>
          <input className="newMessageInput" type="text" name="newMessageBody" defaultValue={this.state.messageBody} onChange={this.handleChange} id="messageBody" placeholder="Enter Your Message Here"></input>
        </section>
      </React.Fragment>
    )
  }

  render() {
    console.log("NewMessageModular: ", this.props)
    return (
      <React.Fragment>
        {this.alert()}
      </React.Fragment>
    )
  }
}