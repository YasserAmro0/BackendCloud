import { Appointment, Session } from '../models';
import { templateErrors } from '../helpers';

const bookAppointment = async (appointmentId: number) => {
  const appointment = await Appointment.findByPk(appointmentId);
  
  if (!appointment) {
    throw templateErrors.NOT_FOUND('Appointment not found');
  }
  
  if (!appointment.isAvailable) {
    throw templateErrors.BAD_REQUEST('Appointment is not available');
  }
  
  // Create a session
  const session = await Session.create({
    appointmentId,
  });
  
  // Mark appointment as unavailable
  appointment.isAvailable = false;
  await appointment.save();
  
  return {
    session,
    appointment,
  };
};

export default bookAppointment;