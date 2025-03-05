import { Router } from "express";
import { prisma } from '../db.js'

const router = Router();


//Crear una categoria
router.post('/categories', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
        }

        const newCategory = await prisma.category.create({
            data: req.body,
        });

        res.status(201).json({
            message: "Categoria creada correctamente",
            product: newCategory,
        });

    } catch (error) {

        if (error.code === "P2002") {
            return res.status(409).json({ error: "Ya existe una Categoria con este identificador único" });
        }
        next(error);
    }
});

//Obtener los productos
router.get('/categories', async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({

        });

        res.json({
            message: "Categorias obtenidas correctamente",
            category: categories,
        });

    } catch (error) {
        next(error);
    }
});

//Obtener las categorias por su id
router.get('/categories/:id', async (req, res, next) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: String(req.params.id),
            },
        });

        if (!category) {
            return res.status(404).json({ error: "Categoria no encontrada" });
        }

        return res.json({
            message: "Categoria obtenida correctamente",
            category: category,
        });

    } catch (error) {
        next(error);
    }
});

//Actualizar una categoria
router.put('/categories/:id', async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
        }

        const categoryUpdate = await prisma.category.update({
            where: {
                id: String(req.params.id)
            },
            data: req.body
        });

        return res.json({
            message: "Categoria actualizado correctamente",
            category: categoryUpdate,
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Categoria no encontrado" });
        }
        next(error);
    }
});

//Actualizar parcialmente una categoria
router.patch("/categories/:id", async (req, res, next) => {
    try {
        const category = await prisma.category.update({
            where: {
                id: String(req.params.id),
            },
            data: req.body,
            include: {
                category: true,
            },
        });

        if (!category) {
            return res.status(404).json({ error: "Categoria no encontrada" });
        }

        return res.json({
            message: "Categoria actualizada correctamente",
            category: category,
        });

    } catch (error) {
        next(error);
    }
});

//Eliminar una Categoria
router.delete('/categories/:id', async (req, res, next) => {
    try {
        const categoryDeleted = await prisma.category.delete({
            where: {
                id: String(req.params.id),
            },
        });

        return res.json({
            message: "Categoria eliminada correctamente",
            product: categoryDeleted,
        });

    } catch (error) {

        if (error.code === "P2025") {
            return res.status(404).json({ error: "Categoria no encontrada" });
        }
        next(error);

    }
});

export default router;