-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 02 sep. 2024 à 12:22
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
(30, 101, 42, 5, 'j\'adore'),
(31, 101, 74, 5, 'test'),
(32, 101, 25, 5, 'j\'adore AMD best marque ever made '),
(33, 101, 82, 5, 'Jadore'),
(34, 101, 82, 4, 'Jadore 2'),
(35, 101, 82, 4, 'Jadore 3'),
(36, 101, 74, 4, 'test'),
(37, 101, 74, 2, 'nul'),
(38, 101, 74, 5, 'salut');

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
  `id_commande` int NOT NULL DEFAULT '0',
  `id_user` int NOT NULL,
  `name` varchar(255) NOT NULL,
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

INSERT INTO `commande` (`id`, `id_commande`, `id_user`, `name`, `status`, `adresse`, `code`, `produits`, `weight`, `width`, `height`, `length`, `mode_expe`, `papier`, `prix`, `date`) VALUES
(43, 669704, 101, 'tony', 2, '176 rue de la convention', 75015, '[{\"produit_id\":42,\"id\":42,\"id_categorie\":1,\"name\":\"NZXT H7 Elite RGB\",\"marque\":\"NZXT\",\"prix\":180,\"image\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"stock\":50,\"views\":83,\"taille\":\"ATX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/nzxt.com\\/assets\\/cms\\/34299\\/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000\",\"info\":\"null\",\"categorie_name\":\"Boitier\",\"quantity\":1},{\"produit_id\":74,\"id\":74,\"id_categorie\":3,\"name\":\"ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB\",\"marque\":\"ASUS\",\"prix\":2499,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"stock\":20,\"views\":1,\"taille\":\"0\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":400,\"promo\":0,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:34:16\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"info\":\"null\",\"categorie_name\":\"Carte graphique\",\"quantity\":1},{\"produit_id\":75,\"id\":75,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B760-F GAMING WIFI\",\"marque\":\"ASUS\",\"prix\":255,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/31\\/LD0006003137.jpg\",\"stock\":55,\"views\":null,\"taille\":\"ATX\",\"type\":\"Intel\",\"socket\":\"DDR5\",\"typec\":\"LGA1700\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:37:57\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/31\\/LD0006003137.jpg\",\"info\":\"null\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1},{\"produit_id\":76,\"id\":76,\"id_categorie\":4,\"name\":\"Intel Core i9-14900K (3.2 GHz \\/ 5.8 GHz)\",\"marque\":\"Intel\",\"prix\":700,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/07\\/49\\/LD0006074923.jpg\",\"stock\":1500,\"views\":null,\"taille\":\"null\",\"type\":\"Intel\",\"socket\":\"null\",\"typec\":\"LGA1700\",\"consommations\":150,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:38:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/07\\/49\\/LD0006074923.jpg\",\"info\":\"null\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":77,\"id\":77,\"id_categorie\":5,\"name\":\"Corsair Vengeance DDR5 128 Go (4 x 32 Go) 5600 MHz CL40 - Noir\",\"marque\":\"Corsair\",\"prix\":600,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/99\\/54\\/LD0005995434_0006059201.jpg\",\"stock\":500,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"DDR5\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:44:32\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/99\\/54\\/LD0005995434_0006059201.jpg\",\"info\":\"null\",\"categorie_name\":\"RAM\",\"quantity\":1},{\"produit_id\":78,\"id\":78,\"id_categorie\":10,\"name\":\"NZXT Kraken Elite 360 RGB\",\"marque\":\"NZXT\",\"prix\":300,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/04\\/04\\/LD0006040493.jpg\",\"stock\":500,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:46:08\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/04\\/04\\/LD0006040493.jpg\",\"info\":\"null\",\"categorie_name\":\"Aio\",\"quantity\":1},{\"produit_id\":79,\"id\":79,\"id_categorie\":7,\"name\":\"Samsung SSD 990 EVO M.2 PCIe NVMe 2 To\",\"marque\":\"Samsung\",\"prix\":219,\"image\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/06\\/10\\/22\\/LD0006102201_0006102253.jpg\",\"stock\":55,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:47:04\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/06\\/10\\/22\\/LD0006102201_0006102253.jpg\",\"info\":\"null\",\"categorie_name\":\"Ssd\",\"quantity\":1},{\"produit_id\":80,\"id\":80,\"id_categorie\":6,\"name\":\"be quiet! Pure Power 12 M 1000W 80PLUS Gold\",\"marque\":\"be quiet!\",\"prix\":184,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/94\\/LD0006009481.jpg\",\"stock\":55,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:49:00\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/94\\/LD0006009481.jpg\",\"info\":\"null\",\"categorie_name\":\"Alimentation\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison standard', 0, 4955, '2024-08-27 14:55:27'),
(44, 577952, 101, 'tony', 2, '176 rue de la convention', 75015, '[{\"produit_id\":23,\"id\":23,\"id_categorie\":1,\"name\":\"Fractal Design Define R6 Black\",\"marque\":\"Fractal\",\"prix\":179,\"image\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/04\\/76\\/70\\/LD0004767017_2.jpg\",\"stock\":0,\"views\":294,\"taille\":\"ATX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":50,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/04\\/76\\/70\\/LD0004767017_2.jpg\",\"info\":\"null\",\"categorie_name\":\"Boitier\",\"quantity\":1},{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":66,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"null\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1},{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"views\":106,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"null\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":26,\"id\":26,\"id_categorie\":5,\"name\":\"Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz\",\"marque\":\"Corsair\",\"prix\":100,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"stock\":10,\"views\":154,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"DDR4\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"info\":\"null\",\"categorie_name\":\"RAM\",\"quantity\":1},{\"produit_id\":27,\"id\":27,\"id_categorie\":10,\"name\":\"Corsair iCue H115i RGB PRO XT\",\"marque\":\"Corsair\",\"prix\":150,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/56\\/74\\/LD0005567419_2.jpg\",\"stock\":42,\"views\":18,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/56\\/74\\/LD0005567419_2.jpg\",\"info\":\"null\",\"categorie_name\":\"Aio\",\"quantity\":1},{\"produit_id\":28,\"id\":28,\"id_categorie\":7,\"name\":\"Samsung 980 PRO\",\"marque\":\"Samsung\",\"prix\":100,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/79\\/93\\/LD0005799307_1.jpg\",\"stock\":55,\"views\":54,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":100,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/79\\/93\\/LD0005799307_1.jpg\",\"info\":\"null\",\"categorie_name\":\"Ssd\",\"quantity\":1},{\"produit_id\":29,\"id\":29,\"id_categorie\":3,\"name\":\"MSI RTX 3060 TI Ventus 2X 8G OC\",\"marque\":\"MSI\",\"prix\":470,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"stock\":1000,\"views\":287,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":200,\"promo\":0,\"suggestion\":0,\"weight\":100,\"width\":1,\"height\":1,\"length\":1,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"info\":\"null\",\"categorie_name\":\"Carte graphique\",\"quantity\":1},{\"produit_id\":34,\"id\":34,\"id_categorie\":6,\"name\":\"Corsair RM750e 80PLUS Gold (ATX 3.0)\",\"marque\":\"Corsair\",\"prix\":139,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/02\\/94\\/LD0006029412.jpg\",\"stock\":55,\"views\":2,\"taille\":\"ATX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/02\\/94\\/LD0006029412.jpg\",\"info\":\"null\",\"categorie_name\":\"Alimentation\",\"quantity\":1}]', 110, 2, 2, 2, 'Livraison standard', 0, 1499.15, '2024-08-27 14:57:06'),
(46, 698618, 101, 'tony', 2, '176 rue de la convention', 75015, '[{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":68,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1},{\"produit_id\":74,\"id\":74,\"id_categorie\":3,\"name\":\"ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB\",\"marque\":\"ASUS\",\"prix\":2499,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"stock\":20,\"views\":6,\"taille\":\"0\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":400,\"promo\":0,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:34:16\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"info\":\"outpout\",\"categorie_name\":\"Carte graphique\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison standard', 0, 2719, '2024-08-29 08:06:35'),
(47, 674052, 101, 'brechard tony', 2, '176 rue de la convention', 75015, '[{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":70,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1},{\"produit_id\":32,\"id\":32,\"id_categorie\":1,\"name\":\"NZXT H9 Flow Blanc\",\"marque\":\"NZXT\",\"prix\":189,\"image\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/06\\/00\\/63\\/LD0006006359.jpg\",\"stock\":5,\"views\":19,\"taille\":\"ATX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/06\\/00\\/63\\/LD0006006359.jpg\",\"info\":\"null\",\"categorie_name\":\"Boitier\",\"quantity\":1},{\"produit_id\":75,\"id\":75,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B760-F GAMING WIFI\",\"marque\":\"ASUS\",\"prix\":255,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/31\\/LD0006003137.jpg\",\"stock\":55,\"views\":null,\"taille\":\"ATX\",\"type\":\"Intel\",\"socket\":\"DDR5\",\"typec\":\"LGA1700\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:37:57\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/31\\/LD0006003137.jpg\",\"info\":\"null\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1},{\"produit_id\":76,\"id\":76,\"id_categorie\":4,\"name\":\"Intel Core i9-14900K (3.2 GHz \\/ 5.8 GHz)\",\"marque\":\"Intel\",\"prix\":700,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/07\\/49\\/LD0006074923.jpg\",\"stock\":1500,\"views\":null,\"taille\":\"null\",\"type\":\"Intel\",\"socket\":\"null\",\"typec\":\"LGA1700\",\"consommations\":150,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:38:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/07\\/49\\/LD0006074923.jpg\",\"info\":\"null\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":77,\"id\":77,\"id_categorie\":5,\"name\":\"Corsair Vengeance DDR5 128 Go (4 x 32 Go) 5600 MHz CL40 - Noir\",\"marque\":\"Corsair\",\"prix\":600,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/99\\/54\\/LD0005995434_0006059201.jpg\",\"stock\":500,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"DDR5\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:44:32\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/99\\/54\\/LD0005995434_0006059201.jpg\",\"info\":\"null\",\"categorie_name\":\"RAM\",\"quantity\":3},{\"produit_id\":78,\"id\":78,\"id_categorie\":10,\"name\":\"NZXT Kraken Elite 360 RGB\",\"marque\":\"NZXT\",\"prix\":300,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/04\\/04\\/LD0006040493.jpg\",\"stock\":500,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:46:08\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/04\\/04\\/LD0006040493.jpg\",\"info\":\"null\",\"categorie_name\":\"Aio\",\"quantity\":1},{\"produit_id\":79,\"id\":79,\"id_categorie\":7,\"name\":\"Samsung SSD 990 EVO M.2 PCIe NVMe 2 To\",\"marque\":\"Samsung\",\"prix\":219,\"image\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/06\\/10\\/22\\/LD0006102201_0006102253.jpg\",\"stock\":55,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:47:04\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/06\\/10\\/22\\/LD0006102201_0006102253.jpg\",\"info\":\"null\",\"categorie_name\":\"Ssd\",\"quantity\":1},{\"produit_id\":80,\"id\":80,\"id_categorie\":6,\"name\":\"be quiet! Pure Power 12 M 1000W 80PLUS Gold\",\"marque\":\"be quiet!\",\"prix\":184,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/94\\/LD0006009481.jpg\",\"stock\":55,\"views\":null,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:49:00\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/00\\/94\\/LD0006009481.jpg\",\"info\":\"null\",\"categorie_name\":\"Alimentation\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison express', 0, 3870, '2024-08-29 13:59:35'),
(48, 935206, 149603, 'admin admin', 0, '0 admin', 0, '[{\"produit_id\":23,\"id\":23,\"id_categorie\":1,\"name\":\"Fractal Design Define R6 Black\",\"marque\":\"Fractal\",\"prix\":179,\"image\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/04\\/76\\/70\\/LD0004767017_2.jpg\",\"stock\":0,\"views\":294,\"taille\":\"ATX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":50,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r1600\\/ld\\/products\\/00\\/04\\/76\\/70\\/LD0004767017_2.jpg\",\"info\":\"null\",\"categorie_name\":\"Boitier\",\"quantity\":1},{\"produit_id\":24,\"id\":24,\"id_categorie\":2,\"name\":\"ASUS ROG STRIX B550-F GAMING (WI-FI) II\",\"marque\":\"ASUS\",\"prix\":200,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"stock\":50,\"views\":70,\"taille\":\"ATX\",\"type\":\"AMD\",\"socket\":\"DDR4\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/91\\/26\\/LD0005912640_1.jpg\",\"info\":\"null\",\"categorie_name\":\"Carte m\\u00e8re\",\"quantity\":1},{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"views\":106,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"null\",\"categorie_name\":\"CPU\",\"quantity\":1},{\"produit_id\":26,\"id\":26,\"id_categorie\":5,\"name\":\"Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz\",\"marque\":\"Corsair\",\"prix\":100,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"stock\":10,\"views\":154,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"DDR4\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/31\\/99\\/LD0005319901_2.jpg\",\"info\":\"null\",\"categorie_name\":\"RAM\",\"quantity\":1},{\"produit_id\":27,\"id\":27,\"id_categorie\":10,\"name\":\"Corsair iCue H115i RGB PRO XT\",\"marque\":\"Corsair\",\"prix\":150,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/56\\/74\\/LD0005567419_2.jpg\",\"stock\":42,\"views\":18,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/56\\/74\\/LD0005567419_2.jpg\",\"info\":\"null\",\"categorie_name\":\"Aio\",\"quantity\":1},{\"produit_id\":28,\"id\":28,\"id_categorie\":7,\"name\":\"Samsung 980 PRO\",\"marque\":\"Samsung\",\"prix\":100,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/79\\/93\\/LD0005799307_1.jpg\",\"stock\":55,\"views\":54,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":100,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/79\\/93\\/LD0005799307_1.jpg\",\"info\":\"null\",\"categorie_name\":\"Ssd\",\"quantity\":1},{\"produit_id\":29,\"id\":29,\"id_categorie\":3,\"name\":\"MSI RTX 3060 TI Ventus 2X 8G OC\",\"marque\":\"MSI\",\"prix\":470,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"stock\":1000,\"views\":287,\"taille\":\"null\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":200,\"promo\":0,\"suggestion\":0,\"weight\":100,\"width\":1,\"height\":1,\"length\":1,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/78\\/85\\/LD0005788583_1.jpg\",\"info\":\"null\",\"categorie_name\":\"Carte graphique\",\"quantity\":1},{\"produit_id\":34,\"id\":34,\"id_categorie\":6,\"name\":\"Corsair RM750e 80PLUS Gold (ATX 3.0)\",\"marque\":\"Corsair\",\"prix\":139,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/02\\/94\\/LD0006029412.jpg\",\"stock\":55,\"views\":2,\"taille\":\"ATX\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":0,\"promo\":0,\"suggestion\":0,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/02\\/94\\/LD0006029412.jpg\",\"info\":\"null\",\"categorie_name\":\"Alimentation\",\"quantity\":1}]', 110, 2, 2, 2, 'Livraison standard', 1, 1491.15, '2024-08-29 14:14:03'),
(49, 963372, 149603, 'admin admin', 0, '0 admin', 0, '[{\"produit_id\":74,\"id\":74,\"id_categorie\":3,\"name\":\"ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB\",\"marque\":\"ASUS\",\"prix\":2499,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"stock\":20,\"vendu\":0,\"views\":16,\"taille\":\"0\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":400,\"promo\":50,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:34:16\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison standard', 0, 1260.5, '2024-08-30 08:15:13'),
(50, 253663, 149603, 'admin admin', 0, '0 admin', 0, '[{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"vendu\":0,\"views\":108,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"\",\"categorie_name\":\"CPU\",\"quantity\":1}]', 10, 1, 1, 1, 'Livraison standard', 0, 341.15, '2024-08-30 08:23:27'),
(51, 800570, 149603, 'admin admin', 0, '0 admin', 0, '[{\"produit_id\":25,\"id\":25,\"id_categorie\":4,\"name\":\"AMD Ryzen 9 5900X (3.7 GHz \\/ 4.8 GHz)\",\"marque\":\"AMD\",\"prix\":330,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"stock\":20,\"vendu\":0,\"views\":110,\"taille\":\"null\",\"type\":\"AMD\",\"socket\":\"null\",\"typec\":\"AM4\",\"consommations\":0,\"promo\":0,\"suggestion\":1,\"weight\":10,\"width\":1,\"height\":1,\"length\":1,\"create_time\":\"2024-08-23 10:18:59\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/05\\/74\\/60\\/LD0005746003_1.jpg\",\"info\":\"\",\"categorie_name\":\"CPU\",\"quantity\":1}]', 10, 1, 1, 1, 'Livraison standard', 0, 341.15, '2024-08-30 08:26:33'),
(52, 161748, 149603, 'admin admin', 0, '0 admin', 0, '[{\"produit_id\":74,\"id\":74,\"id_categorie\":3,\"name\":\"ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB\",\"marque\":\"ASUS\",\"prix\":2499,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"stock\":20,\"vendu\":0,\"views\":18,\"taille\":\"0\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":400,\"promo\":50,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:34:16\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":1}]', 0, 0, 0, 0, 'Livraison standard', 0, 1260.5, '2024-08-30 08:28:24'),
(53, 309410, 149603, 'admin admin', 0, '0 admin', 0, '[{\"produit_id\":74,\"id\":74,\"id_categorie\":3,\"name\":\"ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB\",\"marque\":\"ASUS\",\"prix\":2499,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"stock\":20,\"vendu\":0,\"views\":20,\"taille\":\"0\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":400,\"promo\":50,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:34:16\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":1}]', 0, 0, 0, 0, '', 0, 1253.5, '2024-08-30 08:29:07'),
(54, 240223, 101, ' ', 0, '', 0, '[{\"produit_id\":74,\"id\":74,\"id_categorie\":3,\"name\":\"ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB\",\"marque\":\"ASUS\",\"prix\":2499,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"stock\":19,\"vendu\":1,\"views\":24,\"taille\":\"0\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":400,\"promo\":50,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:34:16\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":5}]', 0, 0, 0, 0, '', 0, 6247.5, '2024-08-30 08:29:53'),
(55, 989718, 101, ' ', 2, '', 0, '[{\"produit_id\":74,\"id\":74,\"id_categorie\":3,\"name\":\"ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB\",\"marque\":\"ASUS\",\"prix\":2499,\"image\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"stock\":18,\"vendu\":2,\"views\":26,\"taille\":\"0\",\"type\":\"null\",\"socket\":\"null\",\"typec\":\"null\",\"consommations\":400,\"promo\":50,\"suggestion\":1,\"weight\":0,\"width\":0,\"height\":0,\"length\":0,\"create_time\":\"2024-08-27 10:34:16\",\"price_type\":0,\"image_type\":\"https:\\/\\/media.ldlc.com\\/r374\\/ld\\/products\\/00\\/06\\/12\\/43\\/LD0006124357.jpg\",\"info\":\"\",\"categorie_name\":\"Carte graphique\",\"quantity\":3}]', 0, 0, 0, 0, '', 0, 3748.5, '2024-08-30 08:32:08');

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
(11, 101, '176 rue de la convention', '75015', 'brechard', 'tony', 'France'),
(12, 101, '175 rue de wac', '75010', 'brechard', 'tony', 'Spain');

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
(264, 1, 23, 0, 'https://media.ldlc.com/r1600/ld/products/00/04/76/70/LD0004767017_2.jpg', 'null'),
(265, 1, 25, 0, 'https://media.ldlc.com/r374/ld/products/00/05/74/60/LD0005746003_1.jpg', 'null'),
(266, 1, 24, 0, 'https://media.ldlc.com/r374/ld/products/00/05/91/26/LD0005912640_1.jpg', 'null'),
(267, 1, 28, 0, 'https://media.ldlc.com/r374/ld/products/00/05/79/93/LD0005799307_1.jpg', 'null'),
(268, 1, 29, 0, 'https://media.ldlc.com/r374/ld/products/00/05/78/85/LD0005788583_1.jpg', 'null'),
(269, 1, 27, 0, 'https://media.ldlc.com/r374/ld/products/00/05/56/74/LD0005567419_2.jpg', 'null'),
(270, 1, 34, 0, 'https://media.ldlc.com/r374/ld/products/00/06/02/94/LD0006029412.jpg', 'null'),
(271, 1, 26, 0, 'https://media.ldlc.com/r374/ld/products/00/05/31/99/LD0005319901_2.jpg', 'null'),
(299, 149603, 74, 0, 'https://media.ldlc.com/r374/ld/products/00/06/12/43/LD0006124357.jpg', '');

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
  `vendu` int NOT NULL DEFAULT '0',
  `description` varchar(500) NOT NULL DEFAULT 'Bientôt',
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

