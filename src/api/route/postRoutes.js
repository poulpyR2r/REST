const express = require("express");
const {
  getFiles,
  createFile,
  updateFile,
  deleteFile,
  getAFile,
} = require("../controller/postController");

const router = express.Router();
const { verifyToken } = require("../middleware/AuthVerification");
/**
 * @swagger
 * /post/get/{id}:
 *   get:
 *     summary: Récupère un fichier (post) spécifique
 *     tags: [Fichiers]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du fichier à récupérer
 *     responses:
 *       200:
 *         description: Fichier récupéré avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Fichier non trouvé
 */
/**
 * @swagger
 * /post/delete/{id}:
 *   delete:
 *     summary: Supprime un fichier (post) spécifique
 *     tags: [Fichiers]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du fichier à supprimer
 *     responses:
 *       204:
 *         description: Fichier supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Fichier non trouvé
 */
/**
 * @swagger
 * /post/patch/{id}:
 *   put:
 *     summary: Met à jour un fichier (post) spécifique
 *     tags: [Fichiers]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du fichier à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fichier mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Fichier non trouvé
 */
/**
 * @swagger
 * /post/create:
 *   post:
 *     summary: Crée un nouveau fichier (post)
 *     tags: [Fichiers]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fichier (post) créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
/**
 * @swagger
 * /post/get:
 *   get:
 *     summary: Récupère une liste de fichiers (posts)
 *     tags: [Fichiers]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Liste des fichiers récupérée avec succès
 *       401:
 *         description: Non autorisé
 */

router.get("/get", verifyToken, getFiles);
router.post("/create", verifyToken, createFile);
router.put("/patch/:id", verifyToken, updateFile);
router.delete("/delete/:id", verifyToken, deleteFile);
router.get("/get/:id", verifyToken, getAFile);

module.exports = router;
