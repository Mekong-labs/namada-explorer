"use client";

import { Props as ApexChartsProps } from "react-apexcharts";

import dynamic from "next/dynamic";

import LoadingDefault from "../../Loading/LoadingDefault";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <LoadingDefault style="w-[3rem] h-[3rem] relative " />,
});

interface IChartLine {
  data: number[];
}

export const ChartLine = ({ data }: IChartLine) => {
  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    grid: {
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    series: [
      {
        data: data,
      },
    ],
    xaxis: {
      tickPlacement: "on",
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: "#f59e0b",
      width: 3,
    },
    markers: {
      size: 3,
      colors: "#f59e0b",
      strokeColors: "#ffffff",
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
  };

  return (
    <div className={"flex"}>
      <Chart
        options={chartOptions as ApexChartsProps}
        series={chartOptions.series}
        type="line"
        width={220}
        height={"auto"}
      />
    </div>
  );
};
