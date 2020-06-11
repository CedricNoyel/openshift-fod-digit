<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CdtRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"cdt:read"}},
 *     denormalizationContext={"groups"={"cdt:write"}},
 * )
 * @ORM\Entity(repositoryClass=CdtRepository::class)
 */
class Cdt
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"cdt:read", "cdt:write", "plant:read", "plant:write", "zone:read", "intervention:item:get", "intervention:read", "checkitem:item:get", "checkitem:read"})
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Plant::class, inversedBy="cdts")
     * @Groups({"cdt:read", "cdt:write", "zone:read", "intervention:item:get", "intervention:read", "checkitem:item:get", "checkitem:read"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $plant;

    /**
     * @ORM\OneToMany(targetEntity=Zone::class, mappedBy="cdt", orphanRemoval=true)
     * @Groups({"cdt:read", "plant:read"})
     */
    private $zones;

    public function __construct()
    {
        $this->zones = new ArrayCollection();
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

    public function getPlant(): ?plant
    {
        return $this->plant;
    }

    public function setPlant(?plant $plant): self
    {
        $this->plant = $plant;

        return $this;
    }

    /**
     * @return Collection|Zone[]
     */
    public function getZones(): Collection
    {
        return $this->zones;
    }

    public function addZone(Zone $zone): self
    {
        if (!$this->zones->contains($zone)) {
            $this->zones[] = $zone;
            $zone->setCdt($this);
        }

        return $this;
    }

    public function removeZone(Zone $zone): self
    {
        if ($this->zones->contains($zone)) {
            $this->zones->removeElement($zone);
            // set the owning side to null (unless already changed)
            if ($zone->getCdt() === $this) {
                $zone->setCdt(null);
            }
        }

        return $this;
    }
}
