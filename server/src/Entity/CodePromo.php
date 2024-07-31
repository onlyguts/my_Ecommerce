<?php

namespace App\Entity;

use App\Repository\CodePromoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CodePromoRepository::class)]
class CodePromo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $code = null;

    #[ORM\Column]
    private ?int $promotion = null;

    #[ORM\Column]
    private ?int $utilisations = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getpromotion(): ?int
    {
        return $this->promotion;
    }

    public function setpromotion(int $promotion): static
    {
        $this->promotion = $promotion;

        return $this;
    }

    public function getUtilisations(): ?int
    {
        return $this->utilisations;
    }

    public function setUtilisations(int $utilisations): static
    {
        $this->utilisations = $utilisations;

        return $this;
    }
}
