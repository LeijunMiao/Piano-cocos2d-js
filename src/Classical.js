/**
 * Created by admin on 15-9-18.
 */
var ClassicalLayer = cc.Layer.extend({

    ctor: function(){
        this._super();
        MODE = 1;
        this.winSize = cc.winSize;
        this.block1Width = this.winSize.width / 7;
        console.log('blockWidth',this.block1Width);
        this.blockHeight = this.winSize.height / 2;
        this.scaleX = (this.block1Width ) / 300;
        this.scaleY = (this.blockHeight ) / 500;

        var bgSprite = new cc.Sprite("res/whiteBlockLarger3.png");
        bgSprite.attr({
            x: this.winSize.width / 2,
            y: this.winSize.height / 2,
            zIndex: -1,
            scaleX: this.scaleX,
            scaleY: this.scaleY

        });
        this.addChild(bgSprite,0);

        var quitItem = new cc.MenuItemFont(
            "Quit", function(){
                cc.director.runScene(new MenuScene());
            },this);
        quitItem.attr({
            x: this.winSize.width -100,
            y: this.winSize.height -100,
            anchorX: 0.5,
            anchorY: 0.5,
            color: cc.color(255,255,255)
        });
        quitItem.setFontSize(80);
        var menu = new cc.Menu(quitItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1);


        var titleLabel = cc.LabelTTF.create("一闪一闪亮晶晶", "Arial", 100);
        titleLabel.setPosition(cc.p(this.winSize.width /2, this.winSize.height - this.winSize.height/2));
        titleLabel.setAnchorPoint(cc.p(0.5,0.5));
        titleLabel.setColor(cc.color(0,0,0));
        this.addChild(titleLabel,5);
        titleLabel.runAction(
            cc.sequence(
                cc.moveBy(1, cc.p(0, this.winSize.height/4)),
                cc.tintTo(1,255,255,255)
            )
        );
        this.keyList = [];
        for(var i=1;i<8;i++){
            var lastKey = this.newKey(i);
            this.keyList.push(lastKey);
        }
        STEP = 0;
        lastKey.newPoint(this);
        //this.newKey(i);
    },

    newKey: function(i){

        var colors = [cc.color(255, 255, 255), cc.color(0, 0, 0)];

        var pianoKey = new KeySprite(res.backGround_png);//cc.Sprite.create("res/whiteBlock.png");
        pianoKey.key = WORLD[i-1];
        pianoKey.setPosition(cc.p(this.block1Width * (i-1)+this.block1Width/2, this.block1Width /2));
        pianoKey.setScaleX(this.scaleX);
        pianoKey.setScaleY(this.scaleY);
        pianoKey.setLocalZOrder(100);
        pianoKey.setAnchorPoint(cc.p(0.5,0.5));
        /*
         pianoKey.attr({
         x: this.blockWidth /2,
         y: this.blockHeight/2,
         scaleX: this.scaleX,
         scaleY: this.scaleY,
         zIndex: 100,
         anchorX: 0.5,
         anchorY: 0.5
         });
         */

        var blockLabel = cc.LabelTTF.create(WORLD[i-1], "Arial", 50);
        pianoKey.addChild(blockLabel);
        blockLabel.setPosition(cc.p(this.block1Width / 2 , this.blockHeight / 2 +30));//
        blockLabel.setAnchorPoint(cc.p(0.5, 0.5));

        if(i%2) {
            pianoKey.setColor(colors[1]);
            pianoKey.ccolor = colors[1];
            blockLabel.setColor(colors[0]);
        }
        else {
            pianoKey.setColor(colors[0]);
            pianoKey.ccolor = colors[0];
            blockLabel.setColor(colors[1]);
        }
        console.log(WORLD[i-1]);

        //blockLabel.setLocalZOrder(200);
        pianoKey.label = blockLabel;
        this.addChild(pianoKey);
        /*
         console.log('blockLabel');
         console.log(blockLabel.getPosition());
         console.log(blockLabel.width);
         console.log(blockLabel.height);

         console.log('pianoKey');
         console.log(pianoKey.getPosition());
         console.log(pianoKey.width);
         console.log(pianoKey.height);
         */
        return pianoKey;
    },
    gameOver: function(){
        var gameOver = new cc.LayerColor(cc.color(0,0,0));
        var titleLabel = new cc.LabelTTF("Game Over!!!!!!!!!!!", "Arial", 60);
        titleLabel.attr({
            x:this.winSize.width / 2 ,
            y:this.winSize.height / 2+100
        });
        gameOver.setLocalZOrder(101);
        gameOver.addChild(titleLabel,5);

        gameOver.addChild(this.createItem('Try Again',1),1);
        gameOver.addChild(this.createItem('Menu',2),1);
        this.addChild(gameOver);
    },
    createItem: function(title,modeNum){
        //add start menu
        var startItem = new cc.MenuItemFont(
            title,
            function () {
                cc.log("Menu is clicked!");
                if(modeNum == 2) cc.director.runScene(new MenuScene());
                else cc.director.runScene(new ClassicalScence());
            }, this);
        startItem.attr({
            x: this.winSize.width/2,
            y: this.winSize.height/2 - 100*(modeNum-1),
            anchorX: 0.5,
            anchorY: 0.5
        });
        startItem.setFontSize(60);
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        return menu;
    }
});
var ClassicalScence = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new ClassicalLayer();
        this.addChild(layer);
    }
});