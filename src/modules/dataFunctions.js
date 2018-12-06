export default Object.create(null, {

  emailAndUsernameValidation: {
    value: function (email) {
      return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
    }
  }

})
