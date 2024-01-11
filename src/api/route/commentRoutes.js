const express = require("express");
const router = express.Router();

const {
  getAllcommentsForPost,
  createCommentForPost,
  updateAComment,
  deleteAComment,
  getAComment,
} = require("../controller/commentsController");

const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../middleware/AuthVerification");
/**
 * @swagger
 * /comment/get/{id_post}:
 *   get:
 *     summary: Récupère tous les commentaires pour un post spécifique
 *     tags: [Commentaires]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id_post
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du post pour lequel récupérer les commentaires
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /comment/create/{id_post}:
 *   post:
 *     summary: Crée un commentaire pour un post spécifique
 *     tags: [Commentaires]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id_post
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du post pour lequel créer un commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /comment/patch/{id_comment}:
 *   put:
 *     summary: Met à jour un commentaire spécifique
 *     tags: [Commentaires]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id_comment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du commentaire à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Commentaire non trouvé
 */

/**
 * @swagger
 * /comment/delete/{id_comment}:
 *   delete:
 *     summary: Supprime un commentaire spécifique
 *     tags: [Commentaires]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id_comment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Commentaire non trouvé
 */

/**
 * @swagger
 * /comment/getacomment/{id_comment}:
 *   get:
 *     summary: Récupère un commentaire spécifique
 *     tags: [Commentaires]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id_comment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du commentaire à récupérer
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Commentaire non trouvé
 */

router.get("/get/:id_post", verifyToken, getAllcommentsForPost);
router.post("/create/:id_post", verifyToken, createCommentForPost);
router.put("/patch/:id_comment", verifyToken, updateAComment);
router.delete("/delete/:id_comment", verifyToken, deleteAComment);
router.get("/getacomment/:id_comment", verifyToken, getAComment);

module.exports = router;
