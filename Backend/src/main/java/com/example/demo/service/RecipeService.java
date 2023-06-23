package com.example.demo.service;

import com.example.demo.entity.Recipe;
import com.example.demo.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/recipe")
public class RecipeService {
    @Autowired
    private RecipeRepository repository;

    @GetMapping
    public Iterable<Recipe> getProducts() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable(value = "id") int id) {
        Optional<Recipe> recipe = repository.findById(id);

        if (recipe.isPresent()) {
            return ResponseEntity.ok().body(recipe.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Recipe addRecipe(@Validated @RequestBody Recipe recipe) {
        return repository.save(recipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRecipe(@PathVariable(value = "id") int id) {
        Recipe recipe = repository.findById(id).orElse(null);
        if (recipe == null) {
            return ResponseEntity.notFound().build();
        } else {
            repository.delete(recipe);
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity putRecipe(@PathVariable(value = "id") int id, @Validated @RequestBody Recipe newRecipe) {
        repository.findById(id)
                .map(recipe -> {
                    recipe.setDescription(newRecipe.getDescription());
                    recipe.setTitle(newRecipe.getTitle());
                    return repository.save(recipe);
                })
                .orElseGet(() -> {
                    newRecipe.setId(id);
                    return repository.save(newRecipe);
                });
        return ResponseEntity.ok().body(newRecipe);
    }
}
