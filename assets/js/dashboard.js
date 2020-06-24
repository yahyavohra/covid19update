/* globals Chart:false, feather:false */

class Rating {
  RenderData() {
      var requestOptions = {
          method: "GET",
          redirect: "follow",
      };
      fetch("https://api.covid19api.com/summary", requestOptions)
          .then((response) => response.text())
          .then((result) => this.pieCharts(result))
          .catch((error) => {
              console.error(error);
          });
  }
  pieCharts(data) {
      let allData = JSON.parse(data);
      let totaldata = allData.Global;
      $("#totalcases").text(totaldata.TotalConfirmed.toLocaleString());
      $("#totalrecovered").text(totaldata.TotalRecovered.toLocaleString());
      $("#totaldeaths").text(totaldata.TotalDeaths.toLocaleString());
      $("#newcases").text(totaldata.NewConfirmed.toLocaleString());
      $("#newrecover").text(totaldata.NewRecovered.toLocaleString());
      $("#newdeathes").text(totaldata.NewDeaths.toLocaleString());
      var Pie = document.getElementById("Total-Cases").getContext("2d");
      var TotalCase = new Chart(Pie, {
          type: "pie",
          data: {
              datasets: [
                  {
                      label: "Colors",
                      data: [totaldata.TotalDeaths, totaldata.TotalConfirmed, totaldata.TotalRecovered],
                      backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
                  },
              ],
              labels: ["Total Deaths", "Total Cases", "ToTal Recovered"],
          },
          options: {
              responsive: true,
              title: {
                  display: false,
                  text: "Total Cases",
              },
          },
      });

      var Pie = document.getElementById("New-Cases").getContext("2d");
      var Newcase = new Chart(Pie, {
          type: "pie",
          data: {
              datasets: [
                  {
                      label: "Colors",
                      data: [totaldata.NewDeaths, totaldata.NewConfirmed, totaldata.NewRecovered],
                      backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
                  },
              ],
              labels: ["New Deaths", "New Cases", "New Recovered"],
          },
          options: {
              responsive: true,
              title: {
                  display: false,
                  text: "New Cases",
              },
          },
      });
      this.listData(allData);
  }
  listData(Totaldata) {
      Totaldata.Countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed ? -1 : 1)).map((data, index) => {
          var listNumer = (index += 1);
          $("#demo").append(
              "<tr><td>" +
                  listNumer +
                  "</td><td>" +
                  data.Country +
                  "</td><td>" +
                  data.TotalConfirmed.toLocaleString() +
                  "</td><td>" +
                  data.TotalRecovered.toLocaleString() +
                  "</td><td>" +
                  data.TotalDeaths.toLocaleString() +
                  "</td><td>" +
                  data.NewConfirmed.toLocaleString() +
                  "</td><td></tr>"
          );
      });
      $(function () {
          $("#demo tr").slice(0, 10).show();
          $("#loadMore").on("click", function (e) {
              e.preventDefault();
              $("#demo tr:hidden").slice(0, 10).slideDown();
              if ($("tr:hidden").length == 0) {
                  $("#load").fadeOut("slow");
              }
              $("html,body").animate(
                  {scrollTop: $(this).offset().top,},500);
          });
      });
  }
}

$("#totopb").click(function () {
  $("body,html").animate({ scrollTop: 0,},600);
  return false;
});
if ($(this).scrollTop() > 200) {
  $("#totopb").fadeIn();
} else {
  $("#totopb").fadeOut();
}
$(window).scroll(function () {
  if ($(this).scrollTop() > 200) {
      $("#totopb").fadeIn();
  } else {
      $("#totopb").fadeOut();
  }
});

let rating = new Rating();
rating.RenderData();
