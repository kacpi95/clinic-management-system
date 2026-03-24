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

export const getVisitNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const visitNote = await visitNotesService.getById(id);

    if (!visitNote) {
      return res.status(404).json({ message: 'Visit note not found' });
    }

    if (visitNote.doctorId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json(visitNote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch visit note' });
  }
};
