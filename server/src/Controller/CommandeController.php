<?php

namespace App\Controller;

use DateTime;
use App\Entity\Commande;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class CommandeController extends AbstractController
{

    #[Route('/commande/{id}', name: 'app_commande_get_id', methods: ['GET', 'HEAD'])]
    public function achatid(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT * FROM commande c WHERE c.id_user = :id';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }

    #[Route('/commande/solo/{id}', name: 'app_commande_get_solo_id', methods: ['GET', 'HEAD'])]
    public function achatidsolo(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT * FROM commande c WHERE c.id = :id';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }

    #[Route('/commande/add', name: 'app_commande_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $code = new Commande();
        $code->setIdUser($data['id_user']);
        $code->setStatus($data['status']);
        $code->setAdresse($data['adress']);
        $code->setCode((int)$data['postal']);
        $code->setProduits(json_encode($data['produit']));

        $code->setWeight($data['weight']);
        $code->setWidth($data['width']);
        $code->setHeight($data['height']);
        $code->setLength($data['length']);
        $code->setModeExpe($data['expe']);
        $code->setPapier($data['papier']);
        $code->setPrix($data['price']);
        $code->setDate(new DateTime());

        $entityManager->persist($code);
        $entityManager->flush();

        return $this->json(['success' => 'code add', 'id' => $code->getId()], Response::HTTP_CREATED);
    }
}
