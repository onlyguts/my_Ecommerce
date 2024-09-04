<?php

namespace App\Controller;

use App\Entity\ProduitType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class PoduitTypeController extends AbstractController
{
    #[Route('/produit/type', name: 'app_produit_type')]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(ProduitType::class);
        return $this->json($categorie->findAll());
    }

    #[Route('/produit/type/{id_produits}', name: 'app_produit_type_get', methods: ['GET', 'HEAD'])]
    public function index(EntityManagerInterface $entityManager, int $id_produits): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT pt.* FROM produit_type pt INNER JOIN produits p ON p.id = pt.id_produit WHERE pt.id_produit = :id_produit';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id_produit', $id_produits);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }

    #[Route('/produitstype/add', name: 'app_produitstype_add', methods: ['POST'])]
    public function produittypeadd(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['id_categorie'])) {
            return $this->json(['error' => 'Erreur'], Response::HTTP_BAD_REQUEST);
        }

        $produit = new ProduitType();
        $produit->setImageType($data['image']);
        $produit->setPrice((int)$data['price']);
        $produit->setOutpout($data['outpout']);
        $produit->setType($data['type']);
       

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'Produit add', 'id' => $produit->getId()], Response::HTTP_CREATED);
    }
}
