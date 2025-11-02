import db from '../connectDB.js';

export const getInvitados = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM invitados');

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send('No se encontraron invitados');
    }
  } catch (error) {
    console.error('Error al obtener los invitados:', error);
    res.status(500).send('Error al obtener los invitados');
  }
};
