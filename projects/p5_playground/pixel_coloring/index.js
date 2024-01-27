


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16), 255
     ] : null;
} 

function updateBGAcolor(){
    var bgAlpha = parseInt($("#BGAlpha").val());
    $("#BGAshow").html("(" + bgAlpha + ")");
    backgroundColor[3] = bgAlpha;
}

$(document).ready(function () {
    $("#submitOptions").click(function (){
        totalCellCount = parseInt($("#cellCount").val());
        console.log(totalCellCount);
        resetCanvas();
    });
    $("#BGcol").on("input", function (){
        backgroundColor = hexToRgb(this.value);
        updateBGAcolor();
    });

    $("#BGAlpha").on("input", function (){
        updateBGAcolor();
    });
    $("#gridShow").on("input", function (){
        console.log(this.value);
        gridShow = !gridShow;
    });

    $("#brushColor").on("input", function (){
        currentColor = hexToRgb(this.value);
    });

    
});