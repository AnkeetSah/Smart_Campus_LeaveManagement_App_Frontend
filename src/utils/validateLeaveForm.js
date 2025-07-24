const validateLeaveForm = (formData) => {
  const errors = {};

  if (!formData.fromDate) {
    errors.fromDate = "Start date is required";
  }

  if (!formData.toDate) {
    errors.toDate = "End date is required";
  }

  if (
    formData.fromDate &&
    formData.toDate &&
    new Date(formData.toDate) < new Date(formData.fromDate)
  ) {
    errors.toDate = "End date cannot be before start date";
  }

  if (!formData.reason) {
    errors.reason = "Reason is required";
  }

  if (!formData.emergencyContact) {
    errors.emergencyContact = "Emergency contact is required";
  }

  return errors;
};

export default validateLeaveForm;
