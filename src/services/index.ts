import bookAppointment from './session';
import { getAdmin, getTherapists, patchTherapist } from './admin';
import createPresignedUrl from './S3Service';
import mailer from './nodemailer';

export {
  getTherapistById, getAllTherapist, getAppointmentsPerDateService, getAppointmentById
  , updateIsAvailable, addAppointment, updateTherapist, getClientSecret, bookAppointment, getAdmin,
  createPresignedUrl, mailer, generateEmail, getTherapists,
  loginByEmail, registerTherapist, registerUser, patchTherapist,
};