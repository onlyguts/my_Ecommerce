<?php

namespace App\Controller;

use App\Entity\Produits;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProduitsController extends AbstractController
{
    #[Route('/produits', name: 'app_produits', methods: ['GET', 'HEAD'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $conn = $entityManager->getConnection();
        $sql = ' SELECT p.id, p.name, p.id_categorie, c.name as categorie_name FROM produits p INNER JOIN categorie c ON p.id_categorie = c.id';

        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
        return $this->json($produits);
    }

    #[Route('/produits/{id}', name: 'app_boitier', methods: ['GET', 'HEAD'])]
    public function indexFind(EntityManagerInterface $entityManager, int $id): Response
    {
        $produits = $entityManager->getRepository(Produits::class)->findBy(['id_categorie' => $id]);
        
        return $this->json($produits);
    }

    #[Route('/produit/{id}', name: 'app_produit_detail', methods: ['GET', 'HEAD'])]
    public function indexFindOne(EntityManagerInterface $entityManager, int $id): Response
    {
        $produit = $entityManager->getRepository(Produits::class)->find($id);
        
        if (!$produit) {
            return $this->json(['message' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($produit);
    }
}
