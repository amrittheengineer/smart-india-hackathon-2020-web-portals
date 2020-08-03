import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  NO_REPORTS,
  colors,
  INDEX_OLD_REPORTS,
  INDEX_NEW_REPORTS,
} from "../Constants";
import { Typography, Paper } from "@material-ui/core";
import { FeedbackIndicator, Loading } from "./MainbarComponent";

export const SchoolGraph = ({ districtData }) => {
  return (
    <Paper variant="elevation" elevation={8} className="district-graph-card">
      <Typography className="district-name" variant="h5">
        {districtData.districtName}
      </Typography>
      <div className="district-graph">
        {districtData.reportData ? (
          Object.keys(districtData.reportData).map((c) => (
            <FeedbackIndicator
              category={c}
              value={(districtData.reportData[c] / 5) * 100}
              text={`${districtData.reportData[c]} / 5`}
              strokeWidth={5}
              key={c}
            />
          ))
        ) : (
          <Loading message="Loading report..." />
        )}

        {/* <Bar
          data={{
            datasets: [
              {
                fill: colors[1],
                data: Object.values(districtData.reportData),
                type: "bar",
                backgroundColor: colors[1],
                borderColor: colors[1],
              },
            ],
            labels: Object.keys(districtData.reportData),
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
        /> */}
      </div>
    </Paper>
  );
};
export const DistrictGraph = ({ districtData }) => {
  return (
    <Paper variant="elevation" elevation={8} className="district-graph-card">
      <Typography className="district-name" variant="h5">
        {districtData.districtName}
      </Typography>
      <div className="district-graph">
        {districtData.reportData ? (
          Object.keys(districtData.reportData).map((c) => (
            <FeedbackIndicator
              category={c}
              value={districtData.reportData[c]}
              text={`${districtData.reportData[c]}%`}
              strokeWidth={5}
              key={c}
            />
          ))
        ) : (
          <Loading message="Loading report..." />
        )}

        {/* <Bar
          data={{
            datasets: [
              {
                fill: colors[1],
                data: Object.values(districtData.reportData),
                type: "bar",
                backgroundColor: colors[1],
                borderColor: colors[1],
              },
            ],
            labels: Object.keys(districtData.reportData),
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
        /> */}
      </div>
    </Paper>
  );
};
