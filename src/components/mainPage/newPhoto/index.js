// import React, { Component } from 'react';
// // import React from 'react':
// // import ApplicationViews from "../../ApplicationViews"
// import apiData from "../../../modules/APIcalls";
// import { confirmAlert } from "react-confirm-alert";
// import $ from "jquery";
// import "./NewPhoto.css";

// export default class NewImage extends Component {
//   state = {
//     webAddress: "",
//     description: "",
//     title: "",
//     goodToSave: false
//   }

//   gatherInputValues = () => {
//     let image = {
//       addedDate: new Date(),
//       title: this.state.title,
//       webAddress: this.state.webAddress,
//       description: this.state.description,
//       userId: this.props.user.main.currentUser.id,
//       groupId: this.props.user.main.currentUser.groupId
//     }
//     apiData.newDataPost(image, "photos").then(() => {
//       this.setState({ webAddress: "", description: "", title: "", goodToSave: false });
//       this.props.refresh();
//       this.title.value = "";
//       this.imageBody.value = "";
//     })
//   }

//   handleChange = (event) => {
//     const stateToChange = {}
//     stateToChange[event.target.id] = event.target.value
//     this.setState(stateToChange)
//   }

//   photoDetails = () => {
//     confirmAlert({
//       customUI: ({ onClose }) => {
//         $("#root").addClass("isBlurred");
//         // $(".navbar").addClass("isBlurred");
//         // $(".topLeft").addClass("isBlurred");
//         // $(".topRight").addClass("isBlurred");
//         // $(".middleRow").addClass("isBlurred");
//         // $(".alertBottom").addClass("isBlurred");
//         const top = () => {
//           return (
//             <React.Fragment>
//               <article className="alertSection"><p id="imageTitleAlert" className="alert hide">You must enter an image title.</p></article>
//               <section className="imageInputContainer">
//                 <label className="newImageLabel" htmlFor="newImageTitle">Title</label>
//                 <input type="text" required={true} onChange={this.handleChange} id="title" name="imageTitle" placeholder="Enter Message Title"></input>
//               </section>
//               <article className="alertSection"><p id="imageBodyAlert" className="alert hide">You must enter a message to create it.</p></article>
//               <section className="imageBodyInputContainer">
//                 <label className="newImageLabel" htmlFor="newImageBody">Image URL</label>
//                 <input type="text" name="newImageBody" onChange={this.handleChange} id="webAddress" placeholder="Enter The Address Of The Image"></input>
//               </section>
//               <section className="imageBodyInputContainer">
//                 <label className="newImageLabel" htmlFor="newImageDescription">Description</label>
//                 <input type="text" name="newImageDescription" onChange={this.handleChange} id="description" placeholder="Enter A Description Of The Image"></input>
//               </section>
//             </React.Fragment>
//           )
//         }
//         const bottom = () => {
//           if (this.state.goodToSave) {
//             return (<section id="newImageButtonContainer">
//               <button className="photoConfirmation" onClick={() => {
//                 $("#root").removeClass("isBlurred");
//                 onClose()
//               }}>Back</button>
//               <button id="newImageCreateBtn" onClick={() => {
//                 $("#root").removeClass("isBlurred");
//                 this.gatherInputValues()
//                 onClose()
//               }}>Add Photo</button>
//             </section>
//             )
//           } else {
//             return (<section id="newImageButtonContainer">
//               <button className="photoConfirmation" onClick={() => {
//                 $("#root").removeClass("isBlurred");
//                 onClose()
//               }}>Back</button>
//             </section>
//             )
//           }
//         }
//         return <div id="newImage">{top}{bottom}</div>
//       }
//     })
//   }

//   render() {
//     console.log("indside new photo")
//     return (
//       <React.Fragment>
//        {this.photoDetails}
//       </React.Fragment>
//     )
//   }

// }