/*
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
*/
var PianoLayer = cc.Layer.extend({

    ctor: function(){
        this._super();
        MODE = 2;
        var winSize = cc.winSize;
        console.log('winSize',winSize);
        this.block1Width = winSize.width / 7;
        console.log('blockWidth',this.block1Width);
        this.blockHeight = winSize.height / 2;
        this.scaleX = (this.block1Width ) / 300;
        this.scaleY = (this.blockHeight ) / 500;

        var bgSprite = new cc.Sprite("res/whiteBlockLarger3.png");
        bgSprite.attr({
            x: winSize.width / 2,
            y: winSize.height / 2,
            zIndex: -1,
            scaleX: this.scaleX,
            scaleY: this.scaleY

        });
        this.addChild(bgSprite,0);

        var titleLabel = cc.LabelTTF.create("Piano", "Arial", 100);
        titleLabel.setPosition(cc.p(winSize.width /2, winSize.height - winSize.height/2));
        titleLabel.setAnchorPoint(cc.p(0.5,0.5));
        titleLabel.setColor(cc.color(0,0,0));
        this.addChild(titleLabel,5);
        titleLabel.runAction(
            cc.sequence(
                cc.moveBy(1, cc.p(0, winSize.height/4)),
                cc.tintTo(1,255,255,255)
            )
        );

        var quitItem = new cc.MenuItemFont(
            "Quit", function(){
                cc.director.runScene(new MenuScene());
            },this);
        quitItem.attr({
            x: winSize.width -100,
            y: winSize.height -100,
            anchorX: 0.5,
            anchorY: 0.5,
            color: cc.color(255,255,255)
        });
        quitItem.setFontSize(80);
        var menu = new cc.Menu(quitItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1);

        for(var i=1;i<8;i++){
            this.newKey(i);
        }
        //this.newKey(i);
    },
    newKey: function(i){
        var world = ["do","re","mi","fa","sol","la","si"];
        var colors = [cc.color(255, 255, 255), cc.color(0, 0, 0)];

        var pianoKey = new KeySprite(res.backGround_png);//cc.Sprite.create("res/whiteBlock.png");
        pianoKey.key = world[i-1];
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

        var blockLabel = cc.LabelTTF.create(world[i-1], "Arial", 50);
        pianoKey.addChild(blockLabel);
        blockLabel.setPosition(cc.p(this.block1Width / 2 , this.blockHeight / 2 +30));//
        blockLabel.setAnchorPoint(cc.p(0.5, 0.5));

        if(i%2) {
            pianoKey.setColor(colors[1]);
            blockLabel.setColor(colors[0]);
        }
        else {
            pianoKey.setColor(colors[0]);
            blockLabel.setColor(colors[1]);
        }
        console.log(world[i-1]);

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
    }
});
/*
MainLayer.prototype.onTouchesBegan = function (touches, event) {
    this.pBegan = touches[0].getLocation();
    cc.log("this.pianoLength==" + this.pianoLength);
    if (this.gameStatus == START) {  //game start
        var newTouchPos = cc.p(this.pBegan.x, (this.pBegan.y + this.moveNum * this.blockHeight));
        for (var j = 0; j < this.pianoLength; j++) {
            for (var i = 0; i < 4; i++) {
                var block = this.tables[j][i];
                if (block) {
                    var blockRect = cc.rectCreate(block.getPosition(), [this.blockWidth / 2, this.blockHeight / 2]);
                    if (cc.rectContainsPoint(blockRect, newTouchPos)) {
                        if (j == 0) {
                            return;
                        }

                        //touch black
                        if (block.blockData.color == "black") {
                            if (block.blockData.row == (this.moveNum + 1)) {

                                //create new sprite
                                if (this.pianoLength < this.pianoLengthIndex) {  //not reach top
                                    this.moveAddNewSprites();
                                }

                                if (this.pianoLength == this.pianoLengthIndex) {  //when reach top
                                    this.createTopOverNode();
                                }

                                //move down
                                cc.AudioEngine.getInstance().playEffect(PIANO_SIMPLE[this.pianoListIndex[j - 1]], false);
                                block.setColor(cc.c3b(100, 100, 100));
                                var heightNum = 1;
                                if (block.blockData.row == (this.pianoLengthIndex - 1)) { //when last row ,game success end, move two height
                                    heightNum = 2;
                                    cc.log("end");
                                    this.gameStatus = OVER;
                                    cc.AudioEngine.getInstance().playEffect(SOUNDS.win, false);

                                }
                                this.blockNode.runAction(cc.MoveTo.create(0.2, cc.p(0, (this.blockNode.getPositionY() - this.blockHeight * heightNum))));
                                this.moveNum += 1;
                                block.runAction(cc.Sequence.create(
                                    cc.ScaleTo.create(0, this.scaleX * 4 / 5, this.scaleY),
                                    cc.ScaleTo.create(0.2, this.scaleX, this.scaleY)
                                ));
                            }
                        }

                        //touch white ,game over
                        else {
                            this.createTopOverNode();   //create score node and move
                            this.gameStatus = OVER;
                            cc.AudioEngine.getInstance().playEffect(SOUNDS.error, false);
                            block.setColor(cc.c3b(255, 0, 0));
                            block.runAction(cc.Sequence.create(
                                cc.ScaleTo.create(0, this.scaleX * 4 / 5, this.scaleY * 4 / 5),
                                cc.ScaleTo.create(0.2, this.scaleX, this.scaleY)
                            ));
                            this.scoreNode.bgColor.setColor(cc.c3b(255, 0, 0));
                            this.scoreNode.result.setString("失败了");
                            this.scoreNode.runAction(cc.MoveTo.create(0.2, cc.p(0, this.blockHeight * this.moveNum)));
                        }
                    }
                }
            }
        }
    }
    else if (this.gameStatus == OVER) {  //game over
        //back
        var backRect = cc.rectCreate(this.scoreNode.back.getPosition(), [50, 30]);
        if (cc.rectContainsPoint(backRect, this.pBegan)) {
            this.scoreNode.back.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1),
                cc.CallFunc.create(function () {
                    cc.AudioEngine.getInstance().stopAllEffects();
                    cc.BuilderReader.runScene("", "StartLayer");
                })
            ));
        }

        //return
        var returnRect = cc.rectCreate(this.scoreNode.return.getPosition(), [50, 30]);
        if (cc.rectContainsPoint(returnRect, this.pBegan)) {
            this.scoreNode.return.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1),
                cc.CallFunc.create(function () {
                    cc.AudioEngine.getInstance().stopAllEffects();
                    cc.BuilderReader.runScene("", "MainLayer");
                })
            ));
        }
    }
};
/*
StartLayer.prototype.newBlock = function (i, j) {
    var block = cc.Sprite.create("res/whiteBlock.png");
    block.setPosition(cc.p(this.blockWidth / 2 + this.blockWidth * i, this.blockHeight / 2 + this.blockHeight * j));
    block.setScaleX(this.scaleX);
    block.setScaleY(this.scaleY);
    block.setZOrder(100);
    block.setAnchorPoint(cc.p(0.5, 0.5));

    var words = ["禅", "CocosEditor", "经典", "街机"];
    var wordNum = 0;
    if (j == 0 && i == 1) {
        wordNum = 1
    } else if (j == 1 && i == 0) {
        wordNum = 2
    } else if (j == 1 && i == 1) {
        wordNum = 3
    }

    var blockLabel = cc.LabelTTF.create(words[wordNum], "Arial", 50);
    block.addChild(blockLabel);
    blockLabel.setPosition(cc.p(this.blockWidth / 2 - 30, this.blockHeight / 2 - 60));
    blockLabel.setAnchorPoint(cc.p(0.5, 0.5));
    var colors = [cc.c3b(0, 0, 0), cc.c3b(255, 255, 255)];
    if (i == j) {
        block.setColor(colors[0]);
        blockLabel.setColor(colors[1]);
    } else {
        block.setColor(colors[1]);
        blockLabel.setColor(colors[0]);
    }
    block.label = blockLabel;

    this.startNode.addChild(block);
    return block;
};
*/
var PianoScence = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new PianoLayer();
        this.addChild(layer);
    }
});

