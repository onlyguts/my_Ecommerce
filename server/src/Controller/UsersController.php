<?php

namespace App\Controller;
use DateTime;
use App\Entity\Users;
use App\Entity\CodePromo;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Psr\Log\LoggerInterface;

class UsersController extends AbstractController
{

    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }
    #[Route('/users', name: 'app_users_get_all')]
    public function indexx(EntityManagerInterface $entityManager): Response
    {
        $user = $entityManager->getRepository(Users::class);
        return $this->json($user->findAll());
    }
    #[Route('/users/date', name: 'app_avis', methods: ['GET', 'HEAD'])]
    public function users_date(EntityManagerInterface $entityManager): Response
    {
        $conn = $entityManager->getConnection();
    
        $sql = 'SELECT users.id, DATE_FORMAT(users.create_time, "%d/%m/%Y") AS create_time FROM users ORDER BY users.create_time ASC';
    
        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
    
        return $this->json($produits);
    }
 

    #[Route('/users/get/{email}', name: 'appget_users')]
    public function indexget(EntityManagerInterface $entityManager, string $email): Response

    {
        $user = $entityManager->getRepository(Users::class);
        
        if (!$user) {
            return $this->json(['message' => 'Erreur : lien invalide'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($user->findBy(['email' => $email]));
    }

    #[Route('/users/token/{token}', name: 'apptoken_users')]
    public function tokenget(EntityManagerInterface $entityManager, string $token): Response
    {
        $user = $entityManager->getRepository(Users::class);
        return $this->json($user->findBy(['token' => $token]));
    }
    #[Route('/users/{id}', name: 'app_only_user', methods: ['GET', 'HEAD'])]
    public function indexFind(EntityManagerInterface $entityManager, int $id): Response
    {
        $produits = $entityManager->getRepository(Users::class)->findBy(['id' => $id]);

        return $this->json($produits);
    }
    #[Route('/users/post', name: 'app_users_post')]
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
        $formData = $data["formData"];
        $tokenData = $formData['email'] . ':' . $formData['password'] . ':' . $formData['username'];
        $token = base64_encode($tokenData);
        $Users->setToken($token);

        $Users->setPassword($formData['password']);
        $Users->setCreateTime(new DateTime()); 
        $Users->setGroupe(0);
        $Users->setVerification(0);

        $entityManager->persist($Users);
        $entityManager->flush();

        $this->emailRegister($Users->getEmail(), $Users->getUsername(), $Users->getToken());

        return $this->json(['success' => true], 200);
    }

    #[Route('/users/updateverif/{token}', name: 'app_verif_update', methods: ['PUT'])]
    public function updateVerificationByToken(EntityManagerInterface $entityManager, Request $request, string $token): Response
    {
        $user = $entityManager->getRepository(Users::class)->findOneBy(['token' => $token]);

        if (!$user || $user->getVerification() == 1) {
            return $this->json(['message' => 'Erreur : lien invalide'], Response::HTTP_NOT_FOUND);
        }

        $user->setVerification(1);

        $entityManager->persist($user);
        $entityManager->flush();

        $code = new CodePromo();
        $code->setCode($user->getUsername() . '_15');
        $code->setpromotion(10);
        $code->setUtilisations(1);
       
        
        $entityManager->persist($code);
        $entityManager->flush();

        $this->compteVerif($user->getEmail(), $user->getUsername() . '_15');

        return $this->json(['success' => 'Utilisateur mis à jour avec la vérification'], Response::HTTP_OK);
    }


    #[Route('/users/update/password/{token}', name: 'app_passwordupdate', methods: ['PUT'])]
    public function update_password(EntityManagerInterface $entityManager, Request $request, string $token): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = $entityManager->getRepository(Users::class)->findOneBy(['token' => $token]);

        if (!$user) {
            return $this->json(['message' => 'Erreur : lien invalide'], Response::HTTP_NOT_FOUND);
        }
        $user->setPassword($data['password']);

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

    private function emailRegister($emailUser, $username, $token)
    {
        $lienVerif = 'http://localhost:3000/confirmation/' . htmlspecialchars($token);
        $emailMessage = '
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; text-decoration: none; }
                .header { background-color: #E2B791; color: #ffffff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0px; }
                .header img { max-width: 150px; }
                .container { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; text-align: center; background-color: #F3E1D1; border: 1px solid #ddd; border-radius: 10px; }
                .content { padding: 20px; }
                .content img { max-width: 100%; height: auto; border-radius: 8px; }
                .button { background-color: #E2B791; color: white; border-radius: 15px; padding: 10px; border: 1px solid white; font-size: 17px; }
                a { text-decoration: none; color: white; }
                .infos { font-size: 10px; color: gray; }
                .footer { background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://localhost:3000/logo.png" alt="Logo">
                    <h1>Confirmation de compte</h1>
                </div>
                <div class="content">
                    <p>Bonjour <strong>' . htmlspecialchars($username) . '</strong>,</p>
                    <p>Merci de vous être inscrit sur notre site.
                        <br>
                        Veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :
                    </p>
                    <br>
                    <button class="button"><a href="' . htmlspecialchars($lienVerif) . '">Confirmer mon compte</a></button>
                    <br><br>
                    <p class="infos">Si vous n\'avez pas créé de compte, veuillez ignorer cet e-mail.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 BYP. Tous droits réservés.</p>
                </div>
            </div>
        </body>
        </html>';

        $emailText = '
    Bonjour ' . htmlspecialchars($token) .',

    Merci de vous être inscrit sur notre site.
    Veuillez confirmer votre adresse e-mail en cliquant sur le lien ci-dessous :

    ' . htmlspecialchars($lienVerif) . '

    Si vous n\'avez pas créé de compte, veuillez ignorer cet e-mail.

    © 2024 BYP. Tous droits réservés.';


        $email = (new Email())
            ->from('no-reply@byp.com')
            ->to($emailUser)
            ->subject('On y est presque !')
            ->html($emailMessage)
            ->text($emailText);

        $this->mailer->send($email);
    }

    private function compteVerif($emailUser, $promo) {
        $emailMessage = '
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
                .header { background-color: #E2B791; color: #ffffff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0px; }
                .header img { max-width: 150px; }
                .header .color { color: #1C6F5E; }
                .container { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; text-align: center; background-color: #F3E1D1; border: 1px solid #ddd; border-radius: 10px; }
                .content { padding: 20px; }
                .content img { max-width: 100%; height: auto; border-radius: 8px; }
                .promo-box { border: 2px solid #1C6F5E; padding: 10px; margin: 20px 0; background-color: #f9f9f9; text-align: center; }
                .promo-box .promo { color: #E2B791; font-size: 20px; font-weight: bold; }
                a { text-decoration: none; color: #1C6F5E; }
                .footer { background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 10px; border-radius: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://localhost:3000/logo.png" alt="Logo BYP">
                    <h1>Bienvenue chez <span class="color">BYP</span></h1>
                </div>
                <div class="content">
                    <p>Votre compte est validé!</p>
                    <p>Nous sommes ravis de vous accueillir dans la communauté BYP. <br>
                        Nous nous engageons à vous fournir le meilleur service possible.
                        N\'hésitez pas à explorer notre site et à nous contacter si vous avez des questions.
                    </p>
                    <div class="promo-box">
                        <p style="font-size: 16px; margin: 0;"><strong>Code Promo Exclusif :</strong> <br>
                            <span class="promo">'. htmlspecialchars($promo) .'</span> <br>
                            Obtenez 10% de réduction sur votre première commande ! <br><br>
                            Profitez-en dès maintenant sur notre site !
                        </p>
                    </div>
                    <p> Bien cordialement, <br>
                        L\'équipe BYP
                    </p>
                    <br>
                    <div class="footer">
                        <p>Vous recevez cet e-mail car vous vous êtes inscrit sur notre site.
                            Si vous ne souhaitez plus recevoir ces messages, vous pouvez vous désabonner à tout moment.</p>
                        <p><a href="http://localhost:3000/">Visiter notre site</a> | <a href="http://localhost:3000/">Contactez-nous</a></p>
                    </div>
                </div>
        </body>
        </html>';

        $emailText = '
    Votre compte chez BYP est maintenant validé ! Nous sommes ravis de vous accueillir dans notre communauté.
    En tant que nouveau membre, nous avons le plaisir de vous offrir un code promo exclusif pour votre première commande. Utilisez le code **[code promo]** pour bénéficier de **10% de réduction**. Ne manquez pas cette opportunité et profitez-en dès maintenant sur notre site !

    Bien cordialement,
    L\'équipe BYP';


        $email = (new Email())
        ->from('no-reply@byp.com')
        ->to($emailUser)
        ->subject('Bonne nouvelle !')
        ->html($emailMessage)
        ->text($emailText);

    $this->mailer->send($email);
    }

    #[Route('/username/update/{id}', name: 'app_username_update', methods: ['PUT'])]
    public function username(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = $entityManager->getRepository(Users::class)->find($id);

        if (!$produit) {
            return $this->json(['message' => 'Erreur : user non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $produit->setUsername($data['username']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'user mis à jour'], Response::HTTP_OK);
    }

    
    #[Route('/email/update/{id}', name: 'app_email_update', methods: ['PUT'])]
    public function email(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = $entityManager->getRepository(Users::class)->find($id);

        if (!$produit) {
            return $this->json(['message' => 'Erreur : user non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $produit->setEmail($data['email']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'user mis à jour'], Response::HTTP_OK);
    }
    #[Route('/password/update/{id}', name: 'app_password_update', methods: ['PUT'])]
    public function password(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = $entityManager->getRepository(Users::class)->find($id);

        if (!$produit) {
            return $this->json(['message' => 'Erreur : user non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $produit->setPassword($data['password']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'user mis à jour'], Response::HTTP_OK);
    }
    #[Route('/photo/update/{id}', name: 'app_photo_update', methods: ['PUT'])]
    public function photo(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = $entityManager->getRepository(Users::class)->find($id);

        if (!$produit) {
            return $this->json(['message' => 'Erreur : user non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $produit->setImage($data['photo']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'user mis à jour'], Response::HTTP_OK);
    }
}
