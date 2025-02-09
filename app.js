const express = require("express");
const urlRoutes = require("./src/routes/urlRoutes");
const swaggerSpec = require("./src/config/swaggerConfig");
const loggerMiddleware = require("./src/middlewares/loggerMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(urlRoutes);
swaggerSpec(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
