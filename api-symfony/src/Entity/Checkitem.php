<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CheckitemRepository;
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
 *     normalizationContext={"groups"={"checkitem:read"}},
 *     denormalizationContext={"groups"={"checkitem:write"}},
 *     attributes={"order"={"id": "DESC"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={
 *     "zone": "exact",
 *     "user": "exact"
 * })
 * @ApiFilter(BooleanFilter::class, properties={"isClosed"})
 * @ORM\Entity(repositoryClass=CheckitemRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Checkitem
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"checkitem:read", "checkitem:write"})
     * @Assert\NotBlank()
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"checkitem:read", "checkitem:write"})
     * @Assert\NotBlank()
     */
    private $lastName;

    /**
     * @ORM\Column(type="string")
     * @Groups({"checkitem:read", "checkitem:write"})
     */
    private $msn;
    
    /**
     * @ORM\Column(type="boolean")
     * @Groups({"intervention:read", "intervention:write"})
     */
    private $noMsn;

    /**
     * @ORM\OneToMany(targetEntity=ToolInputOutput::class, mappedBy="checkitem", cascade={"persist", "remove"}, orphanRemoval=true)
     * @Groups({"checkitem:read", "checkitem:write"})
     */
    private $objects;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"checkitem:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"checkitem:read"})
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"checkitem:read", "checkitem:write"})
     */
    private $isClosed;

    /**
     * @ORM\ManyToOne(targetEntity=Zone::class, inversedBy="checkitems")
     * @Groups({"checkitem:read", "checkitem:write"})
     */
    private $zone;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->objects = new ArrayCollection();
        $this->isClosed = false;
        $this->noMsn = false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

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
    
    /**
     * @return Collection|toolInputOutput[]
     */
    public function getObjects(): Collection
    {
        return $this->objects;
    }

    public function addObject(toolInputOutput $object): self
    {
        if (!$this->objects->contains($object)) {
            $this->objects[] = $object;
            $object->setCheckitem($this);
        }

        return $this;
    }

    public function removeObject(toolInputOutput $object): self
    {
        if ($this->objects->contains($object)) {
            $this->objects->removeElement($object);
            // set the owning side to null (unless already changed)
            if ($object->getCheckitem() === $this) {
                $object->setCheckitem(null);
            }
        }

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

    public function getIsClosed(): ?bool
    {
        return $this->isClosed;
    }

    public function setIsClosed(bool $isClosed): self
    {
        $this->isClosed = $isClosed;

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
}
