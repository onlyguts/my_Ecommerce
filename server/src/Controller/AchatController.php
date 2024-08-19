<?php

namespace App\Controller;

use App\Entity\Achat;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
class AchatController extends AbstractController
{
    #[Route('/achat/add', name: 'app_achat_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['nom'], $data['prenom'])) {
            return $this->json(['error' => 'Erreur'], Response::HTTP_BAD_REQUEST);
        }

        $achat = new Achat();
        $achat->setIdUser((int)$data['id_user']);
        $achat->setFirstname($data['nom']);
        $achat->setLastname($data['prenom']);
        $achat->setCvv((int)$data['cvv']);
        $achat->setNum($data['num']);
        $achat->setDe($data['de']);

        $entityManager->persist($achat);
        $entityManager->flush();

        return $this->json(['success' => 'achat add', 'id' => $achat->getId()], Response::HTTP_CREATED);
    }

}
