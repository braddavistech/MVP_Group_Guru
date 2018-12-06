// import React, { Component } from 'react';
// // import moment from "moment-timezone";
// import { confirmAlert } from "react-confirm-alert";
// // import $ from "jquery";

// export default class EventDetails extends Component {
//   state = {
//     message: {}
//   }

//   componentDidMount = () => {
//     this.setState({ message: this.props.event })
//   }

//   printDetails() {
//     confirmAlert({
//       customUI: ({ onClose }) => {
//         this.addBlur();
//         return (
//           <React.Fragment>
//             <p className="eventTitleDetails">Event</p>
//             <p className="eventTitleDetails">{this.props.event.title}</p>
//             <p className="eventTitleDetails">Begins</p>
//             <p className="eventTitleDetails">{this.props.event.start}</p>
//             <p className="eventTitleDetails">Ends</p>
//             <p className="eventTitleDetails">{this.props.event.end}</p>
//             <p className="eventTitleDetails">Description</p>
//             <p className="eventTitleDetails">{this.props.event.description}</p>
//             <p className="eventTitleDetails">Details/Notes</p>
//             <p className="eventTitleDetails">{this.props.event.notes}</p>
//             <p className="eventTitleDetails">Location</p>
//             <p className="eventTitleDetails">{this.props.event.location}</p>
//             <p className="eventTitleDetails">{this.props.event.streetAdd}</p>
//             <p className="eventTitleDetails">{this.props.event.city}, {this.props.event.state} {this.props.event.zip}</p>
//             <section id="newButtonContainer">
//               <button className="newCreateBtn" onClick={() => {
//                 this.removeBlur();
//                 this.messageNull();
//                 onClose();
//               }}>Back</button>
//             </section>
//           </React.Fragment>
//         )
//       }
//     })
//   }

//   render() {
//     console.log("message", this.state.message)
//     console.log("propsMessage", this.props.event)

//       return(
//       <React.Fragment>
//       {this.printDetails}
//       </React.Fragment >
//     )
//   }
// }