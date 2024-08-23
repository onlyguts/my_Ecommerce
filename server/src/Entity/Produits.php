<?php

namespace App\Entity;

use App\Repository\ProduitsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitsRepository::class)]
class Produits
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $id_categorie = null;

    #[ORM\Column(length: 255)]
    private ?string $marque = null;

    #[ORM\Column]
    private ?int $prix = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column]
    private ?int $stock = null;

    #[ORM\Column]
    private ?int $views = null;

    #[ORM\Column(length: 255)]
    private ?string $taille = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    private ?string $socket = null;

    #[ORM\Column(length: 255)]
    private ?string $typec = null;

    #[ORM\Column]
    private ?int $consommations = null;

    #[ORM\Column]
    private ?int $promo = null;

    #[ORM\Column]
    private ?int $suggestion = null;

    #[ORM\Column]
    private ?int $length = null;

    #[ORM\Column]
    private ?int $height = null;

    #[ORM\Column]
    private ?int $width = null;

    #[ORM\Column]
    private ?int $weight = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $create_time = null;

  

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getIdCategorie(): ?int
    {
        return $this->id_categorie;
    }

    public function setIdCategorie(int $id_categorie): static
    {
        $this->id_categorie = $id_categorie;

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

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getviews(): ?int
    {
        return $this->views;
    }

    public function setviews(int $views): static
    {
        $this->views = $views;

        return $this;
    }

    public function getTaille(): ?string
    {
        return $this->taille;
    }

    public function setTaille(string $taille): static
    {
        $this->taille = $taille;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getSocket(): ?string
    {
        return $this->socket;
    }

    public function setSocket(string $socket): static
    {
        $this->socket = $socket;

        return $this;
    }

    public function getTypec(): ?string
    {
        return $this->typec;
    }

    public function setTypec(string $typec): static
    {
        $this->typec = $typec;

        return $this;
    }

    public function getConsommations(): ?int
    {
        return $this->consommations;
    }

    public function setConsommations(int $consommations): static
    {
        $this->consommations = $consommations;

        return $this;
    }

    public function getPromo(): ?int
    {
        return $this->promo;
    }

    public function setPromo(int $promo): static
    {
        $this->promo = $promo;

        return $this;
    }

    public function getSuggestion(): ?int
    {
        return $this->suggestion;
    }

    public function setSuggestion(int $suggestion): static
    {
        $this->suggestion = $suggestion;

        return $this;
    }

    public function getLength(): ?int
    {
        return $this->length;
    }

    public function setLength(int $length): static
    {
        $this->length = $length;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(int $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getWidth(): ?int
    {
        return $this->width;
    }

    public function setWidth(int $width): static
    {
        $this->width = $width;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(int $weight): static
    {
        $this->weight = $weight;

        return $this;
    }

    public function getCreateTime(): ?\DateTimeInterface
    {
        return $this->create_time;
    }

    public function setCreateTime(\DateTimeInterface $create_time): static
    {
        $this->create_time = $create_time;

        return $this;
    }


}
