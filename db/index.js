var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost:27017/mongoose');

var db = mongoose.connection;
autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connection');
});

var categorySchema = Schema({
    title: String,
    description: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }
});
categorySchema.plugin(autoIncrement.plugin, { model: 'Category', field: 'id', startAt: 1 });

var Category = mongoose.model('Category', categorySchema);

export {
    Category
};

