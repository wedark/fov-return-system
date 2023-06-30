import type { SimpleForm } from '../../types/simpleForm';

export function checkIfCompleted(form: SimpleForm) {
  const { actions } = form;

  const usedActions = Object.values(actions).filter(
    (action) => action.used === true,
  );

  if (usedActions.length === 0) return true;

  let completed = true;

  usedActions.forEach((action) => {
    if (!action.completed || !action.performedBy) completed = false;
  });

  return completed;
}

export interface ValidationError {
  referenceId: string;
  message: string;
}
// : true | ValidationError
export function validateForm(form: SimpleForm): ValidationError[] {
  const errors: ValidationError[] = [];

  const {
    customerNumber,
    customerDetails,
    // address,
    // items,
    // reasons,
    // agreements,
    // actions,
  } = form;

  // Check if customerNumber is valid
  if (!customerNumber || customerNumber < 1) {
    errors.push({
      referenceId: 'customerNumber',
      message: 'Customer number is invalid',
    });
  }

  // Check if customerDetails are valid
  Object.entries(customerDetails).forEach(([key, value]) => {
    // just check if not empty or 0
    if (!value) {
      errors.push({
        referenceId: `customerDetails.${key}`,
        message: 'Empty field',
      });
    }
  });

  return errors;
}
