import db from '../connectDB.js';
// Si fetch no está disponible globalmente, importa node-fetch
import fetch from 'node-fetch';

export const createGuest = async (req, res) => {
  let { name, numberGuests, asiste, message, recaptchaToken } = req.body;

  // Convertir los valores recibidos a los tipos esperados
  numberGuests = Number(numberGuests);
  asiste = typeof asiste === 'boolean' ? asiste : asiste === 'yes';

  // Validar datos obligatorios
  if (!name || !numberGuests || typeof asiste !== 'boolean') {
    return res
      .status(400)
      .json({ error: 'Faltan datos obligatorios o tipos incorrectos' });
  }

  // Validar token de reCAPTCHA
  if (!recaptchaToken) {
    return res
      .status(400)
      .json({ error: 'Token de reCAPTCHA no proporcionado' });
  }

  try {
    // Verificar el token con Google reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      }
    );

    const verifyData = await verifyResponse.json();

    // Verificar si la validación fue exitosa
    if (!verifyData.success) {
      console.error('Error de reCAPTCHA:', verifyData['error-codes']);
      return res.status(400).json({
        error: 'Verificación de reCAPTCHA fallida',
        details: verifyData['error-codes'],
      });
    }

    // Verificar el score (reCAPTCHA v3 devuelve un score de 0.0 a 1.0)
    // Un score más alto significa que es más probable que sea un humano
    if (verifyData.score < 0.5) {
      console.warn(`Score bajo de reCAPTCHA: ${verifyData.score}`);
      return res.status(400).json({
        error:
          'Verificación de seguridad fallida. Por favor, intenta de nuevo.',
      });
    }

    // Si la verificación es exitosa, proceder con el guardado
    const sql =
      'INSERT INTO invitados (nombre_completo, numero_invitados, asistira, mensaje) VALUES ($1, $2, $3, $4) RETURNING *';

    const { rows } = await db.query(sql, [name, numberGuests, asiste, message]);

    res.status(201).json({
      success: true,
      data: rows[0],
      recaptchaScore: verifyData.score, // Opcional: para debugging
    });
  } catch (error) {
    console.error('Error al crear el invitado:', error);
    res.status(500).json({
      error: 'Error al crear el invitado',
      message: error.message,
    });
  }
};
