import db from '../connectDB.js';

export const createGuest = async (req, res) => {
  const { name, numberGuests, asiste, message } = req.body;

  if (!name || !numberGuests || asiste === undefined) {
    return res.status(400).send('Faltan datos obligatorios');
  }

  try {
    const sql =
      'INSERT INTO invitados (nombre_completo, numero_invitados, asistira, mensaje) VALUES ($1, $2, $3, $4) RETURNING *';

    const { rows } = await db.query(sql, [name, numberGuests, asiste, message]);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error al crear el invitado:', error);
    res.status(500).send('Error al crear el invitado');
  }
};
