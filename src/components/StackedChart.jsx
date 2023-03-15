import React, { useContext, useLayoutEffect } from "react";
import { AppContext } from "./app-context";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
const StackedChart = () => {
  const { chartData } = useContext(AppContext);

  useLayoutEffect(() => {
   
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);
    var data = [{
      "year": "1994",
      "cars": 1587,
      "motorcycles": 650,
      "bicycles": 121
    }, {
      "year": "1995",
      "cars": 1567,
      "motorcycles": 683,
      "bicycles": 146
    }, {
      "year": "1996",
      "cars": 1617,
      "motorcycles": 691,
      "bicycles": 138
    }, {
      "year": "1997",
      "cars": 1630,
      "motorcycles": 642,
      "bicycles": 127
    }, {
      "year": "1998",
      "cars": 1660,
      "motorcycles": 699,
      "bicycles": 105
    }, {
      "year": "1999",
      "cars": 1683,
      "motorcycles": 721,
      "bicycles": 109
    }, {
      "year": "2000",
      "cars": 1691,
      "motorcycles": 737,
      "bicycles": 112
    }, {
      "year": "2001",
      "cars": 1298,
      "motorcycles": 680,
      "bicycles": 101
    }, {
      "year": "2002",
      "cars": 1275,
      "motorcycles": 664,
      "bicycles": 97
    }, {
      "year": "2003",
      "cars": 1246,
      "motorcycles": 648,
      "bicycles": 93
    }, {
      "year": "2004",
      "cars": 1318,
      "motorcycles": 697,
      "bicycles": 111
    }, {
      "year": "2005",
      "cars": 1213,
      "motorcycles": 633,
      "bicycles": 87
    }, {
      "year": "2006",
      "cars": 1199,
      "motorcycles": 621,
      "bicycles": 79
    }, {
      "year": "2007",
      "cars": 1110,
      "motorcycles": 210,
      "bicycles": 81
    }, {
      "year": "2008",
      "cars": 1165,
      "motorcycles": 232,
      "bicycles": 75
    }, {
      "year": "2009",
      "cars": 1145,
      "motorcycles": 219,
      "bicycles": 88
    }, {
      "year": "2010",
      "cars": 1163,
      "motorcycles": 201,
      "bicycles": 82
    }, {
      "year": "2011",
      "cars": 1180,
      "motorcycles": 285,
      "bicycles": 87
    }, {
      "year": "2012",
      "cars": 1159,
      "motorcycles": 277,
      "bicycles": 71
    }];

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    // Create series
    function createSeries(name, field) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueYField: field,
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          }),
        })
      );

      series.fills.template.setAll({
        fillOpacity: 0.5,
        visible: true,
      });

      series.data.setAll(data);
      series.appear(2000);
    }

    createSeries("cars", "cars");
    createSeries("motorcycles", "motorcycles");
    createSeries("bicycles", "bicycles");

    // Add scrollbar
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default StackedChart;
