<?php

namespace App\Repository;

use App\Entity\Cdt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Cdt|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cdt|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cdt[]    findAll()
 * @method Cdt[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CdtRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cdt::class);
    }

    // /**
    //  * @return Cdt[] Returns an array of Cdt objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Cdt
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
