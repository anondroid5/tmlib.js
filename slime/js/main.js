/*
 * tmlib.js 0.5.0
 */

/*
 * constant
 */
var SCREEN_WIDTH    = 465;              // スクリーン幅
var SCREEN_HEIGHT   = 465;              // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // スクリーン高さの半分

var DOT_SIZE = 16;
var X_START_POS = 10;
var Y_START_POS = 10;

var dataSet = [
    "無", "無", "無", "無", "無", "無", "無", "無", "青", "無", "無", "無", "無", "無", "無", "無",
    "無", "無", "無", "無", "無", "無", "無", "青", "青", "青", "無", "無", "無", "無", "無", "無",
    "無", "無", "無", "無", "無", "無", "無", "青", "青", "青", "無", "無", "無", "無", "無", "無",
    "無", "無", "無", "無", "無", "無", "無", "青", "青", "青", "無", "無", "無", "無", "無", "無",
    "無", "無", "無", "無", "無", "無", "青", "青", "青", "青", "青", "無", "無", "無", "無", "無",
    "無", "無", "無", "無", "青", "青", "白", "青", "青", "青", "青", "青", "青", "無", "無", "無",
    "無", "無", "無", "青", "白", "白", "青", "青", "青", "青", "青", "青", "青", "青", "無", "無",
    "無", "無", "青", "白", "青", "青", "青", "青", "青", "青", "青", "青", "青", "青", "青", "無",
    "無", "青", "青", "青", "青", "青", "白", "青", "青", "青", "白", "青", "青", "青", "青", "青",
    "無", "青", "青", "青", "青", "白", "黒", "白", "青", "白", "黒", "白", "青", "青", "青", "青",
    "無", "青", "青", "青", "青", "青", "白", "青", "青", "青", "白", "青", "青", "青", "青", "青",
    "無", "青", "青", "青", "青", "桃", "青", "青", "青", "青", "青", "桃", "青", "青", "青", "青",
    "無", "無", "青", "青", "青", "青", "桃", "桃", "桃", "桃", "桃", "青", "青", "青", "青", "無",
    "無", "無", "無", "青", "青", "青", "青", "青", "青", "青", "青", "青", "青", "青", "無", "無",
    "無", "無", "無", "無", "無", "青", "青", "青", "青", "青", "青", "青", "無", "無", "無", "無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":"#000000",
        "白":"#ffffff",
        "青":"#00ffff",
        "黒":"#000000",
        "桃":"#ffc0cb"
    };
    return colorHash[ c ];
}

/*
 * main
 */
tm.main(function() {
    var app = tm.display.CanvasApp("#Slime");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.background = "rgb(100, 100, 100)";
    app.fitWindow();
    
    app.replaceScene(MainScene());
    
    app.run();
});

/*
 * main scene
 */
tm.define("MainScene", {
    superClass: "tm.app.Scene",
    
    init: function() {
        this.superInit();
        
        this.pieceGroup = tm.display.CanvasElement().addChildTo(this);
        
        for (var i=0; i<dataSet.length; ++i) {
            var x = X_START_POS + ( i % 16 ) * DOT_SIZE;
            var y = Y_START_POS + Math.floor( i / 16 ) * DOT_SIZE;
            var angle = (360/25)*i;
            //var color = "hsl({0}, 75%, 55%)".format(angle);
            var color = getRgbColor( dataSet[i] );
            if ( dataSet[i] != "無" ) {
            var piece = Piece(color).addChildTo(this.pieceGroup);
                piece.position.set(Math.rand(-465, 465*2), Math.rand(-465, 465*2));
                piece.tweener
                    .move(x+90, y+90, 1000, "easeOutQuad")
                    .wait(250)
                    .rotate(0, 1000, "easeOutQuad")
                    .wait(250)
                    .scale(1, 1000, "easeOutQuad")
                    .call(function() {
                    }.bind(piece));
            }
        }
    },

    update: function(app) {
    }
});


tm.define("Piece", {
    superClass: "tm.display.RectangleShape",
    
    init: function(color) {
        this.superInit(DOT_SIZE*0.9, DOT_SIZE*0.9, {
            fillStyle: color,
            strokeStyle: "rgb(0, 0, 0)",
            lineWidth: 0
        });
        
        var scale = Math.randf(1.0, 1.5);
        this.scale.x = scale;
        this.scale.y = scale;
        
        this.rotation = Math.rand(-25, 25);
    }
});
