import { Router } from "express";
import { prisma } from '../db.js';

const router = Router();

//Obtener los productos
router.get('/products', async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
        });

        res.json({
            message: "Productos obtenidos correctamente",
            product: products,
        });

    } catch (error) {
        next(error);
    }
});



//Obtener los productos por su id
router.get('/products/:id', async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: String(req.params.id),
            },
            include: {
                category: true
            }
        });

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.json({
            message: "Producto obtenido correctamente",
            product: product,
        });

    } catch (error) {
        next(error);
    }
});

//Crear un producto
router.post('/products', async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
        }

        const newProduct = await prisma.product.create({
            data: req.body,
        });

        res.status(201).json({
            message: "Producto creado correctamente",
            product: newProduct,
        });

    } catch (error) {

        if (error.code === "P2002") {
            return res.status(409).json({ error: "Ya existe un producto con este identificador único" });
        }
        next(error);
    }
});



//Actualizar un producto
router.put('/products/:id', async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
        }

        const productUpdate = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        return res.json({
            message: "Producto actualizado correctamente",
            product: productUpdate,
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        error(next);
    }
});

//Actualizar parcialmente un producto
router.patch("/products/:id", async (req, res, next) => {
    try {
        const product = await prisma.product.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
            include: {
                category: true,
            },
        });

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        return res.json({
            message: "Producto actualizado correctamente",
            product: product,
        });

    } catch (error) {
        next(error);
    }
});



//Eliminar un Producto
router.delete('/products/:id', async (req, res, next) => {
    try {
        const productDeleted = await prisma.product.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        return res.json({
            message: "Producto eliminado correctamente",
            product: productDeleted,
        });

    } catch (error) {

        if (error.code === "P2025") {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        next(error);

    }
});



export default router;