import React, { Component } from 'react';
import apiData from "../../../modules/APIcalls";
import "./OldMessages.css";
import $ from "jquery";
import { confirmAlert } from "react-confirm-alert";


export default class OldMessages extends Component {
  state = {
    messageBody: "",
    messageTitle: "",
    oldMessage: {}
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

  clearState = () => {
    this.setState({ messageBody: "", messageTitle: "", oldMessage: {} })
  }

  handleInputValue = (event) => {
    let thisMessageId = parseInt(sessionStorage.getItem("messageId"));
    this.props.messages.forEach(message => {
      if (message.id === thisMessageId) {
        this.setState({
          [event.target.id]: event.target.value,
          oldMessage: message
        });
      }
    })
  }

  saveMessage = () => {
    if (this.state.oldMessage !== null) {
      let editMessage = {
        messageBody: this.state.messageBody,
      }
      let alreadyEdited = this.state.messageTitle.includes("(edited)");
      if (alreadyEdited) {
        editMessage.messageTitle = this.state.messageTitle;
      } else {
        editMessage.messageTitle = this.state.messageTitle + "(edited)";
      }
      if (editMessage.messageTitle === "(edited)") {
        editMessage.messageTitle = this.state.oldMessage.messageTitle;
      }
      if (editMessage.messageBody === "") {
        editMessage.messageBody = this.state.oldMessage.messageBody;
      }
      apiData.updateItem("messages", this.state.oldMessage.id, editMessage)
      this.clearState();
      this.props.refresh();
      sessionStorage.removeItem("messageId");
    }
    else { sessionStorage.removeItem("messageId") }
  }

  deleteMessage = (messageId) => {
    apiData.deleteItem("messages", messageId)
      .then(() => this.props.refresh())
  }

  deleteConfirmation = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        let messageId = parseInt(sessionStorage.getItem("messageId"))
        return (
          <div className="deleteAlert">
            <img src="../../../groupGuruLogo.jpg" id="logoForLoginAlert" alt="Group Guru Logo" />
            <div id="deleteTextDiv">
              <h1 id="areYouSure">Are you sure?</h1>
              <p id="deleteFile">This will permanently delete this message.</p>
            </div>
            <div id="deleteBtnSection">
              <button className="deleteConfirmation" onClick={() => {
                this.clearBlur();
                this.clearState();
                sessionStorage.removeItem("messageId")
                onClose()
              }}>No, Keep Message</button>
              <button className="deleteConfirmation" onClick={() => {
                this.deleteMessage(messageId);
                this.clearState();
                this.clearBlur();
                sessionStorage.removeItem("messageId")
                onClose()
              }}>Yes, Delete It</button>
            </div>
          </div>
        )
      }
    })
  }

  showMessageOptions = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        this.addBlur();
        const messageTarget = parseInt(event.target.id);
        let thisMessage = {};
        this.props.messages.forEach(message => {
          if (message.id === messageTarget) {
            thisMessage = message;
            sessionStorage.setItem("messageId", message.id)
          }
        })
        return (
          <div className="messageAlert">
            <h1 id="messageEditTitle">Edit or Delete Message</h1>
            <div id="messageEditInputSection">
              <label htmlFor="messageTitleEdit" className="messageEditLabel">Message Title</label>
              <input className="messageTitleInput" name="messageTitleEdit" id="messageTitle" onChange={this.handleInputValue} defaultValue={thisMessage.messageTitle}></input>
              <label htmlFor="messageBodyEdit" className="messageEditLabel">Message Body</label>
              <textarea className="messageBodyInput" name="messageBodyEdit" id="messageBody" onChange={this.handleInputValue} defaultValue={thisMessage.messageBody}></textarea>
            </div>
            <div id="deleteBtnSection">
              <button className="deleteConfirmation" onClick={() => {
                this.clearBlur();
                this.clearState();
                sessionStorage.removeItem("messageId")
                onClose()
              }}>Go Back</button>
              <button className="deleteConfirmation" onClick={() => {
                this.clearBlur();
                this.saveMessage();
                onClose()
              }}>Save Changes</button>
              <button className="deleteConfirmation" onClick={() => {
                this.deleteConfirmation();
                onClose()
              }}>Delete Message</button>
            </div>
          </div>
        )
      }
    })
  }

  printMessages() {
    let moment = require('moment');
    if (this.props.messages.length > 1) {
      this.props.messages.sort(function (a, b) {
        return new Date(b.messageDate) - new Date(a.messageDate);
      });
    }
    return (this.props.messages.map(message => {
      if (message.user.username === this.props.user.username) {
        return <section className="indivMessageOwner" key={message.id}>
          <div className="oldMsgTitleOwner">
            <img src="../editIcon.png" id={message.id} className="hideShowBtn" onClick={this.showMessageOptions} alt="edit"></img>
            <p id="userInfo">{moment(`${message.messageDate}`).fromNow()} </p>
          </div>
          <input className={`messageTitleInput hide ${message.id}titleInput`} onChange={this.titleInputValue} defaultValue={message.messageTitle}></input>
          <p className={`oldMsgTitle ${message.id}text`}>{message.messageTitle}</p>
          <input className={`messageBodyInput hide ${message.id}bodyInput`} onChange={this.bodyInputValue} defaultValue={message.messageBody}></input>
          <p className={`oldMsgBody ${message.id}body`}>{message.messageBody}</p>
        </section>
      } else {
        return <section className="indivMessageOther" key={message.id}>
          <p className="oldMsgInfo">{message.user.username} - Last online {moment(`${message.user.lastLogin}`).fromNow()}</p>
          <p className="oldMsgInfo">(added {moment(`${message.messageDate}`).fromNow()})</p>
          <p className="oldMsgTitle">{message.messageTitle}</p>
          <p className="oldMsgBody">{message.messageBody}</p>
        </section>
      }
    }
    ))
  }


  render() {
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        $(".navbar").removeClass("isBlurred");
        $(".topLeft").removeClass("isBlurred");
        $(".topRight").removeClass("isBlurred");
        $(".middleRow").removeClass("isBlurred");
        $(".alertBottom").removeClass("isBlurred");
      }
    });
    return (
      <div id="oldMessages">
        <p id="endOfMessages" dangerouslySetInnerHTML={{ __html: '&bigstar;  Top of Messages  &bigstar;' }}></p>
        {this.printMessages()}
        <p id="endOfMessages" dangerouslySetInnerHTML={{ __html: '&bigstar;  End Of Messages  &bigstar;' }}></p>
      </div>
    )
  }

}