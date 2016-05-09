$(function () {
    $('#chart').highcharts({
        chart: {
            type: 'column',
            backgroundColor: null
        },
        title: {
            text: 'Mengde fysisk aktivitet'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Skritt'
            },
            labels: {
                formatter: function() {
                return this.value;
              }
            }
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        credits: { enabled: false },
        tooltip: {
            pointFormat: 'Antall skritt gått: <b>{point.y}</b>'
        },
        series: [{
            name: 'Population',
            data: [
                ['Torsdag', 3298],
                ['Fredag', 2541],
                ['Lørdag', 2293],
                ['Søndag', 2759],
                ['Mandag', 3854],
                ['Tirsdag', 3029],
                ['I går', 2811]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});



$("#carousel").Cloud9Carousel( {
  buttonLeft: $("#buttons > .left"),
  buttonRight: $("#buttons > .right"),
  autoPlay: 0,
  bringToFront: true
} );