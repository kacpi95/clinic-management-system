import * as appointmentService from './appointment.service.js';

export const getAppointments = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
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
