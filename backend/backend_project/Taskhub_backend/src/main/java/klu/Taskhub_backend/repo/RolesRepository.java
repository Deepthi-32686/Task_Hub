package klu.Taskhub_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import klu.Taskhub_backend.model.Roles;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long>{

}