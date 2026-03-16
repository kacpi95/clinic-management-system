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
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
};
