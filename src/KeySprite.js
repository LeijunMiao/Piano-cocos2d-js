/**
 * Created by admin on 15-9-18.
 */
var KeySprite = cc.Sprite.extend({
    key: null,
    ccolor: cc.color(0,0,0),
    onEnter: function(){
        this._super();
        this.addTouchEventListenser();
    },
    onExte: function(){
        this._super();
    },
    addTouchEventListenser: function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTTouches: true,
            onTouchBegan: function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                target.runAction(cc.ScaleTo.create(0, target.scaleX, target.scaleY));
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    console.log(MODE);
                    if(MODE == 1)target.setColor(target.ccolor);
                    var seq = target.newEffect();
                    //var music = cc.Audio();
                    //music.playEffect(PIANO_SIMPLE[target.key],false);
                    cc.audioEngine.playEffect(PIANO_SIMPLE[target.key],false);
                    target.runAction(seq);
                    if(target.key == WORLD[PIANO_XIAOXINGXING[STEP] - 1] && MODE == 1) STEP++;
                    if(MODE == 1)target.newPoint(target.getParent());
                }

            }
        });
        cc.eventManager.addListener(this.touchListener,this);

    },
    newPoint: function(parent){
        console.log(parent);

        var Note = WORLD[PIANO_XIAOXINGXING[STEP] - 1];
        for(var i =0;i<parent.keyList.length;i++) {
            if(parent.keyList[i].key == Note) {
                parent.keyList[i].runAction(cc.ScaleTo.create(0, this.scaleX, this.scaleY));
                parent.keyList[i].setColor(cc.color(222,214,114));
                var seq = parent.keyList[i].newEffect();
                parent.keyList[i].runAction(seq);
            }
        }
        if(STEP == PIANO_XIAOXINGXING.length) parent.gameOver();
        console.log(Note);
    },
    newEffect: function(){
        var seq = new cc.Sequence.create(
            cc.ScaleTo.create(0, this.scaleX*2/3, this.scaleY*2/3),
            cc.ScaleTo.create(0.1, this.scaleX, this.scaleY)
        );
        return seq;
    }

});
/*
var SushiSprite = cc.Sprite.extend({
    disappearAction: null,
    onEnter: function(){
        this._super();
        this.disappearAction = this.createDisappearAction();
        this.disappearAction.retain();
        this.addTouchEventListenser();
    },
    onExte: function(){
        this.disappearAction.release();
        this._super();
    },
    addTouchEventListenser: function(){
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    cc.log("touched");
                    target.removeTouchEventListenser();
                    target.stopAllActions();
                    var ac = target.disappearAction;
                    var seqAc = cc.Sequence.create(ac,cc.CallFunc.create(function() {
                        target.getParent().addScore();
                        //target.getParent().removeSushiByindex(target.index - 1);
                        target.removeFromParent();
                    },target));
                    target.runAction(seqAc);
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    },
    createDisappearAction: function(){
        var frames = [];
        for(var i = 0; i < 11; i++){
            var str = "sushi_1n_"+i+".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames,0.02);
        var action = new cc.Animate(animation);
        return action;
    },
    removeTouchEventListenser: function(){
        cc.eventManager.removeListener(this.touchListener,this);
    }
});
*/
