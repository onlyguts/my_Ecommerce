<?php

namespace App\Entity;

use App\Repository\BoitierRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BoitierRepository::class)]
class Boitier
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $marque = null;

    #[ORM\Column(length: 255)]
    private ?string $modele = null;

    #[ORM\Column(length: 255)]
    private ?string $image_url = null;

    #[ORM\Column(length: 255)]
    private ?string $designation = null;

    #[ORM\Column(length: 255)]
    private ?string $price = null;

    #[ORM\Column(length: 255)]
    private ?string $long_max_cg = null;

    #[ORM\Column(length: 255)]
    private ?string $haut_max_cpu = null;

    #[ORM\Column(length: 255)]
    private ?string $long_max_ali = null;

    #[ORM\Column(length: 255)]
    private ?string $format_ali = null;

    #[ORM\Column(length: 255)]
    private ?string $format_boitier = null;

    #[ORM\Column(length: 255)]
    private ?string $utilisation = null;

    #[ORM\Column(length: 255)]
    private ?string $matériau = null;

    #[ORM\Column(length: 255)]
    private ?string $format_cm = null;

    #[ORM\Column(length: 255)]
    private ?string $ali_fournie = null;

    #[ORM\Column(length: 255)]
    private ?string $color_boitier = null;

    #[ORM\Column(length: 255)]
    private ?string $color_facade = null;

    #[ORM\Column(length: 255)]
    private ?string $ecran = null;

    #[ORM\Column(length: 255)]
    private ?string $vitre = null;

    #[ORM\Column(length: 255)]
    private ?string $verre_trempe = null;

    #[ORM\Column(length: 255)]
    private ?string $aquarium = null;

    #[ORM\Column(length: 255)]
    private ?string $led_rgb = null;

    #[ORM\Column(length: 255)]
    private ?string $led_argb = null;

    #[ORM\Column(length: 255)]
    private ?string $compa_wc = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre_pci = null;

    #[ORM\Column(length: 255)]
    private ?string $low_profile = null;

    #[ORM\Column(length: 255)]
    private ?string $nb_ep_35_pv = null;

    #[ORM\Column(length: 255)]
    private ?string $nb_ep_35_pi = null;

    #[ORM\Column(length: 255)]
    private ?string $nb_ep_25 = null;

    #[ORM\Column(length: 255)]
    private ?string $nb_ep_2535 = null;

    #[ORM\Column(length: 255)]
    private ?string $nb_ep_525_pv = null;

    #[ORM\Column(length: 255)]
    private ?string $nb_ep_525_sslim = null;

    #[ORM\Column(length: 255)]
    private ?string $nb_ep_525_slim = null;

    #[ORM\Column(length: 255)]
    private ?string $em_port = null;

    #[ORM\Column(length: 255)]
    private ?string $connecteur = null;

    #[ORM\Column(length: 255)]
    private ?string $max_ventilo_boitier_a = null;

    #[ORM\Column(length: 255)]
    private ?string $ventilo_boitier_a = null;

    #[ORM\Column(length: 255)]
    private ?string $max_ventilo_boitier_f = null;

    #[ORM\Column(length: 255)]
    private ?string $ventilo_boitier_f = null;

    #[ORM\Column(length: 255)]
    private ?string $max_ventilo_boitier_h = null;

    #[ORM\Column(length: 255)]
    private ?string $ventilo_boitier_h = null;

    #[ORM\Column(length: 255)]
    private ?string $max_ventilo_boitier_b = null;

    #[ORM\Column(length: 255)]
    private ?string $ventilo_boitier_b = null;

    #[ORM\Column(length: 255)]
    private ?string $description_ventilo = null;

    #[ORM\Column(length: 255)]
    private ?string $compat_aio = null;

    #[ORM\Column(length: 255)]
    private ?string $em_facade_aio = null;

    #[ORM\Column(length: 255)]
    private ?string $em_dessus_aio = null;

    #[ORM\Column(length: 255)]
    private ?string $em_arriere_aio = null;

    #[ORM\Column(length: 255)]
    private ?string $largeur = null;

    #[ORM\Column(length: 255)]
    private ?string $longeur = null;

    #[ORM\Column(length: 255)]
    private ?string $profondeur = null;

    #[ORM\Column(length: 255)]
    private ?string $poids = null;

    #[ORM\Column(length: 255)]
    private ?string $volume = null;

    #[ORM\Column(length: 255)]
    private ?string $garantie_c = null;

    #[ORM\Column(length: 255)]
    private ?string $garantie_l = null;

    

    public function getId(): ?int
    {
        return $this->id;
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

    public function getImageUrl(): ?string
    {
        return $this->image_url;
    }

    public function setImageUrl(string $image_url): static
    {
        $this->image_url = $image_url;

        return $this;
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

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getLongMaxCg(): ?string
    {
        return $this->long_max_cg;
    }

    public function setLongMaxCg(string $long_max_cg): static
    {
        $this->long_max_cg = $long_max_cg;

        return $this;
    }

    public function getHautMaxCpu(): ?string
    {
        return $this->haut_max_cpu;
    }

    public function setHautMaxCpu(string $haut_max_cpu): static
    {
        $this->haut_max_cpu = $haut_max_cpu;

        return $this;
    }

    public function getLongMaxAli(): ?string
    {
        return $this->long_max_ali;
    }

    public function setLongMaxAli(string $long_max_ali): static
    {
        $this->long_max_ali = $long_max_ali;

        return $this;
    }

    public function getFormatAli(): ?string
    {
        return $this->format_ali;
    }

    public function setFormatAli(string $format_ali): static
    {
        $this->format_ali = $format_ali;

        return $this;
    }

    public function getFormatBoitier(): ?string
    {
        return $this->format_boitier;
    }

    public function setFormatBoitier(string $format_boitier): static
    {
        $this->format_boitier = $format_boitier;

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

    public function getMatériau(): ?string
    {
        return $this->matériau;
    }

    public function setMatériau(string $matériau): static
    {
        $this->matériau = $matériau;

        return $this;
    }

    public function getFormatCm(): ?string
    {
        return $this->format_cm;
    }

    public function setFormatCm(string $format_cm): static
    {
        $this->format_cm = $format_cm;

        return $this;
    }

    public function getAliFournie(): ?string
    {
        return $this->ali_fournie;
    }

    public function setAliFournie(string $ali_fournie): static
    {
        $this->ali_fournie = $ali_fournie;

        return $this;
    }

    public function getColorBoitier(): ?string
    {
        return $this->color_boitier;
    }

    public function setColorBoitier(string $color_boitier): static
    {
        $this->color_boitier = $color_boitier;

        return $this;
    }

    public function getColorFacade(): ?string
    {
        return $this->color_facade;
    }

    public function setColorFacade(string $color_facade): static
    {
        $this->color_facade = $color_facade;

        return $this;
    }

    public function getEcran(): ?string
    {
        return $this->ecran;
    }

    public function setEcran(string $ecran): static
    {
        $this->ecran = $ecran;

        return $this;
    }

    public function getVitre(): ?string
    {
        return $this->vitre;
    }

    public function setVitre(string $vitre): static
    {
        $this->vitre = $vitre;

        return $this;
    }

    public function getVerreTrempe(): ?string
    {
        return $this->verre_trempe;
    }

    public function setVerreTrempe(string $verre_trempe): static
    {
        $this->verre_trempe = $verre_trempe;

        return $this;
    }

    public function getAquarium(): ?string
    {
        return $this->aquarium;
    }

    public function setAquarium(string $aquarium): static
    {
        $this->aquarium = $aquarium;

        return $this;
    }

    public function getLedRgb(): ?string
    {
        return $this->led_rgb;
    }

    public function setLegdRgb(string $leg_rgb): static
    {
        $this->led_rgb = $leg_rgb;

        return $this;
    }

    public function getLedArgb(): ?string
    {
        return $this->led_argb;
    }

    public function setLedArgb(string $led_argb): static
    {
        $this->led_argb = $led_argb;

        return $this;
    }

    public function getCompaWc(): ?string
    {
        return $this->compa_wc;
    }

    public function setCompaWc(string $compa_wc): static
    {
        $this->compa_wc = $compa_wc;

        return $this;
    }

    public function getNombrePci(): ?string
    {
        return $this->nombre_pci;
    }

    public function setNombrePci(string $nombre_pci): static
    {
        $this->nombre_pci = $nombre_pci;

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

    public function getNbEp35Pv(): ?string
    {
        return $this->nb_ep_35_pv;
    }

    public function setNbEp35Pv(string $nb_ep_35_pv): static
    {
        $this->nb_ep_35_pv = $nb_ep_35_pv;

        return $this;
    }

    public function getNbEp35Pi(): ?string
    {
        return $this->nb_ep_35_pi;
    }

    public function setNbEp35Pi(string $nb_ep_35_pi): static
    {
        $this->nb_ep_35_pi = $nb_ep_35_pi;

        return $this;
    }

    public function getNbEp25(): ?string
    {
        return $this->nb_ep_25;
    }

    public function setNbEp25(string $nb_ep_25): static
    {
        $this->nb_ep_25 = $nb_ep_25;

        return $this;
    }

    public function getNbEp2535(): ?string
    {
        return $this->nb_ep_2535;
    }

    public function setNbEp2535(string $nb_ep_2535): static
    {
        $this->nb_ep_2535 = $nb_ep_2535;

        return $this;
    }

    public function getNbEp525Pv(): ?string
    {
        return $this->nb_ep_525_pv;
    }

    public function setNbEp525Pv(string $nb_ep_525_pv): static
    {
        $this->nb_ep_525_pv = $nb_ep_525_pv;

        return $this;
    }

    public function getNbEp525Sslim(): ?string
    {
        return $this->nb_ep_525_sslim;
    }

    public function setNbEp525Sslim(string $nb_ep_525_sslim): static
    {
        $this->nb_ep_525_sslim = $nb_ep_525_sslim;

        return $this;
    }

    public function getNbEp525Slim(): ?string
    {
        return $this->nb_ep_525_slim;
    }

    public function setNbEp525Slim(string $nb_ep_525_slim): static
    {
        $this->nb_ep_525_slim = $nb_ep_525_slim;

        return $this;
    }

    public function getEmPort(): ?string
    {
        return $this->em_port;
    }

    public function setEmPort(string $em_port): static
    {
        $this->em_port = $em_port;

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

    public function getMaxVentiloBoitierA(): ?string
    {
        return $this->max_ventilo_boitier_a;
    }

    public function setMaxVentiloBoitierA(string $max_ventilo_boitier_a): static
    {
        $this->max_ventilo_boitier_a = $max_ventilo_boitier_a;

        return $this;
    }

    public function getVentiloBoitierA(): ?string
    {
        return $this->ventilo_boitier_a;
    }

    public function setVentiloBoitierA(string $ventilo_boitier_a): static
    {
        $this->ventilo_boitier_a = $ventilo_boitier_a;

        return $this;
    }

    public function getMaxVentiloBoitierF(): ?string
    {
        return $this->max_ventilo_boitier_f;
    }

    public function setMaxVentiloBoitierF(string $max_ventilo_boitier_f): static
    {
        $this->max_ventilo_boitier_f = $max_ventilo_boitier_f;

        return $this;
    }

    public function getVentiloBoitierF(): ?string
    {
        return $this->ventilo_boitier_f;
    }

    public function setVentiloBoitierF(string $ventilo_boitier_f): static
    {
        $this->ventilo_boitier_f = $ventilo_boitier_f;

        return $this;
    }

    public function getMaxVentiloBoitierH(): ?string
    {
        return $this->max_ventilo_boitier_h;
    }

    public function setMaxVentiloBoitierH(string $max_ventilo_boitier_h): static
    {
        $this->max_ventilo_boitier_h = $max_ventilo_boitier_h;

        return $this;
    }

    public function getVentiloBoitierH(): ?string
    {
        return $this->ventilo_boitier_h;
    }

    public function setVentiloBoitierH(string $ventilo_boitier_h): static
    {
        $this->ventilo_boitier_h = $ventilo_boitier_h;

        return $this;
    }

    public function getMaxVentiloBoitierB(): ?string
    {
        return $this->max_ventilo_boitier_b;
    }

    public function setMaxVentiloBoitierB(string $max_ventilo_boitier_b): static
    {
        $this->max_ventilo_boitier_b = $max_ventilo_boitier_b;

        return $this;
    }

    public function getVentiloBoitierB(): ?string
    {
        return $this->ventilo_boitier_b;
    }

    public function setVentiloBoitierB(string $ventilo_boitier_b): static
    {
        $this->ventilo_boitier_b = $ventilo_boitier_b;

        return $this;
    }

    public function getDescriptionVentilo(): ?string
    {
        return $this->description_ventilo;
    }

    public function setDescriptionVentilo(string $description_ventilo): static
    {
        $this->description_ventilo = $description_ventilo;

        return $this;
    }

    public function getCompatAio(): ?string
    {
        return $this->compat_aio;
    }

    public function setCompatAio(string $compat_aio): static
    {
        $this->compat_aio = $compat_aio;

        return $this;
    }

    public function getEmFacadeAio(): ?string
    {
        return $this->em_facade_aio;
    }

    public function setEmFacadeAio(string $em_facade_aio): static
    {
        $this->em_facade_aio = $em_facade_aio;

        return $this;
    }

    public function getEmDessusAio(): ?string
    {
        return $this->em_dessus_aio;
    }

    public function setEmDessusAio(string $em_dessus_aio): static
    {
        $this->em_dessus_aio = $em_dessus_aio;

        return $this;
    }

    public function getEmArriereAio(): ?string
    {
        return $this->em_arriere_aio;
    }

    public function setEmArriereAio(string $em_arriere_aio): static
    {
        $this->em_arriere_aio = $em_arriere_aio;

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

    public function getLongeur(): ?string
    {
        return $this->longeur;
    }

    public function setLongeur(string $longeur): static
    {
        $this->longeur = $longeur;

        return $this;
    }

    public function getProfondeur(): ?string
    {
        return $this->profondeur;
    }

    public function setProfondeur(string $profondeur): static
    {
        $this->profondeur = $profondeur;

        return $this;
    }

    public function getPoids(): ?string
    {
        return $this->poids;
    }

    public function setPoids(string $poids): static
    {
        $this->poids = $poids;

        return $this;
    }

    public function getVolume(): ?string
    {
        return $this->volume;
    }

    public function setVolume(string $volume): static
    {
        $this->volume = $volume;

        return $this;
    }

    public function getGarantieC(): ?string
    {
        return $this->garantie_c;
    }

    public function setGarantieC(string $garantie_c): static
    {
        $this->garantie_c = $garantie_c;

        return $this;
    }

    public function getGarantieL(): ?string
    {
        return $this->garantie_l;
    }

    public function setGarantieL(string $garantie_l): static
    {
        $this->garantie_l = $garantie_l;

        return $this;
    }

}