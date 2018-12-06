// import React, { Component } from 'react';
// import "./NewUser2.css";

// export default class NewUser2 extends Component {
//   state = {
//     streetAdd: "Enter Your Street Address",
//     city: "Enter City",
//     stateId: "Enter State (TN, OH, etc)",
//     zip: "Enter Zip Code",
//     phone: "Enter Phone Number"
//   }

//   gatherInputValuesPage2 = () => {
//     let temp = {
//       streetAdd: this.streetAdd.value,
//       city: this.city.value,
//       stateId: this.stateId.value,
//       zip: this.zip.value,
//       phone: this.phone.value,
//       preferredContact: ""
//     }
//     this.props.save2(temp);
//   }

//   render() {
//     return (
//       <div id="newUserForm">
//         <section className="newUserInputSection">
//           <label htmlFor="streetAdd" className="newUserLabel">Address</label>
//           <input name="streetAdd" ref={(userInput) => this.streetAdd =
//             userInput} className="newUserInput" placeholder={this.state.streetAdd}></input>
//         </section>
//         <section className="newUserInputSection">
//           <label htmlFor="city" className="newUserLabel">City</label>
//           <input name="city" ref={(userInput) => this.city =
//             userInput} className="newUserInput" placeholder={this.state.city}></input>
//         </section>
//         <section className="newUserInputSection">
//           <label htmlFor="stateId" className="newUserLabel">State</label>
//           <input name="stateId" ref={(userInput) => this.stateId =
//             userInput} className="newUserInput" placeholder={this.state.stateId}></input>
//         </section>
//         <section className="newUserInputSection">
//           <label htmlFor="zip" className="newUserLabel">Zip</label>
//           <input name="zip" ref={(userInput) => this.zip =
//             userInput} className="newUserInput" placeholder={this.state.zip}></input>
//         </section>
//         <section className="newUserInputSection">
//           <label htmlFor="phone" className="newUserLabel">Phone</label>
//           <input name="phone" ref={(userInput) => this.phone =
//             userInput} className="newUserInput" placeholder={this.state.phone}></input>
//         </section>
//         <p id="alertPreference">Select Perferred Communication</p>
//         <section id="newUserGroupRadioSection">
//           <label htmlFor="preferredContact" className="newUserRadioLabel">Text
//           <input type="radio" name="preferredContact" className="newUserRadioBtn" value="phone" /></label>
//           <label htmlFor="groupStatus" className="newUserRadioLabel">Email
//           <input type="radio" name="preferredContact" className="newUserRadioBtn" value="email" /></label>
//           <label htmlFor="groupStatus" className="newUserRadioLabel">None
//           <input type="radio" name="preferredContact" className="newUserRadioBtn" value="none" /></label>
//         </section>
//         <section className="newUserDualButton">
//           <button onClick={this.props.previous} id="newUserBtn">Back</button>
//           <button onClick={this.gatherInputValuesPage2} id="newUserBtn">Continue</button>
//         </section>
//       </div>
//     )
//   }
// }
