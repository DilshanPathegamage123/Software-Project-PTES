// import * as yup from 'yup';

// export const ownerFormValidation = yup.object().shape({
//     firstName:yup.string().min(3).max(50).required('Name is required*'),
//     lastName:yup.string().min(3).max(50).required('Name is required*'),
//     nic:yup.string().length(12).required('NIC is required*'),
//     email:yup.string().email("Please Enter valid email").required('Email is required*'),
//     contactNumber:yup.string().length(10).required('Contact number is required*'),
//     userName:yup.string().min(5).required('User Name is required*'),
//     password:yup.string().min(8).required('Password is required*'),
//     confirmPassword:yup.string().oneOf([yup.ref('password')], 'Passwords must match')
// })


import * as yup from 'yup';

export const ownerFormValidation = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'First Name can only contain alphabets')
    .min(3, 'First Name must be at least 3 characters long')
    .max(30, 'First Name cannot exceed 30 characters')
    .required('First Name is required*'),

  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Last Name can only contain alphabets')
    .min(3, 'Last Name must be at least 3 characters long')
    .max(30, 'Last Name cannot exceed 30 characters')
    .required('Last Name is required*'),

  nic: yup
    .string()
    .matches(/^[0-9]{12}$/, 'NIC must be exactly 12 numeric characters')
    .required('NIC is required*'),

  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required*'),

  contactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact Number must be exactly 10 numeric characters')
    .required('Contact Number is required*'),

  userName: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, 'User Name can only contain alphabets and numbers')
    .min(5, 'User Name must be at least 5 characters long')
    .max(20,'userame cannot exceed 20 characters')
    .required('User Name is required*'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required*'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required*')
});
