//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    private distance:egret.Point = new egret.Point();

    private touchStatus:boolean = false;

    private ydistance:number=0;

    private ycurrent:number=0;

    private Info = new egret.TextField();

    //private localsound: egret.Sound();
    
    //private channel: egret.SoundChannel;


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        this.$touchEnabled = true;
        
        var sky1:egret.Bitmap = this.createBitmapByName("bg1_jpg");
        this.addChild(sky1);

        var sky:egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);

        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        sky1.width = stageW;
        sky1.height = stageH;
        sky1.y=1136;

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(-1000, 0, 1000, 172);
        topMask.graphics.endFill();
        topMask.y = 25;  
        this.addChild(topMask);
        egret.Tween.get(topMask).to({x:800},2500,egret.Ease.backOut);

        var rightMask = new egret.Shape();
        rightMask.graphics.beginFill(0x000000, 0.5);
        rightMask.graphics.drawRect(0, 0, 320, -1136);
        rightMask.graphics.endFill();
        rightMask.x = 300;
        rightMask.y = 2272;
        this.addChild(rightMask);
        //egret.Tween.get(rightMask).to({x:800},2500,egret.Ease.backOut);

        var icon:egret.Bitmap = this.createBitmapByName("doomicon_png");
        this.addChild(icon);
        icon.x = 188;
        icon.y = -45;
        egret.Tween.get(icon).to({y:45},1000,egret.Ease.bounceOut);

        /*var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);*/


        /*var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);*/

        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        var Play = new egret.TextField();
        Play.textColor = 0xffffff;
        Play.width = 200;
        Play.textAlign = "center";
        Play.text = "PLAY";
        Play.size = 50;
        Play.x = 70;
        Play.y = 1000;
        this.addChild(Play);
        Play.touchEnabled = true;
        Play.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.loadSound,this);

        this.Info.textColor = 0xffffff;
        this.Info.width = 290;
        this.Info.height = 1136;
        this.Info.textAlign = "center";
        this.Info.text = "介绍：我的名字是荀子强，今年21，我在2014年来到北京工业大学，在软件学院数字媒体技术专业学习。我对游戏很感兴趣，从小学开始我就对游戏很着迷。我最喜欢FPS和RPG类的游戏。我还对体育运动很感兴趣，我最喜欢的运动是篮球，其次是足球和游泳。这两年学习到了许多关于软件的知识，我觉的代码很有意思，我读过《DOOM启示录》，我最崇拜的程序员是约翰卡马克，因为他技术特别高，而且编程时有一种禅境，令我佩服的五体投地。我们现在的生活离不开软件，离不开代码，做程序是一件神奇的事情，我们可以按照自己的想法去创作任何有趣的东西，这样的感觉很棒。我想要好好学习编程，希望能做出自己的游戏。";
        this.Info.size = 30;
        this.Info.x = 320;
        this.Info.y = 2272;
        this.addChild(this.Info);
        //egret.Tween.get(this.Info).to({y:1236},20000,egret.Ease.quadOut);

        var clickicon:egret.Bitmap = this.createBitmapByName("click_png");
        clickicon.x = 70;
        clickicon.y = 2136;
        this.addChild(clickicon);
        clickicon.touchEnabled = true;
        clickicon.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.loadInfo,this)


        /*var Pause = new egret.TextField();
        Pause.textColor = 0xffffff;
        Pause.width = 70;
        Pause.textAlign = "center";
        Pause.text = "PAUSE";
        Pause.size = 20;
        Pause.x = 493;
        Pause.y = 1040;
        this.addChild(Pause);
        Play.touchEnabled = true;*/


        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

        

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
       // RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */


    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private mouseDown(evt:egret.TouchEvent)
    {
        this.touchStatus = true;
        this.distance.y = evt.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this.touchStatus )
        {
            this.y = evt.stageY - this.distance.y;
            console.log(this.y);
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        console.log("Mouse Up.");

        if(this.y<-568&&this.ycurrent==0){
            egret.Tween.get(this).to({y:-1136},600,egret.Ease.backOut);
            this.y=-1136;
        }
        if(this.y>-568&&this.ycurrent==0){
            egret.Tween.get(this).to({y:0},600,egret.Ease.backOut);
            this.y=0;
        }

        if(this.y<-568&&this.ycurrent==-1136){
            egret.Tween.get(this).to({y:-1136},600,egret.Ease.backOut);
            this.y=-1136;
        }
        if(this.y>-568&&this.ycurrent==-1136){
            egret.Tween.get(this).to({y:0},600,egret.Ease.backOut);
            this.y= 0;
        }

        this.ycurrent = this.y;
        this.touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }


    private loadSound(): void {
        var sound:egret.Sound = new egret.Sound();
        sound.load("resource/assets/DooM4 OST.mp3");
        sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
            sound.play(0,-1);
        }, this); 
    }

    private loadInfo():void{
        egret.Tween.get(this.Info).to({y:1236},20000,egret.Ease.quadOut);
        
    }
    

    /*private Display(evt:egret.Event){
        var sound = this.localsound;
        var channel:egret.SoundChannel = this.channel;
        if(channel){
            //调用soundChannel对象的stop方法停止播放音频
            console.log(channel);
            channel.stop();
            this.channel = null;
            return;
        }
        //使用SoundChannel播放音频
        channel = sound.play(0,-1);
        //Egret 3.0.4 新增获取音频长度 length 属性。
        console.log(sound.length);
        //保存soundChannel对象
        this.channel = channel;
    
    }*/

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


