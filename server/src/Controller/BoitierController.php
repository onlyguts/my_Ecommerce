<?php

namespace App\Controller;

use App\Entity\Boitier;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;


class BoitierController extends AbstractController
{
    #[Route('/boitier', name: 'appp_boitier', methods: ['GET', 'HEAD'])]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $boitier = $entityManager->getRepository(Boitier::class);
        return $this->json($boitier->findAll());
    }
    
    #[Route('/boitier/{id}', name: 'app_boitier', methods: ['GET', 'HEAD'])]
    public function index(EntityManagerInterface $entityManager, int $id): Response
    {
        $boitier = $entityManager->getRepository(Boitier::class);
        return $this->json($boitier->findBy(['id' => $id]));
    }

 #[Route('/boitier/delete/{id}', name: 'app_boitier_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $boitierRepository = $entityManager->getRepository(Boitier::class);
        $boitier = $boitierRepository->findBy(['id' => $id]);
        
        if (!$boitier) {
            return $this->json(['error' => 'Boitier pas trouver'], Response::HTTP_NOT_FOUND);
        }

        // $entityManager->remove($boitier);
        // $entityManager->flush();

        return $this->json(['success' => 'Boitier deleted']);
    }
}