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

export const changePassword = async (req, res) => {
  try {

    const userId = req.user.userId;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Current password and new password are required',
      });
    }

    await settingsService.changePassword({
      userId,
      currentPassword,
      newPassword,
    });

    return res.json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error(error);

    if (error.message === 'Invalid current password') {
      return res.status(400).json({
        message: 'Aktualne hasło jest nieprawidłowe',
      });
    }

    if (error.message === 'New password must be different') {
      return res.status(400).json({
        message: 'Nowe hasło musi być inne niż aktualne',
      });
    }

    return res.status(500).json({
      message: 'Failed to change password',
    });
  }
};
