import * as visitNotesService from './visitNotes.service.js';

export const getVisitNotes = async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      diagnosis,
      recommendations,
      medications,
      notes,
      _page,
      _limit,
    } = req.query;

    const page = Number(_page) || 1;
    const limit = Number(_limit) || 8;
    const doctorId = req.user.userId;

    const allVisitNotes = await visitNotesService.getAll({
      doctorId,
      patientId,
      appointmentId,
      diagnosis,
      recommendations,
      medications,
      notes,
      page,
      limit,
    });

    return res.json(allVisitNotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch visit notes' });
  }
};
