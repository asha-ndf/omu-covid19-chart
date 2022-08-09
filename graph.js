const csvLoad = () => {
	// データを入れ込む配列を用意しておく
	let labelsArr = [],
	dataArr1 = [],
	dataArr2 = [],
	dataArr3 = [];
	// 描画するキャンバスを指定する
	const ctx = document.getElementById('myChart');

	const req = new XMLHttpRequest();
	req.open('get', 'graph_data.csv', true); // 対象のCSVファイルを読み込む
	req.send(null);
	req.onload = function(){
		let tmp = req.responseText.split('\n');

		tmp.forEach((val, idx) => {
			const data = val.split(',').filter(Boolean);
			const data2 =  data.filter(Boolean);

			// それぞれのデータが各行内の何番目にあるかを取得する
			let data1Index = 0
			//let data2Index = 
			//let data3Index = 
			// 横軸のラベルとなる年月のデータをラベル用の配列にぶち込む
			labelsArr.push(data2[0]);

			// それぞれのデータをそれぞれの配列にぶち込む
			// 総感染者数
			if(data2[data1Index] !== undefined) {
				dataArr1.push(Number(data2[data1Index]));
			}
            /*
			if(data2[data2Index] !== undefined) {
				dataArr2.push(Number(data2[data2Index]));
			}
			if(data2[data3Index] !== undefined) {
				dataArr3.push(Number(data2[data3Index]));
			}
            */
		});


		Chart.defaults.global.defaultFontColor = '#000';
		
		// 各配列頭の見出しを削除する
		labelsArr.shift();
		dataArr1.shift();
        /*
		dataArr2.shift();
		dataArr3.shift();
        */
		let myBarChart01 = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labelsArr,
				datasets: [{
					label: '総感染者数',
					type: 'line',
					tension: 0,
					fill: false,
					data: dataArr1,
					borderColor: '#004098',
					yAxisID: 'y-axis-3',
				}/*, {
					label: '売上高',
					type: 'line',
					tension: 0,
					fill: false,
					data: dataArr2,
					backgroundColor: '#ffb500',
					yAxisID: 'y-axis-1',
				}, {
					label: '売上高営業利益率',
					type: 'line',
					tension: 0,
					data: dataArr3,
					backgroundColor: 'lightblue',
					yAxisID: 'y-axis-2',
				}*/]
			},
			options: {
				tooltips: {
					mode: 'nearest',
					intersect: false,
				},
				responsive: true,
				elements: {
					point:{
						radius: 0 // これを記述するとデータごとの●が消える
					}
				},
				scales: {
					yAxes: [{
						id: 'y-axis-1',
						type: 'linear',
						position: 'left',
						ticks: {
							max: 30,
							min: 0,
							stepSize: 1
						},
						gridLines: {
							color: 'transparent',
							zeroLineColor: '#000'
						},
					},/* {
						id: 'y-axis-2',
						type: 'linear',
						position: 'right',
						ticks: {
							display: false,
							max: 10,
							min: 0,
							stepSize: 1
						},
						gridLines: {
							zeroLineColor: '#000'
						}
					}, {
						id: 'y-axis-3',
						type: 'linear',
						position: 'right',
						ticks: {
							max: 130000,
							min: 0,
							stepSize: 10000
						},
						gridLines: {
							color: 'transparent',
							drawOnChartArea: false,
							zeroLineColor: '#000'
						}
					}*/],
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
};