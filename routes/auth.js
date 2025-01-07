const { Router } = require("express");
const router = Router();
const { register, login } = require("../controllers/auth");


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID unique de l'utilisateur
 *                 username:
 *                   type: string
 *                   description: Nom d'utilisateur
 *       400:
 *         description: Erreur dans les données fournies
 */
router.post("/register", register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecte un utilisateur et renvoie un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie, JWT retourné
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Jeton JWT pour l'utilisateur connecté
 *       401:
 *         description: Nom d'utilisateur ou mot de passe incorrect
 */
router.post("/login", login);

module.exports = router