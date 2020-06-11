<?php

namespace App\Repository;

use App\Entity\ToolInputOutput;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ToolInputOutput|null find($id, $lockMode = null, $lockVersion = null)
 * @method ToolInputOutput|null findOneBy(array $criteria, array $orderBy = null)
 * @method ToolInputOutput[]    findAll()
 * @method ToolInputOutput[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ToolInputOutputRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ToolInputOutput::class);
    }

    // /**
    //  * @return ToolInputOutput[] Returns an array of ToolInputOutput objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ToolInputOutput
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
