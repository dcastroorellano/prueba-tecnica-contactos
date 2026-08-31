const { sql, poolPromise } = require("../config/database");

const consultarContactos = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().execute("sp_ConsultarContactos");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al consultar contactos:", error);
    res.status(500).json({
      mensaje: "Error al consultar los contactos",
    });
  }
};

const insertarContacto = async (req, res) => {
  try {
    const {
      tipoIdentificacion,
      identificacion,
      nombres,
      apellido,
      telefono,
      direccion,
      correoElectronico,
      cliente,
    } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("TipoIdentificacion", sql.VarChar(3), tipoIdentificacion)
      .input("Identificacion", sql.VarChar(20), identificacion)
      .input("Nombres", sql.VarChar(50), nombres)
      .input("Apellido", sql.VarChar(50), apellido)
      .input("Telefono", sql.Numeric(10, 0), telefono)
      .input("Direccion", sql.VarChar(120), direccion)
      .input("CorreoElectronico", sql.VarChar(120), correoElectronico)
      .input("Cliente", sql.Bit, cliente)
      .execute("sp_InsertarContacto");

    res.status(201).json({
      mensaje: "Contacto registrado correctamente",
    });
  } catch (error) {
    console.error("Error al insertar contacto:", error);
    res.status(500).json({
      mensaje: "Error al registrar el contacto",
    });
  }
};

const editarContacto = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      tipoIdentificacion,
      identificacion,
      nombres,
      apellido,
      telefono,
      direccion,
      correoElectronico,
      cliente,
    } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("Id", sql.Int, id)
      .input("TipoIdentificacion", sql.VarChar(3), tipoIdentificacion)
      .input("Identificacion", sql.VarChar(20), identificacion)
      .input("Nombres", sql.VarChar(50), nombres)
      .input("Apellido", sql.VarChar(50), apellido)
      .input("Telefono", sql.Numeric(10, 0), telefono)
      .input("Direccion", sql.VarChar(120), direccion)
      .input("CorreoElectronico", sql.VarChar(120), correoElectronico)
      .input("Cliente", sql.Bit, cliente)
      .execute("sp_EditarContacto");

    res.json({
      mensaje: "Contacto actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al editar contacto:", error);
    res.status(500).json({
      mensaje: "Error al actualizar el contacto",
    });
  }
};

const eliminarContacto = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    await pool
      .request()
      .input("Id", sql.Int, id)
      .execute("sp_EliminarContacto");

    res.json({
      mensaje: "Contacto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    res.status(500).json({
      mensaje: "Error al eliminar el contacto",
    });
  }
};

module.exports = {
  consultarContactos,
  insertarContacto,
  editarContacto,
  eliminarContacto,
};

