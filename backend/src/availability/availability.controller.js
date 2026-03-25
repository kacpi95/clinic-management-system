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

export const addAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime, isAvailable } = req.body;
    const doctorId = req.user.userId;

    const newAvailability = await availabilityService.add({
      doctorId,
      date,
      startTime,
      endTime,
      isAvailable,
    });

    return res.status(201).json(newAvailability);
  } catch (error) {
    console.error(error);

    if (error.message === 'Invalid time range') {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === 'Time slot already taken') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to add availability' });
  }
};

export const removeAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const availability = await availabilityService.getById(id);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    if (availability.doctorId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const deletedAvailability = await availabilityService.remove(id);

    return res.json(deletedAvailability);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to remove availability' });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    const availability = await availabilityService.getById(id);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    if (availability.doctorId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedAvailability = await availabilityService.update(id, {
      ...req.body,
      doctorId: req.user.userId,
    });

    return res.json(updatedAvailability);
  } catch (error) {
    console.error(error);

    if (error.message === 'Invalid time range') {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === 'Time slot already taken') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update availability' });
  }
};
