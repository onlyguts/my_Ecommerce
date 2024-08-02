-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 02 août 2024 à 08:11
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
-- Structure de la table `alert_email`
--

CREATE TABLE `alert_email` (
  `id` int NOT NULL,
  `id_produit` int NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `alert_email`
--

INSERT INTO `alert_email` (`id`, `id_produit`, `email`) VALUES
(6, 24, 'tonyshner@gmail.com');

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
-- Structure de la table `code_promo`
--

CREATE TABLE `code_promo` (
  `id` int NOT NULL,
  `code` varchar(255) NOT NULL,
  `promotion` int NOT NULL,
  `utilisations` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `code_promo`
--

INSERT INTO `code_promo` (`id`, `code`, `promotion`, `utilisations`) VALUES
(1, 'PROMO15', 15, 14),
(2, 'tefezezfez', 10, 1),
(3, 'tony_15', 10, 0);

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `id_produit` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `consommations` int DEFAULT NULL,
  `promo` int NOT NULL DEFAULT '0',
  `suggestion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `id_categorie`, `name`, `marque`, `prix`, `image`, `stock`, `views`, `taille`, `type`, `socket`, `typec`, `consommations`, `promo`, `suggestion`) VALUES
(23, 1, 'Fractal Design Define R6 Black', 'Fractal', 179, 'https://media.ldlc.com/r1600/ld/products/00/04/76/70/LD0004767017_2.jpg', 0, 282, 'ATX', 'null', 'null', 'null', 0, 50, 1),
(24, 2, 'ASUS ROG STRIX B550-F GAMING (WI-FI) II', 'ASUS', 200, 'https://media.ldlc.com/r374/ld/products/00/05/91/26/LD0005912640_1.jpg', 0, 19, 'ATX', 'AMD', 'DDR4', 'AM4', 0, 0, 0),
(25, 4, 'AMD Ryzen 9 5900X (3.7 GHz / 4.8 GHz)', 'AMD', 330, 'https://media.ldlc.com/r374/ld/products/00/05/74/60/LD0005746003_1.jpg', 20, 60, 'null', 'AMD', 'null', 'AM4', 0, 0, 1),
(26, 5, 'Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz', 'Corsair', 100, 'https://media.ldlc.com/r374/ld/products/00/05/31/99/LD0005319901_2.jpg', 10, 35, 'null', 'null', 'DDR4', 'null', 0, 0, 0),
(27, 10, 'Corsair iCue H115i RGB PRO XT', 'Corsair', 150, 'https://media.ldlc.com/r374/ld/products/00/05/56/74/LD0005567419_2.jpg', 42, 16, 'null', 'null', 'null', 'null', 0, 0, 0),
(28, 7, 'Samsung 980 PRO', 'Samsung', 100, 'https://media.ldlc.com/r374/ld/products/00/05/79/93/LD0005799307_1.jpg', 55, 51, 'null', 'null', 'null', 'null', 0, 100, 0),
(29, 3, 'MSI RTX 3060 TI Ventus 2X 8G OC', 'MSI', 470, 'https://media.ldlc.com/r374/ld/products/00/05/78/85/LD0005788583_1.jpg', 0, 105, 'null', 'null', 'null', 'null', 200, 0, 0),
(32, 1, 'NZXT H9 Flow Blanc', 'NZXT', 189, 'https://media.ldlc.com/r1600/ld/products/00/06/00/63/LD0006006359.jpg', 5, 8, 'ATX', 'null', 'null', 'null', 0, 0, 0),
(34, 6, 'Corsair RM750e 80PLUS Gold (ATX 3.0)', 'Corsair', 139, 'https://media.ldlc.com/r374/ld/products/00/06/02/94/LD0006029412.jpg', 55, 2, 'ATX', 'null', 'null', 'null', 0, 0, 0),
(37, 13, 'Ducky Channel One 2 Mini RGB Noir (Cherry MX RGB Silent Red)', 'Ducky', 120, 'https://media.ldlc.com/r374/ld/products/00/05/14/59/LD0005145932_2.jpg', 10, 29, 'null', 'null', 'null', 'null', 0, 5, 1),
(38, 12, 'Samsung 27\" LED - Odyssey ', 'Samsung', 200, 'https://media.ldlc.com/r374/ld/products/00/06/06/33/LD0006063366_0006063383.jpg', 10, 3, 'null', 'null', 'null', 'null', 0, 0, 0),
(39, 14, 'HyperX Pulsefire Haste – Souris Gaming', 'HyperX', 40, 'https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_pulsefire_haste_black_red_2_back_angled_976x.jpg?v=1704382581', 10, 2, 'null', 'null', 'null', 'null', 0, 0, 0),
(42, 1, 'NZXT H7 Elite RGB Blanc', 'NZXT', 180, 'https://media.ldlc.com/r374/ld/products/00/06/07/89/LD0006078935.jpg', 50, 9, 'ETX', 'null', 'null', 'null', 0, 0, 1),
(43, 2, 'ASUS ROG STRIX B550-A GAMING', 'ASUS', 180, 'https://media.ldlc.com/r374/ld/products/00/05/73/61/LD0005736124_1.jpg', 14, 3, 'ATX', 'AMD', 'DDR4', 'AM4', 0, 0, 0),
(44, 4, 'Intel Core i7-14700KF (3.4 GHz / 5.6 GHz)', 'Intel', 469, 'https://media.ldlc.com/r374/ld/products/00/06/07/49/LD0006074904.jpg', 0, NULL, 'null', 'Intel', 'null', 'LG1700', 135, 0, 0),
(66, 9, 'be quiet! Dark Rock Elite', 'be quiet!', 120, 'https://media.ldlc.com/r374/ld/products/00/06/07/42/LD0006074253.jpg', 10, 2, 'null', 'null', 'null', 'null', 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `groupe` int NOT NULL,
  `verification` int NOT NULL DEFAULT '0',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `groupe`, `verification`, `token`) VALUES
(97, 'admin', 'admin@admin.fr', 'admin', 1, 1, 'dG9ueXl5eXl5eUBnbWFpbC5jb206dG9ueTp0b255');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `alert_email`
--
ALTER TABLE `alert_email`
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `code_promo`
--
ALTER TABLE `code_promo`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
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
-- AUTO_INCREMENT pour la table `alert_email`
--
ALTER TABLE `alert_email`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `code_promo`
--
ALTER TABLE `code_promo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

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
