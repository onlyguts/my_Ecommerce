<?php

namespace App\Controller;
use App\Entity\Categorie;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;


class CategorieController extends AbstractController
{
    #[Route('/categorie', name: 'app_categorie')]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $boitier = $entityManager->getRepository(Categorie::class);
        return $this->json($boitier->findAll());
    }

    #[Route('/categorie/add', name: 'app_categories_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'])) {
            return $this->json(['error' => 'Erreur : Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $categorie = new Categorie();
        $categorie->setName($data['name']);
        if (!isset($data['image'])) {
            $categorie->setImage('');
        }else{

            $categorie->setImage($data['image']);
        }


        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json(['success' => 'categorie add', 'id' => $categorie->getId()], Response::HTTP_CREATED);
    }

    
}
