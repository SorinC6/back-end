
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([{
        "id": 1,
        "review": "Sdf gfah dd gsdf",
        "rating": 4,
        "reviewer": "juste",
        "books_id": 1,
        "true": null
    },
    {
        "id": 2,
        "review": "all Sdf gfah dd gsdf",
        "rating": 3,
        "reviewer": "all juste",
        "books_id": 2,
        "true": null
    },
    {
        "id": 3,
        "review": "small Sdf gfah dd gsdf",
        "rating": 3,
        "reviewer": "small juste",
        "books_id": 1,
        "true": null
    },
    {
        "id": 4,
        "review": "a small Sdf gfah dd gsdf",
        "rating": 3,
        "reviewer": "a small juste",
        "books_id": 3,
        "true": null
    },
    {
        "id": 5,
        "review": "everything tall small Sdf gfah dd gsdf",
        "rating": 5,
        "reviewer": "new person",
        "books_id": 4,
        "true": null
    }
      ]);
    });
};
