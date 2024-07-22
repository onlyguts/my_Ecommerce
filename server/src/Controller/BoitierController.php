<?php

namespace App\Controller;

use App\Entity\Boitier;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;


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
        $boitier = $boitierRepository->find($id);
        
        if (!$boitier) {
            return $this->json(['error' => 'Boitier pas trouvé'], Response::HTTP_NOT_FOUND);
        }
    
        $entityManager->remove($boitier);
        $entityManager->flush();
    
        return $this->json(['success' => 'Boitier supprimé']);
    }

    #[Route('/boitier/update/{id}', name: 'app_boitier_update', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $boitierRepository = $entityManager->getRepository(Boitier::class);
        $boitier = $boitierRepository->find($id);

        if (!$boitier) {
            return $this->json(['error' => 'boitier pas trouvé'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['designation'])) {
            $boitier->setDesignation($data['designation']);
        }
        if (isset($data['marque'])) {
            $boitier->setMarque($data['marque']);
        }
        if (isset($data['image'])) {
            $boitier->setImage($data['image']);
        }

        $entityManager->flush();

        return $this->json(['success' => 'boitier mis à jour']);
    }
    #[Route('/boitier/add', name: 'app_boitier_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['designation'], $data['marque'])) {
            return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $boitier = new Boitier();
        $boitier->setDesignation($data['designation']);
        $boitier->setMarque($data['marque']);
   

        $entityManager->persist($boitier);
        $entityManager->flush();

        return $this->json(['success' => 'Boîtier ajouté', 'id' => $boitier->getId()], Response::HTTP_CREATED);
    }
    
}