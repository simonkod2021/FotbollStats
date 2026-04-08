# Data

All data that is used comes from StatsBomb Open Data

https://github.com/statsbomb/open-data


## How to add more data

Navigate to StatsBomb Open Data and select events from data folder > events.

Download the match data from events and add the data to fotboll-stats > data folder.

Add your data to matchRoutes.jsx, for example

{
    id: "barcelona-alaves",
    label: "Barcelona vs Deportivo Alavés",
    path: "/barcelona-vs-deportivo-alaves",
    loadData: () => import("../data/Barcelona-Alaves.json"),
    title: "Heatmap · Barcelona vs Deportivo Alavés",
  }

## Data Usage

The data has a variety of different events. An event can be "Pass", "Dribble" or "Shot"

The code only reads these events and show them to the UI, we dont show the person applied to these events or manipulate any data.

## Heatmaps

The data is used like a JavaScript object, the Heatmaps that are generated works like grids where events are populated as small circles within every cell. You can filter out specific events with a simple selector dropdown.

## Diagrams

The same data is used to generate the diagrams, we just use them together with different types of diagrams from ApexCharts. Currently only works with BarChart, PieChart and RadarChart.
