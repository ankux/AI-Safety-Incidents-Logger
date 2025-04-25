import { Request, Response } from 'express';
import { sql } from '../config/db';
import { Severity } from '../types/incident.types';

const allowedSeverities: Severity[] = ['Low', 'Medium', 'High'];

export const getIncidents = async (req: Request, res: Response) => {
  const incidents = await sql`SELECT * FROM incidents ORDER BY reported_at DESC`;
  res.status(200).json(incidents);
};

export const getIncidentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await sql`SELECT * FROM incidents WHERE id = ${id}`;
  if (result.length === 0) {
    res.status(404).json({ error: 'Incident not found' });
    return;
  }
  res.status(200).json(result[0]);
};

export const createIncident = async (req: Request, res: Response): Promise<void> => {
  const { title, description, severity } = req.body;

  if (!title || !description || !severity) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (!allowedSeverities.includes(severity)) {
    res.status(400).json({ error: 'Invalid severity level' });
    return;
  }

  const result = await sql`
    INSERT INTO incidents (title, description, severity, reported_at)
    VALUES (${title}, ${description}, ${severity}, NOW())
    RETURNING *`;

  res.status(201).json(result[0]);
};

export const deleteIncident = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await sql`DELETE FROM incidents WHERE id = ${id} RETURNING *`;
  if (result.length === 0) {
    res.status(404).json({ error: 'Incident not found' });
    return;
  }
  res.status(200).json({ message: 'Incident deleted successfully' });
};
