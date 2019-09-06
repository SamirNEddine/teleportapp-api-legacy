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

Counters.getNextSequence = async function (name) {
    //Insert initial value if needed
    await Counters.findOneAndUpdate({ _id: name }, {req: 0}, {upsert: true, new: true, setDefaultsOnInsert: true});
    const ret = await Counters.findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, {upsert: true, new: true});
    return ret.seq;
};

module.exports = Counters;
