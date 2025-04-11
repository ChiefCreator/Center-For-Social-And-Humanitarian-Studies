import Highcharts from "highcharts";
import VariablePie from 'highcharts/modules/variable-pie.js';
import Timeline from 'highcharts/modules/timeline.js';

import RunningLine from "./modules/RunningLine.js";
import Carousel from "./modules/Carousel.js";
import CircularSlider from "./modules/CircularSlider.js";
import Checkbox from "./modules/Checkbox.js";
import Tabs from "./modules/Tabs.js";

import initFormHandler from "./modules/initFormHandler.js";

window.onload = function () {
  const runningLineEl = document.getElementById("running-line");
  const runningLine = new RunningLine(runningLineEl);

  const slider = new Carousel("#carousel-employees", 4);

  const checkbox = document.querySelector(".checkbox");
  const checkboxObj = new Checkbox(checkbox);

  initFormHandler();

  const tabsEl = document.querySelector(".performance-tabs");
  const tabsObj = new Tabs(tabsEl, 10000);

  // Инициализация service-графиков
  const serviceChart_01 = document.querySelector("#service-card-01 .employee-card__chart");
  Highcharts.chart(serviceChart_01, {
    chart: {
      type: 'column'
    },
    title: null,
    xAxis: {
      categories: ["Компания A", "Компания B", "Компания C"]
    },
    yAxis: [
      {
        min: 0,
        title: { text: "Работники" }
      },
      {
        title: { text: "Прибыль" },
        opposite: true
      }
    ],
    legend: {
      shadow: false
    },
    tooltip: {
      enabled: false 
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0
      }
    },
    series: [
      {
        name: "Работники",
        color: "rgba(165,170,217,1)",
        data: [150, 73, 20],
        pointPadding: 0.3,
        pointPlacement: -0.2
      },
      {
        name: "Эффективность труда",
        color: "rgba(126,86,134,.9)",
        data: [140, 90, 40],
        pointPadding: 0.4,
        pointPlacement: -0.2
      },
      {
        name: "Прибыль",
        color: "rgba(248,161,63,1)",
        data: [183.6, 178.8, 198.5],
        tooltip: {
            valuePrefix: '$',
            valueSuffix: ' M'
        },
        pointPadding: 0.3,
        pointPlacement: 0.2,
        yAxis: 1
      },
      {
        name: "Оптимизация ценовой стратегии",
        color: "rgba(186,60,61,.9)",
        data: [203.6, 198.8, 208.5],
        tooltip: {
            valuePrefix: '$',
            valueSuffix: ' M'
        },
        pointPadding: 0.4,
        pointPlacement: 0.2,
        yAxis: 1
      }
    ]
  });

  const serviceChart_02 = document.querySelector("#service-card-02 .employee-card__chart");
  Highcharts.chart(serviceChart_02, {
    chart: {
        type: 'area'
    },
    title: null,
    xAxis: {
      categories: ['2020', '2021', '2022', '2023', '2024', '2025'],
    },
    yAxis: {
      title: {
        text: "Положительная реакция (%)"
      },
      max: 100 
    },
    tooltip: {
      enabled: false,
    },
    
    colors: [
      "#7fc309",
      "#1acb61"
    ],
    series: [{
        name: "Концепция продукта",
        data: [
          5, 23, 68, 77, 50, 80
        ]
    }, {
        name: "Эффективность рекламы",
        data: [
          45, 52, 39, 20, 28, 35
        ]
    }]
  });

  const serviceChart_03 = document.querySelector("#service-card-03 .employee-card__chart");
  Highcharts.chart(serviceChart_03, {
    title: null,

    tooltip: {
      enabled: false,
    },
  
    yAxis: {
      title: {
        text: "Уровень (%)"
      },
      max: 100
    },
  
    xAxis: {
      title: null,
    },
  
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
  
    series: [
      {
        name: "Осведомленность о марке",
        data: [
          10, 20, 25, 30, 35, 45, 28, 50, 52, 60, 48, 54, 50
        ],
        color: "#1c1cc7",
      },
      {
        name: "Лояльность потребителей",
        data: [
          5, 8, 6, 10, 15, 13, 8, 9, 16, 14, 20, 17, 10
        ],
        color: "#1cbec7",
      },
      {
        name: "Удовлетворенность клиентов",
        data: [
          75, 80, 65, 58, 62, 70, 73, 68, 77, 80, 75, 85, 95
        ],
        color: "#33c71c",
      }
    ],
  });

  const serviceChart_04 = document.querySelector("#service-card-04 .employee-card__chart");
  Highcharts.chart(serviceChart_04, {
    chart: {
      zooming: {
        type: 'xy'
      }
    },

    title: null,

    xAxis: [{
      categories: ["Бренд A", "Бренд B", "Бренд C", "Бренд D"],
    }],

    yAxis: [
      {
        labels: {
          format: "{value}%",
        },
        title: {
          text: "Рыночная доля (%)",
        },
        max: 100
      },
      {
        title: {
          text: "Иновационность продуктов",
        },
        max: 10,
        opposite: true
      }
    ],

    tooltip: {
      enabled: false,
    },

    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },

    series: [
      {
        name: "Рыночная доля (%)",
        type: "column",
        yAxis: 0,
        data: [
          85, 70, 90, 52
        ],
        color: "#d77717",
      },
      {
        name: "Иновационность продуктов",
        type: "spline",
        yAxis: 1,  
        data: [
          7.5, 4, 9.2, 6
        ],
        color: "#ffb56c",
      }
    ]
  });

  const serviceChart_05 = document.querySelector("#service-card-05 .employee-card__chart");
  Highcharts.chart(serviceChart_05, {
    chart: {
      type: "variablepie"
    },

    title: null,
  
    tooltip: {
      enabled: false,
    },

    plotOptions: {
      variablepie: {
        minPointSize: 0,
        maxPointSize: 200,
        zMin: 0,
        zMax: 200
      }
    },
  
    series: [{
      innerSize: "20%",
      name: "analysis",
      borderRadius: 5,
      data: [
        {
          name: "Этический анализ",
          y: 30,
          z: 100
        }, 
        {
          name: "Логико-семиотический анализ",
          y: 13,
          z: 60
        },
        {
          name: "Культурологический анализ",
          y: 17,
          z: 70
        },
        {
          name: "Религиоведческий анализ",
          y: 20,
          z: 30
        },
        {
          name: "Медиакомпетентность и критическое мышление",
          y: 23,
          z: 70
        },
        {
          name: "Динамика и тенденции медиа",
          y: 7,
          z: 30
        },
        {
          name: "Личностное развитие",
          y: 10,
          z: 75
        },
      ],
      colors: [
        "#17d7ca",
        "#1727d7",
        "#6a17d7",
        "#ca17d7",
        "#d71717",
        "#d77717",
        "#d7cd17"
      ],
    }]
  });

  const serviceChart_06 = document.querySelector("#service-card-06 .employee-card__chart");
  Highcharts.chart(serviceChart_06, {
    title: null,

    tooltip: {
      enabled: false,
    },
  
    yAxis: {
      title: {
        text: "Уровень (%)"
      },
      max: 100
    },
  
    xAxis: {
      title: null,
    },
  
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
  
    series: [
      {
        name: "Профориентация",
        data: [
          70, 75, 80, 65, 70, 70, 64, 69, 80, 82, 84, 78, 75
        ],
        color: "#1c1cc7",
      },
      {
        name: "Восприятие рекламы",
        data: [
          30, 40, 60, 75, 70, 50, 80, 73, 83, 55, 60, 43, 36
        ],
        color: "#1cbec7",
      },
      {
        name: "Командообразование",
        data: [
          80, 75, 70, 82, 70, 60, 50, 35, 43, 32, 30, 23, 15
        ],
        color: "#33c71c",
      }
    ],
  });

  const serviceChart_07 = document.querySelector("#service-card-07 .employee-card__chart");
  Highcharts.chart(serviceChart_07, {
    chart: {
      type: "timeline"
    },

    tooltip: {
      enabled: false,
    },

    xAxis: {
      visible: false
    },

    yAxis: {
      visible: false
    },

    title: null,

    colors: [
      "#17d7ca",
      "#1727d7",
      "#6a17d7",
      "#ca17d7",
      "#d71717",
      "#d77717",
      "#d7cd17"
    ],

    series: [{
      data: [
        {
          name: "1995: Основание организации",
          description: "Начало деятельности с небольшой командой энтузиасто.",
        },
        {
          name: '1998: Первый значимый успех',
          description: 'Получение лицензии/гранта/госзаказа, расширение штата.'
        },
        {
          name: "2002: Переезд или расширение",
          description: "Открытие нового офиса, филиала или производственного помещения."
        },
        {
          name: "2008: Техническая или методическая модернизация",
          description: 'Внедрение новых технологий, методик, стандартов.'
        },
        {
          name: '2010: Публичное признание',
          description: "награды, участие в конкурсах, первые публикации в СМИ.",
        },
        {
          name: '2013: Выход на новый уровень',
          description: 'Международное сотрудничество, экспорт, новые рынки.'
        },
        {
          name: '2015: Инновации и устойчивое развитие',
          description: 'Экологические инициативы, цифровизация процессов.'
        }
      ]
    }]
  });

  const circularSliderEl = document.querySelector(".circular-slider");
  new CircularSlider(circularSliderEl, [document.querySelector(".work-results-button.prev"), document.querySelector(".work-results-button.next")]);
};
