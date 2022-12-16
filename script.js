function addContact() {
    const nameElement = document.getElementById("name");
    const mobileElement = document.getElementById("mobile");
    const emailElement = document.getElementById("email");
    const errorElement = document.getElementById("error");
    const name = nameElement.value;
    const mobile = mobileElement.value;
    const email = emailElement.value;
    // validate input
    // Name - only Alphabets and Space. <= 20 characters in length.
    // Mobile - Only Numbers. 10 characters in length
    // Email - proper validation (with @ ). < 40 characters in length

    if (validator.nameValidator(name) && 
    validator.mobileValidator(mobile) && 
    validator.emailValidator(email)) {
        

        nameElement.value = ''
        mobileElement.value = ''
        emailElement.value = ''
        errorElement.style.display = "none"
    } else {
        errorElement.style.display = "block"
    }
  }

  const validator =  {
        "nameValidator": (name) => {
            const regex = /^[a-zA-Z\s]*$/;
            if (name.length > 20 || !regex.test(name)) {
                // If the string's length is less than 20 or contains anything other than alphabet or space, return false
              return false;
            }
            return true;
        },
        "mobileValidator": (mobile) => {
            const regex = /^[0-9]*$/;
            if (mobile.length !== 10 || !regex.test(mobile)) {
              // If the string's length is not 10 or contains anything other than numbers, return false
              return false;
            }
            return true;
        },
        "emailValidator": (email) => {
            const regex = /@/;
            if (email.length > 40 || !regex.test(email)) {
              // If the email's length > 40 or does not contain an @ symbol, return false
              return false;
            }
            return true;
        }
    }