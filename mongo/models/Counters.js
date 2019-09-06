/*
Using the counters method to use INT ids for some collections. https://docs.mongodb.com/v3.0/tutorial/create-an-auto-incrementing-field/
Was required to do due to a technical limitation with Agora. Using the default String ObjectIDs causes delays with Agora.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountersSchema = Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
});

const Counters = new mongoose.model('Counters', CountersSchema);

Counters.prototype.getNextSequence = async function (name) {
    //Insert initial value if needed
    let query = { _id: name };
    let update = {req: 0};
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    await Counters.findOneAndUpdate(query, update, options);

    const ret = await Counters.findAndModify(
        {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true,
            upsert: true
        }
    );
    return ret.seq;
};

module.exports = Counters;
