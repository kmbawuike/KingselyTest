import * as Yup from 'yup';

export const addUserValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name should be 11 characters')
    .required('Name is required'),
  agreedToTerms: Yup.bool().oneOf(
    [true],
    'You need to accept the terms and conditions'
  ),
  sectors: Yup.array().min(1, 'Select at least one sector'),
});

export const addSectorValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name should be 11 characters')
    .required('Name is required'),
});