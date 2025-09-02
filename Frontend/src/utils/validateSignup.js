export const validateSignupForm = (formData) => {
    let newError = {};
  
    if (!formData.fName.trim()) newError.fName = "First name is required";
    if (!formData.lName.trim()) newError.lName = "Last name is required";
    if (!formData.email.trim()) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Email is invalid";
    }


    if (!formData.password) {
      newError.password = "Password is required";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newError.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }
  
    return newError;
  };
  