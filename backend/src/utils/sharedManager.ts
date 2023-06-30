import { BadRequestException } from '@nestjs/common';
import { SimpleForm } from '../../types/simpleForm';
import { validateForm } from './formCheck';

export const formValidator = async function (bodyJson: SimpleForm) {
  const formErrors = validateForm(bodyJson);

  if (formErrors.length > 0) {
    throw new BadRequestException(formErrors);
  }
};
