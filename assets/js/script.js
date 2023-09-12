// tippy.js
tippy("[data-tippy-content]");

// aos.js
AOS.init({
	duration: 700,
	once: true
});

// navbar burger
document.addEventListener('DOMContentLoaded', () => {
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	if ($navbarBurgers.length > 0) {
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {
				const target = el.dataset.target;
				const $target = document.getElementById(target);
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
});

$(document).ready(function() {
	$(".navbar-burger").click(function() {
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
	});
});

// navbar on scroll
$(function() {
	$(window).on("scroll", function() {
		if ($(window).scrollTop() > 700) {
			$("nav").addClass("nav-w");
			$(".navbar-menu").addClass("nav-w");
			$(".navbar-item").addClass("nav-dark");
			$(".navbar-link").addClass("nav-dark");
			$(".navbar-burger").removeClass("has-text-white");
			$(".navbar-burger").addClass("has-text-dark");
		} else {
			$("nav").removeClass("nav-w");
			$(".navbar-menu").removeClass("nav-w");
			$(".navbar-item").removeClass("nav-dark");
			$(".navbar-link").removeClass("nav-dark");
			$(".navbar-burger").removeClass("has-text-dark");
			$(".navbar-burger").addClass("has-text-white");
		}
	});
});


// back to top
var btn = $("#backtotop");

$(window).scroll(function() {
	if ($(window).scrollTop() > 100) {
		btn.addClass("show");
	} else {
		btn.removeClass("show");
	}
});

btn.on("click", function(e) {
	e.preventDefault();
	$("html, body").animate({
		scrollTop: 0
	}, "300");
});

// cloudy stats
$.ajax({
	url: "https://cloudy.kettlemc.net/api/stats/players",
	success: function(data) {
		$("#currentPlayers").text(data.playersOnline);
		$("#totalPlayers").text(data.playersTotal);
		$("#peakPlayers").text(data.players48hPeak);
		var playTimeYears = (data.totalAccumulatedPlayTime / (1000 * 60 * 60 * 24 * 365));
		$("#playtime").text(Math.round((playTimeYears + Number.EPSILON) * 100) / 100);
	}
});

$.ajax({
	url: "https://kettlemc.net/assets/members.json",
	success: function(jsonData) {
		var teamSection = document.getElementById("team");
		var teamRowDiv;
		for (var i = 0; i < jsonData.length; i++) {

			if (i % 4 == 0) {
				teamRowDiv = document.createElement("div")
				teamRowDiv.classList.add("columns", "mt-6")
			}

			var entry = jsonData[i];

			var teamMemberDiv = document.createElement("div")
			teamMemberDiv.classList.add("column")
			teamMemberDiv.classList.add("has-text-centered")

			var link = document.createElement("a");
			if (entry.link) {
				link.href = entry.link;
			}

			var img = document.createElement("img");
			img.src = "https://minotar.net/helm/" + entry.uuid + "/128";
			img.alt = entry.description;

			var spanFormat = document.createElement("span");
			var spanRank = document.createElement("span");
			spanRank.innerText = entry.rank + (entry.rank == "" ? "" : " ");
			var name = document.createElement("text");
			name.innerText = entry.name;
			spanFormat.classList.add("subtitle");
			spanFormat.classList.add("has-text-weight-bold");
			spanRank.classList.add(entry.color);

			spanFormat.appendChild(spanRank);
			spanFormat.appendChild(name);

			var descriptionP = document.createElement("p");
			descriptionP.innerText = entry.description

			var displayName = document.createElement("p")
			displayName.appendChild(spanFormat);

			link.appendChild(img);
			teamMemberDiv.appendChild(link);
			teamMemberDiv.appendChild(displayName);
			teamMemberDiv.appendChild(descriptionP);
			teamRowDiv.appendChild(teamMemberDiv);
			teamSection.appendChild(teamRowDiv);
		}
	}
});

// copyright year
document.getElementById("cp-year").innerHTML = new Date().getFullYear()