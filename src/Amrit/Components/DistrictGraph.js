import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  NO_REPORTS,
  colors,
  INDEX_OLD_REPORTS,
  INDEX_NEW_REPORTS,
} from "../Constants";
import { Typography, Paper } from "@material-ui/core";

export const DistrictGraph = ({ districtData }) => {
  return (
    <Paper variant="elevation" elevation={8} className="district-graph-card">
      <Typography className="district-name" variant="h5">
        District 1
      </Typography>
      <div className="district-graph">
        <Bar
          data={{
            datasets: [
              {
                fill: colors[1],
                data: [...Array(7)].map((d) => Math.floor(Math.random() * 100)),
                type: "bar",
                backgroundColor: colors[1],
                borderColor: colors[1],
              },
            ],
            labels: [
              "Library",
              "Hygiene",
              "Infrastructure",
              "Teachers",
              "Labs",
              "Class Room",
              "Academics",
            ],
          }}
          legend={{
            labels: {
              fontColor: "#000",
              fontSize: 16,
              padding: 20,
              fontStyle: "italic",
            },
            display: false,
            position: "right",
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    display: true,
                    beginAtZero: true,
                    callback: function (value, index, values) {
                      return value + "%";
                    },
                    max: 100,
                    min: 0,
                  },
                  gridLines: {
                    display: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Percentage",
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    display: true,
                  },
                },
              ],
            },
            tooltips: {
              callbacks: {
                //   label: (item, data) => {
                //     if (item.datasetIndex === INDEX_OLD_REPORTS) {
                //     } else if (item.datasetIndex === INDEX_NEW_REPORTS) {
                //       const oldReportsEntityValue =
                //         data.datasets[INDEX_OLD_REPORTS][item.index];
                //       const newReportsEntityValue =
                //         data.datasets[INDEX_NEW_REPORTS][item.index];
                //       // const total
                //     }
                //     return item.yLabel;
                //   },
              },
            },
          }}
        />
      </div>
    </Paper>
  );
};
