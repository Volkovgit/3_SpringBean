package com.example.testspringbean.repository;

import com.example.testspringbean.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public class UserRepImpl implements UserRep {
    private static String SQL_GET_ALL_USERS = "select u from User u order by u.id";
    private static String SQL_GET_USER_BY_NAME = "select u from User u where u.email = ?1";
    @PersistenceContext
    private EntityManager em;

    @Override
    public User getUserById(int userId) throws IllegalArgumentException {
        try {
            User user = em.find(User.class, userId);
            if (user != null) return user;
            throw new IllegalArgumentException("User with ID:" + userId + " is not found");
        } catch (IllegalArgumentException e) {
            System.out.println("User with ID:" + userId + " is not found");
            throw e;
        }
    }

    @Override
    @Transactional
    public List<User> getAllUsers() throws IllegalArgumentException {
        try {
            TypedQuery<User> typedQuery = em.createQuery(SQL_GET_ALL_USERS, User.class);
            return typedQuery.getResultList();
        } catch (IllegalArgumentException e) {
            System.out.println("Cant select users from DB");
            throw e;
        }

    }

    @Override
    public void saveUser(User user) {
        try {
            em.persist(user);
        } catch (Error e) {
            System.out.println("Cant create user:" + user.toString());
            throw e;
        }
    }

    @Override
    public void deleteUser(User user) {
        try {
            User userFromDb = getUserById(user.getId());
            em.remove(userFromDb);
        } catch (Exception e) {
            System.out.println("Cant delete User with id : " + user.getId());
        }

    }

    @Override
    public void updateUser(User newUser) {
        User userFromDb = getUserById(newUser.getId());
        userFromDb.setAge(newUser.getAge());
        userFromDb.setEmail(newUser.getEmail());
        userFromDb.setFirstName(newUser.getFirstName());
        userFromDb.setLastName(newUser.getLastName());
        userFromDb.setPassword(newUser.getPassword());
    }


    @Override
    public User getUserByName(String username) {
        try {
            TypedQuery<User> typedQuery = em.createQuery(SQL_GET_USER_BY_NAME, User.class);
            System.out.println(SQL_GET_USER_BY_NAME + " " + username);
            typedQuery.setParameter(1, username);
            return typedQuery.getSingleResult();
        } catch (IllegalArgumentException e) {
            System.out.println("Cant select users from DB");
            throw e;
        }

    }
}
