import express from 'express';
import {
  getIncidents,
  getIncidentById,
  createIncident,
  deleteIncident
} from '../controllers/incidentController';

const router = express.Router();

router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.post('/', createIncident);
router.delete('/:id', deleteIncident);

export default router;
