import { Op } from 'sequelize';
import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey,
} from 'sequelize';


interface TherapistAttributes extends Model
<InferAttributes<TherapistAttributes>,
InferCreationAttributes<TherapistAttributes>> {
  id:CreationOptional <number>,
  cvLink: string,
  profileImg: string,
  major: string,
  bio?: string | undefined,
  hourlyRate: number,
  userId?: ForeignKey<UsersAttributes['id']>,
  createdAt?: CreationOptional<Date>,
  updatedAt?: CreationOptional<Date>,
}

interface AppointmentsAttributes extends Model
<InferAttributes<AppointmentsAttributes>,
InferCreationAttributes<AppointmentsAttributes>> {
  id: CreationOptional<number>,
  therapistId?: ForeignKey<TherapistAttributes['id']>,
  datetime: Date,
  isBooked?: CreationOptional<boolean>,
  isAvailable?: CreationOptional<boolean>
}


interface SessionsAttributes extends Model
<InferAttributes<SessionsAttributes>,
InferCreationAttributes<SessionsAttributes>> {
  id: CreationOptional<number>,
  appointmentId?: ForeignKey<AppointmentsAttributes['id']>,
  userId?: ForeignKey<UsersAttributes['id']>,
  createdAt?: CreationOptional<Date>,
  updatedAt?: CreationOptional<Date>,
}

// Therapist and Calendar related interfaces
interface TherapistWithUserOptional extends TherapistAttributes {
  user?: UsersAttributes,
}

interface AppointmentWithTherapistOptional extends AppointmentsAttributes {
  therapist?: TherapistWithUserOptional,
}

interface Imeeting {
  therapistEmail: string,
  userEmail: string,
  startDate: string,
  endDate: string,
}

interface Appointment {
  therapistId: number;
  datetime: Date;
}

interface TimeRange {
  from: string;
  to: string;
}

interface AddAppointment {
  start: string,
  end: string,
  timeRanges: TimeRange[],
  therapistId: number,
}

interface TherapistAndUser extends UsersAttributes {
  therapist?:TherapistAttributes
}

interface PriceFilter {
  hourlyRate?: {
    [Op.between]?: [string, string];
    [Op.gte]?: string;
    [Op.lte]?: string;
  };
}

interface ITherapist {
  fullName: string;
  email: string;
  password: string;
  cvLink: string;
  profileImg: string;
  major: string;
  hourlyRate: number;
  role: string;
  phoneNumber: string;
}

interface IUser {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: string;
}

// Auth related interfaces
interface Decode {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

interface RequestWithUserRole extends Request {
  user?: Decode;
}

enum RolesForSelect {
  ADMIN = 'admin',
  USER = 'user',
  THERAPIST = 'therapist',
}

type Roles = 'admin' | 'user' | 'therapist';

// Payload interfaces
interface IPayload {
  id: number;
  role: string;
}

interface Payload {
  user: IPayload;
}


// Export types
export type {
  TherapistAttributes, AppointmentsAttributes, SessionsAttributes,
  TherapistWithUserOptional, Decode, RequestWithUserRole, Roles, Imeeting, IPayload,
  Appointment, TimeRange, Payload, AddAppointment, AppointmentWithTherapistOptional,
  TherapistAndUser, ITherapist, IUser, PriceFilter,
};

// Export values (enums, etc.)
export {
  RolesForSelect,
};