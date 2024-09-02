const mongoose = require('mongoose')
const Number = require('./src/Component/model.js')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://paamaldo:${password}@cluster0.yhagtdr.mongodb.net/FullstackOpen.numbers?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)


if (process.argv.length >= 4) {
    const newNumber = new Number({
        name: name,
        number: number,
    })

    newNumber.save().then(result => {
        console.log('number added!')
        mongoose.connection.close()
    })  
}

if (process.argv.length === 3){
    Number.find({}).then(result => {
        result.forEach(number => {
          console.log(number)
        })
        console.log('full list')
        mongoose.connection.close()
      })
}
