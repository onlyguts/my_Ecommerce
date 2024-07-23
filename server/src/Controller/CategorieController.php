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
        $categorie = $entityManager->getRepository(Categorie::class);
        return $this->json($categorie->findAll());
    }

    
    #[Route('/categorie/{id}', name: 'app_categorie_detail', methods: ['GET', 'HEAD'])]
    public function indexFindOne(EntityManagerInterface $entityManager, int $id): Response
    {
        $categorie = $entityManager->getRepository(Categorie::class)->find($id);

        if (!$categorie) {
            return $this->json(['message' => 'Categorie find'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($categorie);
    }

    #[Route('/categorie/add', name: 'app_categories_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'])) {
            return $this->json(['error' => 'Erreur '], Response::HTTP_BAD_REQUEST);
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
    #[Route('/categorie/update/{id}', name: 'app_categorie_update', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $categorie = $entityManager->getRepository(Categorie::class)->find($id);

        if (!$categorie) {
            return $this->json(['message' => 'Erreur'], Response::HTTP_NOT_FOUND);
        }
       
            $categorie->setName($data['name']);
 
            $categorie->setImage($data['image']);
 
        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json(['success' => 'Catégorie update'], Response::HTTP_OK);
    }

    #[Route('/categorie/delete/{id}', name: 'app_categorie_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $CategorieRepository = $entityManager->getRepository(Categorie::class);
        $Categorie = $CategorieRepository->find($id);
        
        if (!$Categorie) {
            return $this->json(['error' => 'categorie pas trouvé'], Response::HTTP_NOT_FOUND);
        }
    
        $entityManager->remove($Categorie);
        $entityManager->flush();
    
        return $this->json(['success' => 'categorie supprimé']);
    }
    
}
