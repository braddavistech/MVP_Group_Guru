import React, { Component } from 'react';

export default class NewPhotoModular extends Component {
  state = {
    webAddress: "",
    description: "",
    title: ""
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
        <img id="newPhotoPreview" className="hide" src={this.state.webAddress} alt="Preview of File" />
        <section className="imageInputContainer">
          <label className="newImageLabel" htmlFor="newImageTitle">Title</label>
          <input className="newImageInput" type="text" required={true} defaultValue={this.state.title} onChange={this.handleChange} id="photoTitle" name="imageTitle" placeholder="Enter Message Title"></input>
        </section>
        <section className="imageInputContainer">
          <label className="newImageLabel" htmlFor="newImageBody">Image URL</label>
          <input className="newImageInput" type="text" name="newImageBody" defaultValue={this.state.webAddress} onChange={this.handleChange} id="webAddress" placeholder="Enter The Address Of The Image"></input>
        </section>
        <section className="imageInputContainer">
          <label className="newImageLabel" htmlFor="newImageDescription">Description</label>
          <input className="newImageInput" type="text" name="newImageDescription" defaultValue={this.state.description} onChange={this.handleChange} id="photoDescription" placeholder="Enter A Description Of The Image"></input>
        </section>
      </React.Fragment>
    )
  }

  alertWithPreview = () => {
    return (
      <React.Fragment>
        <img id="newPhotoPreview" src={this.state.webAddress} alt="Preview of File" />
        <section className="imageInputContainer">
          <label className="newImageLabel" htmlFor="newImageTitle">Title</label>
          <input className="newImageInput" type="text" required={true} defaultValue={this.state.title} onChange={this.handleChange} id="title" name="imageTitle" placeholder="Enter Message Title"></input>
        </section>
        <section className="imageInputContainer">
          <label className="newImageLabel" htmlFor="newImageBody">Image URL</label>
          <input className="newImageInput" type="text" name="newImageBody" defaultValue={this.state.webAddress} onChange={this.handleChange} id="webAddress" placeholder="Enter The Address Of The Image"></input>
        </section>
        <section className="imageInputContainer">
          <label className="newImageLabel" htmlFor="newImageDescription">Description</label>
          <input className="newImageInput" type="text" name="newImageDescription" defaultValue={this.state.description} onChange={this.handleChange} id="description" placeholder="Enter A Description Of The Image"></input>
        </section>
      </React.Fragment>
    )
  }

  render() {
    console.log("NewMessageModular: ", this.props)
    if (this.state.webAddress !== "") {
      return (
        <React.Fragment>
          {this.alertWithPreview()}
        </React.Fragment>
      )
    } else if (this.state.webAddress === "") {
      return (
        <React.Fragment>
          {this.alert()}
        </React.Fragment>
      )
    }
    // else {
    //   return (
    //     <React.Fragment>
    //       {this.alert()}
    //     </React.Fragment>
    //   )
    // }
  }
}