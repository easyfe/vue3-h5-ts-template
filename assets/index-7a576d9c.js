var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,r=(t,a,l)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l;import{_ as s}from"./index-f4301285.js";import{l as u}from"./index-e4eb91b9.js";import{v as i,r as c,k as d,N as v,O as p,$ as m,a1 as f,u as h,Q as y,P as b,x as g,V as x,W as O,X as _}from"./core-314477b5.js";import{_ as j,a as w}from"./index-1eed7fa5.js";const W=i({name:"BaseDrag"}),$=i((D=((e,t)=>{for(var a in t||(t={}))n.call(t,a)&&r(e,a,t[a]);if(l)for(var a of l(t))o.call(t,a)&&r(e,a,t[a]);return e})({},W),H={props:{x:{type:Number,default:80},y:{type:Number,default:85},autoAds:{type:Boolean,default:!1}},emits:["click"],setup(e,{emit:t}){const a=e;let l=c(!1);const n=c(null);let o=c(0),r=c();const s=t,i=e=>{e.preventDefault(),o.value=(new Date).getTime()},y=e=>{r.value=e,b()},b=u.throttle((()=>{r.value&&$(r.value)}),10),g=c(0),x=c(0);let O=c(0),_=c(0),j=c(0),w=c(0);d((()=>{const e=document.getElementById("app");if(O.value=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,_.value=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,!e)return g.value=O.value,void(x.value=_.value);g.value=e.clientWidth,x.value=e.clientHeight;const t=n.value;t&&(t.style.transform=`translate3d(${g.value*(a.x/100)}px,${x.value*(a.y/100)}px,0)`)}));const W=(e,t="move")=>{const o=n.value;if(!o)return;if("end"===t)return void(a.autoAds&&(l.value=!0,j.value<=(g.value-o.clientWidth)/2?o.style.transform=`translate3d(0,${w.value}px,0)`:o.style.transform=`translate3d(${g.value-o.clientWidth}px,${w.value}px,0)`));let r=e.touches[0].pageX,s=e.touches[0].pageY;O.value>800&&(r-=(O.value-g.value)/2,s-=(_.value-x.value)/2);const u=r-o.clientWidth/2,i=s-o.clientHeight/2;j.value=u,w.value=i,u<=0||u>=g.value-o.clientWidth||i<=0||i>=x.value-o.clientHeight||(o.style.transform=`translate3d(${u}px,${i}px,0)`)},$=e=>{l.value=!1,W(e)},D=e=>{W(e,"end"),(new Date).getTime()-o.value<200&&s("click")};return(e,t)=>(v(),p("div",{ref_key:"baseDrag",ref:n,class:f(["base-drag",[h(l)?"base-drag-animation":""]]),onTouchstart:i,onTouchmove:y,onTouchend:D,onTouchcancel:D},[m(e.$slots,"default",{},void 0,!0)],34))}},t(D,a(H))));var D,H;const P=j($,[["__scopeId","data-v-ee097167"]]),T=(e=>(x("data-v-c795b1f1"),e=e(),O(),e))((()=>_("div",{class:"drag"},"拖我",-1))),k=j(i({__name:"index",setup(e){const t=()=>{w("触发点击事件")};return(e,a)=>{const l=P,n=s;return v(),y(n,null,{default:b((()=>[g(l,{"auto-ads":!0,onClick:t},{default:b((()=>[T])),_:1})])),_:1})}}}),[["__scopeId","data-v-c795b1f1"]]);export{k as default};
