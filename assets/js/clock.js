const per_scale = 6*Math.PI/180;
var clockPointer = document.getElementById('clockPointer');
var clockPointerContext = clockPointer.getContext('2d');
clockPointerContext.translate(76,76);
drawClockBg();
setInterval(function(){drawClockPointer(clockPointerContext)}, 1000);

function drawClockBg () {
    var clockBg = document.getElementById('clockBg');
    if(clockBg.getContext) {
        // degree
        var clockBgContext = clockBg.getContext('2d');
    
        clockBgContext.beginPath();
        clockBgContext.strokeStyle = "#ed6663";
        clockBgContext.fillStyle = "#ed6663";
        clockBgContext.arc(76,76,75,0,2*Math.PI,false);
    
        // 变换原点 为时钟的中心
        clockBgContext.translate(76,76);
    
        // 绘制刻度
        clockBgContext.textAlign = 'center';
        clockBgContext.textBaseline = 'middle';
        clockBgContext.moveTo(0, -75);
        for (let i = 0; i<60; i++) {
            if (i % 5 == 0) {
                clockBgContext.lineTo(0, -65);
                clockBgContext.rotate(per_scale);
                clockBgContext.moveTo(0, -75);
            } else{
                // 画圆点
                clockBgContext.lineTo(0, -72);
                clockBgContext.rotate(per_scale);
                clockBgContext.moveTo(0, -75);
            }
        }
        clockBgContext.font="bold 11px Arial"
        clockBgContext.fillText('12', 0, -57);
        clockBgContext.fillText('3', 58, -0);
        clockBgContext.fillText('6', 0, 58);
        clockBgContext.fillText('9', -58, 0);
        clockBgContext.stroke();
        drawClockPointer(clockPointerContext);
    }
}

function drawClockPointer (context) {
    // context.translate(76,76);
    var date = new Date();
    var date_hours = date.getHours();
    var date_minutes = date.getMinutes();
    var date_seconds = date.getSeconds();
    if (date_hours > 12) {
        date_hours -= 12;
    }

    // console.log(date_hours);
    // console.log(date_minutes);
    // console.log(date_seconds);
    var degree_hours = (date_hours+date_minutes/60)*30*Math.PI/180;
    var degree_minutes = date_minutes*per_scale;
    var degree_seconds = date_seconds*per_scale;

    context.clearRect(-76,-76,152,152);
    context.beginPath();
    context.strokeStyle = "#fff";
    context.save();
    context.rotate(degree_hours)
    context.moveTo(0,0);
    context.lineTo(0,-40);
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.strokeStyle = "#fff";
    context.rotate(degree_minutes)
    context.moveTo(0,0);
    context.lineTo(0,-50);
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.strokeStyle = "#fff";
    context.rotate(degree_seconds)
    context.moveTo(0,0);
    context.lineTo(0,-60);
    context.stroke();
    context.restore();
}