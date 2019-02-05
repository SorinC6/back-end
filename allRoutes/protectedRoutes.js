const express = require('express');
const db = require('../data/dbconfig');
const router = express.Router();



function protected(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({message: `Invalid Token`});
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({message: `You have not provided a Token.`})
    }
  }
  

//++++++++++++++++++++++++++++++++++++++++++
   //  All protected GET endpoints
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


router.get('/users', protected, (req, res) => {
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

router.get('/reviews', protected, (req, res) => {
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

//++++++++++++++++++++++++++++++++++++++++++
// All get by Id endpoints
//++++++++++++++++++++++++++++++++++++++++++++

router.get('/users/:id', protected, (req, res) => {
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

router.get('/reviews/:id', protected, (req, res) => {
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

router.get('/books/:id', protected, (req, res) => {
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
// All post endpoints -- post book and post reviews
//++++++++++++++++++++++++++++++++++++++++++++

  router.post('/books', protected, (req,res) => {
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

router.post('/reviews', protected, (req,res) => {
    const { review, rating, reviewer, books_id } = req.body;
    const reviewInfo = { review, rating, reviewer, books_id  };
    // const { id } = req.params;
    console.log(reviewInfo);
    // console.log( { title, author, publisher, summary });
    // console.log({ review, rating, reviewer }, reviewInfo );
    
        if (!review) {
            res.status(400).json({ Error: "Please put an accurate review." });
        } 
        if (!rating || rating < 0 || rating > 5 || Math.floor(rating) !== rating ) {
            res.status(400).json({ Error: "Please provide rating in your input. It must be an integer from 0 to 5 only."});
        } 
        if (!reviewer) {
            return res.status(400).json({ Error: 'You need to add a reviewer name.' });
        }
        
        db('reviews').insert(reviewInfo)
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
                res.status(500).json({Error: 'The new review was not added', err });
            });
});


//++++++++++++++++++++++++++++++++++++++++++
// All UPDATE  endpoints -- 
//++++++++++++++++++++++++++++++++++++++++++++



//++++++++++++++++++++++++++++++++++++++++++
// All DELETE  endpoints -- 
//++++++++++++++++++++++++++++++++++++++++++++

router.delete('/books/:id', protected, (req,res) => {
    const { id } = req.params;

    db('books').where('id', id).first().then(book => {
        console.log(`Book with id:${id} found!`);
        db('books').where('id', id).del().then(result => {
            if(result) {
                res.status(204).json({Delete: true, book });
                console.log(`Book with id: ${id} Deleted!`);
            } else {
                res.status(400).json({ Error: 'The Book Was Not Deleted' });
            }
        }).catch(err => {
            res.status(500).json({Error: ``});
        });
    }).catch(err => {
        res.status(500).json({Error: ``})
    });
  });

  router.delete('/reviews/:id', protected, (req,res) => {
    const { id } = req.params;

    db('reviews').where('id', id).first().then(review => {
        console.log(`Book with id:${id} found!`);
        db('reviews').where('id', id).truncate().then(result => {
            if(result) {
                console.log(`Book with id: ${id} Deleted!`);
                res.status(204).json({Delete: true, review });
            } else {
                res.status(400).json({ Error: `The Book with id #${id} Was Not Deleted` });
            }
        }).catch(err => {
            res.status(500).json({Error: ``});
        });
    }).catch(err => {
        res.status(500).json({Error: ``})
    });
  });


  module.exports = router;