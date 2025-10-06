import * as yup from 'yup';

export const getAppointmentSchema = yup.object().shape({
  date: yup.string().required('Date is required'),
  therapistId: yup.string().required('Therapist ID is required'),
});

export const updateAvailableSchema = yup.object().shape({
  therapistId: yup.string().required('Therapist ID is required'),
  isAvailable: yup.boolean().required('Availability status is required'),
});

export const addAppointmentSchema = yup.object().shape({
  date: yup.object().shape({
    from: yup.string().required('Start date is required'),
    to: yup.string().required('End date is required'),
  }).required('Date range is required'),
  time: yup.number().required('Time is required').min(0).max(23),
});