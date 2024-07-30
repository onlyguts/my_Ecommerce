<?php

namespace App\Controller;

use App\Entity\AlertEmail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class EmailController extends AbstractController
{
    #[Route('/email/add', name: 'app_email_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['id_produit'])) {
            return $this->json(['error' => 'Erreur'], Response::HTTP_BAD_REQUEST);
        }

        $produit = new AlertEmail();
        $produit->setIdProduit((int)$data['id_produit']);
        $produit->setEmail((string)$data['email']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'Produit add', 'id' => $produit->getId()], Response::HTTP_CREATED);
    }

    #[Route('/email/produit/{id_produit}', name: 'app_email_alert', methods: ['GET', 'HEAD'])]
    public function indexFindOne(EntityManagerInterface $entityManager, int $id_produit): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT * FROM alert_email WHERE id_produit = :id_produit';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id_produit', $id_produit);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }
}