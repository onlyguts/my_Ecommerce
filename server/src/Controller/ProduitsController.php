<?php

namespace App\Controller;

use App\Entity\Produits;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class ProduitsController extends AbstractController
{
    #[Route('/produits', name: 'app_produits', methods: ['GET', 'HEAD'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $conn = $entityManager->getConnection();
        $sql = ' SELECT p.id, p.name, p.id_categorie, p.marque, c.name as categorie_name FROM produits p INNER JOIN categorie c ON p.id_categorie = c.id';

        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
        return $this->json($produits);
    }



    
    #[Route('/produits/top10', name: 'app_top_produits', methods: ['GET', 'HEAD'])]
    public function topProduits(EntityManagerInterface $entityManager): Response
    {
        $conn = $entityManager->getConnection();
        $sql = 'SELECT p.id, p.name, p.id_categorie, c.name as categorie_name, p.views
                FROM produits p
                INNER JOIN categorie c ON p.id_categorie = c.id
                ORDER BY p.views DESC
                LIMIT 10';

        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery();
        $topProduits = $resultSet->fetchAllAssociative();
        return $this->json($topProduits);
    }


    #[Route('/produits/{id}', name: 'app_produit', methods: ['GET', 'HEAD'])]
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
    #[Route('/produit/update/{id}', name: 'app_produit_update', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = $entityManager->getRepository(Produits::class)->find($id);

        if (!$produit) {
            return $this->json(['message' => 'Erreur : Produit non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $produit->setName($data['name']);
        $produit->setIdCategorie($data['idCategorie']);
        $produit->setMarque($data['marque']);
        $produit->setPrix($data['prix']);
        $produit->setImage($data['image']);
        $produit->setStock($data['stock']);
        $produit->setTaille($data['taille']);
        $produit->setType($data['type']);
        $produit->setSocket($data['socket']);
        $produit->setTypec($data['typec']);
        $produit->setConsommations($data['consommations']);


        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'Produit mis à jour'], Response::HTTP_OK);
    }
    #[Route('/produit/updateView/{id}', name: 'app_produit_updatev', methods: ['PUT'])]
    public function updateView(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = $entityManager->getRepository(Produits::class)->find($id);

        if (!$produit) {
            return $this->json(['message' => 'Erreur : Produit non trouvé'], Response::HTTP_NOT_FOUND);
        }
        $produit->setViews($produit->getViews() + $data['views']);



        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'Produit mis à jour'], Response::HTTP_OK);
    }
    #[Route('/produits/add', name: 'app_produits_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['id_categorie'])) {
            return $this->json(['error' => 'Erreur : Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $produit = new Produits();
        $produit->setName($data['name']);
        $produit->setIdCategorie((int)$data['id_categorie']);
        $produit->setMarque($data['marque']);
        $produit->setPrix((int)$data['prix']);
        $produit->setImage($data['image']);
        $produit->setStock((int)$data['stock']);
        $produit->setTaille($data['taille']);
        $produit->setType($data['type']);
        $produit->setSocket($data['socket']);
        $produit->setTypec($data['typec']);
        $produit->setConsommations((int)$data['consomation']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'Produit add', 'id' => $produit->getId()], Response::HTTP_CREATED);
    }
    #[Route('/produits/delete/{id}', name: 'app_produits_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $produitRepository = $entityManager->getRepository(Produits::class);
        $produit = $produitRepository->find($id);
        
        if (!$produit) {
            return $this->json(['error' => 'produit pas trouvé'], Response::HTTP_NOT_FOUND);
        }
    
        $entityManager->remove($produit);
        $entityManager->flush();
    
        return $this->json(['success' => 'produit supprimé']);
    }
}
