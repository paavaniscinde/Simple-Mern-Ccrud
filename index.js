const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myDemoapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("DB connection is successful!!");
  }
);

const bookSchema = new mongoose.Schema({
  name: String,
  type: String,
  year: Number
});

const Book = new mongoose.model("Book", bookSchema);

app.get("/", async (req, res) => {
    res.send("BEGIN"); });
  /*const books = new Book({ name: "XXX", type: "Fictional", year: 1990 });*/

  app.post("/insert", (req,res) => {
    const name = req.body.name
    const type = req.body.type
    const year = req.body.year

  const books = new Book({ name: name , type: type , year: year });

  try {
   books.save();
    res.write("INSERTED");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", (req,res) => {
  Book.find({}, (err, result)=> {
    if (err){
      res.send(err)
    }
    res.send(result);
  })
})

app.put("/update", (req,res) => {
  const newBook = req.body.newBook
  const id = req.body.id

try {
  Book.findById(id, (err,doUpdate) => {
    doUpdate.name = newBook
    doUpdate.save()
    res.send("dONE UPdate")
  });
} catch (err) {
  console.log(err);
}
});

app.delete("/delete/:id", (req,res) => {
  const id = req.params.id
  Book.findByIdAndRemove(id).exec();
  res.send("DOc deleted")
}
);

  app.listen(8080, () => {
      console.log("server!");
  }); //the server object listens on port 8080
