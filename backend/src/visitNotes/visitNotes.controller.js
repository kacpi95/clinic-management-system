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

export const addVisitNote = async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      diagnosis,
      recommendations,
      medications,
      notes,
    } = req.body;

    const doctorId = req.user.userId;

    const newVisitNote = await visitNotesService.add({
      doctorId,
      patientId,
      appointmentId,
      diagnosis,
      recommendations,
      medications,
      notes,
    });

    return res.status(201).json(newVisitNote);
  } catch (error) {
    console.error(error);

    if (error.message === 'Appointment not found or access denied') {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === 'Visit note already exists for this appointment') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to add new visit note' });
  }
};

export const removeVisitNote = async (req, res) => {
  try {
    const { id } = req.params;

    const visitNote = await visitNotesService.getById(id);

    if (!visitNote) {
      return res.status(404).json({ message: 'Visit note not found' });
    }

    if (visitNote.doctorId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const deletedVisitNote = await visitNotesService.remove(id);

    return res.json(deletedVisitNote);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Failed to remove visit note' });
  }
};
