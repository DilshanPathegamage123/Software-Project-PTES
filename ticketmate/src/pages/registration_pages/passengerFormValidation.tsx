// import * as yup from 'yup';


// export const passengerFormValidation = yup.object().shape({
//     FirstName:yup.string().min(3).max(50).required('Name is required*'),
//     LastName:yup.string().min(3).max(50).required('Name is required*'),
//     NIC:yup.string().length(12).required('NIC is required*'),
//     Email:yup.string().email("Please Enter valid email").required('Email is required*'),
//     ContactNumber:yup.string().length(10).required('Contact number is required*'),
//     UserName:yup.string().min(5).required('User Name is required*'),
//     Password:yup.string().min(8).required('Password is required*'),
//     ConfirmPassword:yup.string().oneOf([yup.ref('Password')], 'Passwords must match')


// })


import * as yup from 'yup';

export const passengerFormValidation = yup.object().shape({
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
    .max(30, 'Last Name cannot exceed 50 characters')
    .required('Last Name is required*'),
  
  NIC: yup
    .string()
    .matches(/^[0-9]{12}$/, 'NIC must be exactly 12 numeric characters')
    .required('NIC is required*'),
  
  Email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required*'),
  
  ContactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact Number must be exactly 10 numeric characters')
    .required('Contact Number is required*')
    .max(10),
  
  UserName: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, 'User Name can only contain alphabets and numbers')
    .min(5, 'User Name must be at least 5 characters long')
    .max(20,'userame cannot exceed 20 characters')
    .required('User Name is required*'),
  
  Password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required*'),
  
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password')], 'Passwords must match')
    .required('Confirm Password is required*')
});
