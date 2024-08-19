<?php

namespace App\Controller;

use App\Entity\Pays;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class PaysController extends AbstractController
{
    #[Route('/pays', name: 'ap_pays')]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Pays::class);
        return $this->json($categorie->findAll());
    }

    #[Route('/pays/{id}', name: 'app_pays_all', methods: ['GET', 'HEAD'])]
    public function indexFindOne(EntityManagerInterface $entityManager, int $id): Response
    {
        $categorie = $entityManager->getRepository(Pays::class)->find($id);

        if (!$categorie) {
            return $this->json(['message' => 'pays find'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($categorie);
    }

    #[Route('/pays/update/{id}', name: 'app_pays_update', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $categorie = $entityManager->getRepository(Pays::class)->find($id);

        if (!$categorie) {
            return $this->json(['message' => 'Erreur'], Response::HTTP_NOT_FOUND);
        }
       
        $categorie->setTaxe((int)$data['taxe']);
 
        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json(['success' => 'Catégorie update'], Response::HTTP_OK);
    }
}
