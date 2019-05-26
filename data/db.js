import mongoose, { mongo } from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/FFRoller', {useNewUrlParser: true});
mongoose.set('setFindAndModify', false);

const characterSchema = new mongoose.Schema({
    name: String,
    stamina: Number,
    skill: Number,
    luck: Number,
    gold: Number,
    provision: Number,
    equipment: String,
    notes: String
});
const Character = mongoose.model('character', characterSchema);


const fightSchema = new mongoose.Schema({
    creature: String,
    skill: String,
    stamina: String,
});
const Fight = mongoose.model('fight', fightSchema);


export { Character, Fight };
