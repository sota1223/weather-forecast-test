document.getElementById("get-weather").addEventListener("click", function () {
  const cityCode = document.getElementById("city-select").value;

  if (!cityCode) {
    alert("都市を選択してください");
    return;
  }

  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("天気情報の取得に失敗しました。");
      }
      return response.json();
    })
    .then(function (data) {
      const publishingOffice = data[0].publishingOffice;
      const reportDatetime = data[0].reportDatetime;
      const targetArea = data[0].timeSeries[0].areas[0].area.name;

      const weatherDescriptions = data[0].timeSeries[0].areas[0].weathers;

      let todayHigh = "データなし";
      let todayLow = "データなし";

      const tempsArea = data[1]?.tempAverage?.areas[0];

      if (tempsArea) {
        todayHigh = tempsArea.max ? `${tempsArea.max}℃` : "データなし";
        todayLow = tempsArea.min ? `${tempsArea.min}℃` : "データなし";
      } else {
        console.log("気温データが見つかりませんでした。");
      }

      document.querySelector("#publishingOffice td").textContent = publishingOffice;
      document.querySelector("#reportDatetime td").textContent = new Date(reportDatetime).toLocaleString();
      document.querySelector("#targetArea td").textContent = targetArea;
      document.querySelector("#today td").textContent = weatherDescriptions[0] || "データなし";
      document.querySelector("#tomorrow td").textContent = weatherDescriptions[1] || "データなし";
      document.querySelector("#dayAfterTomorrow td").textContent = weatherDescriptions[2] || "データなし";
      document.querySelector("#todayHighTemperature td").textContent = todayHigh;
      document.querySelector("#todayLowTemperature td").textContent = todayLow;
    })
    .catch(function (error) {
      console.error("天気データの取得に失敗しました", error);
      alert(error.message);
    });
});