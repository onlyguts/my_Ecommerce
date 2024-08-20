<?php

namespace App\Entity;

use App\Repository\PanierRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PanierRepository::class)]
class Panier
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $id_user = null;

    #[ORM\Column]
    private ?int $id_produit = null;

    #[ORM\Column]
    private ?int $price_type = null;

    #[ORM\Column(length: 255)]
    private ?string $image_type = null;

    #[ORM\Column(length: 255)]
    private ?string $info = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdUser(): ?int
    {
        return $this->id_user;
    }

    public function setIdUser(int $id_user): static
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getIdProduit(): ?int
    {
        return $this->id_produit;
    }

    public function setIdProduit(int $id_produit): static
    {
        $this->id_produit = $id_produit;

        return $this;
    }

    public function getPriceType(): ?int
    {
        return $this->price_type;
    }

    public function setPriceType(int $price_type): static
    {
        $this->price_type = $price_type;

        return $this;
    }

    public function getImageType(): ?string
    {
        return $this->image_type;
    }

    public function setImageType(string $image_type): static
    {
        $this->image_type = $image_type;

        return $this;
    }

    public function getInfo(): ?string
    {
        return $this->info;
    }

    public function setInfo(string $info): static
    {
        $this->info = $info;

        return $this;
    }
}
