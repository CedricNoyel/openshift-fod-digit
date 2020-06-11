<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ZoneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"zone:read"}},
 *     denormalizationContext={"groups"={"zone:write"}},
 * )
 * @ORM\Entity(repositoryClass=ZoneRepository::class)
 */
class Zone
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank()
     * @Groups({"zone:read", "zone:write", "cdt:read", "cdt:write", "plant:read", "checkitem:read", "checkitem:item:get", "intervention:read", "intervention:item:get"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Cdt::class, inversedBy="zones")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"zone:read", "zone:write", "intervention:item:get", "intervention:read", "checkitem:read" , "checkitem:item:get"})
     */
    private $cdt;

    /**
     * @ORM\OneToMany(targetEntity=Checkitem::class, mappedBy="zone")
     */
    private $checkitems;

    /**
     * @ORM\OneToMany(targetEntity=Intervention::class, mappedBy="zone")
     */
    private $interventions;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="zones")
     * @Groups({"zone:read"})
     */
    private $users;

    public function __construct()
    {
        $this->checkitems = new ArrayCollection();
        $this->interventions = new ArrayCollection();
        $this->users = new ArrayCollection();
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

    public function getCdt(): ?cdt
    {
        return $this->cdt;
    }

    public function setCdt(?cdt $cdt): self
    {
        $this->cdt = $cdt;

        return $this;
    }

    /**
     * @return Collection|Checkitem[]
     */
    public function getCheckitems(): Collection
    {
        return $this->checkitems;
    }

    public function addCheckitem(Checkitem $checkitem): self
    {
        if (!$this->checkitems->contains($checkitem)) {
            $this->checkitems[] = $checkitem;
            $checkitem->setZone($this);
        }

        return $this;
    }

    public function removeCheckitem(Checkitem $checkitem): self
    {
        if ($this->checkitems->contains($checkitem)) {
            $this->checkitems->removeElement($checkitem);
            // set the owning side to null (unless already changed)
            if ($checkitem->getZone() === $this) {
                $checkitem->setZone(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Intervention[]
     */
    public function getInterventions(): Collection
    {
        return $this->interventions;
    }

    public function addIntervention(Intervention $intervention): self
    {
        if (!$this->interventions->contains($intervention)) {
            $this->interventions[] = $intervention;
            $intervention->setZone($this);
        }

        return $this;
    }

    public function removeIntervention(Intervention $intervention): self
    {
        if ($this->interventions->contains($intervention)) {
            $this->interventions->removeElement($intervention);
            // set the owning side to null (unless already changed)
            if ($intervention->getZone() === $this) {
                $intervention->setZone(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addZone($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeZone($this);
        }

        return $this;
    }
}
