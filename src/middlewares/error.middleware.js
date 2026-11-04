export const notFoundHandler = (req, res) => {
  return res.status(404).json({ message: "Ruta no encontrada" });
};

// Errores que no capturó ningún controlador (por ejemplo, un JSON mal escrito)
export const errorHandler = (error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "El body no es un JSON válido" });
  }
  console.log(error);
  return res.status(500).json({ message: "Error interno del servidor" });
};
