"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'; // observer 함수 import
import axios from 'axios'; // axios import
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { scaleLinear } from 'd3-scale'; // d3-scale에서 scaleLinear import
import { max } from 'd3-array';
import './dashboard.css';

const Dashboard = observer(() => {
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get(`http://localhost:8090/payments/payList`);
        const data = response.data;
        console.log(data);

        // 서버에서 받은 데이터를 날짜별로 합산하여 막대차트 데이터 생성
        const aggregatedData = dataByDate(data, 7);

        setDataset(aggregatedData);
        } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
        }
    };

    fetchData(); 

    }, []);


    // 최근 10일치 함수
    const dataByDate = (data, days) => {
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - days);

    // 초기 데이터 생성
    const salesByDate = {};
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(cutoffDate);
        date.setDate(cutoffDate.getDate() + i);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        salesByDate[dateString] = 0; // 초기값은 0으로 설정
    }

    // 데이터를 날짜별로 합산
    data.forEach(item => {
      const date = new Date(item.approvedAt); // ISO 8601 형식의 날짜를 Date 객체로 변환
      const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // YYYY-MM-DD 형식으로 변환

        if (salesByDate[dateString] !== undefined) {
        salesByDate[dateString] += item.amount; // 매출 데이터 누적
        }
    });

    // 합산된 데이터를 막대차트 형식으로 변환
    const chartData = Object.keys(salesByDate).map(date => ({
        date,
        sales: salesByDate[date]
    }));

    // 날짜를 기준으로 오름차순 정렬
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return chartData;
    };

    // 막대 차트에서 사용될 데이터 값의 형식을 지정하는 역할 ??
    const valueFormatter = (value) => `$${value}`;

    // chartSetting 객체
    const chartSetting = {
        yAxis: [
        {

        },
        ],
        series: [{ dataKey: 'sales', label: '일별 매출현황', valueFormatter }],
        height: 300,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                // transform: 'translateX(-10px)',
            },
        },
        reversed: true, // x축 방향을 오른쪽에서 왼쪽으로 변경
    };

    return (
        <div className="chart-container">
            <BarChart
                dataset={dataset}
                xAxis={[
                    { scaleType: 'band', dataKey: 'date'},
                ]}
                className="bar-chart"
                {...chartSetting}
            />
        </div>
    );
});

export default Dashboard;
