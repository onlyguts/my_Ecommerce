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
    

    #[Route('/avis/{id_produits}', name: 'app_avis', methods: ['GET', 'HEAD'])]
    public function indexFind(EntityManagerInterface $entityManager, int $id_produits): Response
    {
        $avis = $entityManager->getRepository(Avis::class)->findBy(['id_produits' => $id_produits]);
        if (!$avis) {
            return $this->json(['error' => 'aucun avis'], Response::HTTP_NOT_FOUND);
        };
        return $this->json($avis);
    }
}