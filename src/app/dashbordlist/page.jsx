import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, PieChart } from '@mui/x-charts';


export default function DashBordList() {
    const pieParams = { height: 200, margin: { right: 3 } };
    const palette = ['red', 'blue', 'green'];
    return (
        <>
            <PieChart className='piechart'
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: 'series A' },
                            { id: 1, value: 15, label: 'series B' },
                            { id: 2, value: 20, label: 'series C' },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />

            <div className="charts-row">
                {/* 선 그래프 */}
                <div className="chart-container line-chart">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                        width={500}
                        height={300}
                    />
                </div>
                {/* 바 그래프 */}
                <div className="chart-container bar-chart">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[
                            { data: [4, 3, 5] },
                            { data: [1, 6, 3] },
                            { data: [2, 5, 6] }
                        ]}
                        width={500}
                        height={300}
                        barLabel="value"
                    />
                </div>
            </div>
            </>
            )
}