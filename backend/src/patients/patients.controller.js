import * as patientService from './patients.service.js';

export const getPatients = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      pesel,
      birthDate,
      phone,
      email,
      address,
      _page,
      _limit,
    } = req.query;
    const page = Number(_page) || 1;
    const limit = Number(_limit) || 8;

    const allPatients = await patientService.getAll({
      userId: req.user.userId,
      firstName,
      lastName,
      pesel,
      birthDate,
      phone,
      email,
      address,
      page,
      limit,
    });

    return res.json(allPatients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch patients' });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getById(id, req.user.userId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.json(patient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch patient' });
  }
};

export const addPatient = async (req, res) => {
  try {
    const { firstName, lastName, pesel, birthDate, phone, email, address } =
      req.body;

    const newPatient = await patientService.add({
      userId: req.user.userId,
      firstName,
      lastName,
      pesel,
      birthDate,
      phone,
      email,
      address,
    });

    return res.status(201).json(newPatient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add new patient' });
  }
};

export const removePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPatient = await patientService.remove(id, req.user.userId);

    return res.json(deletedPatient);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Patient not found' });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPatient = await patientService.update(
      id,
      req.user.userId,
      req.body,
    );

    return res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Patient not found' });
  }
};
