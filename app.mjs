import express from "express";

const app = express();
const port = 4000;
let id = 3;

let data = [
  {
    id: 1,
    name: "john",
    age: 30,
  },
  {
    id: 2,
    name: "joseph",
    age: 21,
  },
  {
    id: 3,
    name: "jotaro",
    age: 18,
  },
];

let tempData = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create", (req, res) => {
  id++;
  data.push({ id: id, ...req.body });
  console.log(data);
  return res.json({
    message:
      "Product has been created ( id :" +
      id +
      ", name : " +
      req.body.name +
      ", age : " +
      req.body.age +
      " )",
  });
});

app.get("/test", (req, res) => {
  return res.json("server API is Working");
});

app.get("/profiles", (req, res) => {
  const results = data.map((a) => a);
  return res.json({
    data: results,
  });
});

app.get("/profiles/:id", (req, res) => {
  const profileId = +req.params.id;
  const found = data.find((profile) => profile.id === profileId);

  if (!found) {
    return res.status(404).json({
      message: `id : ${profileId} not found`,
    });
  }
  const results = data.filter((a) => a.id === profileId);
  return res.json({
    data: results,
  });
});

app.delete("/del/:id", (req, res) => {
  const profileId = +req.params.id;
  const deleted = data.splice(
    data.findIndex((a) => a.id === profileId),
    1
  );
  tempData.push(...deleted);
  return res.json({
    message:
      "Product has been deleted ( id :" +
      deleted[0].id +
      ", name : " +
      deleted[0].name +
      ", age : " +
      deleted[0].age +
      " )",
  });
});

app.listen(port, () => {
  console.log("Server is running at " + port);
});
