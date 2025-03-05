import express from "express";
import productsRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1", productsRoutes);
app.use("/api/v1", categoriesRoutes);

app.listen(3000);
console.log('Server on port', 3000);