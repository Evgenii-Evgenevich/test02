var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

//var db = new Db('db', new Server('localhost', 27017));

//var usertable = null; //db.collection('usertable');

/*
db.open(function(err, p_db) {
    if(err) throw err;

    process.stdout.write('db.open');

    p_db.collection('usertable', function (err2, collection) {
        if(err2) throw err2;

        usertable = collection;
    });
});
//*/


/*Db.connect('localhost:27017/db', function(err, db) {
    assert.equal(null, err);

    db.collection('usertable', function (err2, collection) {
        assert.equal(null, err2);

        usertable = collection;
    });
});*/

//var db = require('mongodb').connect('mongodb://localhost:27017/db');

//module.exports = db;

var db_connect = function(name, callback) {
    MongoClient.connect('mongodb://EE:suppass@localhost:27017', { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;

        process.stdout.write('MongoClient.connect');

        callback( db.db(name) );

        db.close();
    });
};

module.exports = {
    dbo: db_connect,

    collection: function (name, callback) {
        db_connect('db', function (db) {
            db.collection(name, function (err, result) {
                if (err) throw err;

                callback(result);
            });
        });
    }

};



