import express from 'express';
import cors from 'cors';

import patientsRoutes from './src/patients/patients.routes.js';
import appointmentRoutes from './src/appointment/appointment.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientsRoutes);
app.use('/api/appointment', appointmentRoutes);

app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
