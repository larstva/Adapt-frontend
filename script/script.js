/***************************
** Global variables
***************************/
var MIImgID;
var oldMIImgID;
var changesMade = 0;
var chart;



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
    oldMIImgID = MIImgID;
    setMMImg();


    /***************************
    ** Chart
    ***************************/

    chartOptions = {
        chart: {
            renderTo: 'chart',
            type: 'column',
            backgroundColor: null,
            reflow: true
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
    };

    chart = new Highcharts.Chart(chartOptions);
});



/***************************
** Selection of MI image
***************************/
document.getElementById("MIImgSelectionGroup").addEventListener("click", function(e) {
    if (e.target !== e.currentTarget) {
        var clickedID = e.target.id;
            if (clickedID != MIImgID && clickedID != null) {
                if (clickedID == oldMIImgID) {
                    changesMade = 0;
                    showSaveAndCancelBtns(0);
                } else {
                    changesMade = 1;
                    showSaveAndCancelBtns(1);
                }

                MIImgID = clickedID;
                setMMImg();
            }
    }
    e.stopPropagation();
}, false);


function setMMImg() {
    var imgPath = "img/MIImg/" + MIImgID + ".png";
    var img = document.getElementById("MIImg");
    img.src = imgPath;
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

function showSaveAndCancelBtns(show) {
    var backBtn = document.getElementById("backBtn");
    var saveBtn = document.getElementById("saveBtn");
    var cancelBtn = document.getElementById("cancelBtn");

    if (show == 1) {
        backBtn.style.display = "none";
        saveBtn.style.display = "block";
        cancelBtn.style.display = "block";
    } else {
        backBtn.style.display = "block";
        saveBtn.style.display = "none";
        cancelBtn.style.display = "none";
    }
}

function saveChanges() {
    oldMIImgID = MIImgID;
    closeSettingsView();
}

function cancelChanges() {
    MIImgID = oldMIImgID;
    setMMImg();
    closeSettingsView();
    setTimeout(function () { 
        $.mobile.changePage( "#mainPage", { transition: "flip"}); 
    }, 1);
}


function closeSettingsView() {
    showSaveAndCancelBtns(0);
    changesMade = 0;
    setCookie("MIImgID", MIImgID, 7);

    // Need to run reflow function in case the window has resized while in settings view
    setTimeout(function () { 
        chart.reflow();
    }, 500);
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