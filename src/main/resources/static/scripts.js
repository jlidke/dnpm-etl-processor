const dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const dateFormat = new Intl.DateTimeFormat('de-DE', dateFormatOptions);

const dateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: 'numeric', second: 'numeric' };
const dateTimeFormat = new Intl.DateTimeFormat('de-DE', dateTimeFormatOptions);

window.onload = () => {
    Array.from(document.getElementsByTagName('time')).forEach((timeTag) => {
        let date = Date.parse(timeTag.getAttribute('datetime'));
        if (! isNaN(date)) {
            timeTag.innerText = dateTimeFormat.format(date);
        }
    });
};

function drawPieChart(url, elemId, title) {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let chartDom = document.getElementById(elemId);
            let chart = echarts.init(chartDom);
            let option= {
                title: {
                    text: title,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                color: data.map(i => i.color),
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data: data
                    }
                ]
            };

            option && chart.setOption(option);
        });

}

function drawBarChart(url, elemId, title) {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let chartDom = document.getElementById(elemId);
            let chart = echarts.init(chartDom);
            let option= {
                title: {
                    text: title,
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: data.map(i => dateFormat.format(Date.parse(i.date)))
                },
                yAxis: {
                    type: 'value',
                    minInterval: 2,
                },
                tooltip: {
                    trigger: 'item'
                },
                animation: false,
                color: ['slategray', 'red', 'darkorange', 'green', 'slategray'],
                series: [
                    {
                        name: 'UNKNOWN',
                        type: 'bar',
                        stack: 'total',
                        data: data.map(i => i.nameValues.unknown)
                    },
                    {
                        name: 'ERROR',
                        type: 'bar',
                        stack: 'total',
                        data: data.map(i => i.nameValues.error)
                    },
                    {
                        name: 'WARNING',
                        type: 'bar',
                        stack: 'total',
                        data: data.map(i => i.nameValues.warning)
                    },
                    {
                        name: 'SUCCESS',
                        type: 'bar',
                        stack: 'total',
                        data: data.map(i => i.nameValues.success)
                    },
                    {
                        name: 'DUPLICATION',
                        type: 'bar',
                        stack: 'total',
                        data: data.map(i => i.nameValues.duplication)
                    }
                ]
            };

            option && chart.setOption(option);
        });
}