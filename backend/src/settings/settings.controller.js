import * as settingsService from './settings.service.js';

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { firstName, lastName, specialization, phone, email } = req.body;

    const updatedProfile = await settingsService.updateProfile({
      userId,
      firstName,
      lastName,
      specialization,
      phone,
      email,
    });

    return res.json(updatedProfile);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to update profile',
    });
  }
};
