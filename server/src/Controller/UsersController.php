<?php

namespace App\Controller;

use App\Entity\Users;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class UsersController extends AbstractController
{

    #[Route('/users/get/{email}', name: 'appget_users')]
    public function indexget(EntityManagerInterface $entityManager, string $email): Response
    {
        $user = $entityManager->getRepository(Users::class);
        return $this->json($user->findBy(['email' => $email]));
    }

    #[Route('/users/token/{token}', name: 'apptoken_users')]
    public function tokenget(EntityManagerInterface $entityManager, string $token): Response
    {
        $user = $entityManager->getRepository(Users::class);
        return $this->json($user->findBy(['token' => $token]));
    }

    #[Route('/users/post', name: 'app_users')]
    public function indexpost(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $formData = $data["formData"];

     
        $Users = new Users();
       

        $Users->setEmail($formData['email']);
        $Users->setUsername($formData['username']);

        // $hashedPassword = $userPasswordHasher->hashPassword(
        //     $Users,
        //     $formData['password']
        // );
        $tokenData = $formData['email'] . ':' . $formData['password'] . ':' . $formData['username'];
        $token = base64_encode($tokenData);
        $Users->setToken($token);

        $Users->setPassword($formData['password']);
        $Users->setGroupe(0);
      

        $entityManager->persist($Users);

        $entityManager->flush();

        return $this->json(['success' => true], 200);
    }
    #[Route('/users/updateverif/{token}', name: 'app_verif_update', methods: ['PUT'])]
    public function updateVerificationByToken(EntityManagerInterface $entityManager, Request $request, string $token): Response
    {
        // Recherche de l'utilisateur par token
        $user = $entityManager->getRepository(Users::class)->findOneBy(['token' => $token]);
    
        // Vérification de l'existence de l'utilisateur et de l'état de 'verification'
        if (!$user || $user->getVerification() == 1) {
            return $this->json(['message' => 'Erreur : lien invalide'], Response::HTTP_NOT_FOUND);
        }
    
        // Mise à jour de la vérification
        $user->setVerification(1);
    
        // Sauvegarder les modifications
        $entityManager->persist($user);
        $entityManager->flush();
    
        return $this->json(['success' => 'Utilisateur mis à jour avec la vérification'], Response::HTTP_OK);
    }
    

    // #[Route('/api/auth/register', name: 'authRegister')]
    // public function addArticle(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager)
    // {
    //     $data = json_decode($request->getContent(), true);
    //     $formData = $data["formData"];
    //     $user = new User;
    //     if($formData){
    //         $user->setEmail($formData["email"]);
    //         $user->setPassword(
    //             $userPasswordHasher->hashPassword(
    //             $user,$formData["password"])
    //         );
            
    //         $entityManager->persist($user);
    //         $entityManager->flush();
    //         return $this->json(['success' => true], 200);
    //     }
    // }
}
