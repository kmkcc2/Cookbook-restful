package com.example.demo.service;

import com.example.demo.entity.Recipe;
import com.example.demo.repository.RecipeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/recipe")
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public Iterable<Recipe> getRecipes() {
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
    public ResponseEntity<Recipe> addRecipe(@Validated @RequestBody Recipe recipe) {
        recipeRepository.save(recipe);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(recipe.getId()).toUri()).body(recipe);

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
        Recipe oldRecipe = recipeRepository.findById(id).orElse(null);
        if (oldRecipe != null) {
            oldRecipe.setDescription(newRecipe.getDescription());
            oldRecipe.setTitle(newRecipe.getTitle());
            oldRecipe.setProducts(newRecipe.getProducts());
            oldRecipe.setAuthor(newRecipe.getAuthor());
            recipeRepository.save(oldRecipe);
            return ResponseEntity.ok().body(newRecipe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
