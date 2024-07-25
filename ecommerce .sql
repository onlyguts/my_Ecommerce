-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 25 juil. 2024 à 10:17
-- Version du serveur : 8.0.37-0ubuntu0.22.04.3
-- Version de PHP : 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecommerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `name`, `image`) VALUES
(1, 'Boitier', ''),
(2, 'Carte mère', ''),
(3, 'Carte graphique', ''),
(4, 'CPU', ''),
(5, 'RAM', ''),
(6, 'Alimentation', ''),
(7, 'Ssd', ''),
(8, 'Ventilateur', ''),
(9, 'Ventirad', ''),
(10, 'Aio', ''),
(11, 'Cable', ''),
(12, 'Ecran', ''),
(13, 'Clavier', ''),
(14, 'Souris', '');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int NOT NULL,
  `id_categorie` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `marque` varchar(255) DEFAULT NULL,
  `prix` int DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `views` int DEFAULT '0',
  `taille` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `socket` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `typec` varchar(255) DEFAULT NULL,
  `consommations` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `id_categorie`, `name`, `marque`, `prix`, `image`, `stock`, `views`, `taille`, `type`, `socket`, `typec`, `consommations`) VALUES
(1, 1, 'BOITIER NZXTTt', 'NZXT', 5543, 'https://nzxt.com/assets/cms/34299/1712947673-h7-flow-hero-black.png?auto=format&fit=crop&h=1000&w=1000', 55465230, 142, 'ATX', 'AMD', 'DDR5', 'AM4', 115),
(2, 2, 'CARTE MERE', NULL, 0, NULL, 0, 3, 'ATX', 'AMD', 'DDR5', 'AM4', 75),
(3, 5, 'RAMdaaaghjvvhvgblhhjb', 'ddddddddd', 0, 'd', 0, 7, 'd', 'd', 'DDR4', 'd', 25),
(4, 1, 'BOITIER v852', 'NZXT', 752, 'https://nzxt.com/assets/cms/34299/1654199794-case_h7_solid_w_hero_pl_png.png?ar64=MTox&auto=format&fit=crop&h=400&w=400', 0, 14, 'ATX', 'te', 'te', 'te', 75),
(5, 5, 'RAM2', NULL, 0, NULL, 0, 2, NULL, NULL, 'DDR4', NULL, 25);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `groupe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `groupe`) VALUES
(79, 'tony@gmail.com', 'tony@gmail.com', 'toto2011', 0),
(80, 'salut@gmail.Com', 'salut@gmail.Com', 'salut', 0),
(81, 'test', 'lamort75@gmail.com', 'test', 1),
(82, 'shner', 'admin@mycinema.comvgtbt', 'toto', 0),
(83, 'jetest@gmail.com', 'jetest@gmail.com', 'test', 0),
(84, 'jetry', 'jetry@gmail.Com', 'jetry', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
