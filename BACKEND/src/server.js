const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactosRoutes = require("./routes/contactosRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/contactos", contactosRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de contactos funcionando correctamente"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});