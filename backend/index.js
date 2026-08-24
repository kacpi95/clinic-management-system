import express from 'express';
import cors from 'cors';

import authRoutes from './src/auth/auth.routes.js';
import patientsRoutes from './src/patients/patients.routes.js';
import appointmentRoutes from './src/appointment/appointment.routes.js';
import visitNotesRoutes from './src/visitNotes/visitNotes.routes.js';
import availabilityRoutes from './src/availability/availability.routes.js';
import settingsRoutes from './src/settings/settings.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/visit-notes', visitNotesRoutes);
app.use('/api/availabilities', availabilityRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
