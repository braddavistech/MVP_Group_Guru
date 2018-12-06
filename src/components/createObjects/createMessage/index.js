import React, { Component } from 'react';
import apiData from "../../../modules/APIcalls";
import $ from "jquery";
import "./CreateMessage.css";

export default class CreateMessage extends Component {

  gatherInputValues = () => {
    $(".alert").hide()
    let messageValidation = true;
    let message = {
      messageDate: new Date(),
      messageTitle: this.title.value,
      messageBody: this.messageBody.value,
      userId: this.props.user.main.currentUser.id,
      groupId: this.props.user.main.currentUser.groupId
    }
    if (message.messageTitle === "") {
      $("#msgTitleAlert").show();
      messageValidation = false;
    }
    if (message.messageBody === "") {
      $("#msgBodyAlert").show();
      messageValidation = false;
    }
    if (messageValidation) {
      apiData.newDataPost(message, "messages").then(() =>
      this.props.refresh())
      this.title.value = "";
      this.messageBody.value = "";
    }
  }

  render() {

    return (
      <React.Fragment>
        <div id="newMessage">
          <article className="alertSection"><p id="msgTitleAlert" className="alert hide">You must enter a message title.</p></article>
          <section className="messageInputContainer">
            <label className="newMsgLabel" htmlFor="newMsgTitle">Title</label>
            <input type="text" required={true} id="newTitle" name="msgTitle" ref={(userInput) => this.title =
              userInput} placeholder="Enter Message Title"></input>
            <section id="newMessageButtonContainer">
              <button onClick={this.gatherInputValues} id="newMsgCreateBtn">Create Message</button>
            </section>
          </section>
          <article className="alertSection"><p id="msgBodyAlert" className="alert hide">You must enter a message to create it.</p></article>
          <section className="messageBodyInputContainer">
            <label className="newMsgLabel" htmlFor="newMsgBody">Message Body</label>
            <textarea name="newMsgBody" ref={(userInput) => this.messageBody =
              userInput} id="msgBody" placeholder="Enter Your New Message Here"></textarea>
          </section>
        </div>
      </React.Fragment>
    )
  }

}