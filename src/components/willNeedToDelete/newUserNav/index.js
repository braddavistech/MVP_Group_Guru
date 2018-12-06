// import React, { Component } from 'react';
// import "./newUserNav.css";
// import NewUser1 from "../newUserForm1";
// import NewUser2 from "../newUserForm2";


// export default class NewUserNav extends Component {
//   state = {
//     landingPage: true,
//     newUser: false,
//     currentUser: false,
//     currentPage: 1
//   }

//   nextPage = () => {
//     let tempNumber = this.state.currentPage + 1;
//     this.setState({
//       currentPage: tempNumber
//     })
//   }

//   render () {
//     if (this.state.currentPage === 1) {
//       return (
//         <React.Fragment>
//           <NewUser1 previous={this.props.backToLogin} />
//         </React.Fragment>
//       )
//     } else if (this.state.currentPage === 2) {
//       return (
//         <React.Fragment>
//           <NewUser2 save2={this.props.save2} previous={this.previousPage} next={this.nextPage} />
//         </React.Fragment>
//       )
//     }
//   }
// }