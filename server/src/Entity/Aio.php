<?php

namespace App\Entity;

use App\Repository\AioRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AioRepository::class)]
class Aio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $designation = null;

    #[ORM\Column(length: 255)]
    private ?string $marque = null;

    #[ORM\Column(length: 255)]
    private ?string $modele = null;

    #[ORM\Column(length: 255)]
    private ?string $utilisation = null;

    #[ORM\Column(length: 255)]
    private ?string $support_cpu = null;

    #[ORM\Column(length: 255)]
    private ?string $couleur = null;

    #[ORM\Column(length: 255)]
    private ?string $lumineux = null;

    #[ORM\Column(length: 255)]
    private ?string $couleur_led = null;

    #[ORM\Column(length: 255)]
    private ?string $connecteur = null;

    #[ORM\Column(length: 255)]
    private ?string $roulement_bille = null;

    #[ORM\Column(length: 255)]
    private ?string $pwm = null;

    #[ORM\Column(length: 255)]
    private ?string $heat_pipe = null;

    #[ORM\Column(length: 255)]
    private ?string $vitesse_reglable = null;

    #[ORM\Column(length: 255)]
    private ?string $type_refroid = null;

    #[ORM\Column(length: 255)]
    private ?string $top_flow = null;

    #[ORM\Column(length: 255)]
    private ?string $double_tour = null;

    #[ORM\Column(length: 255)]
    private ?string $diametre_ventilo = null;

    #[ORM\Column(length: 255)]
    private ?string $materiaux = null;

    #[ORM\Column(length: 255)]
    private ?string $compat_radiateur = null;

    #[ORM\Column(length: 255)]
    private ?string $low_profile = null;

    #[ORM\Column(length: 255)]
    private ?string $hauteur = null;

    #[ORM\Column(length: 255)]
    private ?string $largeur = null;

    #[ORM\Column(length: 255)]
    private ?string $garanti_c = null;

    #[ORM\Column(length: 255)]
    private ?string $garanti_l = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDesignation(): ?string
    {
        return $this->designation;
    }

    public function setDesignation(string $designation): static
    {
        $this->designation = $designation;

        return $this;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(string $marque): static
    {
        $this->marque = $marque;

        return $this;
    }

    public function getModele(): ?string
    {
        return $this->modele;
    }

    public function setModele(string $modele): static
    {
        $this->modele = $modele;

        return $this;
    }

    public function getUtilisation(): ?string
    {
        return $this->utilisation;
    }

    public function setUtilisation(string $utilisation): static
    {
        $this->utilisation = $utilisation;

        return $this;
    }

    public function getSupportCpu(): ?string
    {
        return $this->support_cpu;
    }

    public function setSupportCpu(string $support_cpu): static
    {
        $this->support_cpu = $support_cpu;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): static
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getLumineux(): ?string
    {
        return $this->lumineux;
    }

    public function setLumineux(string $lumineux): static
    {
        $this->lumineux = $lumineux;

        return $this;
    }

    public function getCouleurLed(): ?string
    {
        return $this->couleur_led;
    }

    public function setCouleurLed(string $couleur_led): static
    {
        $this->couleur_led = $couleur_led;

        return $this;
    }

    public function getConnecteur(): ?string
    {
        return $this->connecteur;
    }

    public function setConnecteur(string $connecteur): static
    {
        $this->connecteur = $connecteur;

        return $this;
    }

    public function getRoulementBille(): ?string
    {
        return $this->roulement_bille;
    }

    public function setRoulementBille(string $roulement_bille): static
    {
        $this->roulement_bille = $roulement_bille;

        return $this;
    }

    public function getPwm(): ?string
    {
        return $this->pwm;
    }

    public function setPwm(string $pwm): static
    {
        $this->pwm = $pwm;

        return $this;
    }

    public function getHeatPipe(): ?string
    {
        return $this->heat_pipe;
    }

    public function setHeatPipe(string $heat_pipe): static
    {
        $this->heat_pipe = $heat_pipe;

        return $this;
    }

    public function getVitesseReglable(): ?string
    {
        return $this->vitesse_reglable;
    }

    public function setVitesseReglable(string $vitesse_reglable): static
    {
        $this->vitesse_reglable = $vitesse_reglable;

        return $this;
    }

    public function getTypeRefroid(): ?string
    {
        return $this->type_refroid;
    }

    public function setTypeRefroid(string $type_refroid): static
    {
        $this->type_refroid = $type_refroid;

        return $this;
    }

    public function getTopFlow(): ?string
    {
        return $this->top_flow;
    }

    public function setTopFlow(string $top_flow): static
    {
        $this->top_flow = $top_flow;

        return $this;
    }

    public function getDoubleTour(): ?string
    {
        return $this->double_tour;
    }

    public function setDoubleTour(string $double_tour): static
    {
        $this->double_tour = $double_tour;

        return $this;
    }

    public function getDiametreVentilo(): ?string
    {
        return $this->diametre_ventilo;
    }

    public function setDiametreVentilo(string $diametre_ventilo): static
    {
        $this->diametre_ventilo = $diametre_ventilo;

        return $this;
    }

    public function getMateriaux(): ?string
    {
        return $this->materiaux;
    }

    public function setMateriaux(string $materiaux): static
    {
        $this->materiaux = $materiaux;

        return $this;
    }

    public function getCompatRadiateur(): ?string
    {
        return $this->compat_radiateur;
    }

    public function setCompatRadiateur(string $compat_radiateur): static
    {
        $this->compat_radiateur = $compat_radiateur;

        return $this;
    }

    public function getLowProfile(): ?string
    {
        return $this->low_profile;
    }

    public function setLowProfile(string $low_profile): static
    {
        $this->low_profile = $low_profile;

        return $this;
    }

    public function getHauteur(): ?string
    {
        return $this->hauteur;
    }

    public function setHauteur(string $hauteur): static
    {
        $this->hauteur = $hauteur;

        return $this;
    }

    public function getLargeur(): ?string
    {
        return $this->largeur;
    }

    public function setLargeur(string $largeur): static
    {
        $this->largeur = $largeur;

        return $this;
    }

    public function getGarantiC(): ?string
    {
        return $this->garanti_c;
    }

    public function setGarantiC(string $garanti_c): static
    {
        $this->garanti_c = $garanti_c;

        return $this;
    }

    public function getGarantiL(): ?string
    {
        return $this->garanti_l;
    }

    public function setGarantiL(string $garanti_l): static
    {
        $this->garanti_l = $garanti_l;

        return $this;
    }
}