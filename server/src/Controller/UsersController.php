<?php

namespace App\Controller;

use App\Entity\Users;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UsersController extends AbstractController
{

    #[Route('/users/get/{email}', name: 'appget_users')]
    public function indexget(EntityManagerInterface $entityManager, string $email): Response
    {
        $user = $entityManager->getRepository(Users::class);
        return $this->json($user->findBy(['email' => $email]));
    }
    #[Route('/users/post', name: 'app_users')]

    public function indexpost(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
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

        $Users->setPassword($formData['password']);
        $Users->setGroupe(0);
        $entityManager->persist($Users);

        $entityManager->flush();

        return $this->json(['success' => true], 200);
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
