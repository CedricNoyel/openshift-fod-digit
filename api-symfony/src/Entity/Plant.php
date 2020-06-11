<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PlantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"plant:read"}},
 *     denormalizationContext={"groups"={"plant:write"}},
 * )
 * @UniqueEntity(fields={"name"})
 * @ORM\Entity(repositoryClass=PlantRepository::class)
 */
class Plant
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"plant:read", "plant:write", "cdt:read", "zone:read", "checkitem:read", "checkitem:item:get", "intervention:read", "intervention:item:get"})
     * @ORM\Column(type="string", length=50, unique=true)
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @Groups({"plant:read", "plant:write"})
     * @ORM\OneToMany(targetEntity=Cdt::class, mappedBy="plant", orphanRemoval=true, cascade={"persist"})
     */
    private $cdts;

    public function __construct()
    {
        $this->cdts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Cdt[]
     */
    public function getCdts(): Collection
    {
        return $this->cdts;
    }

    public function addCdt(Cdt $cdt): self
    {
        if (!$this->cdts->contains($cdt)) {
            $this->cdts[] = $cdt;
            $cdt->setPlant($this);
        }

        return $this;
    }

    public function removeCdt(Cdt $cdt): self
    {
        if ($this->cdts->contains($cdt)) {
            $this->cdts->removeElement($cdt);
            // set the owning side to null (unless already changed)
            if ($cdt->getPlant() === $this) {
                $cdt->setPlant(null);
            }
        }

        return $this;
    }
}
