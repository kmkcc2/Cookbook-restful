package com.example.demo.service;

import com.example.demo.entity.Ingredient;
import com.example.demo.entity.Recipe;
import com.example.demo.repository.IngredientRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipe")
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private IngredientRepository ingredientRepository;

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

            int recipe_id = recipe.get().getId();
            HashMap singleIngredient;
            Iterable<Ingredient> igredients = ingredientRepository.findAll();
            for (Ingredient ingredient : igredients) {
                singleIngredient = new HashMap();
                if (ingredient.getRecipe() != null) {
                    if (ingredient.getRecipe().getId() == recipe_id) {
                        singleIngredient.put("name", ingredient.getProduct().getName());
                        singleIngredient.put("quantity", ingredient.getQuantity());
                        ingredients.put("ingredient" + ingredient.getId(), singleIngredient);
                    }
                }
            }
            response.put("recipe_id", recipe_id);
            response.put("title", recipe.get().getTitle());
            response.put("description", recipe.get().getDescription());
            response.put("ingredients", ingredients);


            return ResponseEntity.ok().body(response);
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
                    return recipeRepository.save(recipe);
                })
                .orElseGet(() -> {
                    newRecipe.setId(id);
                    return recipeRepository.save(newRecipe);
                });
        return ResponseEntity.ok().body(newRecipe);
    }
}
