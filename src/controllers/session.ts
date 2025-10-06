import { NextFunction, Response } from 'express';
import { ValidationError } from 'yup';
import { bookAppointment } from '../services';
import { templateErrors } from '../helpers';
import { RequestWithUserRole } from '../types';

const createSessionController = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { appointmentId } = req.body;
    
    if (!appointmentId) {
      return res.status(400).json({
        message: 'Appointment ID is required',
      });
    }

    const appointment = await bookAppointment(appointmentId);
    
    return res.status(201).json({
      data: appointment,
      message: 'Session created successfully',
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return next(error);
  }
};

export default createSessionController;