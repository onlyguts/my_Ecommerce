-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 27 août 2024 à 11:00
-- Version du serveur : 8.0.39-0ubuntu0.22.04.1
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
-- Structure de la table `achat`
--

CREATE TABLE `achat` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `num` varchar(255) NOT NULL,
  `de` varchar(255) NOT NULL,
  `cvv` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `achat`
--

INSERT INTO `achat` (`id`, `id_user`, `firstname`, `lastname`, `num`, `de`, `cvv`) VALUES
(2, 149603, 'tony', 'bre', '0000 0000 0000 0000', '10/21', 455),
(3, 149603, 'tony', 'tony', '96226292639336326', '10/10', 152),
(4, 101, 'admin', 'admin', '1234 1234 1234 1234', '10/12', 123),
(16, 101, 'tony', 'brechard', '5555 5555 5555 0517', '05/25', 518);

-- --------------------------------------------------------

--
-- Structure de la table `alert_email`
--

CREATE TABLE `alert_email` (
  `id` int NOT NULL,
  `id_produit` int NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(24, 101, 24, 5, 'très bon produit'),
(25, 101, 24, 4, 'test'),
(26, 101, 24, 5, 'dz'),
(27, 101, 24, 5, 'te'),
(28, 101, 24, 5, 'zt'),
(29, 106, 29, 5, 'test'),
(30, 101, 42, 5, 'j\'adore');

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
(1, 'promo', 15, 5),
(6, 'tony_15', 10, 0),
(9, 'wac_15', 10, 0),
(10, 'test75_15', 10, 0),
(11, 'lamort75@gmail.com_15', 10, 1),
(12, 'wwaccc@gmail.Com_15', 10, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id` int NOT NULL,
  `id_commande` int NOT NULL,
  `id_user` int NOT NULL,
  `status` int NOT NULL,
  `adresse` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` int NOT NULL,
  `produits` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `weight` int NOT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `length` int NOT NULL,
  `mode_expe` varchar(255) NOT NULL,
  `papier` int NOT NULL,
  `prix` float NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `id_commande`, `id_user`, `status`, `adresse`, `code`, `produits`, `weight`, `width`, `height`, `length`, `mode_expe`, `papier`, `prix`, `date`) VALUES
(21, 0, 101, 0, 'tony min', 75015, '[{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":68,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"\",\"categorie_name\":\"Boitier\",\"quantity\":1},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":68,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":10,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680240561-h7-elite-rgb-white-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"Blanc\",\"categorie_name\":\"Boitier\",\"quantity\":2},{\"produit_id\":26,\"id\":26,\"id_categorie\":5,\"name\":\"Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz\",\"marque\":\"Corsair\",\"prix\":100,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"stock\":10,\"views\":150,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"DDR4\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"info\":\"\",\"categorie_name\":\"RAM\",\"quantity\":1},{\"produit_id\":29,\"id\":29,\"id_categorie\":3,\"name\":\"MSI RTX 3060 TI Ventus 2X 8G OC\",\"marque\":\"MSI\",\"prix\":470,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"stock\":1000,\"views\":277,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":200,\"promo\":0,\"suggestion\":0,\"weight\":100,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":9}]', 900, 9, 9, 9, 'Livraison express', 1, 0, '2024-08-22 15:21:48'),
(22, 0, 101, 0, 'tony min', 75015, '[{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":68,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"\",\"categorie_name\":\"Boitier\",\"quantity\":1},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":68,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":10,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680240561-h7-elite-rgb-white-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"Blanc\",\"categorie_name\":\"Boitier\",\"quantity\":2},{\"produit_id\":26,\"id\":26,\"id_categorie\":5,\"name\":\"Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz\",\"marque\":\"Corsair\",\"prix\":100,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"stock\":10,\"views\":150,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"DDR4\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"info\":\"\",\"categorie_name\":\"RAM\",\"quantity\":1},{\"produit_id\":29,\"id\":29,\"id_categorie\":3,\"name\":\"MSI RTX 3060 TI Ventus 2X 8G OC\",\"marque\":\"MSI\",\"prix\":470,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"stock\":1000,\"views\":277,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":200,\"promo\":0,\"suggestion\":0,\"weight\":100,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":9}]', 900, 9, 9, 9, 'Livraison express', 1, 0, '2024-08-22 15:21:48'),
(23, 0, 101, 0, '17 rue wacr', 850238, '[{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"views\":97,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":10,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680240561-h7-elite-rgb-white-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"Blanc\",\"categorie_name\":\"Boitier\",\"quantity\":14},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"\",\"categorie_name\":\"Boitier\",\"quantity\":39}]', 10, 1, 1, 1, 'Livraison standard', 1, 0, '2024-08-22 15:21:48'),
(24, 0, 101, 0, '', 0, '[{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"views\":97,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":10,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680240561-h7-elite-rgb-white-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"Blanc\",\"categorie_name\":\"Boitier\",\"quantity\":14},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"\",\"categorie_name\":\"Boitier\",\"quantity\":39}]', 10, 1, 1, 1, '', 0, 0, '2024-08-22 15:21:48'),
(25, 0, 101, 0, '', 0, '[{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"views\":97,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":10,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680240561-h7-elite-rgb-white-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"Blanc\",\"categorie_name\":\"Boitier\",\"quantity\":14},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"\",\"categorie_name\":\"Boitier\",\"quantity\":39}]', 10, 1, 1, 1, '', 0, 0, '2024-08-22 15:21:48'),
(26, 0, 101, 0, '17 rue wacr', 850238, '[{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"views\":97,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":10,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680240561-h7-elite-rgb-white-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"Blanc\",\"categorie_name\":\"Boitier\",\"quantity\":14},{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":71,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"\",\"categorie_name\":\"Boitier\",\"quantity\":39}]', 10, 1, 1, 1, 'Livraison express', 0, 0, '2024-08-22 15:21:48'),
(27, 0, 101, 0, '17 rue wacr', 850238, '[{\"produit_id\":29,\"id\":29,\"id_categorie\":3,\"name\":\"MSI RTX 3060 TI Ventus 2X 8G OC\",\"marque\":\"MSI\",\"prix\":470,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"stock\":1000,\"views\":279,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":200,\"promo\":0,\"suggestion\":0,\"weight\":100,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":1},{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"views\":100,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":52,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1}]', 110, 2, 2, 2, 'Livraison standard', 1, 0, '2024-08-22 15:21:48'),
(28, 0, 101, 0, '', 0, '[{\"produit_id\":29,\"id\":29,\"id_categorie\":3,\"name\":\"MSI RTX 3060 TI Ventus 2X 8G OC\",\"marque\":\"MSI\",\"prix\":470,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"stock\":1000,\"views\":281,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":200,\"promo\":0,\"suggestion\":0,\"weight\":100,\"width\":1,\"height\":1,\"length\":1,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":1}]', 100, 1, 1, 1, '', 0, 0, '2024-08-22 15:21:48'),
(29, 0, 101, 0, 'tony min', 75015, '[]', 0, 0, 0, 0, 'Livraison standard', 1, 18, '2024-08-22 15:21:48'),
(30, 0, 101, 0, '17 rue wacr', 850238, '[{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":54,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison standard', 1, 217, '2024-08-22 15:21:48'),
(31, 102, 149603, 0, '', 0, '[{\"produit_id\":26,\"id\":26,\"id_categorie\":5,\"name\":\"Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz\",\"marque\":\"Corsair\",\"prix\":100,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"stock\":10,\"views\":152,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"DDR4\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"info\":\"\",\"categorie_name\":\"RAM\",\"quantity\":1}]', 0, 0, 0, 0, '', 0, 100, '2024-08-22 15:21:48'),
(33, 101, 101, 0, '', 0, '[{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":58,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1}]', 0, 0, 0, 0, '', 0, 200, '2024-08-23 07:53:29'),
(34, 101, 101, 0, '', 0, '[]', 0, 0, 0, 0, '', 0, 0, '2024-08-23 07:53:57'),
(35, 101, 101, 0, '176 rue de la convention', 75015, '[{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":60,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison express', 0, 212, '2024-08-23 07:54:08'),
(36, 578112, 101, 0, '', 0, '[{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":62,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1}]', 0, 0, 0, 0, '', 1, 200, '2024-08-23 07:54:45'),
(37, 521374, 149603, 0, '55 rue wac', 7015, '[{\"produit_id\":29,\"id\":29,\"id_categorie\":3,\"name\":\"MSI RTX 3060 TI Ventus 2X 8G OC\",\"marque\":\"MSI\",\"prix\":470,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"stock\":1000,\"views\":283,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":200,\"promo\":0,\"suggestion\":0,\"weight\":100,\"width\":1,\"height\":1,\"length\":1,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":1}]', 100, 1, 1, 1, 'Livraison standard', 1, 489.5, '2024-08-23 08:31:31'),
(38, 674497, 101, 0, '176 rue de la convention', 75015, '[{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":80,\"taille\":\"ETX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"\",\"categorie_name\":\"Boitier\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison express', 0, 203, '2024-08-26 08:49:09');

-- --------------------------------------------------------

--
-- Structure de la table `expedition`
--

CREATE TABLE `expedition` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `taxe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `expedition`
--

INSERT INTO `expedition` (`id`, `name`, `taxe`) VALUES
(1, 'Livraison standard', 7),
(2, 'Livraison express', 12),
(3, 'Point relais', 3);

-- --------------------------------------------------------

--
-- Structure de la table `information`
--

CREATE TABLE `information` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `adress` varchar(255) NOT NULL,
  `postal` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `pays` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `information`
--

INSERT INTO `information` (`id`, `id_user`, `adress`, `postal`, `prenom`, `nom`, `pays`) VALUES
(11, 101, '176 rue de la convention', '75015', 'brechard', 'tony', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `id_produit` int NOT NULL,
  `price_type` int NOT NULL DEFAULT '0',
  `image_type` varchar(255) NOT NULL DEFAULT 'null',
  `info` varchar(255) DEFAULT 'null'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id`, `id_user`, `id_produit`, `price_type`, `image_type`, `info`) VALUES
