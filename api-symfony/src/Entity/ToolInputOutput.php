<?php

namespace App\Entity;

use App\Repository\ToolInputOutputRepository;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"toolInputOutput:read"}},
 *     denormalizationContext={"groups"={"toolInputOutput:write"}},
 * )
 * @ORM\Entity(repositoryClass=ToolInputOutputRepository::class)
 */
class ToolInputOutput
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"toolInputOutput:read", "toolInputOutput:write", "checkitem:read", "checkitem:write", "intervention:read", "intervention:write"})
     * @Assert\NotBlank()
     * @Assert\Length(
     *     min=2,
     *     max=30,
     *     maxMessage="Le nom doit être entre 2 et 30 caractères"
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"toolInputOutput:read", "toolInputOutput:write", "checkitem:read", "checkitem:write", "intervention:read", "intervention:write"})
     * @Assert\GreaterThan(value=0)
     */
    private $quantityInput;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"toolInputOutput:read", "toolInputOutput:write", "checkitem:read", "checkitem:write", "intervention:read", "intervention:write"})
     */
    private $quantityOutput;

    /**
     * @ORM\ManyToOne(targetEntity=Checkitem::class, inversedBy="objects")
     * @Groups({"toolInputOutput:read", "checkitem:write"})
     */
    private $checkitem;

    /**
     * @ORM\ManyToOne(targetEntity=Intervention::class, inversedBy="objects")
     * @Groups({"toolInputOutput:read", "intervention:write"})
     */
    private $intervention;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"toolInputOutput:read", "toolInputOutput:write", "checkitem:read", "checkitem:write", "intervention:read", "intervention:write"})
     */
    private $objectId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getObjectId(): ?int
    {
        return $this->objectId;
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

    public function getQuantityInput(): ?int
    {
        return $this->quantityInput;
    }

    public function setQuantityInput(int $quantityInput): self
    {
        $this->quantityInput = $quantityInput;

        return $this;
    }

    public function getQuantityOutput(): ?int
    {
        return $this->quantityOutput;
    }

    public function setQuantityOutput(int $quantityOutput): self
    {
        $this->quantityOutput = $quantityOutput;

        return $this;
    }

    public function getCheckitem(): ?Checkitem
    {
        return $this->checkitem;
    }

    public function setCheckitem(?Checkitem $checkitem): self
    {
        $this->checkitem = $checkitem;

        return $this;
    }

    public function getIntervention(): ?Intervention
    {
        return $this->intervention;
    }

    public function setIntervention(?Intervention $intervention): self
    {
        $this->intervention = $intervention;

        return $this;
    }

    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function setObjectId(int $objectId): self
    {
        $this->objectId = $objectId;

        return $this;
    }

}
