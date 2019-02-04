const express = require('express');
const db = require('../data/dbconfig');
const router = express.Router();



//++++++++++++++++++++++++++++++++++++++++++
// get  All endpoints
//++++++++++++++++++++++++++++++++++++++++++++
router.get('/books', (req, res) => {
    console.log('request working');
    db('books')
        .then(allReviews => {
            if (allBooks) {
                res.status(200).json(allBooks);
            } else {
                res.status(404).json({ Error: 'No Books Found/Availible'});
            }
        })
        .catch(err => {
            res.status(500).json({ Error: 'Error! Please try again.'})
        });
});

router.get('/reviews', (req, res) => {
    console.log('request working');
    db('reviews')
        .then(allReviews => {
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
    db('users').where({ id }).first().then( thisUser => {
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

router.get('/reviews/:userid', (req, res) => {
    const { user_id } = req.params;
    db('reviews').where({ user_id }).then( allUserId => {
        if (allUserId) {
            res.status(200).json(allUserId);
        } else {
            res.status(404).json({ Error: 'Error! No Reviews exist for that User id in the System.'});
        }
    })
    .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
});

router.get('/reviews/:bookid', (req, res) => {
    const { books_id } = req.params;
    db('reviews').where({ books_id }).then( allBooksId => {
        if (allBooksId) {
            res.status(200).json(allBooksId);
            //should be an array of reviews with the same books_id listed.
        } else {
            res.status(404).json({ Error: 'Error! No Reviews exists with that books id in the System.'});
        }
    })
    .catch(err => { res.status(500).json({ Error: 'Error! Please try again.'})});
});

//++++++++++++++++++++++++++++++++++++++++++
// Get any book with all its review
// Get any user profile with all its review
// use of .join
//++++++++++++++++++++++++++++++++++++++++++++
router.get('/books/:id/reviews', (req, res) => {
    const { id } = req.params;

    db('reviews').where('books_id', id).then(reviews =>{
        reviews.map( eachReview => {
             return { ...eachReview }
        })
    }).then( thisList => {
        if(!thislist.length === 0) { 
            res.status(404).json({ Error: 'No Reviews For this Book, Try again.'});
        } else {
            res.status(200).json(thisList);
        }
    }).catch(err => {
        res.status(500).json({ Error: 'Failure, no Book! Try again.' })
    });
});

router.get('/user/:id/reviews', (req, res) => {
    const { id } = req.params;

    db('reviews').where('user_id', id).then(reviews => {
        reviews.map(eachReview => { return  {...eachReview }})
    }).then(thisList => {
        if(!thislist.length === 0) { 
            res.status(404).json({ Error: 'No Reviews For this Book, Try again.'});
        } else {
            res.status(200).json(thisList);
        }
    }).catch(err => {
        res.status(500).json({ Error: 'Failure, no Book! Try again.' })
    });
});



//++++++++++++++++++++++++++++++++++++++++++
// All post endpoints -- post book and post reviews
//++++++++++++++++++++++++++++++++++++++++++++



  module.exports = router;