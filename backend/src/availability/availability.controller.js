import * as availabilityService from './availability.service.js';

export const getAvailabilities = async (req, res) => {
  try {
    const { date, startTime, endTime, isAvailable } = req.query;
    const doctorId = req.user.userId;

    const allAvailability = await availabilityService.getAll({
      doctorId,
      date,
      startTime,
      endTime,
      isAvailable,
    });

    return res.json(allAvailability);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch availability' });
  }
};
