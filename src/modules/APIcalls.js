// import Encryption from "crypto-js";
const dataURL = "http://0.0.0.0:8088/"
// const codeKey = "BradTest";

export default Object.create(null, {

  getData: {
    value: function (category) {
      return fetch(`${dataURL}${category}`)
        .then(user => user.json())
        .then(data => {
          let promises = []
          data.forEach(user => {
            promises.push(user)
          })
          return Promise.all(promises);
        })
        .then(data => {
          return data;
        })
    }
  },

  getSingleType: {
    value: function (category, search) {
      return fetch(`${dataURL}${category}/?${search}`)
        .then(user => user.json())
        .then(data => {
          return data;
        })
    }
  },

  newDataPost: {
    value: function (data, category) {
      // console.log("dataBefore: ", data);
      // let cipherData = Encryption.AES.encrypt(JSON.stringify(data), codeKey).toString();
      // console.log("encodedData: ", cipherData)
      // let cipherToString = Encryption.AES.decrypt(cipherData.toString(), codeKey);
      // let decryptedObject = JSON.parse(cipherToString.toString(Encryption.enc.Utf8));
      // console.log("decryptedData: ", decryptedObject);
      return fetch(`${dataURL}${category}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(response => response.json());
    }
  },

  updateItem: {
    value: function (category, id, data) {
      return fetch(`${dataURL}${category}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    }
  },

  deleteItem: {
    value: function (category, id) {
      return fetch(`${dataURL}${category}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  }

})