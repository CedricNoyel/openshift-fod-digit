<?php

namespace App\Repository;

use App\Entity\Checkitem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Checkitem|null find($id, $lockMode = null, $lockVersion = null)
 * @method Checkitem|null findOneBy(array $criteria, array $orderBy = null)
 * @method Checkitem[]    findAll()
 * @method Checkitem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CheckitemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Checkitem::class);
    }

    // /**
    //  * @return Checkitem[] Returns an array of Checkitem objects
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
    public function findOneBySomeField($value): ?Checkitem
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
