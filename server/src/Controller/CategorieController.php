<?php

namespace App\Controller;
use App\Entity\Categorie;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategorieController extends AbstractController
{
    #[Route('/categorie', name: 'app_categorie')]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $boitier = $entityManager->getRepository(Categorie::class);
        return $this->json($boitier->findAll());
    }

    
}
