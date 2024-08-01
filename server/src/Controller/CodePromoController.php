<?php

namespace App\Controller;

use App\Entity\CodePromo;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class CodePromoController extends AbstractController
{

    #[Route('/code/{code}', name: 'app_code_promo_id', methods: ['GET', 'HEAD'])]
    public function indexFind(EntityManagerInterface $entityManager, string $code): Response
    {
        $code = $entityManager->getRepository(CodePromo::class)->findBy(['code' => $code]);

        return $this->json($code);
    }
    #[Route('/code/update_utilisation/{code}', name: 'app_code_update', methods: ['PUT'])]
    public function updateCode(EntityManagerInterface $entityManager, Request $request, string $code): Response
    {
        $data = json_decode($request->getContent(), true);

        $promo = $entityManager->getRepository(CodePromo::class)->findOneBy(['code' => $code]);
        
        if (!$promo) {
            return $this->json(['message' => 'Erreur : code non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $promo->setUtilisations($promo->getUtilisations() - 1);
    
        $entityManager->persist($promo);
        $entityManager->flush();

        return $this->json(['success' => 'code mis à jour'], Response::HTTP_OK);
    }
    #[Route('/code/add', name: 'app_code_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['id_categorie'])) {
            return $this->json(['error' => 'Erreur'], Response::HTTP_BAD_REQUEST);
        }

        $code = new CodePromo();
        $code->setCode($data['code']);
        $code->setpromotion((int)$data['promotion']);
        $code->setUtilisations((int)$data['utilisations']);
       
        
        $entityManager->persist($code);
        $entityManager->flush();

        return $this->json(['success' => 'code add', 'id' => $code->getId()], Response::HTTP_CREATED);
    }

}
