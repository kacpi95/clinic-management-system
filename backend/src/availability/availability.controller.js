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

export const getAvailabilityById = async (req, res) => {
  try {
    const { id } = req.params;

    const availability = await availabilityService.getById(id);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    if (availability.doctorId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json(availability);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch availability' });
  }
};
