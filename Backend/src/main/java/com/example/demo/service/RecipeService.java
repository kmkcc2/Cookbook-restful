package com.example.demo.service;

import com.example.demo.entity.Recipe;
import com.example.demo.repository.RecipeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/recipe")
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public Iterable<Recipe> getProducts() {
        return recipeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity getRecipeById(@PathVariable(value = "id") int id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        HashMap response = new HashMap<>();
        HashMap ingredients = new HashMap();
        if (recipe.isPresent()) {
            return ResponseEntity.ok().body(recipe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Recipe addRecipe(@Validated @RequestBody Recipe recipe) {
        return recipeRepository.save(recipe);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteRecipe(@PathVariable(value = "id") int id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe == null) {
            return ResponseEntity.notFound().build();
        } else {
            recipeRepository.delete(recipe);
            return ResponseEntity.noContent().build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity putRecipe(@PathVariable(value = "id") int id, @Validated @RequestBody Recipe newRecipe) {
        recipeRepository.findById(id)
                .map(recipe -> {
                    recipe.setDescription(newRecipe.getDescription());
                    recipe.setTitle(newRecipe.getTitle());
                    recipe.setProducts(newRecipe.getProducts());
                    return recipeRepository.save(recipe);
                })
                .orElseGet(() -> {
                    newRecipe.setId(id);
                    return recipeRepository.save(newRecipe);
                });
        return ResponseEntity.ok().body(newRecipe);
    }
}
