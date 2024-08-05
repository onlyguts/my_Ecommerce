<?php

namespace App\Controller;

use App\Entity\Avis;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class AvisController extends AbstractController
{
    

    // #[Route('/avis/{id_produits}', name: 'app_avis', methods: ['GET', 'HEAD'])]
    // public function indexFind(EntityManagerInterface $entityManager, int $id_produits): Response
    // {
    //     $avis = $entityManager->getRepository(Avis::class)->findBy(['id_produits' => $id_produits]);
    //     if (!$avis) {
    //         return $this->json(['error' => 'aucun avis'], Response::HTTP_NOT_FOUND);
    //     };
    //     return $this->json($avis);
    // }
    #[Route('/avis/{id_produits}', name: 'app_avis_get', methods: ['GET', 'HEAD'])]
    public function index(EntityManagerInterface $entityManager, int $id_produits): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT a.*, u.email as username FROM avis a INNER JOIN users u ON a.id_user = u.id  WHERE a.id_produits = :id_produit';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id_produit', $id_produits);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }

    #[Route('/avis/add', name: 'app_avis_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['id_user'], $data['id_produit'])) {
            return $this->json(['error' => 'Erreur'], Response::HTTP_BAD_REQUEST);
        }

        $produit = new Avis();
        $produit->setIdUsers((int)$data['id_user']);
        $produit->setIdProduits((int)$data['id_produit']);
        $produit->setRate((int)$data['rate']);
        $produit->setDescription((string)$data['description']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'Produit add', 'id' => $produit->getId()], Response::HTTP_CREATED);
    }
}