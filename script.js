//State management
const UserData = {
    users: [
      { name: "Shou-San Liao", mobile: "123456789", email: "sam@gmail.com" },
    ],
  
    addUser: function (data) {
      if (data) {
        this.users.push(data);
      }
    },
    removeAUser: function (data) {
      this.users = this.users.filter((user) => {
        return !equalsUser(user, data)
      });
    },
    getUsers: function () {
      return this.users;
    },
    setUser: function (users) {
      this.users = users;
    },
  };
  
  //View model element
  const ViewModel = (() => {
    const inputList = document.querySelectorAll("[data-content]");
    const btn_contact = document.getElementById("submit");
    const error = document.getElementById("error");
    const displayData = document.querySelector("tbody");
    
    return {
      inputList,
      error,
      displayData,
      btn_contact,
    };
  })();
  
  //Rendering function
  const render = (() => {
    const data = (data = UserData.getUsers()) => {
      let htmlBody = "";
      data.forEach((each) => {
        htmlBody += ` <tr title="Click to remove this person!">
              <td id="name">${each.name}</td>
              <td id="mobile">${each.mobile}</td>
              <td id="email">${each.email}</td>
            </tr>`;
      });
      ViewModel.displayData.innerHTML = htmlBody;
    };
  
    return { data };
  })();
  
  //Control actions
  const controller = (() => {
    const onAddContact = () => {
      const data = {};
      ViewModel.inputList.forEach((each) => {
        data[each.id] = each.value;
      });
  
      //Check if the input is valid.
  
      //If error do this
      
      if (utils.isInputValid(data)) {
        ViewModel.error.style.display = "none"
          //Add
        UserData.addUser(data);
        //Clear input
        ViewModel.inputList.forEach((each) => {
          each.value = "";
        });
        
  
        //Re-render element
        render.data();
        return;
      } else {
        ViewModel.error.style.display = "block"
        
      }
      
    };
  
    const init = () => {
      //Setup event click on add
      ViewModel.btn_contact.addEventListener("click", onAddContact);
  
      //First render
      render.data();
    };
  
    return { init };
  })();
  
  //Utils for validate data
  const utils = (() => {
    const isValidName = (name) => {
      const regex = /^[a-zA-Z\s]*$/;
      if (name.length > 20 || !regex.test(name)) {
          // If the string's length is less than 20 or contains anything other than alphabet or space, return false
        return false;
      }
      return true;
    };
    const isValidMobile = (mobile) => {
      const regex = /^[0-9]*$/;
      if (mobile.length !== 10 || !regex.test(mobile)) {
        // If the string's length is not 10 or contains anything other than numbers, return false
        return false;
      }
      return true;
    };
    const isValidEmail = (email) => {
      const regex = /@/;
          if (email.length > 40 || !regex.test(email)) {
            // If the email's length > 40 or does not contain an @ symbol, return false
            return false;
          }
          return true;
    };
  
    const isInputValid = (input) => {
      return isValidEmail(input.email) && 
      isValidMobile(input.mobile) && 
      isValidName(input.name)
    };

    const equalsUser = (u1, u2) => {
        return JSON.stringify(u1) !== JSON.stringify(u2);
    }
  
    
    return {
      isInputValid,
    };
  })();
  
  //Initilize.
  controller.init();
  
  //Set this on/off to access the state from browser for bug checking.
  window.UserData = UserData;
  