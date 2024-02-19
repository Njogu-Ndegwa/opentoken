import style from './reports.module.scss';
import classNames from 'classnames';
import { CustomCard } from '../../components/card/card';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export function Reports({ }) {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Total Sales',
                data: [1000, 2000, 4000, 3000, 5000, 5500, 7000, 6000],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                pointRadius: 0,
                borderColor: '#96e14e',
                tension: 0.5 // This adds some "curve" to the line
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    color: "white"
                },
                position: 'right'
            },
            x: {
                ticks: {
                    color: "white"
                }
            }
        },
        plugins: {
            legend: {
                display: false

            },
            title: {
                display: true,
                color: "white"
            },
        },
    };
    const donughtData = {
        labels: ['Green', 'Purple', 'Orange'],
        datasets: [
            {
                data: [15, 25, 10],
                backgroundColor: ['#ff5151', '#3864ce', '#ffb026'],
                borderColor: ['#ff5151', '#3864ce', '#ffb026'],
                borderWidth: 1,
            },
        ],
    };
    const donughtOptions = {
        responsive: true,
        cutout: '77%',
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
    };
return (
    <>
        <div className={style.cardContainer}>
            <div className={classNames(style.card, style.one)}>
                <div className={style.outerCardContainer}>
                    <div className={style.leftSideCard}>
                        <p className={style.topP}>Unlocked Items</p>
                        <p className={style.bottomP}>
                            Current Value
                        </p>
                        <p className={style.valueP}>200</p>
                    </div>
                    <div className={style.rightSideCard}>
                        <p className={style.topP}>Monthly change</p>
                        <p className={style.bottomP}>+12%</p>
                    </div>
                </div>
            </div>
            <div className={classNames(style.card, style.two)}>
                <div className={style.outerCardContainer}>
                    <div className={style.leftSideCard}>
                        <p className={style.topP}>Disabled Items</p>
                        <p className={style.bottomP}>
                            Current Value
                        </p>
                        <p className={style.valueP}>300</p>
                    </div>
                    <div className={style.rightSideCard}>
                        <p className={style.topP}>Monthly change</p>
                        <p className={style.bottomP}>+150%</p>
                    </div>
                </div>
            </div>
            <div className={classNames(style.card, style.three)}>
                <div className={style.outerCardContainer}>
                    <div className={style.leftSideCard}>
                        <p className={style.topP}>Enabled Items</p>
                        <p className={style.bottomP}>
                            Current Value
                        </p>
                        <p className={style.valueP}>500</p>
                    </div>
                    <div className={style.rightSideCard}>
                        <p className={style.topP}>Monthly change</p>
                        <p className={style.bottomP}>+50%</p>
                    </div>
                </div>
            </div>
            <div className={classNames(style.card, style.four)}>
                <div className={style.outerCardContainer}>
                    <div className={style.leftSideCard}>
                        <p className={style.topP}>Repossed Items</p>
                        <p className={style.bottomP}>
                            Current Value
                        </p>
                        <p className={style.valueP}>400</p>
                    </div>
                    <div className={style.rightSideCard}>
                        <p className={style.topP}>Monthly change</p>
                        <p className={style.bottomP}>+80%</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={style.chartsContainer}>
            <div className={style.chartA}>
                
                <CustomCard>
                <p>Sales History</p>
                    <Line width={800} height={300} data={data} options={options} />
                </CustomCard>
            </div>
            <div className={style.chartB}>
                <CustomCard>
                    <p>Product Info</p>
                    <Doughnut data={donughtData} options={donughtOptions} />;
                </CustomCard>
            </div>
        </div>
    </>
)
}