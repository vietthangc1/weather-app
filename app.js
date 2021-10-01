const express = require("express");
const https = require("https");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

let city = "London";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	let url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&appid=c2768ef5adf976d26c0fcf8b8c9cb5f8&units=metric";
  console.log(url)
	https.get(url, function (request) {
		request.on("data", function (data) {
			let info = JSON.parse(data);
			let tempt = info.main.temp;
			let icon_code = info.weather[0].icon;
			let tempt_min = info.main.temp_min;
			let tempt_max = info.main.temp_max;
			let url_icon =
				"http://openweathermap.org/img/wn/" + icon_code + "@2x.png";
			let options = {
        th_city: city,
				th_imgsrc: url_icon,
				th_tempt_min: tempt_min,
				th_tempt_max: tempt_max,
				th_tempt: tempt,
			};
			res.render("index", options);
		});
	});
});

app.post("/", function (req, res) {
	city = req.body.th_city;
	console.log(city);
	res.redirect("/");
});

//Port
app.listen(process.env.PORT || 3000, function () {
	console.log("Server run!");
})