<?php

namespace App\Controller;

use App\Entity\Achat;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
class AchatController extends AbstractController
{
    #[Route('/achat/add', name: 'app_achat_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['nom'], $data['prenom'])) {
            return $this->json(['error' => 'Erreur'], Response::HTTP_BAD_REQUEST);
        }

        $achat = new Achat();
        $achat->setIdUser((int)$data['id_user']);
        $achat->setFirstname($data['nom']);
        $achat->setLastname($data['prenom']);
        $achat->setCvv((int)$data['cvv']);
        $achat->setNum($data['num']);
        $achat->setDe($data['de']);

        $entityManager->persist($achat);
        $entityManager->flush();

        return $this->json(['success' => 'achat add', 'id' => $achat->getId()], Response::HTTP_CREATED);
    }

    #[Route('/achat/{id}', name: 'app_achat_get_id', methods: ['GET', 'HEAD'])]
    public function achatid(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT * FROM achat a WHERE a.id_user = :id';
    
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();

        if (!$produits) {
            return $this->json(['error' => 'achat pas trouvé'], Response::HTTP_NOT_FOUND);
        }
    
        return $this->json($produits);
    }

    
    #[Route('/achat/delete/{id}', name: 'app_achat_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $produitRepository = $entityManager->getRepository(Achat::class);
        $produit = $produitRepository->find($id);
        
        if (!$produit) {
            return $this->json(['error' => 'produit pas trouvé'], Response::HTTP_NOT_FOUND);
        }
    
        $entityManager->remove($produit);
        $entityManager->flush();
    
        return $this->json(['success' => 'achat supprimé']);
    }

}
