<?php

namespace App\Repository;

use App\Entity\Aio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Aio>
 *
 * @method Aio|null find($id, $lockMode = null, $lockVersion = null)
 * @method Aio|null findOneBy(array $criteria, array $orderBy = null)
 * @method Aio[]    findAll()
 * @method Aio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Aio::class);
    }

//    /**
//     * @return Aio[] Returns an array of Aio objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Aio
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}