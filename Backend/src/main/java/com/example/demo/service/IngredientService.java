package com.example.demo.service;

import com.example.demo.entity.Ingredient;
import com.example.demo.repository.IngredientRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ingredient")
public class IngredientService {
    @Autowired
    private IngredientRepository repository;

    @GetMapping
    public Iterable<Ingredient> getIngredients() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable(value = "id") int id) {
        Optional<Ingredient> ingredient = repository.findById(id);

        if (ingredient.isPresent()) {
            return ResponseEntity.ok().body(ingredient.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Ingredient addIngredient(@Validated @RequestBody Ingredient ingredient) {
        return repository.save(ingredient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteIngredient(@PathVariable(value = "id") int id) {
        Ingredient ingredient = repository.findById(id).orElse(null);
        if (ingredient == null) {
            return ResponseEntity.notFound().build();
        } else {
            repository.delete(ingredient);
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity putIngredient(@PathVariable(value = "id") int id, @Validated @RequestBody Ingredient newIngredient) {
        repository.findById(id)
                .map(ingredient -> {
                    ingredient.setProduct(newIngredient.getProduct());
                    ingredient.setQuantity(newIngredient.getQuantity());
                    ingredient.setRecipe(newIngredient.getRecipe());
                    return repository.save(ingredient);
                })
                .orElseGet(() -> {
                    newIngredient.setId(id);
                    return repository.save(newIngredient);
                });
        return ResponseEntity.ok().body(newIngredient);
    }
}
