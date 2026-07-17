package com.dodgegame.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dodgegame.demo.entity.User;
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
}
