import express from "express";
import { createNode, getNodes, updateNode, deleteNode } from "../controllers/NodeController.js";

const router = express.Router();

router.post("/", createNode);
router.get("/", getNodes);
router.put("/:id", updateNode);
router.delete("/:id", deleteNode);

export default router;
