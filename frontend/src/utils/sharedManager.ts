import { SimpleForm } from '~/types/form';
import { validateForm } from './formCheck';

export const formValidator = async function (bodyJson: SimpleForm) {
  const formErrors = validateForm(bodyJson);

  if (formErrors.length > 0) {
    return new Response(JSON.stringify(formErrors), {
      status: 400,
      statusText: 'Bad Request: formErrors',
    });
  }
};
