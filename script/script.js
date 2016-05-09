/***************************
** Global variables
***************************/
var MIImgID;



/***************************
** General
***************************/
$(document).ready(function() {
    var MIImgIDCookie=getCookie("MIImgID");
    if (MIImgIDCookie!="") {
        MIImgID = MIImgIDCookie;
    } else {
        MIImgID = "MIImg1";
    }
    setMMImg();
});



/***************************
** Chart
***************************/
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
            pointFormat: 'Antall skritt gått: <b>{point.y}</b>',
            style: {
                fontSize: '16px'
            },
            headerFormat: '<span style="font-size: 16px"><strong>{point.key}</strong></span><br/>'
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



/***************************
** Selection of MI image
***************************/
document.getElementById("MIImgSelectionGroup").addEventListener("click", function(e) {
    if (e.target !== e.currentTarget) {
        var clickedID = e.target.id;
            if (clickedID != MIImgID && clickedID != null) {
                MIImgID = clickedID;
                setMMImg();
                setCookie("MIImgID", MIImgID, 7);
            }
    }
    e.stopPropagation();
}, false);


function setMMImg() {
    var imgPath = "img/MIImg/" + MIImgID + ".png";
    var img = document.getElementById("MIImg");
    img.src = imgPath;
    img.style.visibility = 'visible';
    setCorrectBorder();
}


function setCorrectBorder() {
    var imgGroup = document.getElementById("MIImgSelectionGroup");
    var children = imgGroup.children;
    for (var i = 0; i < children.length; i++) {
        var img = children[i];
        if (img.id == MIImgID) {
            img.className = "MIImgSelected";
        } else {
            img.className = "";
        }
    }
}



/***************************
** Cookies
***************************/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}