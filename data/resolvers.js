import mongoose from 'mongoose';
import { Character, Fight  } from './db';
import { rejects } from 'assert';

export const resolvers = {
    Query: {
        getCharacters : (root, {limite, offset}) => {
            return Characters.find({}).limit(limite).skip(offset)
        },
        getCharacter: (root, {id}) => {
            return new Promise((resolve, object) => {
                Character.findById(id, (error, character) => {
                    if(error) rejects(error)
                    else resolve(character)
                });
            });
        },
        totalCharacters: (root) => {
            return new Promise((resolve, object) => {
                Character.countDocuments({}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                });
            })
        },
        getFights : (root, {limite, offset}) => {
            return Fight.find({}).limit(limite).skip(offset)
        }
    },
    Mutation: {
        //Characters
        createCharacter : (root, {input}) => {
            const newCharacter = new Character({
                name: input.name,
                stamina: input.stamina,
                skill: input.skill,
                luck: input.luck,
                gold: input.gold,
                provision: input.provision,
                equipment: input.equipment,
                notes: input.notes
            });
            newCharacter.id = newCharacter._id;
            return new Promise((resolve, object) => {
                newCharacter.save((error) => {
                    if(error) rejects(error)
                    else resolve(newCharacter)
                })
            });
        },
        updateCharacter : (root, {input}) => {
            return new Promise((resolve, object) => {
                Character.findOneAndUpdate( {_id: input.id} , input, {new: true}, (error, character) => {
                    if(error) rejects(error)
                    else resolve(character)
                });
            });
        },
        deteleteCharacter : (root, {id}) => {
            return new Promise((resolve, object) => {
                Character.findOneAndDelete({_id: id}, (error) => {
                    if(error) rejects(error)
                    else resolve("Character deleted")
                });
            });
        },

        //Fights
        createFight : (root, {input}) => {
            const newFight = new Fight({
                creature: input.creature,
                skill: input.skill,
                stamina: input.stamina
            });
            newFight.id = newFight._id;
            return new Promise((resolve, object) => {
                newFight.save((error) => {
                    if(error) rejects(error)
                    else resolve(newFight)
                });
            });
        },
        updateFight : (root, {input}) => {
            return new Promise((resolve, fight) => {
                Fight.findOneAndUpdate({_id :  input.id}, input, {new: true}, (error, fight) => {
                    if(error) rejects(error)
                    else resolve(fight)
                });
            });
        },
        deleteFight : (root, {id}) => {
            return new Promise((resolve, object) => {
                Fight.findOneAndDelete({_id: id}, (error) => {
                    if(error) rejects(error)
                    else resolve("Fight deleted")
                })
            });
        }
    }
}

export default resolvers;
