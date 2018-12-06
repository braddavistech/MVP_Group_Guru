import React, { Component } from 'react';
import "./OldPhotos.css";
import { confirmAlert } from "react-confirm-alert";
import apiData from "../../../modules/APIcalls";
import moment from "moment";
import $ from "jquery"


export default class OldPhotos extends Component {
  state = {
    photoTitle: "",
    photoDescription: "",
    oldPhoto: null
  }

  clearState = () => {
    this.setState({ photoTitle: "", photoDescription: "", oldPhoto: null })
  }

  addBlur = () => {
    $(".navbar").addClass("isBlurred");
    $(".topLeft").addClass("isBlurred");
    $(".topRight").addClass("isBlurred");
    $(".middleRow").addClass("isBlurred");
    $(".alertBottom").addClass("isBlurred");
  }

  clearBlur = () => {
    $(".navbar").removeClass("isBlurred");
    $(".topLeft").removeClass("isBlurred");
    $(".topRight").removeClass("isBlurred");
    $(".middleRow").removeClass("isBlurred");
    $(".alertBottom").removeClass("isBlurred");
  }

  handleChange = (event) => {
    let thisPhotoId = parseInt(sessionStorage.getItem("photoId"));
    this.props.photos.forEach(photo => {
      if (photo.id === thisPhotoId) {
        this.setState({
          [event.target.id]: event.target.value,
          oldPhoto: photo
        });
      }
    })
  }

  deletePhoto = (photoId) => {
    apiData.deleteItem("photos", photoId)
      .then(() => this.props.refresh())
  }

  deleteConfirmation = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        let photoId = parseInt(sessionStorage.getItem("photoId"))
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
              }}>No, Keep Photo</button>
              <button className="deleteConfirmation" onClick={() => {
                this.deletePhoto(photoId);
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

  saveImageEdit = () => {
    if (this.state.oldPhoto !== null) {
      let editPhoto = {
        title: this.state.photoTitle,
        description: this.state.photoDescription
      }
      if (editPhoto.title=== "") {
        editPhoto.title = this.state.oldPhoto.title;
      }
      if (editPhoto.description === "") {
        editPhoto.description = this.state.oldPhoto.description;
      }
      console.log("should save")
      apiData.updateItem("photos", this.state.oldPhoto.id, editPhoto)
      this.clearState();
      this.props.refresh();
      sessionStorage.removeItem("photoId");
    }
  }

  photoDetails = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        this.addBlur();
        const photoTarget = parseInt(event.target.id);
        let oldPhoto = this.props.photos.find(e => e.id === photoTarget);
        return (
          <div className="photoDetails">
            <div id="photoTitleTextDiv">
              <p id="photoDetailsHeader">{oldPhoto.title}</p>
              <img id="photoDetailsImage" src={oldPhoto.webAddress} alt={oldPhoto.title}></img>
              <p className="photoTextDescription">{oldPhoto.description}</p>
            </div>
            <div id="photoBtnSection">
              <button className="photoConfirmation" onClick={() => {
                this.clearBlur();
                onClose()
              }}>Back</button>
              <button className="photoConfirmation" onClick={() => {
                this.clearBlur();
                onClose()
              }}><a id="mailToPhoto" href={'mailto:' + oldPhoto.user.email} target="_top">Send Email to {oldPhoto.user.username}</a></button>
            </div>
            <section id="tagLine">
              <p className="photoTextDetails">Added by {oldPhoto.user.username} on {moment(`${oldPhoto.addedDate}`).fromNow()}</p>
            </section>
          </div>
        )
      }
    })
  }

  photoDetailsEdit = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        this.addBlur();
        // let thisPhoto = {};
        // const photoTarget = parseInt(event.target.id);
        // this.props.photos.forEach(photo => {
        //   if (photo.id === photoTarget) {
        //     thisPhoto = photo;
        //     sessionStorage.setItem("photoId", thisPhoto.id)
        //   }
        // })
        const photoTarget = parseInt(event.target.id);
        let oldPhoto = this.props.photos.find(e => e.id === photoTarget);
        sessionStorage.setItem("photoId", oldPhoto.id)
        return (
          <div className="photoDetails">
            <img id="photoDetailsImage" src={oldPhoto.webAddress} alt="Preview of File" />
            <section className="imageInputContainer">
              <label className="newImageLabel" htmlFor="newImageTitle">Title</label>
              <input className="newImageInput" type="text" required={true} defaultValue={oldPhoto.title} onChange={this.handleChange} id="photoTitle" name="imageTitle" ></input>
            </section>
            <section className="imageInputContainer">
              <label className="newImageLabel" htmlFor="newImageDescription">Description</label>
              <input className="newImageInput" type="text" name="newImageDescription" defaultValue={oldPhoto.description} onChange={this.handleChange} id="photoDescription" ></input>
            </section>
            <div id="photoBtnSection">
              <button className="photoConfirmation" onClick={() => {
                this.clearBlur();
                onClose();
              }}>Back</button>
              <button className="photoConfirmation" onClick={() => {
                this.clearBlur();
                this.saveImageEdit();
                onClose();
              }}>Save</button>
              <button className="photoConfirmation" onClick={() => {
                this.clearBlur();
                onClose();
              }}>Delete</button>
            </div>
          </div>
        )
      }
    })
  }

  printPhotos = () => {
    if (this.props.photos.length > 1) {
      this.props.photos.sort(function (a, b) {
        return new Date(b.addedDate) - new Date(a.addedDate);
      });
    }
    return (this.props.photos.map(photo => {
      if (photo.userId === this.props.user.id) {
        return <section className="indivPhotos" key={photo.id}>
          <p className="oldPhotosTitle">{photo.user.username} - {moment(`${photo.addedDate}`).fromNow()}</p>
          <article className="photoSectionWithZoom">
            <img className="oldPhotosImage" src={photo.webAddress} alt={photo.title}></img>
            <img className="zoomBtn" value={photo.id} id={photo.id} onClick={this.photoDetails} src="../../zoomIcon.png" alt="Zoom In"></img>
            <img className="editPhotoBtn" src="../editIcon.png" id={photo.id} onClick={this.photoDetailsEdit} alt="edit"></img>
          </article>
        </section>
      } else {
        return <section className="indivPhotos" key={photo.id}>
          <p className="oldPhotosTitle">{photo.user.username} - {moment(`${photo.addedDate}`).fromNow()}</p>
          <article className="photoSectionWithZoom">
            <img className="oldPhotosImage" src={photo.webAddress} alt={photo.title}></img>
            <img className="zoomBtn" value={photo.id} id={photo.id} onClick={this.photoDetails} src="../../zoomIcon.png" alt="Zoom In"></img>
          </article>
        </section>
      }
    }))
  }

  render() {
    return (
      <div id="oldPhotos">
        {this.printPhotos()}
      </div>
    )
  }

}