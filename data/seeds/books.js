
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {
          "id": 1,
          "title": "FirstBook",
          "author": "me",
          "publisher": "book inc",
          "summary": "stuff"
          },
        {
          "id": 2,
          "title": "Second Book",
          "author": "me fsdfg",
          "publisher": "bookdf incffd",
          "summary": "stuf ffg drg "
          },
        {
            "id": 3,
            "title": "Third Book",
            "author": "mef a  f arar",
            "publisher": "books inc",
            "summary": "stu ff"
    },
         {
            "id": 4,
            "title": "Fourth FirstBoof dgsdfk",
            "author": "mefsdfg",
            "publisher": "more book incffd",
            "summary": "stuf ffg drg "
        
        },
        {
            "id": 5,
            "title": "Fifth FirstBook",
            "author": "me",
            "publisher": "book inc",
            "summary": "stuff"
            
         },
         {
          "id": 6,
          "title": "Sixth FirstBoofdgsdfk",
          "author": "mefsdfg",
          "publisher": "book incffd",
          "summary": "stu fffg drg "
          
         },{
          "id": 7,
          "title": "Seventh FirstBook",
          "author": "me",
          "publisher": "book inc",
          "summary": "stuff"
          
        },
        {
          "id": 8,
          "title": " EithFirstBoofdgsdfk",
          "author": "mefsdfg",
          "publisher": "book incffd",
          "summary": "stufffg drg "
          
         }
      ]);
    });
};
