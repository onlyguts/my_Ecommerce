<?php

namespace App\Entity;

use App\Repository\ProduitTypeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitTypeRepository::class)]
class ProduitType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $id_produit = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    private ?string $outpout = null;

    #[ORM\Column]
    private ?int $price = null;


    #[ORM\Column(length: 255)]
    private ?string $image_type = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getOutpout(): ?string
    {
        return $this->outpout;
    }

    public function setOutpout(string $outpout): static
    {
        $this->outpout = $outpout;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

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
}
