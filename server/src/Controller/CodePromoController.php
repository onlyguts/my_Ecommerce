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

}
