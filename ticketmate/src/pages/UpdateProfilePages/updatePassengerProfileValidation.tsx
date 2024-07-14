// import * as yup from 'yup';


// export const updatePassengerProfileValidation = yup.object().shape({
//     FirstName:yup.string().min(3).required('Name is required*'),
//     LastName:yup.string().min(3).required('Name is required*'),

//     //NIC:yup.string().length(12).required('NIC is required*'),

//     Email:yup.string().email("Please Enter valid email").required('Email is required*'),
//     ContactNumber:yup.string().length(10).required('Contact number is required*'),
//     //UserName:yup.string().min(5).required('User Name is required*'),
//     //Password:yup.string().min(8).required('Password is required*'),
//     //ConfirmPassword:yup.string().oneOf([yup.ref('Password')], 'Passwords must match')


// })



import * as yup from 'yup';

export const updatePassengerProfileValidation = yup.object().shape({
  FirstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'First Name can only contain alphabets')
    .min(3, 'First Name must be at least 3 characters long')
    .max(30, 'First Name cannot exceed 30 characters')
    .required('First Name is required*'),

  LastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Last Name can only contain alphabets')
    .min(3, 'Last Name must be at least 3 characters long')
    .max(30, 'Last Name cannot exceed 30 characters')
    .required('Last Name is required*'),

  Email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required*'),

  ContactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact Number must be exactly 10 numeric characters')
    .required('Contact Number is required*'),
});
