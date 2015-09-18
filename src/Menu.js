/**
 * Created by admin on 15-9-18.
 */
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        this.size = cc.winSize;
        this.createItem("自由模式",2);
        this.createItem("一闪一闪亮晶晶",1);

        return true;
    },
    createItem: function(title,modeNum){
        //add start menu
        var startItem = new cc.MenuItemFont(
            title,
            function () {
                cc.log("Menu is clicked!");
                if(modeNum == 2) cc.director.runScene(new PianoScence());
                else cc.director.runScene(new ClassicalScence());
            }, this);
        startItem.attr({
            x: this.size.width/2,
            y: this.size.height/2 + 100*(modeNum-1),
            anchorX: 0.5,
            anchorY: 0.5
        });
        startItem.setFontSize(60);
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});
