
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "id": 1,
          "username": "me",
          "password": "$2a$14$te4/TNHej4pGW2Il1A6kke.qVwxs3fRUONXiwD6in7ABDKj1Zn2si",
          "role": 1,
          "true": null
      },
      {
          "id": 2,
          "username": "1",
          "password": "$2a$14$jFejKGGrkJ6z4s6LsPRujOyLJa7Z5A7eoxk8lcdiv5FmVxFaH4roK",
          "role": 0,
          "true": null
      },
      {
          "id": 3,
          "username": "kenneth",
          "password": "$2a$14$h9DMPHtUCl4JNGcYCH.y7.jne.gVrcn6QQLTKjxMsWMMzMkwnSr6m",
          "role": 1,
          "true": null
      },
      {
          "id": 4,
          "username": "kenny",
          "password": "$2a$14$JOecEHiL9AdX8vx39jNuteuX3xPKbOgUK41FauFH.F/gDhhHT4UTq",
          "role": 0,
          "true": null
      },
      {
          "id": 5,
          "username": "max",
          "password": "$2a$14$sw11x.PEOqOaMdIWVt/hiuHLjpjNg0ZigJDdbY8rQxJG/.mZ6UtYO",
          "role": 1,
          "true": null
      }
      ]);
    });
};
