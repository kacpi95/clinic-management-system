export type UpdateDoctorProfileData = {
  firstName: string;
  lastName: string;
  specialization: string;
  phone: string;
  email: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};
