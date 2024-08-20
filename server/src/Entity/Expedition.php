<?php

namespace App\Entity;

use App\Repository\ExpeditionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExpeditionRepository::class)]
class Expedition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $taxe = null;

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

    public function getTaxe(): ?int
    {
        return $this->taxe;
    }

    public function setTaxe(int $taxe): static
    {
        $this->taxe = $taxe;

        return $this;
    }
}
