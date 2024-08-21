<?php

namespace App\Controller;

use App\Entity\Information;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class InformationController extends AbstractController
{

    #[Route('/information/add', name: 'app_information_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['adress'], $data['postal'])) {
            return $this->json(['error' => 'Erreur'], Response::HTTP_BAD_REQUEST);
        }

        $achat = new Information();
        $achat->setIdUser((int)$data['id_user']);
        $achat->setAdress($data['adress']);
        $achat->setPostal($data['postal']);
        $achat->setNom($data['nom']);
        $achat->setPrenom($data['prenom']);
        $achat->setPays($data['pays']);

        $entityManager->persist($achat);
        $entityManager->flush();

        return $this->json(['success' => 'achat add', 'id' => $achat->getId()], Response::HTTP_CREATED);
    }

    #[Route('/information/{id}', name: 'app_information', methods: ['GET', 'HEAD'])]
    public function achatid(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT * FROM information i WHERE i.id_user = :id';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }
}
