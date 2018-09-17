function dialog(param){
    var dialogNum={
    //    替换函数
        interChange:function(tpl,obj){
            for (var x in obj){
                var mess='/\{\{\%='+x+'\%\}\}/g';
                tpl=tpl.replace(eval(mess),obj[x]);
            }
            return tpl;
        },
        //模板函数
        tpl:function(){
            var tpl=(function(){/*<div class="dialog-content">
                    <!--背后布局-->
                    <div class="dialog-back">
                        <!--弹窗内容-->
                        <div class="dialog-container flex-wrap" style="width:{{%=width%}}px;height:{{%=height%}}px;">
                            <!--弹窗头部-->
                            <div class="dialog-header">
                                <div class="dialog-close"></div>
                            </div>
                            <!--弹窗内部-->
                            <div class="dialog-table flex-con">
                                <p class="table-content">{{%=content%}}</p>
                            </div>
                        </div>
                    </div>
                </div>*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //往elem添加类
        addClass:function(elem,className){
            var classArr=[];
            //把elem里面的class保存下来，并且除掉空格
            if (elem.className){
                classArr = elem.className.split(" ");
            } 
            else if(elem.class){
                classArr = elem.class.split(" ");
            }
            //遍历数组里面保存的类名，判断有没有想要的类名，如果没有，则保存在数组里面
            for (var x in classArr){
                if (classArr[x].trim()===className)
                    return true;
                else
                    classArr.push(className);
            }
            //利用join函数把数组里面的数值转化为字符串，再重新赋值给elem
            elem.className=className.join(" ");
        },

        removeClass:function(elem,className){
            var classArr=[];
            if (elem.className)
                classArr=elem.className.split(" ");
            else if (elem.class)
                classArr=elem.class.split(" ");
            for (var x in classArr){
                if (classArr[x].trim()===className)
                    classArr.splice(x,1);
            }
            elem.className=classArr.join(" ");
        },
        find:function (elem,target) {
            var that=this;
            for (var i=0;i<elem.childNodes.length;i++){
                if(elem.childNodes[i].nodeName&&elem.childNodes[i].nodeName!=='#text'){
                    if (elem.childNodes[i].className&&target.substr(0,1)==='.')
                    {
                        if (elem.childNodes[i].className===target.substr(1,target.length))
                            return elem.childNodes[i];
                        else
                            return that.find(elem.childNodes[i],target);
                    }
                    if (elem.childNodes[i].id&&target.substr(0,1)==='#')
                    {
                        if (elem.childNodes[i].id===target.substr(1,target.length))
                            return elem.childNodes[i];
                        else 
                            return that.find(elem.childNodes[i],target);
                    }
                        
                }
                
            }
        }

    };
    this.width=param.width;
    this.height=param.height;
    this.content=param.content;
    this.contentid=param.contentid;
    this.init=function(){
        this.getDom();
        this.showDialog();
        this.renderContent();
    };
    //利用className获取dom
    this.getDom=function(){
        this.contentidDom=document.getElementById(this.contentid);
        // console.log(this.contentidDom);

    };
    //渲染模板
    this.renderContent=function(){
        var contentHtml=dialogNum.interChange(dialogNum.tpl(),{content:this.content,height:this.height,width:this.width});
        this.contentidDom.innerHTML=contentHtml;
        // console.log(this.contentidDom);
    };
    //显示弹窗
    this.showDialog=function(){
        dialogNum.addClass(dialogNum.find(this.contentidDom,'.dialog-conent'),'.dialog-active');
    };
    //关闭弹窗
    this.closeDialog=function(){
        dialogNum.find(this.contentidDom,'.dialog-content');
        dialogNum.removeClass(dialogNum.find(this.contentidDom,'.dialog-conent'),'.dialog-active');
    };
    this.clickEvent=function () {
        
    }
    this.init();
    return this;
}