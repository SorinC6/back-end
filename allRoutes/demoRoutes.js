const express = require('express');
const db = require('../data/dbconfig');
const router = express.Router();



//++++++++++++++++++++++++++++++++++++++++++
// get  All endpoints
//++++++++++++++++++++++++++++++++++++++++++++
router.get('/books', (req, res) => {
  
    db('books')
    .then(allBooks => {
            console.log('books get request working');
            if (!allBooks) {
                res.status(404).json({ Error: 'No Books Found/Availible'});
            } else {
                res.status(200).json(allBooks);
            }
        })
        .catch(err => {
            res.status(500).json({ Error: 'Error! Please try again.'})
        });
});

router.get('/reviews', (req, res) => {
    db('reviews')
    .then(allReviews => {
        console.log('reviews get request working');
        if (allReviews) {
            res.status(200).json(allReviews);
        } else {
            res.status(404).json({ Error: 'No Reviews Found/Availible'});
        }
        })
        .catch(err => {
            res.status(500).json({ Error: 'Error! Please try again.'})
        });
});


router.get('/users', (req, res) => {
    console.log('request working');
    db('users')
        .then(allUsers => {
            if (allUsers) {
                res.status(200).json(allUsers);
            } else {
                res.status(404).json({ Error: 'No Users Found/Availible'});
            }
        })
        .catch(err => {
            res.status(500).json({ Error: 'Error! Please try again.'})
        });
});

//++++++++++++++++++++++++++++++++++++++++++
// All get by Id endpoints
//++++++++++++++++++++++++++++++++++++++++++++

router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users').where({ id }).first().then( thisUser => {
        if (thisUser) {
            res.status(200).json(thisUser);
        } else {
            res.status(404).json({ Error: 'Error! No User exists with that id in the System.'});
        }
    })
    .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
});

router.get('/reviews/:id', (req, res) => {
    const { id } = req.params;
    db('reviews').where({ id }).first().then( thisUser => {
        if (thisUser) {
            res.status(200).json(thisUser);
        } else {
            res.status(404).json({ Error: 'Error! No Reviews exists with that id in the System.'});
        }
    })
    .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
});

router.get('/books/:id', (req, res) => {
    const { id } = req.params;
    db('books').where({ id }).first().then( thisBook => {
        if (thisBook) {
            res.status(200).json(thisBook);
        } else {
            res.status(404).json({ Error: 'Error! No Book exists with that id in the System.'});
        }
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
//     const { id } = req.params;

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
//         res.status(500).json({ Error: 'Failure, no Book! Try again.' })
//     });
// });

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


// router.post("/books", (req, res) => {
//     const { title, author, publisher, summary } = req.body;
//     const { id } = req.params;
  
//     db('books').insert({ title, author, publisher, summary })
//       .then(result => {
//         // check if result is an array with a number
//         if (typeof result[0] === "number" && result[0] !== 0) {
//             db.getDish(result[0])
//             .then(dish => {
//               if (dish.name) {
//                 res.status(201).json({ dish });
//               } else {
//                 res
//                   .status(400)
//                   .json({ error: "Dish was not created, try again" });
//               }
//             })
//             .catch(err => {
//               res.status(500).json({ error: "Error! Please try again." });
//             });
//         } else {
//           res
//             .status(401)
//             .json({ error: "Error! No input!" });
//         }
//       })
//       .catch(err => {
//         res.status(500).json({ error: "Error! Please try again." });
//       });
//   });

  router.post('/books', (req,res) => {
    const { title, author, publisher, summary } = req.body;
    const bookInfo = req.body;
    const { id } = req.params;
    // console.log( { title, author, publisher, summary });
    
        if (!title) {
            res.status(400).json({ Error: "Please put an accurate title" });
        } 
        if (!author) {
            res.status(400).json({ Error: "Please provide author in your input.",err });
        } 
        if (!publisher) {
            return res.status(400).json({ Error: 'You need to add a publisher.', err });
        }
        
        db('books').insert(bookInfo)
            .then(newBook => { 
                console.log({ title, author, publisher, summary });
                if (newBook) {
                    res.status(201).json(newBook);
                } else {
                    res.status(404).json({ Error: 'Please add all the nessesary fields!' })

                }
            })
            .catch(err => {
                res.status(500).json({Error: 'Book not Added'});
            });
});

router.post('/reviews', (req,res) => {
    const { review, rating, reviewer } = req.body;
    const reviewInfo = req.body;
    const { id } = req.params;
    // console.log( { title, author, publisher, summary });
    console.log({ review, rating, reviewer }, reviewInfo, { id });
    
        if (!review) {
            res.status(400).json({ Error: "Please put an accurate review" });
        } 
        if (!rating || rating < 0 || rating > 5 || Math.floor(rating) !== rating ) {
            res.status(400).json({ Error: "Please provide rating in your input. It must be an integer from 0 to 5 only."});
        } 
        if (!reviewer) {
            return res.status(400).json({ Error: 'You need to add a reviewer name.' });
        }
        
        db('reviews').insert({ review, rating, reviewer })
            .then(newReview => { 
                console.log({ review, rating, reviewer }, reviewInfo, { id });
                if (newReview) {
                    res.status(201).json(newReview);
                } else {
                    res.status(404).json({ Error: 'Please add all the nessesary fields correcly!' })

                }
            })
            .catch(err => {
                res.status(500).json({Error: 'The new review was not added'});
            });
});



// router.post("/games", (req, res) => {
    
//     const { title, genre } = req.body;
//     const game = req.body;

//     if (!title || !genre) {
//     res.status(422).json({ Error: 'Please add the title and genre' });
//     }
//     db('games')
//     .insert(game)
//     .then(eachGame => {
//       res.status(201).json({ message: 'New game added' });
//     })
//     .catch(err => {
//       res.status(500).json({Error: 'Error inserting'});
//     });

//   });


//++++++++++++++++++++++++++++++++++++++++++
// All UPDATE  endpoints -- 
//++++++++++++++++++++++++++++++++++++++++++++



//++++++++++++++++++++++++++++++++++++++++++
// All DELETE  endpoints -- 
//++++++++++++++++++++++++++++++++++++++++++++


  module.exports = router;