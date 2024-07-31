<?php

namespace App\Controller;

use App\Entity\Produits;
use App\Entity\Users;
use App\Repository\ProduitsRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\AlertEmail;

class MailerController extends AbstractController
{
    private $ProduitsRepository;
    private $mailer;

    public function __construct(ProduitsRepository $ProduitsRepository, MailerInterface $mailer)
    {
        $this->ProduitsRepository = $ProduitsRepository;
        $this->mailer = $mailer;
    }

    #[Route('/email', name: 'envoi_email', methods: ['POST'])]
    public function sendEmail(MailerInterface $mailer): Response
    {
        $email = (new Email())
            ->from('hello@example.com')
            ->to('you@example.com')
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');

        $mailer->send($email);
        return new Response('envoyé');

        // ...
    }

    #[Route('/email/alert/disponible', name: 'email_alert_disponible', methods: ['POST'])]
    public function sendEmailAlert(Request $request, MailerInterface $mailer, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $produitId = $data['produitId'];
        $userId = $data['userId'];

        $produitRepository = $entityManager->getRepository(Produits::class);
        $produit = $produitRepository->find($produitId);

        $nomProduit = $produit->getName();
        $ImageProduit = $produit->getImage();
        $lienProduit = "http://localhost:3000/produit/" . $produitId;

        $messageMail = '
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
            .header { background-color: #E2B791; color: #ffffff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0px; }
            .header img { max-width: 150px; }
            .container { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; text-align: center; background-color: #F3E1D1; border: 1px solid #ddd; border-radius: 10px; }
            .content { padding: 20px; }
            .content img { max-width: 100%; height: auto; border-radius: 8px; }
            .button { background-color: #E2B791; color: white; border-radius: 15px; padding: 10px; border: 1px solid white; }
            a { text-decoration: none; }
            .button-hover { background-color: rgba(215,147,105, 0.4); }
            .footer { background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="http://localhost:3000/logo.png" alt="Logo">
                    <h1>Bonne nouvelle !</h1>
                </div>
                <div class="content">
                    <p>Bonjour,</p>
                    <p>Nous avons une excellente nouvelle pour vous !<br>
                    Le produit que vous attendiez avec impatience est enfin de retour en stock !</p>
                    <br>
                    <h2>' . htmlspecialchars($nomProduit) . '</h2>
                    <img src="' . htmlspecialchars($ImageProduit) . '" alt="' . htmlspecialchars($nomProduit) . '">
                    <br>
                    <p>N\'attendez plus pour le commander et profiter de cette opportunité avant qu\'il ne soit à nouveau épuisé.</p>
                    <br>
                    <a href="' . htmlspecialchars($lienProduit) . '" class="button">Commander maintenant</a>
                    <br><br>
                </div>
                <div class="footer">
                    <p>Merci de votre patience et de votre fidélité !</p>
                    <p>L\'équipe BYP</p>
                </div>
            </div>
        </body>
        </html>';

        $textMail = "
        Bonjour,

        Nous avons une excellente nouvelle pour vous !
        Le produit que vous attendiez avec impatience est enfin de retour en stock !

        Produit : {$nomProduit}
        Lien vers le produit : {$lienProduit}

        N'attendez plus pour le commander et profiter de cette opportunité avant qu'il ne soit à nouveau épuisé.

        Merci de votre patience et de votre fidélité !
        L'équipe BYP";


        $email = (new Email())
            ->from('no-reply@byp.com')
            ->to($data['userEmail'])
            ->subject('Produit disponible!')
            ->html($messageMail)
            ->text($textMail);

        try {
            $mailer->send($email);

            $alertRepository = $entityManager->getRepository(AlertEmail::class);
            $alert = $alertRepository->findOneBy([
                'id_produit' => $data['produitId'],
                'email' => $data['userEmail']
            ]);

            if ($alert) {
                $entityManager->remove($alert);
                $entityManager->flush();
            } else {
                return new Response('Alerte non trouvée');
            }

            return new Response('Email envoyé et alerte supprimée.');
        } catch (\Exception $e) {
            return new Response('Erreur lors de l\'envoi de l\'email ou de la suppression de l\'alerte.');
        }
    }
}