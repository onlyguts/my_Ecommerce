<?php

namespace App\Repository;

use App\Entity\AlertEmail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AlertEmail>
 *
 * @method AlertEmail|null find($id, $lockMode = null, $lockVersion = null)
 * @method AlertEmail|null findOneBy(array $criteria, array $orderBy = null)
 * @method AlertEmail[]    findAll()
 * @method AlertEmail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlertEmailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AlertEmail::class);
    }

//    /**
//     * @return AlertEmail[] Returns an array of AlertEmail objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AlertEmail
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
