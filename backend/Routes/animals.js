import express from "express";
import {getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal, getAnimalCount,
} from "../Controllers/animals.js";

const router = express.Router();

// Listagem paginada
router.get("/", getAnimals);
// Contador de registros
router.get("/count", getAnimalCount);
// Busca por ID
router.get("/:id", getAnimalById);
// Cria novo registro
router.post("/", createAnimal);
// Atualiza registro
router.put("/:id", updateAnimal);
// Deleta registro
router.delete("/:id", deleteAnimal);

export default router;
