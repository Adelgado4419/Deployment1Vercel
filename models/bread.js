// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'https://placekitten.com/150/300' },
  baker: {
    type: Schema.Types.ObjectID,
    ref: 'Baker'
  }
})

//helper methods
breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}
//this on the instance, it points to the document
//enum is a built in validator that checks if the entered value is in the given array
//when adding in a value that is not in the schema, 

breadSchema.statics.getBakedBreads = function (baker){
  return this.find({baker: baker})
  .then(foundBreads => {
    console.log(getBakedBreads)
  })
}
//this on the static, refers to the collection

// , default: 'http://placehold.it/500x500.png' second parameter on line 9

const Bread = mongoose.model('Bread', breadSchema)
//this code needs to come after we define schema

//bakers addition



module.exports = Bread

