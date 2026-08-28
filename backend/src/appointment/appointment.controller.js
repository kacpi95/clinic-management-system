import * as appointmentService from './appointment.service.js';

export const getAppointments = async (req, res) => {
  try {
    const {
      patientId,
      startTime,
      endTime,
      status,
      reason,
      notes,
      _page,
      _limit,
    } = req.query;

    const page = Number(_page) || 1;
    const limit = Number(_limit) || 8;
    const doctorId = req.user.userId;

    const allAppointments = await appointmentService.getAll({
      patientId,
      doctorId,
      startTime,
      endTime,
      status,
      reason,
      notes,
      page,
      limit,
    });

    return res.json(allAppointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctorId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch appointment' });
  }
};

export const addAppointment = async (req, res) => {
  try {
    const { patientId, startTime, endTime, status, reason, notes } = req.body;

    const doctorId = req.user.userId;

    const newAppointment = await appointmentService.add({
      patientId,
      doctorId,
      startTime,
      endTime,
      status,
      reason,
      notes,
    });

    return res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);

    if (error.message === 'Time slot already taken') {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === 'Invalid time range') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to add new appointment' });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const canceledAppointment = await appointmentService.cancel(
      id,
      req.user.userId,
    );

    return res.json(canceledAppointment);
  } catch (error) {
    console.error(error);

    if (error.message === 'Appointment not found') {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({
      message: 'Failed to cancel appointment',
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.getById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctorId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedAppointment = await appointmentService.update(id, {
      ...req.body,
      doctorId: req.user.userId,
    });

    return res.json(updatedAppointment);
  } catch (error) {
    console.error(error);

    if (error.message === 'Time slot already taken') {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === 'Invalid time range') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update appointment' });
  }
};

export const getCalendarAppointments = async (req, res) => {
  try {
    const doctorId = req.user.userId;

    const appointments = await appointmentService.getCalendarAppointments({
      doctorId,
    });

    return res.json(appointments);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Failed to fetch calendar appointments' });
  }
};
