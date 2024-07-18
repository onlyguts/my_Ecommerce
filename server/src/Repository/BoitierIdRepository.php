<?php

namespace App\Repository;

use App\Entity\BoitierId;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BoitierId>
 *
 * @method BoitierId|null find($id, $lockMode = null, $lockVersion = null)
 * @method BoitierId|null findOneBy(array $criteria, array $orderBy = null)
 * @method BoitierId[]    findAll()
 * @method BoitierId[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BoitierIdRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BoitierId::class);
    }

//    /**
//     * @return BoitierId[] Returns an array of BoitierId objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?BoitierId
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
