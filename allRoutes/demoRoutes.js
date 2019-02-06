const express = require("express");
const db = require("../data/dbconfig");
const router = express.Router();

//++++++++++++++++++++++++++++++++++++++++++
// get  All endpoints
//++++++++++++++++++++++++++++++++++++++++++++
router.get("/books", (req, res) => {
  db("books")
    .then(allBooks => {
      console.log("books get request working");
      if (!allBooks) {
        res.status(404).json({ Error: "No Books Found/Availible" });
      } else {
        res.status(200).json(allBooks);
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Error! Please try again." });
    });
});

router.get("/reviews", (req, res) => {
  db("reviews")
    .then(allReviews => {
      console.log("reviews get request working");
      if (allReviews) {
        res.status(200).json(allReviews);
      } else {
        res.status(404).json({ Error: "No Reviews Found/Availible" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Error! Please try again." });
    });
});

router.get("/users", (req, res) => {
  console.log("request working");
  db("users")
    .then(allUsers => {
      if (allUsers) {
        res.status(200).json(allUsers);
      } else {
        res.status(404).json({ Error: "No Users Found/Availible" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Error! Please try again." });
    });
});

//++++++++++++++++++++++++++++++++++++++++++
// All get by Id endpoints
//++++++++++++++++++++++++++++++++++++++++++++

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id })
    .first()
    .then(thisUser => {
      if (thisUser) {
        res.status(200).json(thisUser);
      } else {
        res
          .status(404)
          .json({ Error: "Error! No User exists with that id in the System." });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Error! Please try again." });
    });
});

router.get("/reviews/:id", (req, res) => {
  const { id } = req.params;
  db("reviews")
    .where({ id })
    .first()
    .then(thisUser => {
      if (thisUser) {
        res.status(200).json(thisUser);
      } else {
        res.status(404).json({
          Error: "Error! No Reviews exists with that id in the System."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Error! Please try again." });
    });
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  db("books")
    .where({ id })
    .first()
    .then(thisBook => {
      if (thisBook) {
        res.status(200).json(thisBook);
      } else {
        res
          .status(404)
          .json({ Error: "Error! No Book exists with that id in the System." });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Error! Please try again." });
    });
});


router.get('/books/:id/all', (req, res) => {
    const { id } = req.params;
    db('books').where('id', id ).then( thisBook => {
        console.log(thisBook);
        db('reviews')
                .where({ books_id: req.params.id })
                .then(eachReview => {
                    console.log(eachReview);
                const convertedReview = eachReview.map(w => {
                 console.log("w",w);
                 return w;
                    // {id: w.id}
                    // , 
                    // review = w.review, 
                    // rating = w.rating, 
                    // reviewer = w.reviewer, 
                    // books_id = w.books_id 
                });

                console.log('this is converted Review',convertedReview);
                res.status(200)
                    .json({ id: thisBook[0].id, 
                        title: thisBook[0].title, 
                        author: thisBook[0].author, 
                        publisher: thisBook[0].publisher, 
                        summary: thisBook[0].summary, 
                        true: thisBook[0].true, 
                        bookReviews: convertedReview });

        }).catch(err => res.status(404).json({ Error: "No Reviews found for that book in the system "}))
                    //    res.status(200).json(thisBook);
        
    })
    .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
});

//++++++++++++++++++++++++++++++++++++++++++
// Get the reviews by the user_id
// Get the reviews by the book_id
//++++++++++++++++++++++++++++++++++++++++++++

// Get the reviews by the user_id

// router.get('/reviews/:userid', (req, res) => {
//     const { user_id } = req.params;
//     db('reviews').where({ user_id }).then( allUserId => {
//         if (allUserId) {
//             res.status(200).json(allUserId);
//         } else {
//             res.status(404).json({ Error: 'Error! No Reviews exist for that User id in the System.'});
//         }
//     })
//     .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
// });

// router.get('/reviews/:bookid', (req, res) => {
//     const { books_id } = req.params;
//     db('reviews').where({ books_id }).then( allBooksId => {
//         if (allBooksId) {
//             res.status(200).json(allBooksId);
//             //should be an array of reviews with the same books_id listed.
//         } else {
//             res.status(404).json({ Error: 'Error! No Reviews exists with that books id in the System.'});
//         }
//     })
//     .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
// });

//++++++++++++++++++++++++++++++++++++++++++
// Get any book with all its review
// Get any user profile with all its review
// use of .join
//++++++++++++++++++++++++++++++++++++++++++++

// router.get('/books/:id/reviews', (req, res) => {
//     router.get('/books/:id', (req, res) => {
//         const { id } = req.params;
//         db('books').where({ id }).first().then( thisBook => {
//             if (thisBook) {









//                 res.status(200).json(thisBook);
//             } else {
//                 res.status(404).json({ Error: 'Error! No Book exists with that id in the System.'});
//             }
//         })
//         .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
//     });
    




//     const { id } = req.params;

//     db('books').
//     db('reviews').where('books_id', id).then(reviews =>{
//         reviews.map( eachReview => {
//              return { ...eachReview }
//         })
//     }).then( thisList => {
//         if(!thislist.length === 0) {
//             res.status(404).json({ Error: 'No Reviews For this Book, Try again.'});
//         } else {
//             res.status(200).json(thisList);
//         }
//     }).catch(err => {
//         res.status(500).json({ Error: 'Failure, no Reviews! Try again.' })
//     });
// });

// router.get('books/:id/reviews', (req,res) => {
//     const { id } = req.params;
//     db.update('reviews as r')
//         .join('books as b', 'b.id', 'r.books_id')
//         .select('b.title', 'b.author', 'r.id', 'r.review', 'b.rating', 'b.reviewer' )
//         .where('r.id',id)
//         .then()
// })

// router.get('/user/:id/reviews', (req, res) => {
//     const { id } = req.params;

//     db('reviews').where('user_id', id).then(reviews => {
//         reviews.map(eachReview => { return  {...eachReview }})
//     }).then(thisList => {
//         if(!thislist.length === 0) {
//             res.status(404).json({ Error: 'No Reviews For this Book, Try again.'});
//         } else {
//             res.status(200).json(thisList);
//         }
//     }).catch(err => {
//         res.status(500).json({ Error: 'Failure, no Book! Try again.' })
//     });
// });

//++++++++++++++++++++++++++++++++++++++++++
// All post endpoints -- post book and post reviews
//++++++++++++++++++++++++++++++++++++++++++++

router.post("/books", (req, res) => {
  const { title, author, publisher, summary } = req.body;
  const bookInfo = req.body;
  const { id } = req.params;
  // console.log( { title, author, publisher, summary });

  if (!title) {
    res.status(400).json({ Error: "Please put an accurate title" });
  }
  if (!author) {
    res
      .status(400)
      .json({ Error: "Please provide author in your input.", err });
  }
  if (!publisher) {
    return res.status(400).json({ Error: "You need to add a publisher.", err });
  }

  db("books")
    .insert(bookInfo)
    .then(newBook => {
      console.log({ title, author, publisher, summary });
      if (newBook) {
        res.status(201).json(newBook);
      } else {
        res.status(404).json({ Error: "Please add all the nessesary fields!" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Book not Added" });
    });
});

router.post("/reviews", (req, res) => {
  const { review, rating, reviewer, books_id } = req.body;
  console.log("this is req.body", req.body);
  const reviewInfo = { review, rating, reviewer, books_id };
  console.log("this is reviewInfo: ", reviewInfo);
  // const { id } = req.params;
  // console.log( { title, author, publisher, summary });
  // console.log({ review, rating, reviewer }, reviewInfo );

  if (!review) {
    res.status(400).json({ Error: "Please put an accurate review." });
  } else if (
    !rating ||
    rating < 0 ||
    rating > 5 ||
    Math.floor(rating) !== rating
  ) {
    res.status(400).json({
      Error:
        "Please provide rating in your input. It must be an integer from 0 to 5 only."
    });
  } else if (!reviewer) {
    return res.status(400).json({ Error: "You need to add a reviewer name." });
  }

  db("reviews")
    .insert(reviewInfo)
    .then(newReview => {
      // console.log({ review, rating, reviewer }, reviewInfo);
      console.log(newReview);
      res.status(201).json(newReview);
      // if (newReview) {
      //     res.status(201).json(newReview);
      // } else {
      //     res.status(404).json({ Error: 'Please add all the nessesary fields correcly!' })

      // }
    })
    .catch(err => {
      res.status(500).json({ Error: "The new review was not added", err });
    });
});

//++++++++++++++++++++++++++++++++++++++++++
// All DELETE  endpoints --
//++++++++++++++++++++++++++++++++++++++++++++

router.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  db("books")
    .where("id", id)
    .first()
    .then(book => {
      console.log(`Book with id:${id} found!`);
      db("books")
        .where("id", id)
        .del()
        .then(result => {
          if (result) {
            res.status(204).json({ Delete: true, book });
            console.log(`Book with id: ${id} Deleted!`);
          } else {
            console.log(`Book with id: ${id} was not Deleted!`);
            res.status(400).json({ Error: "The Book Was Not Deleted" });
          }
        })
        .catch(err => {
          res.status(500).json({ Error: `` });
        });
    })
    .catch(err => {
      res.status(500).json({ Error: `` });
    });
});

router.delete("/reviews/:id", (req, res) => {
  const { id } = req.params;

  db("reviews")
    .where("id", id)
    .first()
    .then(review => {
      console.log(`Review with id:${id} found!`);
      db("reviews")
        .where("id", id)
        .truncate()
        .then(result => {
          if (result) {
            console.log(`Review with id: ${id} Deleted!`);
            res.status(204).json({ Delete: true, review });
          } else {
            res
              .status(400)
              .json({ Error: `The Book with id #${id} Was Not Deleted` });
          }
        })
        .catch(err => {
          res.status(500).json({ Error: `` });
        });
    })
    .catch(err => {
      res.status(500).json({ Error: `` });
    });
});

//++++++++++++++++++++++++++++++++++++++++++
// All UPDATE  endpoints --
//++++++++++++++++++++++++++++++++++++++++++++

router.put("/books/:id", (req, res) => {
  const { id } = req.params;
  // const { review, rating, reviewer, books_id } = req.body;
  // const reviewInfo = { review, rating, reviewer, books_id  };
  // const {} = req.body;
  const changes = req.body;

  db("books")
    .where({ id })
    .first()
    .then(result => {
      if (!result) {
        res.status(404).json({
          Error: `The book with the specified ID: ${id} does not exist.`
        });
      }
      if (
        !changes.title ||
        !changes.author ||
        !changes.publisher ||
        !changes.summary
      ) {
        res.status(400).json({
          Error: `Please provide title author Publisher and summary you'd like to Update.`
        });
      }
      if (result) {
        db("books")
          .where("id", id)
          .update(changes)
          .then(editedBook => {
            if (editedBook) {
              res.status(203).json({ editedBook });
            } else {
              res.status(400).json({
                error: "Please check your input and try to edit the book again."
              });
            }
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The post information could not be modified." })
          );
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});

router.put("/reviews/:id", (req, res) => {
  const { id } = req.params;
  // const { review, rating, reviewer } = req.body;
  // const reviewInfo = { review, rating, reviewer };
  // const {} = req.body;
  const changes = req.body;

  db("reviews")
    .where({ id })
    .first()
    .then(result => {
      if (!result) {
        res.status(404).json({
          Error: `The review with the specified ID: ${id} does not exist.`
        });
      }
      if (!changes.review || !changes.rating || !changes.reviewer) {
        res.status(400).json({
          Error: `Please provide review rating and reviewer you'd like to Update.`
        });
      }
      if (result) {
        db("reviews")
          .where("id", id)
          .update(changes)
          .then(editedReview => {
            if (editedReview) {
              res.status(203).json({ editedReview });
            } else {
              res.status(400).json({
                error:
                  "Please check your input and try to edit the review again."
              });
            }
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The post information could not be modified." })
          );
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});

module.exports = router;
