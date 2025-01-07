const { Router } = require('express');
const router = Router();
const {index, addRelease, remove, update, show} = require("../controllers/release");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Releases
 *   description: Gestion des sorties (releases)
 */

/**
 * @swagger
 * /release/all:
 *   get:
 *     summary: Récupère toutes les sorties
 *     tags: [Releases]
 *     responses:
 *       200:
 *         description: Liste des sorties récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID unique de la sortie
 *                   title:
 *                     type: string
 *                     description: Titre de la sortie
 *                   artist:
 *                     type: string
 *                     description: Nom de l'artiste
 *                   releaseDate:
 *                     type: number
 *                     description: Date de sortie
 */
router.get("/all", index);

/**
 * @swagger
 * /release/add/{artistId}:
 *   post:
 *     summary: Ajoute une nouvelle sortie pour un artiste spécifique
 *     tags: [Releases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: artistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique de l'artiste auquel la sortie sera associée
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre de la sortie
 *               releaseDate:
 *                 type: number
 *                 description: Année de la sortie
 *             required:
 *               - title
 *               - releaseDate
 *     responses:
 *       201:
 *         description: Sortie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation
 *                 release:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID unique de la sortie
 *                     title:
 *                       type: string
 *                       description: Titre de la sortie
 *                     releaseDate:
 *                       type: number
 *                       description: Année de la sortie
 *                     artist:
 *                       type: string
 *                       description: ID de l'artiste associé
 *                 artist:
 *                   type: object
 *                   description: Informations sur l'artiste associé
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID unique de l'artiste
 *                     name:
 *                       type: string
 *                       description: Nom de l'artiste
 *       400:
 *         description: Données invalides fournies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description de l'erreur
 *       404:
 *         description: Artiste non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description de l'erreur
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description de l'erreur
 */
router.post("/add/:artistId",authMiddleware, addRelease);

/**
 * @swagger
 * /release/show/{id}:
 *   get:
 *     summary: Récupère une sortie par ID
 *     tags: [Releases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unique de la sortie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la sortie récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID unique de la sortie
 *                 title:
 *                   type: string
 *                   description: Titre de la sortie
 *                 artist:
 *                   type: string
 *                   description: Nom de l'artiste
 *       404:
 *         description: Sortie non trouvée
 */
router.get("/show/:releaseId",authMiddleware, show);

/**
 * @swagger
 * /release/delete/{id}:
 *   delete:
 *     summary: Supprime une sortie
 *     tags: [Releases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unique de la sortie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sortie supprimée avec succès
 *       404:
 *         description: Sortie non trouvée
 */
router.delete("/delete/:releaseId",authMiddleware, remove);

/**
 * @swagger
 * /release/edit/{id}:
 *   put:
 *     summary: Met à jour une sortie existante
 *     tags: [Releases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unique de la sortie
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nouveau titre de la sortie
 *               releaseDate:
 *                 type: number
 *                 description: Nouvelle date de sortie
 *     responses:
 *       200:
 *         description: Sortie mise à jour avec succès
 *       404:
 *         description: Sortie non trouvée
 */
router.put("/edit/:releaseId",authMiddleware, update);

module.exports = router;