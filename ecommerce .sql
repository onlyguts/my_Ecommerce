-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 25 juil. 2024 à 13:18
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
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `id_produits` int NOT NULL,
  `rate` int NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`id`, `id_user`, `id_produits`, `rate`, `description`) VALUES
(3, 79, 23, 5, 'test'),
(4, 83, 23, 5, 'test');

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
(23, 1, 'Fractal Design Define R6 Black', 'Fractal', 179, 'https://media.ldlc.com/r1600/ld/products/00/04/76/70/LD0004767017_2.jpg', 15, 89, 'ATX', 'null', 'null', 'null', 0),
(24, 2, 'ASUS ROG STRIX B550-F GAMING (WI-FI) II', 'ASUS', 200, 'https://media.ldlc.com/r374/ld/products/00/05/91/26/LD0005912640_1.jpg', 55, 3, 'ATX', 'AMD', 'DDR4', 'AM4', 0),
(25, 4, 'AMD Ryzen 9 5900X (3.7 GHz / 4.8 GHz)', 'AMD', 330, 'https://media.ldlc.com/r374/ld/products/00/05/74/60/LD0005746003_1.jpg', 20, 4, 'null', 'AMD', 'null', 'AM4', 0),
(26, 5, 'Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz', 'Corsair', 100, 'https://media.ldlc.com/r374/ld/products/00/05/31/99/LD0005319901_2.jpg', 10, 4, 'null', 'null', 'DDR4', 'null', 0),
(27, 10, 'Corsair iCue H115i RGB PRO XT', 'Corsair', 150, 'https://media.ldlc.com/r374/ld/products/00/05/56/74/LD0005567419_2.jpg', 42, 7, 'null', 'null', 'null', 'null', 0),
(28, 7, 'Samsung 980 PRO', 'Samsung', 100, 'https://media.ldlc.com/r374/ld/products/00/05/79/93/LD0005799307_1.jpg', 55, 12, 'null', 'null', 'null', 'null', 0);

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
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_produits` (`id_produits`),
  ADD KEY `id_user` (`id_user`);

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
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`id_produits`) REFERENCES `produits` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `avis_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
