const registerValidate = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[a-zA-Z]{3,}$/; // Only letters and minimum 3 letters

  if (!formData.name.trim()) {
    errors.name = 'Name is required.';
  } else if (!nameRegex.test(formData.name.trim())) {
    errors.name = 'Name must contain only letters and be at least 3 characters long.';
  }

  if (!formData.email.trim() || !emailRegex.test(formData.email)) {
    errors.email = 'Valid email is required.';
  }

  if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
    errors.phone = 'Valid 10-digit phone number is required.';
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required.';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = 'Confirmation password is required.';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};

export { registerValidate };