(187, 101, 32, 0, 'https://media.ldlc.com/r1600/ld/products/00/06/00/63/LD0006006359.jpg', 'null'),
(188, 101, 77, 0, 'https://media.ldlc.com/r374/ld/products/00/05/99/54/LD0005995434_0006059201.jpg', 'null'),
(189, 101, 76, 0, 'https://media.ldlc.com/r374/ld/products/00/06/07/49/LD0006074923.jpg', 'null'),
(190, 101, 79, 0, 'https://media.ldlc.com/r1600/ld/products/00/06/10/22/LD0006102201_0006102253.jpg', 'null'),
(191, 101, 80, 0, 'https://media.ldlc.com/r374/ld/products/00/06/00/94/LD0006009481.jpg', 'null'),
(192, 101, 78, 0, 'https://media.ldlc.com/r374/ld/products/00/06/04/04/LD0006040493.jpg', 'null'),
(193, 101, 74, 0, 'https://media.ldlc.com/r374/ld/products/00/06/12/43/LD0006124357.jpg', 'null'),
(194, 101, 75, 0, 'https://media.ldlc.com/r374/ld/products/00/06/00/31/LD0006003137.jpg', 'null');

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE `pays` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `taxe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`id`, `name`, `taxe`) VALUES
(1, 'France', 4),
(2, 'Germany', 9),
(3, 'Italy', 12),
(4, 'Spain', 11),
(5, 'Netherlands', 11),
(6, 'Belgium', 11),
(7, 'Sweden', 15),
(8, 'Norway', 15),
(9, 'Denmark', 15),
(10, 'France', 10),
(11, 'Finland', 14),
(12, 'Germany', 9),
(13, 'Austria', 10),
(14, 'Italy', 12),
(15, 'Portugal', 13),
(16, 'Spain', 11),
(17, 'Ireland', 13),
(18, 'Netherlands', 11),
(19, 'Greece', 14),
(20, 'Belgium', 11),
(21, 'Poland', 13),
(22, 'Sweden', 15),
(23, 'Norway', 15),
(24, 'Denmark', 15),
(25, 'Finland', 14),
(26, 'Austria', 10),
(27, 'Portugal', 13),
(28, 'Ireland', 13),
(29, 'Greece', 14),
(30, 'Poland', 13);

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
  `suggestion` int NOT NULL,
  `weight` int NOT NULL DEFAULT '0',
  `width` int NOT NULL DEFAULT '0',
  `height` int NOT NULL DEFAULT '0',
  `length` int NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `id_categorie`, `name`, `marque`, `prix`, `image`, `stock`, `views`, `taille`, `type`, `socket`, `typec`, `consommations`, `promo`, `suggestion`, `weight`, `width`, `height`, `length`, `create_time`) VALUES
(23, 1, 'Fractal Design Define R6 Black', 'Fractal', 179, 'https://media.ldlc.com/r1600/ld/products/00/04/76/70/LD0004767017_2.jpg', 0, 294, 'ATX', 'null', 'null', 'null', 0, 50, 1, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(24, 2, 'ASUS ROG STRIX B550-F GAMING (WI-FI) II', 'ASUS', 200, 'https://media.ldlc.com/r374/ld/products/00/05/91/26/LD0005912640_1.jpg', 50, 66, 'ATX', 'AMD', 'DDR4', 'AM4', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(25, 4, 'AMD Ryzen 9 5900X (3.7 GHz / 4.8 GHz)', 'AMD', 330, 'https://media.ldlc.com/r374/ld/products/00/05/74/60/LD0005746003_1.jpg', 20, 106, 'null', 'AMD', 'null', 'AM4', 0, 0, 1, 10, 1, 1, 1, '2024-08-23 10:18:59'),
(26, 5, 'Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz', 'Corsair', 100, 'https://media.ldlc.com/r374/ld/products/00/05/31/99/LD0005319901_2.jpg', 10, 154, 'null', 'null', 'DDR4', 'null', 0, 0, 1, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(27, 10, 'Corsair iCue H115i RGB PRO XT', 'Corsair', 150, 'https://media.ldlc.com/r374/ld/products/00/05/56/74/LD0005567419_2.jpg', 42, 18, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(28, 7, 'Samsung 980 PRO', 'Samsung', 100, 'https://media.ldlc.com/r374/ld/products/00/05/79/93/LD0005799307_1.jpg', 55, 54, 'null', 'null', 'null', 'null', 0, 100, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(29, 3, 'MSI RTX 3060 TI Ventus 2X 8G OC', 'MSI', 470, 'https://media.ldlc.com/r374/ld/products/00/05/78/85/LD0005788583_1.jpg', 1000, 287, 'null', 'null', 'null', 'null', 200, 0, 0, 100, 1, 1, 1, '2024-08-23 10:18:59'),
(32, 1, 'NZXT H9 Flow Blanc', 'NZXT', 189, 'https://media.ldlc.com/r1600/ld/products/00/06/00/63/LD0006006359.jpg', 5, 19, 'ATX', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(34, 6, 'Corsair RM750e 80PLUS Gold (ATX 3.0)', 'Corsair', 139, 'https://media.ldlc.com/r374/ld/products/00/06/02/94/LD0006029412.jpg', 55, 2, 'ATX', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(37, 13, 'Ducky Channel One 2 Mini RGB Noir (Cherry MX RGB Silent Red)', 'Ducky', 120, 'https://media.ldlc.com/r374/ld/products/00/05/14/59/LD0005145932_2.jpg', 10, 38, 'null', 'null', 'null', 'null', 0, 5, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(38, 12, 'Samsung 27\" LED - Odyssey ', 'Samsung', 200, 'https://media.ldlc.com/r374/ld/products/00/06/06/33/LD0006063366_0006063383.jpg', 10, 3, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(39, 14, 'HyperX Pulsefire Haste – Souris Gaming', 'HyperX', 40, 'https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_pulsefire_haste_black_red_2_back_angled_976x.jpg?v=1704382581', 10, 2, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(42, 1, 'NZXT H7 Elite RGB', 'NZXT', 180, 'https://nzxt.com/assets/cms/34299/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000', 50, 82, 'ETX', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(43, 2, 'ASUS ROG STRIX B550-A GAMING', 'ASUS', 180, 'https://media.ldlc.com/r374/ld/products/00/05/73/61/LD0005736124_1.jpg', 14, 4, 'ATX', 'AMD', 'DDR4', 'AM4', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(44, 4, 'Intel Core i7-14700KF (3.4 GHz / 5.6 GHz)', 'Intel', 469, 'https://media.ldlc.com/r374/ld/products/00/06/07/49/LD0006074904.jpg', 10, 5, 'null', 'Intel', 'null', 'LGA1700', 135, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(66, 9, 'be quiet! Dark Rock Elite', 'be quiet!', 120, 'https://media.ldlc.com/r374/ld/products/00/06/07/42/LD0006074253.jpg', 10, 2, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(72, 2, 'ASUS TUF GAMING B760-PLUS WIFI', 'ASUS', 200, 'https://media.ldlc.com/r374/ld/products/00/06/05/45/LD0006054587.jpg', 500, 1, 'ATX', 'Intel', 'DDR5', 'LGA1700', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 09:34:46'),
(74, 3, 'ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB', 'ASUS', 2499, 'https://media.ldlc.com/r374/ld/products/00/06/12/43/LD0006124357.jpg', 20, 1, '0', 'null', 'null', 'null', 400, 0, 1, 0, 0, 0, 0, '2024-08-27 10:34:16'),
(75, 2, 'ASUS ROG STRIX B760-F GAMING WIFI', 'ASUS', 255, 'https://media.ldlc.com/r374/ld/products/00/06/00/31/LD0006003137.jpg', 55, NULL, 'ATX', 'Intel', 'DDR5', 'LGA1700', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:37:57'),
(76, 4, 'Intel Core i9-14900K (3.2 GHz / 5.8 GHz)', 'Intel', 700, 'https://media.ldlc.com/r374/ld/products/00/06/07/49/LD0006074923.jpg', 1500, NULL, 'null', 'Intel', 'null', 'LGA1700', 150, 0, 0, 0, 0, 0, 0, '2024-08-27 10:38:59'),
(77, 5, 'Corsair Vengeance DDR5 128 Go (4 x 32 Go) 5600 MHz CL40 - Noir', 'Corsair', 600, 'https://media.ldlc.com/r374/ld/products/00/05/99/54/LD0005995434_0006059201.jpg', 500, NULL, 'null', 'null', 'DDR5', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:44:32'),
(78, 10, 'NZXT Kraken Elite 360 RGB', 'NZXT', 300, 'https://media.ldlc.com/r374/ld/products/00/06/04/04/LD0006040493.jpg', 500, NULL, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:46:08'),
(79, 7, 'Samsung SSD 990 EVO M.2 PCIe NVMe 2 To', 'Samsung', 219, 'https://media.ldlc.com/r1600/ld/products/00/06/10/22/LD0006102201_0006102253.jpg', 55, NULL, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:47:04'),
(80, 6, 'be quiet! Pure Power 12 M 1000W 80PLUS Gold', 'be quiet!', 184, 'https://media.ldlc.com/r374/ld/products/00/06/00/94/LD0006009481.jpg', 55, NULL, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:49:00');

-- --------------------------------------------------------

--
-- Structure de la table `produit_type`
--

CREATE TABLE `produit_type` (
  `id` int NOT NULL,
  `id_produit` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `outpout` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `image_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produit_type`
--

INSERT INTO `produit_type` (`id`, `id_produit`, `type`, `outpout`, `price`, `image_type`) VALUES
(1, 42, 'Couleur', 'Blanc', 10, 'https://nzxt.com/assets/cms/34299/1680240561-h7-elite-rgb-white-system.png?auto=format&fit=crop&h=1000&w=1000'),
(3, 37, 'Couleur', 'Blanc', 15, 'https://maxesport.gg/medias/2023/06/Ducky-One-2-Mini-RGB-Blanc-1-640x640.webp');

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
  `token` varchar(255) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `image` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `groupe`, `verification`, `token`, `create_time`, `image`) VALUES
(101, '[ADMIN]', 'admin@byp.fr', 'admin', 1, 1, 'dG9lckBnbWFpbC5Db216OnRvZXJAZ21haWwuQ29tejp0b2VyQGdtYWlsLkNvbXo=', '2024-08-01 11:27:08.000000', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6yRl7inTe-TYHMkv8u7-HtFRY_NCPTjgcgg&s'),
(102, 'toer@gmail.Comzds', 'toer@gmail.Comzds', 'toer@gmail.Comzds', 1, 1, 'dG9lckBnbWFpbC5Db216OnRvZXJAZ21haWwuQ29tejp0b2VyQGdtYWlsLkzNvbXo=', '2024-08-22 11:27:08.000000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e553ed1c-3fc1-40f2-973a-daab0e50aecc/d6u8wr9-e719c2ff-fdff-4d85-970d-1a273ec90813.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTNlZDFjLTNmYzEtNDBmMi05NzNhLWRhYWIwZTUwYWVjY1wvZDZ1OHdyOS1lNzE5YzJmZi1mZGZmLTRkODUtOTcwZC0xYTI3M2VjOTA4MTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1-OjdOveisTeE7aEX1YrRqkTWb47CNTWBYzZaL_Hdgw'),
(103, 'toer@gmail.Comza', 'toer@gmail.Comza', 'toer@gmail.Comza', 1, 1, 'dG9lckBnbWFpbC5Db216OnRvZXJAZ21haWwuQ29tejp0b2VyQGdtYWlsLkNvbXao=', '2024-08-02 11:27:08.000000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e553ed1c-3fc1-40f2-973a-daab0e50aecc/d6u8wr9-e719c2ff-fdff-4d85-970d-1a273ec90813.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTNlZDFjLTNmYzEtNDBmMi05NzNhLWRhYWIwZTUwYWVjY1wvZDZ1OHdyOS1lNzE5YzJmZi1mZGZmLTRkODUtOTcwZC0xYTI3M2VjOTA4MTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1-OjdOveisTeE7aEX1YrRqkTWb47CNTWBYzZaL_Hdgw'),
(104, 'toer@gmail.Comzeeee', 'toer@gmail.Comzeee', 'toer@gmail.Comzeee', 1, 1, 'dG9lckBnbWFpbC5Db216OnRvZXJAZ21haWwuQ29tejp0b2VyQGdtYWlsLkNevbXo=', '2024-08-02 11:27:08.000000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e553ed1c-3fc1-40f2-973a-daab0e50aecc/d6u8wr9-e719c2ff-fdff-4d85-970d-1a273ec90813.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTNlZDFjLTNmYzEtNDBmMi05NzNhLWRhYWIwZTUwYWVjY1wvZDZ1OHdyOS1lNzE5YzJmZi1mZGZmLTRkODUtOTcwZC0xYTI3M2VjOTA4MTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1-OjdOveisTeE7aEX1YrRqkTWb47CNTWBYzZaL_Hdgw'),
(105, 'wac', 'wac@gmail.com', 'wac2', 1, 1, 'd2FjQGdtYWlsLmNvbTp3YWM6d2Fj', '2024-08-06 11:29:24.000000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e553ed1c-3fc1-40f2-973a-daab0e50aecc/d6u8wr9-e719c2ff-fdff-4d85-970d-1a273ec90813.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTNlZDFjLTNmYzEtNDBmMi05NzNhLWRhYWIwZTUwYWVjY1wvZDZ1OHdyOS1lNzE5YzJmZi1mZGZmLTRkODUtOTcwZC0xYTI3M2VjOTA4MTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1-OjdOveisTeE7aEX1YrRqkTWb47CNTWBYzZaL_Hdgw'),
(106, 'test75', 'TEST1@gmail.com', 'test50', 0, 1, 'VEVTVDFAZ21haWwuY29tOnRlc3Q3NTp0ZXN0NzU=', '2024-08-06 12:35:10.000000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e553ed1c-3fc1-40f2-973a-daab0e50aecc/d6u8wr9-e719c2ff-fdff-4d85-970d-1a273ec90813.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTNlZDFjLTNmYzEtNDBmMi05NzNhLWRhYWIwZTUwYWVjY1wvZDZ1OHdyOS1lNzE5YzJmZi1mZGZmLTRkODUtOTcwZC0xYTI3M2VjOTA4MTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1-OjdOveisTeE7aEX1YrRqkTWb47CNTWBYzZaL_Hdgw'),
(107, 'lamort75@gmail.com', 'lamort75@gmail.com', 'lamort', 0, 1, 'bGFtb3J0NzVAZ21haWwuY29tOmxhbW9ydDpsYW1vcnQ3NUBnbWFpbC5jb20=', '2024-08-21 07:31:25.000000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e553ed1c-3fc1-40f2-973a-daab0e50aecc/d6u8wr9-e719c2ff-fdff-4d85-970d-1a273ec90813.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTNlZDFjLTNmYzEtNDBmMi05NzNhLWRhYWIwZTUwYWVjY1wvZDZ1OHdyOS1lNzE5YzJmZi1mZGZmLTRkODUtOTcwZC0xYTI3M2VjOTA4MTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1-OjdOveisTeE7aEX1YrRqkTWb47CNTWBYzZaL_Hdgw'),
(108, 'wwaccc@gmail.Com', 'wwaccc@gmail.Com', 'wwaccc@gmail.Com', 0, 1, 'd3dhY2NjQGdtYWlsLkNvbTp3d2FjY2NAZ21haWwuQ29tOnd3YWNjY0BnbWFpbC5Db20=', '2024-08-21 08:13:08.000000', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e553ed1c-3fc1-40f2-973a-daab0e50aecc/d6u8wr9-e719c2ff-fdff-4d85-970d-1a273ec90813.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1NTNlZDFjLTNmYzEtNDBmMi05NzNhLWRhYWIwZTUwYWVjY1wvZDZ1OHdyOS1lNzE5YzJmZi1mZGZmLTRkODUtOTcwZC0xYTI3M2VjOTA4MTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1-OjdOveisTeE7aEX1YrRqkTWb47CNTWBYzZaL_Hdgw');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `achat`
--
ALTER TABLE `achat`
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `expedition`
--
ALTER TABLE `expedition`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `produit_type`
--
ALTER TABLE `produit_type`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT pour la table `achat`
--
ALTER TABLE `achat`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `alert_email`
--
ALTER TABLE `alert_email`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `code_promo`
--
ALTER TABLE `code_promo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `expedition`
--
ALTER TABLE `expedition`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `information`
--
ALTER TABLE `information`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT pour la table `produit_type`
--
ALTER TABLE `produit_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

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
