import mongoose from 'mongoose';
import EventEmitter from 'events';

/**
 * Bot Pocket: a storage for plugins / bot
 * Pocket is based on Mongoose, for a more detailed documentation see mongoose's
 * documentation here: http://mongoosejs.com/docs/api.html
 */

export default bot => {
  const URL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bolt';
  mongoose.connect(URL);

  const db = mongoose.connection;

  db.on('error', err => {
    bot.pocket.emit('error', err);
  });

  db.once('open', cb => {
    bot.pocket.emit('open', cb);
  });

  bot.pocket = Object.assign({
    /**
     * Create / retrieve a Mongoose Model
     * @param  {String} key    Model name/key
     * @param  {Object} schema Model scheme, required if creating a model
     * @return {Model}         Mongoose Model
     */
    model(key, schema) {
      schema = new mongoose.Schema(schema);

      const Model = db.model(key, schema);

      return Model;
    },

    /**
     * Save a {key} model instance with specified values,
     * Model must be defined before saving
     * i.e. pocket.model('User', {});
     * pocket.save('User', {name: 'BadBoy'})
     * @param  {String} key   Model name/key
     * @param  {Object} value instance properties
     * @return {Promise}
     */
    save(key, value) {
      const Model = db.model(key);

      const instance = new Model(value);

      return instance.save();
    },

    /**
     * Update {key} model instances matching {conditions} with {doc}
     * @param  {String} key        Model name/key
     * @param  {Object} conditions models matching this criteria will be updated
     * @param  {Object} doc        update doc, see http://is.gd/5UxFqe
     * @param  {Object} options    extra options, see http://is.gd/5UxFqe
     * @return {Promise}
     */
    update(key, conditions, doc, options) {
      const Model = db.model(key);
      const Collection = db.collection(Model.collection);

      return Collection.update(conditions, doc, options);
    },

    /**
     * Find {key} model instances matching condition, you have to call
     * `.exec` on the chain for the query to start (exec returns a promise).
     * You can also use Mongoose Query's chain methods, see: http://is.gd/kSITdp
     * @param  {String} key        Model name/key
     * @param  {Object} conditions Query criteria
     * @return {Query}
     */
    find(key, conditions) {
      const Model = db.model(key);
      const Collection = db.collection(Model.collection);

      return Collection.find(conditions);
    },

    /**
     * Find {key} model instances with their {property} matching specified
     * criterias, see: http://is.gd/4D2j8T
     * @param  {String} key      Model name/key
     * @param  {String} property property name
     * @return {Query}
     */
    where(key, property) {
      const Model = db.model(key);
      const Collection = db.collection(Model.collection);

      return Collection.where(property);
    },

    /**
     * Remove {key} model instances matching {conditions}
     * @param  {String} key        Model name/key
     * @param  {Object} conditions instances matching this query will be removed
     * @return {Promise}
     */
    remove(key, conditions) {
      return this.model(key).find(conditions).remove();
    },

    mongoose
  }, EventEmitter.prototype);
};
