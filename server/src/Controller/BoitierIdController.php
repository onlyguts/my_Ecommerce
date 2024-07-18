<?php

namespace App\Controller;

use App\Entity\BoitierId;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class BoitierIdController extends AbstractController
{
    #[Route('/boitier/id', name: 'app_boitier_id')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $boitier = $entityManager->getRepository(BoitierId::class);
        return $this->json($boitier->findAll());
    }
}
