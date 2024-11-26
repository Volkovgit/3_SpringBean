package com.example.testspringbean.repository;

import com.example.testspringbean.entity.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@Transactional
public class RoleRepImpl implements RoleRep {

    @PersistenceContext
    private EntityManager em;

    private String SQL_GET_ROLE_BY_NAME = "select r from Role r where r.role =?1";


    @Override
    public Role getRoleByName(String roleName) {
        try{
            TypedQuery<Role> roleByNameQuery = em.createQuery(SQL_GET_ROLE_BY_NAME, Role.class);
            Role role = roleByNameQuery.setParameter(1, roleName).getSingleResult();
            return role;
        }
        catch (NoResultException e){
            System.out.println("Not found role: "+ roleName);
            return null;
        }

    }
}
