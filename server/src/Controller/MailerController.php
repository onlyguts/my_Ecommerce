<?php

namespace App\Controller;

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

        $email = (new Email())
            ->from('no-reply@byp.com')
            ->to($data['userEmail'])
            ->subject('Produit disponible!')
            ->html($data['message']);

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