INSERT INTO `produits` (`id`, `id_categorie`, `name`, `marque`, `prix`, `image`, `stock`, `vendu`, `description`, `views`, `taille`, `type`, `socket`, `typec`, `consommations`, `promo`, `suggestion`, `weight`, `width`, `height`, `length`, `create_time`) VALUES
(23, 1, 'Fractal Design Define R6 Black', 'Fractal', 179, 'https://media.ldlc.com/r1600/ld/products/00/04/76/70/LD0004767017_2.jpg', 0, 0, 'Le NZXT H5 Flow RGB est un boîtier PC Gaming moderne équipé d\'un panneau latéral en verre trempé et de ventilateurs RGB 140 mm en façade. Il dispose de toutes les caractéristiques que l\'on est en droit d\'attendre d\'un boîtier PC Gaming.', 305, 'ATX', 'null', 'null', 'null', 0, 50, 1, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(24, 2, 'ASUS ROG STRIX B550-F GAMING (WI-FI) II', 'ASUS', 200, 'https://media.ldlc.com/r374/ld/products/00/05/91/26/LD0005912640_1.jpg', 50, 0, 'je test', 81, 'ATX', 'AMD', 'DDR4', 'AM4', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(25, 4, 'AMD Ryzen 9 5900X (3.7 GHz / 4.8 GHz)', 'AMD', 330, 'https://media.ldlc.com/r374/ld/products/00/05/74/60/LD0005746003_1.jpg', 20, 0, 'Bientôt', 114, 'null', 'AMD', 'null', 'AM4', 0, 0, 1, 10, 1, 1, 1, '2024-08-23 10:18:59'),
(26, 5, 'Corsair Vengeance LPX 32go (2x 16 Go) DDR4 3200 MHz', 'Corsair', 100, 'https://media.ldlc.com/r374/ld/products/00/05/31/99/LD0005319901_2.jpg', 10, 0, 'Bientôt', 160, 'null', 'null', 'DDR4', 'null', 0, 0, 1, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(27, 10, 'Corsair iCue H115i RGB PRO XT', 'Corsair', 150, 'https://media.ldlc.com/r374/ld/products/00/05/56/74/LD0005567419_2.jpg', 42, 0, 'Bientôt', 18, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(28, 7, 'Samsung 980 PRO', 'Samsung', 100, 'https://media.ldlc.com/r374/ld/products/00/05/79/93/LD0005799307_1.jpg', 55, 0, 'Bientôt', 54, 'null', 'null', 'null', 'null', 0, 100, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(29, 3, 'MSI RTX 3060 TI Ventus 2X 8G OC', 'MSI', 470, 'https://media.ldlc.com/r374/ld/products/00/05/78/85/LD0005788583_1.jpg', 1000, 0, 'Bientôt', 289, 'null', 'null', 'null', 'null', 200, 0, 0, 100, 1, 1, 1, '2024-08-23 10:18:59'),
(32, 1, 'NZXT H9 Flow Blanc', 'NZXT', 189, 'https://media.ldlc.com/r1600/ld/products/00/06/00/63/LD0006006359.jpg', 5, 0, 'Bientôt', 19, 'ATX', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(34, 6, 'Corsair RM750e 80PLUS Gold (ATX 3.0)', 'Corsair', 139, 'https://media.ldlc.com/r374/ld/products/00/06/02/94/LD0006029412.jpg', 55, 0, 'Bientôt', 2, 'ATX', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(37, 13, 'Ducky Channel One 2 Mini RGB Noir (Cherry MX RGB Silent Red)', 'Ducky', 120, 'https://media.ldlc.com/r374/ld/products/00/05/14/59/LD0005145932_2.jpg', 10, 0, 'Bientôt', 38, 'null', 'null', 'null', 'null', 0, 5, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(38, 12, 'Samsung 27\" LED - Odyssey ', 'Samsung', 200, 'https://media.ldlc.com/r374/ld/products/00/06/06/33/LD0006063366_0006063383.jpg', 10, 0, 'Bientôt', 3, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(39, 14, 'HyperX Pulsefire Haste – Souris Gaming', 'HyperX', 40, 'https://cdn.shopify.com/s/files/1/0551/0548/6979/files/hyperx_pulsefire_haste_black_red_2_back_angled_976x.jpg?v=1704382581', 10, 0, 'Bientôt', 2, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(42, 1, 'NZXT H7 Elite RGB', 'NZXT', 180, 'https://nzxt.com/assets/cms/34299/1680241561-h7-elite-rgb-black-system.png?auto=format&fit=crop&h=1000&w=1000', 50, 1, 'Bientôt', 88, 'ATX', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(43, 2, 'ASUS ROG STRIX B550-A GAMING', 'ASUS', 180, 'https://media.ldlc.com/r374/ld/products/00/05/73/61/LD0005736124_1.jpg', 14, 0, 'Bientôt', 4, 'ATX', 'AMD', 'DDR4', 'AM4', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(44, 4, 'Intel Core i7-14700KF (3.4 GHz / 5.6 GHz)', 'Intel', 469, 'https://media.ldlc.com/r374/ld/products/00/06/07/49/LD0006074904.jpg', 10, 0, 'Bientôt', 5, 'null', 'Intel', 'null', 'LGA1700', 135, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(66, 9, 'be quiet! Dark Rock Elite', 'be quiet!', 120, 'https://media.ldlc.com/r374/ld/products/00/06/07/42/LD0006074253.jpg', 10, 0, 'Bientôt', 2, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 10:18:59'),
(72, 2, 'ASUS TUF GAMING B760-PLUS WIFI', 'ASUS', 200, 'https://media.ldlc.com/r374/ld/products/00/06/05/45/LD0006054587.jpg', 500, 0, 'Bientôt', 1, 'ATX', 'Intel', 'DDR5', 'LGA1700', 0, 0, 0, 0, 0, 0, 0, '2024-08-23 09:34:46'),
(74, 3, 'ASUS ROG Strix GeForce RTX 4090 BTF OC Edition 24GB', 'ASUS', 2499, 'https://media.ldlc.com/r374/ld/products/00/06/12/43/LD0006124357.jpg', 15, 5, 'Bientôt', 53, '0', 'null', 'null', 'null', 400, 50, 1, 0, 0, 0, 0, '2024-08-27 10:34:16'),
(75, 2, 'ASUS ROG STRIX B760-F GAMING WIFI', 'ASUS', 255, 'https://media.ldlc.com/r374/ld/products/00/06/00/31/LD0006003137.jpg', 55, 0, 'Bientôt', NULL, 'ATX', 'Intel', 'DDR5', 'LGA1700', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:37:57'),
(76, 4, 'Intel Core i9-14900K (3.2 GHz / 5.8 GHz)', 'Intel', 700, 'https://media.ldlc.com/r374/ld/products/00/06/07/49/LD0006074923.jpg', 1500, 0, 'Bientôt', NULL, 'null', 'Intel', 'null', 'LGA1700', 150, 0, 0, 0, 0, 0, 0, '2024-08-27 10:38:59'),
(77, 5, 'Corsair Vengeance DDR5 128 Go (4 x 32 Go) 5600 MHz CL40 - Noir', 'Corsair', 600, 'https://media.ldlc.com/r374/ld/products/00/05/99/54/LD0005995434_0006059201.jpg', 500, 0, 'Bientôt', NULL, 'null', 'null', 'DDR5', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:44:32'),
(78, 10, 'NZXT Kraken Elite 360 RGB', 'NZXT', 300, 'https://media.ldlc.com/r374/ld/products/00/06/04/04/LD0006040493.jpg', 500, 0, 'Bientôt', NULL, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:46:08'),
(79, 7, 'Samsung SSD 990 EVO M.2 PCIe NVMe 2 To', 'Samsung', 219, 'https://media.ldlc.com/r1600/ld/products/00/06/10/22/LD0006102201_0006102253.jpg', 55, 0, 'Bientôt', NULL, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:47:04'),
(80, 6, 'be quiet! Pure Power 12 M 1000W 80PLUS Gold', 'be quiet!', 184, 'https://media.ldlc.com/r374/ld/products/00/06/00/94/LD0006009481.jpg', 55, 0, 'Bientôt', NULL, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 10:49:00'),
(81, 3, 'Gigabyte GeForce RTX 3080 Ti VISION OC 12G', 'Gigabyte', 1500, 'https://media.ldlc.com/r374/ld/products/00/05/83/93/LD0005839323_1.jpg', 55, 0, 'Bientôt', 3, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-08-27 14:52:59'),
(82, 3, 'ASUS TUF Gaming GeForce RTX 4070 Ti SUPER OC Edition 16GB', 'ASUS', 999, 'https://media.ldlc.com/r374/ld/products/00/06/09/73/LD0006097327.jpg', 50, 0, 'Bientôt', 14, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-09-02 09:50:11'),
(83, 7, 'Disque dur SSD CRUCIAL P3 Plus 1 To PCIe 4.0 NVMe M.2 2280', 'CRUCIAL', 132, 'https://www.cdiscount.com/pdt2/s/d/8/1/700x700/ct2000p3pssd8/rw/disque-dur-ssd-crucial-p3-plus-2-to-pcie-4-0-nvme.jpg', 55, 0, 'Le SSD Crucial P3 grâce à son interface PCIe 3.0 offre des performances près de 6 fois supérieures à celles des disques SSD SATA et 22 fois supérieures à celles des disques durs classiques. Le P3 optimise le matériel existant et est une solution plus économique que l\'achat de nouveaux systèmes', 30, 'null', 'null', 'null', 'null', 0, 0, 0, 0, 0, 0, 0, '2024-09-02 11:25:29');

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
(3, 37, 'Couleur', 'Blanc', 15, 'https://maxesport.gg/medias/2023/06/Ducky-One-2-Mini-RGB-Blanc-1-640x640.webp'),
(4, 82, 'Couleur', 'Blanc', 115, 'https://media.ldlc.com/r374/ld/products/00/06/09/88/LD0006098860.jpg'),
(5, 83, 'To', '2', 65, 'https://media.ldlc.com/r374/ld/products/00/05/96/44/LD0005964470_0005964485_0005964489.jpg');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT pour la table `expedition`
--
ALTER TABLE `expedition`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `information`
--
ALTER TABLE `information`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=300;

--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT pour la table `produit_type`
--
ALTER TABLE `produit_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
