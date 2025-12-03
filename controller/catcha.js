export const catchaController = async (req, res) => {
  const { recaptchaToken, name, numberGuests, asiste, message } = req.body;

  try {
    // Verificar el token con Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    const recaptchaResponse = await axios.post(verifyUrl);

    if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
      return res
        .status(400)
        .json({ error: 'Verificación de reCAPTCHA fallida' });
    }

    // Continuar con el guardado de datos...
    // Tu lógica actual aquí
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
