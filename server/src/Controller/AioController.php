<?php

namespace App\Controller;

use App\Entity\Aio;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class AioController extends AbstractController
{
    #[Route('/aio', name: 'appp_aio', methods: ['GET', 'HEAD'])]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $aio = $entityManager->getRepository(Aio::class);
        return $this->json($aio->findAll());
    }

    #[Route('/aio/delete/{id}', name: 'app_aio_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $aioRepository = $entityManager->getRepository(Aio::class);
        $aio = $aioRepository->find($id);

        if (!$aio) {
            return $this->json(['error' => 'aio pas trouvé'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($aio);
        $entityManager->flush();

        return $this->json(['success' => 'aio supprimé']);
    }
    #[Route('/aio/update/{id}', name: 'app_aio_update', methods: ['PUT'])]
    public function update(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $aioRepository = $entityManager->getRepository(Aio::class);
        $aio = $aioRepository->find($id);

        if (!$aio) {
            return $this->json(['error' => 'aio pas trouvé'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['designation'])) {
            $aio->setDesignation($data['designation']);
        }
        if (isset($data['marque'])) {
            $aio->setMarque($data['marque']);
        }
        if (isset($data['image'])) {
            $aio->setImage($data['image']);
        }

        $entityManager->flush();

        return $this->json(['success' => 'aio mis à jour']);
    }
}
