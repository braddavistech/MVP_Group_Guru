import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login";
import About from "./about";
import MainPage from "./mainPage";
import CreateNewUser from "./createObjects/userAccountCreate";
import MoreInfoForm from "./createObjects/moreInfoForm";
import ExistingUserLogin from "./existingUserLogin";
import CreateNewGroup from "./createObjects/group";
import JoinGroup from "./joinGroup";
import AddressBook from "./addressBook";
import ForgotPassword from "./forgotPassword";
import CreatePassword from "./createPassword";


export default class ApplicationViews extends Component {

  render() {
      return (
        <React.Fragment>
          <Route exact path="/about" render={(props) => {
            return <About />
          }} />
          <Route exact path="/" render={(props) => {
            if (this.props.main.loggedIn) {
              return <MainPage user={this.props} />
            } else {
            return <Login refreshData={this.props.refresh}/>
            }
          }} />
          <Route exact path="/login" render={(props) => {
            return <ExistingUserLogin user={this.props}/>
          }} />
          <Route exact path="/forgotPassword" render={(props) => {
            return <ForgotPassword user={this.props}/>
          }} />
          <Route exact path="/createPassword" render={(props) => {
            return <CreatePassword user={this.props}/>
          }} />
          <Route exact path="/createGroup" render={(props) => {
            return <CreateNewGroup loggedIn={this.props.loggedIn} refresh={this.props.refresh}/>
          }} />
          <Route exact path="/joinGroup" render={(props) => {
            return <JoinGroup loggedIn={this.props.loggedIn} refresh={this.props.refresh} mainPage={this.props.stayAtMain}/>
          }} />
          <Route exact path="/newUser" render={(props) => {
            return <CreateNewUser loggedIn={this.props.loggedIn} refresh={this.props.refresh}/>
          }} />
          <Route exact path="/moreInfo" render={(props) => {
            return <MoreInfoForm refresh={this.props.refresh}/>
          }} />
          <Route exact path="/addressBook" render={(props) => {
            return <AddressBook user={this.props} />
          }} />
        </React.Fragment>
      )
    // }
  }


}