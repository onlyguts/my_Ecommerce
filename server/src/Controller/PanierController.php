<?php

namespace App\Controller;


use App\Entity\Panier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class PanierController extends AbstractController
{
    #[Route('/panier/{id}', name: 'app_panier', methods: ['GET', 'HEAD'])]
    public function index(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT ps.id as produit_id, ps.*, c.name as categorie_name, COUNT(pr.id_produit) as quantity FROM panier pr JOIN produits ps ON pr.id_produit = ps.id JOIN categorie c ON ps.id_categorie = c.id WHERE pr.id_user = :id GROUP BY produit_id, ps.name, c.name';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }

    #[Route('/panier/add', name: 'app_panier_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['id_user'], $data['id_produit'])) {
            return $this->json(['error' => 'Erreur : Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $panier = new Panier();
        $panier->setIdUser((int)$data['id_user']);
        $panier->setIdProduit((int)$data['id_produit']);
        
        $entityManager->persist($panier);
        $entityManager->flush();

        return $this->json(['success' => 'Produit add', 'id' => $panier->getId()], Response::HTTP_CREATED);
    }
}
