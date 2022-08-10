console.log("getting graph....");
// データを入れ込む配列を用意しておく
let labelsArr = [],
    dataArr1 = [],
    dataArr2 = [],
    dataArr3 = [];
// 描画するキャンバスを指定する
const ctx = document.getElementById('myChart');
const req = new XMLHttpRequest();
req.open('get', 'https://asha-ndf.github.io/omu-covid19-chart/data/graph_data.csv', true); // 対象のCSVファイルを読み込む
req.send(null);
req.onload = function () {
    let tmp = req.responseText.split('\n');
    console.log(tmp)
    tmp.forEach((val, idx) => {
        const data = val.split(',').filter(Boolean);
        const data2 = data.filter(Boolean);

        // それぞれのデータが各行内の何番目にあるかを取得する
        let data1Index = tmp[0].split(',').indexOf('omu')
        let data2Index = tmp[0].split(',').indexOf('opu');
        let data3Index = tmp[0].split(',').indexOf('ocu');
        // 横軸のラベルとなる年月のデータをラベル用の配列にぶち込む
        
        if (data2[0] !== undefined) {
            labelsArr.push(data2[0]);
        }

        // それぞれのデータをそれぞれの配列にぶち込む
        // 総感染者数
        if (data2[data1Index] !== undefined) {
            dataArr1.push(Number(data2[data1Index]));
        }
        if (data2[data2Index] !== undefined) {
            dataArr2.push(Number(data2[data2Index]));
        }
        if (data2[data3Index] !== undefined) {
            dataArr3.push(Number(data2[data3Index]));
        }
    });


    Chart.defaults.global.defaultFontColor = '#000';

    // 各配列頭の見出しを削除する
    labelsArr.shift();
    console.log(labelsArr);
    dataArr1.shift();
    console.log(dataArr1);
    dataArr2.shift();
    console.log(dataArr2);
    dataArr3.shift();
    console.log(dataArr3);

    let myBarChart01 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsArr,
            datasets: [{
                label: '全CP',
                type: 'line',
                tension: 0,
                fill: false,
                data: dataArr1,
                borderColor: '#004098',
                yAxisID: 'y-axis-1'
            }, {
                label: '旧府大',
                type: 'line',
                tension: 0,
                fill: false,
                data: dataArr2,
                borderColor: '#ffb500',
                yAxisID: 'y-axis-1',
            }, {
                label: '旧市大',
                type: 'line',
                tension: 0,
                fill: false,
                data: dataArr3,
                borderColor: 'lightblue',
                yAxisID: 'y-axis-1',
            }]
        },
        options: {
            tooltips: {
                mode: 'nearest',
                intersect: false,
            },
            responsive: true,
            elements: {
                point: {
                    radius: 0
                }
            },
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        max: 50,
                        min: 0,
                        stepSize: 5
                    },
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: '#000'
                    },
                }],
                xAxes: [{
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: '#000'
                    },
                    barPercentage: 0.7,
                    ticks: {
                        maxTicksLimit: 10,
                        maxRotation: 0,
                        minRotation: 0
                    }
                }]
            },
        }
    });
};