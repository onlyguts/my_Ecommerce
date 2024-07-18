<?php

namespace App\Controller;

use App\Entity\Boitier;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;


class BoitierController extends AbstractController
{
    #[Route('/boitier', name: 'app_boitier', methods: ['GET', 'HEAD'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $boitier = $entityManager->getRepository(Boitier::class);
        return $this->json($boitier->findAll());
    }
}
