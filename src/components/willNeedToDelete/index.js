// import React, { Component } from 'react';
// // import "./NewUser.css";
// import CreateNewUser from "../newUserForm1/user/newUserCreate";
// import CreateNewGroup from "../newUserForm1/group/newGroupCreate";
// import ApplicationViews from '../ApplicationViews';

// export default class NewUser1 extends Component {
//   state = {
//     createNew: true,
//     groupStatus: "",
//     currentUser: {},
//     groupName: "",
//     groupDescription: "",
//     groupType: ""
//   }

//   setNewGroupValues = (data) => {
//     this.setState({
//       groupName: data.groupName,
//       groupDescription: data.groupDescription,
//       groupType: data.groupType,
//       groupStatus: "inGroup"
//     })
//   }

//   setStateInputValues = (newUser, data) => {
//     console.log("back to page call: ", newUser)
//     this.setState({
//         groupStatus: data,
//         currentUser: newUser
//       })
//   }

//   render() {
//     if (this.state.createNew === true && this.state.groupStatus === "") {
//       return (
//         <CreateNewUser loadLogin={this.props.backToLogin} groupStatus={this.setStateInputValues}/>
//       )
//     } else if (this.state.createNew === true && this.state.groupStatus === "new") {
//       return (
//         <CreateNewGroup currentUser={this.state.currentUser} save={this.setNewGroupValues}/>
//       )
//     } else {
//       return (
//         <div><p>We need to add call for pages.</p></div>
//       )
//     }
//   }
// }