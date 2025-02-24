"use client";

import { useEffect, useState } from "react";
import { Props as ApexChartsProps } from "react-apexcharts";

import dynamic from "next/dynamic";

import LoadingDefault from "../../Loading/LoadingDefault";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <LoadingDefault style="w-[3rem] h-[3rem] relative " />,
});

export const ChartRadialBar = ({ ratio }: { ratio: number }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    const isClient = setTimeout(() => {
      setClient(true);
    }, 300);
    return () => {
      clearTimeout(isClient);
    };
  }, []);

  const chartOptions: ApexChartsProps = {
    series: [ratio],
    options: {
      colors: ["#ffff00"],
      chart: {
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "58%",
            background: "#1B1B1B",
          },
          startAngle: -150,
          endAngle: 150,
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: 6,
              fontSize: "20px",
              fontFamily: "__Poppins_6d1a03",
              fontWeight: "600",
              color: "#fff",
              formatter: function (val) {
                return `${val}`;
              },
            },
          },
          track: {
            background: "#2F2F2F",
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
    },
  };

  return (
    <div className={"relative flex"}>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="radialBar"
        width={220}
        height={"auto"}
      />
      {client && (
        <svg
          className="absolute bottom-0 left-[6px] right-0 top-5 m-auto "
          width={80}
          height={80}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58.1839 72.3679C65.6027 68.0846 71.3869 61.4564 74.6265 53.526C77.866 45.5957 78.377 36.8133 76.0791 28.5608C73.7811 20.3082 68.8046 13.0539 61.9326 7.93914C55.0606 2.82439 46.6831 0.139539 38.1182 0.307016C29.5533 0.474494 21.2872 3.48479 14.6204 8.86428C7.95359 14.2438 3.2645 21.6871 1.29091 30.0232C-0.682676 38.3593 0.171251 47.1149 3.71834 54.9126C7.26542 62.7102 13.3043 69.1073 20.8849 73.0973"
            stroke="#6BCCFE"
            strokeWidth="0.239185"
            strokeLinecap="round"
            strokeDasharray="1 4 1 4"
          />
        </svg>
      )}
    </div>
  );
};
