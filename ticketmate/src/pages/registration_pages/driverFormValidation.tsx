// import * as Yup from 'yup';

// export const driverFormValidation = Yup.object().shape({
//     firstName:Yup.string().min(3).max(50).required('Name is required*'),
//     lastName:Yup.string().min(3).max(50).required('Name is required*'),
//     nic:Yup.string().length(12).required('NIC is required*'),
//     email:Yup.string().email("Please Enter valid email").required('Email is required*'),
//     contactNumber:Yup.string().length(10).required('Contact number is required*'),
//     userName:Yup.string().min(5).required('User Name is required*'),
//     password:Yup.string().min(8).required('Password is required*'),
//     confirmPassword:Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
//     licenceNumber:Yup.string().min(12).required('Licence Number is required*'),
// });


import * as Yup from 'yup';

export const driverFormValidation = Yup.object().shape({
  firstName: Yup
    .string()
    .matches(/^[A-Za-z]+$/, 'First Name can only contain alphabets')
    .min(3, 'First Name must be at least 3 characters long')
    .max(30, 'First Name cannot exceed 30 characters')
    .required('First Name is required*'),

  lastName: Yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Last Name can only contain alphabets')
    .min(3, 'Last Name must be at least 3 characters long')
    .max(30, 'Last Name cannot exceed 30 characters')
    .required('Last Name is required*'),

  nic: Yup
    .string()
    .matches(/^[0-9]{12}$/, 'NIC must be exactly 12 numeric characters')
    .required('NIC is required*'),

  email: Yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required*'),

  contactNumber: Yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact Number must be exactly 10 numeric characters')
    .required('Contact Number is required*'),

  userName: Yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, 'User Name can only contain alphabets and numbers')
    .min(5, 'User Name must be at least 5 characters long')
    .max(20,'username cannot exceed 20 characters')
    .required('User Name is required*'),

  password: Yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required*'),

  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required*'),

  licenceNumber: Yup
    .string()
    .min(12, 'Licence Number must be at least 12 characters long')
    .required('Licence Number is required*'),
});
