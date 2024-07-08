"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'; 
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dashboard.css';

const Dashboard = observer(() => {
    // 막대그래프
    const [dataset, setDataset] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get(`http://localhost:8090/payments/payList`);
        const data = response.data;
        console.log(data);
        // 서버에서 받은 데이터를 날짜별로 합산하여 막대차트 데이터 생성
        const aggregatedData = dataByDate(data, 10);
        setDataset(aggregatedData);
        } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
        }
    };
    fetchData(); 
    }, []);

    // 최근 7일치 함수
    const dataByDate = (data, days) => {
        const today = new Date(); // 현재 날짜를 가져옴
        const cutoffDate = new Date(today); // 오늘 날짜를 복사하여 계산에 사용
        cutoffDate.setDate(today.getDate() - days +1); // days만큼 날짜를 이동하여 최종 일자 계산
        console.log("투데이"+today) // 7/3
        console.log("투데이복사"+cutoffDate) // 6/26
        console.log("투데이222222  "+(today.getDate() - days))
    // 초기 데이터 생성
    const salesByDate = {};
    for (let i = 0; i < days; i++) {
        const date = new Date(cutoffDate);
        date.setDate(cutoffDate.getDate() + i);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        salesByDate[dateString] = {
            '결제완료': 0,
            '취소완료': 0,
            '총합계': 0
        }; // 초기값은 0으로 설정
    }

    // 데이터를 날짜별로 합산
    data.forEach(item => {
        if (item.payStatus === '결제완료' || item.payStatus === '취소완료') {
            // approvedAt 날짜 합산
            const approvedDate = new Date(item.approvedAt);
            const approvedDateString = `${approvedDate.getFullYear()}-${approvedDate.getMonth() + 1}-${approvedDate.getDate()}`;
            if (salesByDate[approvedDateString]) {
                salesByDate[approvedDateString]['결제완료'] += item.amount;
            }

            // canceledAt 날짜 합산 (취소완료인 경우만)
            if (item.payStatus === '취소완료') {
                const canceledDate = new Date(item.canceledAt);
                const canceledDateString = `${canceledDate.getFullYear()}-${canceledDate.getMonth() + 1}-${canceledDate.getDate()}`;
                if (salesByDate[canceledDateString]) {
                    salesByDate[canceledDateString]['취소완료'] += item.amount;
                }
            }
        }
    });

    // 총합계를 결제완료 금액에서 취소완료 금액을 뺀 값으로 설정
    for (const date in salesByDate) {
        salesByDate[date]['총매출액'] = salesByDate[date]['결제완료'] - salesByDate[date]['취소완료'];
    }

    // 합산된 데이터를 막대차트 형식으로 변환
    const chartData = Object.keys(salesByDate).map(date => ({
        date,
        '결제완료': salesByDate[date]['결제완료'],
        '취소완료': salesByDate[date]['취소완료'],
        '총매출액': salesByDate[date]['총매출액']
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
            {},
        ],
        series: [
            { dataKey: '결제완료', label: '결제액', stackId: 'payStatus' },
            { dataKey: '취소완료', label: '환불액', stackId: 'payStatus' },
            { dataKey: '총매출액', label: '총매출액' }
        ],
        height: 360,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                // transform: 'translateX(-10px)',
            },
        },
        reversed: true, // x축 방향을 오른쪽에서 왼쪽으로 변경
    };

    
    // 파이차트
    const [pieChartData, setPieChartData] = useState([]);
        
    useEffect(() => {
        const fetchPieData = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/payments/userList`);
                const data = response.data;
                console.log(data);
                
                const activeCount = data.filter(item => +item.active === 0).length; // 숫자로 변환
                const inactiveCount = data.filter(item => +item.active === 1).length;
                
                const formattedData = [
                    { value: activeCount, label: '활성 회원' },
                    { value: inactiveCount, label: '정지 회원' },
                ];
                
                setPieChartData(formattedData);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
            }
        };
        fetchPieData();
    }, []);
    
    const size = {
        width: 400,
        height: 250,
    };


    // 라인차트
    const [lineChartData, setLineChartData] = useState([]);
    useEffect(() => {
        const fetchLineData = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/payments/interviewList`);
                const data = response.data;
                
                // 서버에서 받은 데이터를 날짜별로 합산하여 막대차트 데이터 생성
                const aggregatedData2 = dataByDate2(data, 7);
                setLineChartData(aggregatedData2);
                
            } catch (error) {
                console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
            }
        };
        
        fetchLineData();
    }, []);

    const dataByDate2 = (data, days) => {
        const today = new Date(); 
        const cutoffDate = new Date(today);
        cutoffDate.setDate(today.getDate() - days + 1);
        
        // 최근 7일의 날짜 배열 생성
        const dates = [];
        for (let i = 0; i < days; i++) {
            const date = new Date(cutoffDate);
            date.setDate(cutoffDate.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        
        // 날짜별 데이터 초기화
        const aggregatedData = dates.map(date => ({
            date,
            count: 0
        }));
        
        // 서버에서 받아온 데이터를 날짜별로 합산
        data.forEach(entry => {
        const date = entry.interview_date.split(' ')[0];
        const found = aggregatedData.find(d => d.date === date);
        if (found) {
            found.count += entry.count;
        }
        });
        
        return aggregatedData;
    };

    // 날짜를 월.일 형식으로 포맷하는 함수
    const formatXAxisDate = (dateStr) => {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 해줌
        const day = date.getDate();
        return `${month}.${day}`;
    };

    return (
        <>
            <div className='bar_container'>
                <BarChart
                    dataset={dataset}
                    xAxis={[
                        { scaleType: 'band', dataKey: 'date'},
                    ]}
                    {...chartSetting}
                    colors={['#64b5f6', '#7eb7e0', '#4285f4']}
                    style={{ fontSize: '8px' }}
                />
            </div>

            <div className="chart_container">
                <div className="line_container" style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="75%">
                        <LineChart data={lineChartData} margin={{ right: 30 }}>
                            <XAxis 
                                dataKey="date" 
                                tick={{ fontSize: 10 }} 
                                interval={0} // 모든 눈금을 표시
                                tickFormatter={formatXAxisDate}
                            />
                            <YAxis 
                                domain={[0, 'auto']} 
                                tick={{ fontSize: 12 }} 
                            />
                            <Tooltip />
                            <Legend 
                                payload={[
                                    { value: 'AI 면접 이용횟수', type: 'line', id: 'ID01', color: '#4285f4' }
                                ]}
                                wrapperStyle={{ fontSize: '12px' }} 
                            />
                            <Line 
                                type="monotone" 
                                dataKey="count" 
                                stroke="#4285f4" 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            
                <div className='pie_container'>
                    <PieChart
                        series={[
                            {
                            arcLabel: (item) => `${item.label}(${item.value})`,
                            arcLabelMinAngle: 45,
                            data: pieChartData,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                            fontSize: '12px',
                            fill: 'white',
                            fontWeight: 'bold',
                            },
                        }}
                        {...size}
                        colors={['#5e96e7', '#7eb7e0']}
                    />
                </div>
            </div>
        </>
    );
});

export default Dashboard;
