<?php

namespace App\Controller;

use App\Entity\Pays;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PaysController extends AbstractController
{
    #[Route('/pays', name: 'ap_pays')]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Pays::class);
        return $this->json($categorie->findAll());
    }
}
