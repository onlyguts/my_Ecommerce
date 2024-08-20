<?php

namespace App\Controller;

use App\Entity\Expedition;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class ExpeditionController extends AbstractController
{
    #[Route('/expedition', name: 'app_expedition')]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Expedition::class);
        return $this->json($categorie->findAll());
    }

}
