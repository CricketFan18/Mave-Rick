import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
let data ={};
const port = 3000;
const API_URL = "https://kodessphere-api.vercel.app";

const yourBearerToken = "HxMvgPp";
const datas = {
      fan: 3,
      bulb: 1,
      led: "#ff0000",
      ac: {
        temp: 25,
        state: 0
      }
}
let message="";

function time(){
  const time = new Date();
  const hour = time.getHours();
  if(hour>6 && hour<12)
  {
    message="Good Morning !";
  }
  else if(hour>12 && hour<18)
  {
    message="Good Afternoon !";
  }
  else
  {
    message="Night Time !"
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

app.get("/",  (req, res) => {
  //const input = axios.get(API_URL + "/devices/" + yourBearerToken);
  //const data = input.data;
  console.log(datas);
  res.render("index.ejs", {datas,message});
});

app.get("/fan", (req,res) => {
  res.send("FAN")
})

app.post("/devices",  (req, res) => {
  console.log(req.body);
  const device = req.body.device;
  if(device === "fan")
  {
    let value= parseInt(req.body.value);
    data = {
    teamid: "HxMvgPp",
    device: device,
    value: value
    }
  }
  else if(device === "bulb")
  {
    let value = parseInt(req.body.value);
    data = {
      teamid: "HxMvgPp",
      device: device,
      value: value
      }
  }
  else if(device === "ac")
  {
    let temp = parseInt(req.body.value);
    let state = parseInt(req.body.state);
    data = {
      teamid: "HxMvgPp",
      device: device,
      value: {
        "temp": temp,
        "state": 0
      }
      }
  }
  else
  {
    let color = req.body.color;
    data = {
      teamid: "HxMvgPp",
      device: device,
      value: color
      }
  }

  console.log(data);

  try {
    const result = axios.post(API_URL + "/devices", data);
    console.log(result.data);
    res.redirect("/");
  } catch (error) {
    res.send("Error");
  }

});