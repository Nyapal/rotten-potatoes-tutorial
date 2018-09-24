const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

const sampleMovieId = '2143056897'

const sampleReview = {
    "title": 'Sample Data',
    "movie-title": 'Test Movie',
    "description": 'This here is sample data',
    "id": sampleMovieId
}

chai.use(chaiHttp);

describe('Reviews', () => {
    //TEST INDEX
    it('should index ALL reviews on /GET', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });
    // TEST NEW
    it('should should show new review form on /GET', (done) => {
        chai.request(server)
        .get('/reviews/new')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });
    // // TEST CREATE
    it('should create a new review on /POST', (done) => {
        chai.request(server)
        .post('/reviews')
        .send(sampleReview)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });
    // TEST SHOW
    it('should show a single review on /reviews/id/ GET', (done) => {
        let test = new Review(sampleReview);
        test.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });
    // TEST EDIT
    it('should index ALL reviews on /GET', (done) => {
        let test = new Review(sampleReview);
        test.save((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
    // TEST UPDATE
    it('should update single review on /reviews/id PUT', (done) => {
        let test = new Review(sampleReview);
        test.save((err, data) => {
            chai.request(server)
                .put(`/reviews/${data._id}?_method=PUT`)
                .send({'title': 'Updating the title'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
    // TEST DELETE
    it('should delete a single review on /reviews/id DELETE', (done) => {
        let test = new Review(sampleReview);
        test.save((err, data) => {
            chai.request(server)
                .delete(`/reviews/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    after(() => {
        Review.deleteMany({title: 'Sample Data'}).exec((err, reviews) => {
            reviews.remove();
        })
    });

});
