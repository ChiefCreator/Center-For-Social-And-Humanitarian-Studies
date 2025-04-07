import Highcharts from "highcharts";

import RunningLine from "./modules/RunningLine.js";
import Carousel from "./modules/Carousel.js";

window.onload = function () {
  const runningLineEl = document.getElementById("running-line");
  const runningLine = new RunningLine(runningLineEl);

  const chart = document.getElementById("chart");
  Highcharts.chart(chart, {
    chart: {
      type: "column",
    },
    title: null,
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
      labels: {
        style: {
          color: "var(--color-neutral-contrast--light)",
          fontSize: "12px",
          fontWeight: 500
        }
      }
    },
    yAxis: {
      title: null
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        borderRadius: 15,
        dataLabels: {
          enabled: true,
          useHTML: true,
          className: "chart-data-labels",
          formatter: function() {
            return `
              <div class="chart-label">
                <span class="chart-label__value">${this.y}%</span> / 100%
              </div>
            `;
          },
        },
      },
    },
    tooltip: {
      useHTML: true,
      className: "original-chart-tooltip",
      formatter: function () {
        return `
          <div class="chart-tooltip">
            <span class="chart-tooltip__title">Преимущества</span>
            <span class="chart-tooltip__value">${this.name}: ${this.y}%</span>
            <div class="chart-tooltip__arrow"></div>
          </div>
        `;
      },
      positioner: function (labelWidth, labelHeight, point) {
        return {
          x: point.plotX + this.chart.plotLeft - labelWidth / 2,
          y: point.plotY + this.chart.plotTop - labelHeight
        };
      }
    },
    series: [
      {
        name: "Advantages",
        color: "#1D117E", 
        data: [
          {
            name: "Качество обслуживания",
            y: 100,
          },
          {
            name: "Комплексность услуг",
            y: 100,
          },
          {
            name: "Оперативность реагирования",
            y: 100,
          },
          {
            name: "Инновационность и цифровизация",
            y: 100,
          },
          {
            name: "Социальный эффект",
            y: 100,
          },
          {
            name: "Обратная связь и адаптация",
            y: 100,
          },
        ],
      },
    ],
  });

  const slider = new Carousel("#carousel-employees", 4);
};
