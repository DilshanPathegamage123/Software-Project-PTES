import * as Yup from 'yup';

export const driverFormValidation = Yup.object().shape({
    firstName:Yup.string().min(3).required('Name is required*'),
    lastName:Yup.string().min(3).required('Name is required*'),
    nic:Yup.string().length(12).required('NIC is required*'),
    email:Yup.string().email("Please Enter valid email").required('Email is required*'),
    contactNumber:Yup.string().length(10).required('Contact number is required*'),
    userName:Yup.string().min(5).required('User Name is required*'),
    password:Yup.string().min(8).required('Password is required*'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
    licenceNumber:Yup.string().min(12).required('Licence Number is required*'),
});