<?php

namespace App\Controller;

use DateTime;
use App\Entity\Commande;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class CommandeController extends AbstractController
{

    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    #[Route('/commande/{id}', name: 'app_commande_get_id', methods: ['GET', 'HEAD'])]
    public function achatid(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();

        $sql = 'SELECT * FROM commande c WHERE c.id_user = :id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();

        return $this->json($produits);
    }

    #[Route('/commande/solo/{id}', name: 'app_commande_get_solo_id', methods: ['GET', 'HEAD'])]
    public function achatidsolo(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();

        $sql = 'SELECT * FROM commande c WHERE c.id_commande = :id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();

        return $this->json($produits);
    }

    #[Route('/commande/chercher/{id}', name: 'app_commande_chercher', methods: ['GET', 'HEAD'])]
    public function users_chercher(EntityManagerInterface $entityManager, int $id): Response
    {
        $conn = $entityManager->getConnection();

        $sql = 'SELECT * FROM commande WHERE id_commande = :id';


        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', $id);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchOne();

        return $this->json($produits);
    }

    #[Route('/commande/add', name: 'app_commande_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $code = new Commande();
        $code->setIdUser($data['id_user']);
        $code->setIdCommande($data['id_commande']);
        $code->setStatus($data['status']);
        $code->setAdresse($data['adress']);
        $code->setName($data['name']);

        $code->setCode((int)$data['postal']);
        $code->setProduits(json_encode($data['produit']));

        $code->setEmail($data['email']);

        $code->setWeight($data['weight']);
        $code->setWidth($data['width']);
        $code->setHeight($data['height']);
        $code->setLength($data['length']);
        $code->setModeExpe($data['expe']);
        $code->setPapier($data['papier']);
        $code->setPrix($data['price']);
        $code->setDate(new DateTime());

        $entityManager->persist($code);
        $entityManager->flush();

        $emailMessage = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Commande effectuée!</title>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
                .header { background-color: #E2B791; color: #ffffff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0px; }
                .header img { max-width: 150px; }
                .container { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; text-align: center; background-color: #F3E1D1; border: 1px solid #ddd; border-radius: 10px; }
                .content { padding: 20px; }
                .button { background-color: #E2B791; color: white; border-radius: 15px; padding: 10px; border: 1px solid white; }
                a { text-decoration: none; color: white; }
                .footer { background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 10px; border-radius: 10px; }
            </style>
        </head>
        <body>
        <div class="container">
                <div class="header">
                <img src="http://localhost:3000/logo.png" alt="Logo">
                    <h1>Merci pour votre commande!</h1>
                </div>
                <div class="content">
                    <p>Bonjour,</p>
                    <p>Vous recevrez rapidement un email lorsque celle-ci sera envoyée.</p>
                    <p>Revenez finaliser votre achat avant que vos articles ne soient plus disponibles!</p>
                <div class="button">
                    <a href="http://localhost:3000/profil/commande/' . htmlspecialchars($data['id_user']) .'/' . htmlspecialchars($data['id_commande']) .'">Votre commande</a>
                </div>
                </div>
                <div class="footer">
                <p>&copy; 2024 BYP. Tous droits réservés.</p>
                </div>
            </div>
        </body>
        </html>';

        $emailText = '
            Bonjour,
            Merci pour votre commande!

            Vous recevrez rapidement un mail lorsque celle-ci sera envoyée.

            A bientôt !
            L\'équipe BYP
        ';

        $email = (new Email())
            ->from('no-reply@byp.com')
            ->to($data['email'])
            ->subject('Commande confirmée!')
            ->html($emailMessage)
            ->text($emailText);

        $this->mailer->send($email);

        return $this->json(['success' => 'code add', 'id' => $code->getId()], Response::HTTP_CREATED);
    }


    #[Route('/commande/update/{id}', name: 'app_commabde_update_test', methods: ['PUT'])]
    public function photo(EntityManagerInterface $entityManager, Request $request, int $id): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = $entityManager->getRepository(Commande::class)->find($id);

        if (!$produit) {
            return $this->json(['message' => 'Erreur : user non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $produit->setStatus($data['status']);

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json(['success' => 'user mis à jour'], Response::HTTP_OK);
    }


    #[Route('/exel', name: 'app_exel', methods: ['GET', 'HEAD'])]
    public function exel(EntityManagerInterface $entityManager): Response
    {
        $conn = $entityManager->getConnection();
        $sql = ' SELECT c.* from commande c';


        $stmt = $conn->prepare($sql);
        $resultSet = $stmt->executeQuery();
        $produits = $resultSet->fetchAllAssociative();
        return $this->json($produits);
    }
}
