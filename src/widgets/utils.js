export const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const STATUS_TO_TEXT = {
    IN_PROGRESS: ['yellow', "PENDING"],
    APPROVE: ['blue', "BOOTH ASSIGNED"],
    REJECTED: ['red', "REJECTED"],
    PAYMENT_REQUEST: ['blue', 'REQUEST PAYMENT'],
    FINALIZED: ['green', 'FINALIZED']
  }