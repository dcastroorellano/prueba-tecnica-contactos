const express = require("express");

const router = express.Router();

const {
    consultarContactos,
    insertarContacto,
    editarContacto,
    eliminarContacto
} = require("../controllers/contactosController");

router.get("/", consultarContactos);
router.post("/", insertarContacto);
router.put("/:id", editarContacto);
router.delete("/:id", eliminarContacto);

module.exports = router;