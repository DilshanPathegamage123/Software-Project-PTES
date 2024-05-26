import * as yup from 'yup';

export const ownerFormValidation = yup.object().shape({
    firstName:yup.string().min(3).required('Name is required*'),
    lastName:yup.string().min(3).required('Name is required*'),
    nic:yup.string().length(12).required('NIC is required*'),
    email:yup.string().email("Please Enter valid email").required('Email is required*'),
    contactNumber:yup.string().length(10).required('Contact number is required*'),
    userName:yup.string().min(5).required('User Name is required*'),
    password:yup.string().min(8).required('Password is required*'),
    confirmPassword:yup.string().oneOf([yup.ref('password')], 'Passwords must match')
})