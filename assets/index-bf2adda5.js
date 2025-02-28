import{c as o,j as r,H as a,v as e,n as s,t as i,m as l,I as n,w as t}from"./index-1eed7fa5.js";import{v as c,r as d,g as u,h as v,w as g,y as f,k as h,n as p,x as m,C as y,a5 as w,A as S}from"./core-314477b5.js";const[b,z]=o("image");const x=t(c({name:b,props:{src:String,alt:String,fit:String,position:String,round:Boolean,block:Boolean,width:s,height:s,radius:s,lazyLoad:Boolean,iconSize:s,showError:i,errorIcon:l("photo-fail"),iconPrefix:String,showLoading:i,loadingIcon:l("photo"),crossorigin:String,referrerpolicy:String},emits:["load","error"],setup(o,{emit:s,slots:i}){const l=d(!1),t=d(!0),c=d(),{$Lazyload:b}=u().proxy,x=v((()=>{const e={width:r(o.width),height:r(o.height)};return a(o.radius)&&(e.overflow="hidden",e.borderRadius=r(o.radius)),e}));g((()=>o.src),(()=>{l.value=!1,t.value=!0}));const L=o=>{t.value&&(t.value=!1,s("load",o))},j=()=>{const o=new Event("load");Object.defineProperty(o,"target",{value:c.value,enumerable:!0}),L(o)},I=o=>{l.value=!0,t.value=!1,s("error",o)},P=(r,a,e)=>e?e():m(n,{name:r,size:o.iconSize,class:a,classPrefix:o.iconPrefix},null),$=()=>{if(l.value||!o.src)return;const r={alt:o.alt,class:z("img"),style:{objectFit:o.fit,objectPosition:o.position},crossorigin:o.crossorigin,referrerpolicy:o.referrerpolicy};return o.lazyLoad?y(m("img",S({ref:c},r),null),[[w("lazy"),o.src]]):m("img",S({ref:c,src:o.src,onLoad:L,onError:I},r),null)},k=({el:o})=>{const r=()=>{o===c.value&&t.value&&j()};c.value?r():p(r)},E=({el:o})=>{o!==c.value||l.value||I()};return b&&e&&(b.$on("loaded",k),b.$on("error",E),f((()=>{b.$off("loaded",k),b.$off("error",E)}))),h((()=>{p((()=>{var r;(null==(r=c.value)?void 0:r.complete)&&!o.lazyLoad&&j()}))})),()=>{var r;return m("div",{class:z({round:o.round,block:o.block}),style:x.value},[$(),t.value&&o.showLoading?m("div",{class:z("loading")},[P(o.loadingIcon,z("loading-icon"),i.loading)]):l.value&&o.showError?m("div",{class:z("error")},[P(o.errorIcon,z("error-icon"),i.error)]):void 0,null==(r=i.default)?void 0:r.call(i)])}}}));export{x as I};
