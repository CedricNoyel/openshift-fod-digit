<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InterventionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"intervention:read"}},
 *     denormalizationContext={"groups"={"intervention:write"}},
 *     attributes={"order"={"id": "DESC"}}
 * )
 * @ORM\Entity(repositoryClass=InterventionRepository::class)
 * @ApiFilter(BooleanFilter::class, properties={"isClosed"})
 * @ApiFilter(SearchFilter::class, properties={
 *     "zone": "exact",
 *     "user": "exact"
 * })
 */
class Intervention
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=Intervenant::class, inversedBy="interventions", cascade={"persist"})
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $intervenants;

    /**
     * @ORM\Column(type="string")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $msn;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $noMsn;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $typeNCAM;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $numeroNCAM;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $reason;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $selectedNature;

    /**
     * @ORM\OneToMany(targetEntity=ToolInputOutput::class, mappedBy="intervention", cascade={"persist", "remove"}, orphanRemoval=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $objects;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $isClosed;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"intervention:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"intervention:read"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Zone::class, inversedBy="interventions")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $zone;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $isCallConfirmed;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $isWorkDone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $company;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $isQualityChecked;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="interventions")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $qualityCheckedBy;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $qualityComment;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $qualityCheckedDate;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $isProdChecked;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="interventions")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $prodCheckedBy;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $prodComment;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $prodCheckedDate;

    public function __construct()
    {
        $this->intervenants = new ArrayCollection();
        $this->objects = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();

        $this->isQualityChecked = false;
        $this->isProdChecked = false;
        $this->qualityComment = "";
        $this->ProdComment = "";
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Intervenant[]
     */
    public function getIntervenants(): Collection
    {
        return $this->intervenants;
    }

    public function addIntervenant(Intervenant $intervenant): self
    {
        if (!$this->intervenants->contains($intervenant)) {
            $this->intervenants[] = $intervenant;
        }

        return $this;
    }

    public function removeIntervenant(Intervenant $intervenant): self
    {
        if ($this->intervenants->contains($intervenant)) {
            $this->intervenants->removeElement($intervenant);
        }

        return $this;
    }

    public function getMsn(): ?string
    {
        return $this->msn;
    }

    public function setMsn(?string $msn): self
    {
        $this->msn = $msn;

        return $this;
    }

    public function getNoMsn(): ?bool
    {
        return $this->noMsn;
    }

    public function setNoMsn(bool $noMsn): self
    {
        $this->noMsn = $noMsn;

        return $this;
    }

    public function getTypeNCAM(): ?string
    {
        return $this->typeNCAM;
    }

    public function setTypeNCAM(?string $typeNCAM): self
    {
        $this->typeNCAM = $typeNCAM;

        return $this;
    }

    public function getNumeroNCAM(): ?string
    {
        return $this->numeroNCAM;
    }

    public function setNumeroNCAM(?string $numeroNCAM): self
    {
        $this->numeroNCAM = $numeroNCAM;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(?string $reason): self
    {
        $this->reason = $reason;

        return $this;
    }

    public function getSelectedNature(): ?string
    {
        return $this->selectedNature;
    }

    public function setSelectedNature(?string $selectedNature): self
    {
        $this->selectedNature = $selectedNature;

        return $this;
    }

    /**
     * @return Collection|ToolInputOutput[]
     */
    public function getObjects(): Collection
    {
        return $this->objects;
    }

    public function addObject(ToolInputOutput $object): self
    {
        if (!$this->objects->contains($object)) {
            $this->objects[] = $object;
            $object->setIntervention($this);
        }

        return $this;
    }

    public function removeObject(ToolInputOutput $object): self
    {
        if ($this->objects->contains($object)) {
            $this->objects->removeElement($object);
            // set the owning side to null (unless already changed)
            if ($object->getIntervention() === $this) {
                $object->setIntervention(null);
            }
        }

        return $this;
    }

    public function getIsClosed(): ?bool
    {
        return $this->isClosed;
    }

    public function setIsClosed(bool $isClosed): self
    {
        $this->isClosed = $isClosed;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getZone(): ?Zone
    {
        return $this->zone;
    }

    public function setZone(?Zone $zone): self
    {
        $this->zone = $zone;

        return $this;
    }

    public function getIsCallConfirmed(): ?bool
    {
        return $this->isCallConfirmed;
    }

    public function setIsCallConfirmed(bool $isCallConfirmed): self
    {
        $this->isCallConfirmed = $isCallConfirmed;

        return $this;
    }

    public function getIsWorkDone(): ?bool
    {
        return $this->isWorkDone;
    }

    public function setIsWorkDone(bool $isWorkDone): self
    {
        $this->isWorkDone = $isWorkDone;

        return $this;
    }
    
    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
    */
    public function updatedTimestamps(): void
    {
        $this->setUpdatedAt(new \DateTime('now'));    
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt(new \DateTime('now'));
        }
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getIsQualityChecked(): ?bool
    {
        return $this->isQualityChecked;
    }

    public function setIsQualityChecked(bool $isQualityChecked): self
    {
        $this->isQualityChecked = $isQualityChecked;

        return $this;
    }

    public function getQualityCheckedBy(): ?User
    {
        return $this->qualityCheckedBy;
    }

    public function setQualityCheckedBy(?User $qualityCheckedBy): self
    {
        $this->qualityCheckedBy = $qualityCheckedBy;

        return $this;
    }

    public function getQualityComment(): ?string
    {
        return $this->qualityComment;
    }

    public function setQualityComment(string $qualityComment): self
    {
        $this->qualityComment = $qualityComment;

        return $this;
    }

    public function getQualityCheckedDate(): ?\DateTimeInterface
    {
        return $this->qualityCheckedDate;
    }

    public function setQualityCheckedDate(\DateTimeInterface $qualityCheckedDate): self
    {
        $this->qualityCheckedDate = $qualityCheckedDate;

        return $this;
    }

    public function getIsProdChecked(): ?bool
    {
        return $this->isProdChecked;
    }

    public function setIsProdChecked(bool $isProdChecked): self
    {
        $this->isProdChecked = $isProdChecked;

        return $this;
    }

    public function getProdCheckedBy(): ?User
    {
        return $this->prodCheckedBy;
    }

    public function setProdCheckedBy(?User $prodCheckedBy): self
    {
        $this->prodCheckedBy = $prodCheckedBy;

        return $this;
    }

    public function getProdComment(): ?string
    {
        return $this->prodComment;
    }

    public function setProdComment(string $prodComment): self
    {
        $this->prodComment = $prodComment;

        return $this;
    }

    public function getProdCheckedDate(): ?\DateTimeInterface
    {
        return $this->prodCheckedDate;
    }

    public function setProdCheckedDate(\DateTimeInterface $prodCheckedDate): self
    {
        $this->prodCheckedDate = $prodCheckedDate;

        return $this;
    }
}
