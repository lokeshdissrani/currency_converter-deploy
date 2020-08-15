var sdate=new Date();
var date1=("0" + sdate.getDate()).slice(-2);
var month1=("0" + (sdate.getMonth() + 1)).slice(-2);
var year1=sdate.getFullYear();
var universal_date=year1+"-"+month1+"-"+date1;
var startdate=document.getElementById("odate");
startdate.value=universal_date;
var db=document.getElementById("db");
var value1=document.getElementById("v1");
value1.addEventListener("keyup",converter);
var value2=document.getElementById("v2");
value2.addEventListener("keyup",converter);
window.addEventListener("load",initial);
db.addEventListener("click",function(){
    var data=document.getElementById("odate").value;
    universal_date=data;
    initial();
})
function converter(e){
    
    if(e.target.id=="v1"){
        document.getElementById("v2").value="";
        var tempo=document.getElementById("v2");
        var src=document.getElementById("v1").value;
        var from=document.getElementById("c1").value;
        var to=document.getElementById("c2").value;
    }
    else if(e.target.id="v2"){
        document.getElementById("v1").value="";
        var tempo=document.getElementById("v1");
        var src=document.getElementById("v2").value;
        var from=document.getElementById("c2").value;
        var to=document.getElementById("c1").value;
    }
    var xml=new XMLHttpRequest();
    xml.open("GET","http://api.currencylayer.com/historical?access_key=88d73b21407a1bad5e9110f1a135dfee&date="+universal_date);
    xml.send();
    xml.onload=function(){
        var temp=JSON.parse(xml.response);
        answer=temp["quotes"];
        var fromer=answer["USD"+from];
        var toer=answer["USD"+to];
        tempo.value=((1/fromer)*src)*toer;


    }
}
function initial(){
    var xml=new XMLHttpRequest();
    xml.open("GET","http://api.currencylayer.com/historical?access_key=88d73b21407a1bad5e9110f1a135dfee&date="+universal_date);
    xml.send();
    xml.onload=function(){
        var temp=JSON.parse(xml.response);
        
        answer=temp["quotes"];
        
        var usd=document.getElementById("usd");
        usd.textContent="";
        for(key in answer){
            var newdiv=document.createElement("div");
            newdiv.style.border="1px solid black";
            newdiv.textContent=key+" : "+answer[key];
            usd.append(newdiv);
        }


    }

}