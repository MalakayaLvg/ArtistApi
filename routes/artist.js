const { Router } = require('express');
const router = Router();
const {index, create, update, remove, show} = require('../controllers/artist');
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: Gestion des artistes
 */

/**
 * @swagger
 * /artist/all:
 *   get:
 *     summary: Récupère tous les artistes
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: Liste des artistes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID unique de l'artiste
 *                   name:
 *                     type: string
 *                     description: Nom de l'artiste
 */
router.get('/all', index);

/**
 * @swagger
 * /artist/create:
 *   post:
 *     summary: Crée un nouvel artiste
 *     tags: [Artists]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'artiste
 *               age:
 *                 type: integer
 *                 description: Age de l'artiste
 *
 *             required:
 *               - name
 *               - age
 *     responses:
 *       201:
 *         description: Artiste créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID unique de l'artiste
 *                 name:
 *                   type: string
 *                   description: Nom de l'artiste
 */
router.post('/create',authMiddleware, create);

/**
 * @swagger
 * /artist/show/{id}:
 *   get:
 *     summary: Récupère un artiste par ID
 *     tags: [Artists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unique de l'artiste
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'artiste récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID unique de l'artiste
 *                 name:
 *                   type: string
 *                   description: Nom de l'artiste
 *       404:
 *         description: Artiste non trouvé
 */
router.get('/show/:id',authMiddleware, show);

/**
 * @swagger
 * /artist/update/{id}:
 *   put:
 *     summary: Met à jour un artiste existant
 *     tags: [Artists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unique de l'artiste
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom de l'artiste
 *               age:
 *                 type: integer
 *                 description: Nouvel age de l'artiste
 *     responses:
 *       200:
 *         description: Artiste mis à jour avec succès
 *       404:
 *         description: Artiste non trouvé
 */
router.put('/update/:id',authMiddleware, update);

/**
 * @swagger
 * /artist/delete/{id}:
 *   delete:
 *     summary: Supprime un artiste
 *     tags: [Artists]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unique de l'artiste
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artiste supprimé avec succès
 *       404:
 *         description: Artiste non trouvé
 */
router.delete('/delete/:id',authMiddleware, remove);


module.exports = router;