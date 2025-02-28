import{_ as t}from"./index-f4301285.js";import{g as e}from"./index-87e816b1.js";import{v as r,r as o,N as s,O as i,$ as a,X as d,a0 as l,Z as c,Q as n,P as p,x as g}from"./core-314477b5.js";import{_ as f}from"./index-1eed7fa5.js";const h={id:"BaseProgress",class:"base-progress"},u=f(r({__name:"index",props:{strokeWidth:{type:[String,Number],default:""},strokeHidth:{type:[String,Number],default:40},color:{type:String,default:"#1989fa"},trackColor:{type:String,default:"#eeeeee"},trackBorderColor:{type:String,default:"red"},textColor:{type:String,default:"#000000"},coverTextColor:{type:String,default:"white"},textPosition:{type:String,default:"center"},percentage:{type:[Number,String],default:50},pivotText:{type:String}},setup(t){o(0);const r=t=>parseInt(e(t)+"")+"px";return(e,o)=>(s(),i("div",h,[a(e.$slots,"other",{class:"other"},void 0,!0),d("div",{class:"progress-box",style:l({width:t.strokeWidth?r(t.strokeWidth):"100%",height:r(t.strokeHidth),borderRadius:r(Number(t.strokeHidth)/2)})},[d("div",{class:"progress",style:l({borderWidth:"1px",borderColor:t.trackBorderColor,lineHeight:r(t.strokeHidth),borderRadius:r(Number(t.strokeHidth)/2)})},[d("div",{class:"progress-1",style:l({color:t.textColor,textAlign:t.textPosition,background:t.trackColor})},c(t.pivotText?t.pivotText:100*Number(t.percentage/100)+" %"),5),d("div",{class:"progress-2",style:l({background:t.color,left:"-"+Number(100-t.percentage)+"%",borderRadius:r(Number(t.strokeHidth)/2)})},[d("div",{class:"progress-2-inner",style:l({color:t.coverTextColor,textAlign:t.textPosition,left:Number(100-t.percentage)+"%"})},c(t.pivotText?t.pivotText:100*Number(t.percentage/100)+" %"),5)],4)],4)],4)]))}}),[["__scopeId","data-v-80efbd80"]]),x={class:"progress"},k=f(r({__name:"index",setup(r){const o=t=>e(t)+"px";return(e,r)=>{const i=t;return s(),n(i,null,{default:p((()=>[d("div",x,[g(u,{ref:"progress",class:"progress-bar","stroke-width":670,"stroke-hidth":26,"text-position":"left","track-color":"#ffffff","text-color":"#000000","track-border-color":"#ED0017",color:"linear-gradient(to right, #FF8542, #FF7123,#ED0017)"},{other:p((()=>[d("div",{class:"other-content",style:l({width:o(670)})}," 进度文案居左 ",4)])),_:1},512),g(u,{ref:"progress",class:"progress-bar","stroke-width":670,"stroke-hidth":26,"text-position":"center","track-color":"#ffffff","text-color":"#000000","track-border-color":"#ED0017",color:"linear-gradient(to right, #FF8542, #FF7123,#ED0017)"},{other:p((()=>[d("div",{class:"other-content",style:l({width:o(670)})}," 进度文案居中 ",4)])),_:1},512),g(u,{ref:"progress",class:"progress-bar","stroke-width":670,"stroke-hidth":26,"text-position":"right","track-color":"#ffffff","text-color":"#000000","track-border-color":"#ED0017",color:"linear-gradient(to right, #FF8542, #FF7123,#ED0017)"},{other:p((()=>[d("div",{class:"other-content",style:l({width:o(670)})}," 进度文案居右 ",4)])),_:1},512)])])),_:1})}}}),[["__scopeId","data-v-8a4cee11"]]);export{k as default};
