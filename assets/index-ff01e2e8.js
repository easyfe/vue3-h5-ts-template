import{p as e,y as t,v as a,r as n,a as l,h as o,w as r,n as i,x as s,k as c,l as d,g as u,z as v,q as f,C as p,D as h,A as b}from"./core-314477b5.js";import{ar as g,G as m,ai as x,as as y,v as w,C as k,c as I,n as C,m as B,z as S,ah as T,at as $,e as R,al as z,D as A,a4 as j,E as L,S as H,T as W,w as O,L as Z,f as F,t as M,u as N,A as D,j as E,H as q,am as V,ae as X,au as G,q as J,an as K,g as P,d as Q,F as U,i as Y}from"./index-1eed7fa5.js";import{c as _,e as ee,r as te}from"./index-f4301285.js";import{T as ae}from"./use-tab-status-b5f61b12.js";import{a as ne,S as le}from"./index-279bac1b.js";import{u as oe}from"./use-refs-9a320d2d.js";
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const re=Array.isArray,ie=e=>"string"==typeof e,se=e=>null!==e&&"object"==typeof e,ce=/\B([A-Z])/g,de=(e=>{const t=Object.create(null);return a=>t[a]||(t[a]=e(a))})((e=>e.replace(ce,"-$1").toLowerCase()));function ue(e){if(re(e)){const t={};for(let a=0;a<e.length;a++){const n=e[a],l=ie(n)?he(n):ue(n);if(l)for(const e in l)t[e]=l[e]}return t}if(ie(e)||se(e))return e}const ve=/;(?![^(]*\))/g,fe=/:([^]+)/,pe=/\/\*[^]*?\*\//g;function he(e){const t={};return e.replace(pe,"").split(ve).forEach((e=>{if(e){const a=e.split(fe);a.length>1&&(t[a[0].trim()]=a[1].trim())}})),t}function be(e){let t="";if(ie(e))t=e;else if(re(e))for(let a=0;a<e.length;a++){const n=be(e[a]);n&&(t+=n+" ")}else if(se(e))for(const a in e)e[a]&&(t+=a+" ");return t.trim()}function ge(a,n){if(!w||!window.IntersectionObserver)return;const l=new IntersectionObserver((e=>{n(e[0].intersectionRatio>0)}),{root:document.body}),o=()=>{a.value&&l.unobserve(a.value)};e(o),t(o),k((()=>{a.value&&l.observe(a.value)}))}const[me,xe]=I("sticky");const ye=O(a({name:me,props:{zIndex:C,position:B("top"),container:Object,offsetTop:S(0),offsetBottom:S(0)},emits:["scroll","change"],setup(e,{emit:t,slots:a}){const c=n(),d=T(c),u=l({fixed:!1,width:0,height:0,transform:0}),v=n(!1),f=o((()=>$("top"===e.position?e.offsetTop:e.offsetBottom))),p=o((()=>{if(v.value)return;const{fixed:e,height:t,width:a}=u;return e?{width:`${a}px`,height:`${t}px`}:void 0})),h=o((()=>{if(!u.fixed||v.value)return;const t=R(z(e.zIndex),{width:`${u.width}px`,height:`${u.height}px`,[e.position]:`${f.value}px`});return u.transform&&(t.transform=`translate3d(0, ${u.transform}px, 0)`),t})),b=()=>{if(!c.value||j(c))return;const{container:a,position:n}=e,l=L(c),o=x(window);if(u.width=l.width,u.height=l.height,"top"===n)if(a){const e=L(a),t=e.bottom-f.value-u.height;u.fixed=f.value>l.top&&e.bottom>0,u.transform=t<0?t:0}else u.fixed=f.value>l.top;else{const{clientHeight:e}=document.documentElement;if(a){const t=L(a),n=e-t.top-f.value-u.height;u.fixed=e-f.value<l.bottom&&e>t.top,u.transform=n<0?-n:0}else u.fixed=e-f.value<l.bottom}(e=>{t("scroll",{scrollTop:e,isFixed:u.fixed})})(o)};return r((()=>u.fixed),(e=>t("change",e))),A("scroll",b,{target:d,passive:!0}),ge(c,b),r([H,W],(()=>{c.value&&!j(c)&&u.fixed&&(v.value=!0,i((()=>{const e=L(c);u.width=e.width,u.height=e.height,v.value=!1})))})),()=>{var e;return s("div",{ref:c,style:p.value},[s("div",{class:xe({fixed:u.fixed&&!v.value}),style:h.value},[null==(e=a.default)?void 0:e.call(a)])])}}})),[we,ke]=I("tabs");var Ie=a({name:we,props:{count:Z(Number),inited:Boolean,animated:Boolean,duration:Z(C),swipeable:Boolean,lazyRender:Boolean,currentIndex:Z(Number)},emits:["change"],setup(e,{emit:t,slots:a}){const l=n(),o=e=>t("change",e),i=()=>{var t;const n=null==(t=a.default)?void 0:t.call(a);return e.animated||e.swipeable?s(ne,{ref:l,loop:!1,class:ke("track"),duration:1e3*+e.duration,touchable:e.swipeable,lazyRender:e.lazyRender,showIndicators:!1,onChange:o},{default:()=>[n]}):n},d=t=>{const a=l.value;a&&a.state.active!==t&&a.swipeTo(t,{immediate:!e.inited})};return r((()=>e.currentIndex),d),c((()=>{d(e.currentIndex)})),F({swipeRef:l}),()=>s("div",{class:ke("content",{animated:e.animated||e.swipeable})},[i()])}});const[Ce,Be]=I("tabs"),Se={type:B("line"),color:String,border:Boolean,sticky:Boolean,shrink:Boolean,active:S(0),duration:S(.3),animated:Boolean,ellipsis:M,swipeable:Boolean,scrollspy:Boolean,offsetTop:S(0),background:String,lazyRender:M,showHeader:M,lineWidth:C,lineHeight:C,beforeChange:Function,swipeThreshold:S(5),titleActiveColor:String,titleInactiveColor:String},Te=Symbol(Ce);var $e=a({name:Ce,props:Se,emits:["change","scroll","rendered","clickTab","update:active"],setup(e,{emit:t,slots:a}){let c,u,v,f,p;const h=n(),b=n(),w=n(),I=n(),C=_(),B=T(h),[S,R]=oe(),{children:z,linkChildren:W}=N(Te),O=l({inited:!1,position:"",lineStyle:{},currentIndex:-1}),Z=o((()=>z.length>+e.swipeThreshold||!e.ellipsis||e.shrink)),M=o((()=>({borderColor:e.color,background:e.background}))),K=(e,t)=>{var a;return null!=(a=e.name)?a:t},P=o((()=>{const e=z[O.currentIndex];if(e)return K(e,O.currentIndex)})),Q=o((()=>$(e.offsetTop))),U=o((()=>e.sticky?Q.value+c:0)),Y=t=>{const a=b.value,n=S.value;if(!(Z.value&&a&&n&&n[O.currentIndex]))return;const l=n[O.currentIndex].$el,o=l.offsetLeft-(a.offsetWidth-l.offsetWidth)/2;f&&f(),f=function(e,t,a){let n,l=0;const o=e.scrollLeft,r=0===a?1:Math.round(1e3*a/16);let i=o;return function a(){i+=(t-o)/r,e.scrollLeft=i,++l<r&&(n=m(a))}(),function(){g(n)}}(a,o,t?0:+e.duration)},te=()=>{const t=O.inited;i((()=>{const a=S.value;if(!a||!a[O.currentIndex]||"line"!==e.type||j(h.value))return;const n=a[O.currentIndex].$el,{lineWidth:l,lineHeight:o}=e,r=n.offsetLeft+n.offsetWidth/2,i={width:E(l),backgroundColor:e.color,transform:`translateX(${r}px) translateX(-50%)`};if(t&&(i.transitionDuration=`${e.duration}s`),q(o)){const e=E(o);i.height=e,i.borderRadius=e}O.lineStyle=i}))},ae=(a,n)=>{const l=(e=>{const t=e<O.currentIndex?-1:1;for(;e>=0&&e<z.length;){if(!z[e].disabled)return e;e+=t}})(a);if(!q(l))return;const o=z[l],r=K(o,l),i=null!==O.currentIndex;O.currentIndex!==l&&(O.currentIndex=l,n||Y(),te()),r!==e.active&&(t("update:active",r),i&&t("change",r,o.title)),v&&!e.scrollspy&&X(Math.ceil(G(h.value)-Q.value))},ne=(e,t)=>{const a=z.find(((t,a)=>K(t,a)===e)),n=a?z.indexOf(a):0;ae(n,t)},le=(t=!1)=>{if(e.scrollspy){const a=z[O.currentIndex].$el;if(a&&B.value){const n=G(a,B.value)-U.value;u=!0,p&&p(),p=function(e,t,a,n){let l,o=x(e);const r=o<t,i=0===a?1:Math.round(1e3*a/16),s=(t-o)/i;return function a(){o+=s,(r&&o>t||!r&&o<t)&&(o=t),y(e,o),r&&o<t||!r&&o>t?l=m(a):n&&(l=m(n))}(),function(){g(l)}}(B.value,n,t?0:+e.duration,(()=>{u=!1}))}}},re=(a,n,l)=>{const{title:o,disabled:r}=z[n],i=K(z[n],n);r||(J(e.beforeChange,{args:[i],done:()=>{ae(n),le()}}),ee(a)),t("clickTab",{name:i,title:o,event:l,disabled:r})},ie=e=>{v=e.isFixed,t("scroll",e)},se=()=>{if("line"===e.type&&z.length)return s("div",{class:Be("line"),style:O.lineStyle},null)},ce=()=>{var t,n,l;const{type:o,border:r,sticky:i}=e,c=[s("div",{ref:i?void 0:w,class:[Be("wrap"),{[V]:"line"===o&&r}]},[s("div",{ref:b,role:"tablist",class:Be("nav",[o,{shrink:e.shrink,complete:Z.value}]),style:M.value,"aria-orientation":"horizontal"},[null==(t=a["nav-left"])?void 0:t.call(a),z.map((e=>e.renderTitle(re))),se(),null==(n=a["nav-right"])?void 0:n.call(a)])]),null==(l=a["nav-bottom"])?void 0:l.call(a)];return i?s("div",{ref:w},[c]):c},de=()=>{te(),i((()=>{var e,t;Y(!0),null==(t=null==(e=I.value)?void 0:e.swipeRef.value)||t.resize()}))};r((()=>[e.color,e.duration,e.lineWidth,e.lineHeight]),te),r(H,de),r((()=>e.active),(e=>{e!==P.value&&ne(e)})),r((()=>z.length),(()=>{O.inited&&(ne(e.active),te(),i((()=>{Y(!0)})))}));return F({resize:de,scrollTo:e=>{i((()=>{ne(e),le(!0)}))}}),d(te),D(te),k((()=>{ne(e.active,!0),i((()=>{O.inited=!0,w.value&&(c=L(w.value).height),Y(!0)}))})),ge(h,te),A("scroll",(()=>{if(e.scrollspy&&!u){const e=(()=>{for(let e=0;e<z.length;e++){const{top:t}=L(z[e].$el);if(t>U.value)return 0===e?0:e-1}return z.length-1})();ae(e)}}),{target:B,passive:!0}),W({id:C,props:e,setLine:te,scrollable:Z,onRendered:(e,a)=>t("rendered",e,a),currentName:P,setTitleRefs:R,scrollIntoView:Y}),()=>s("div",{ref:h,class:Be([e.type])},[e.showHeader?e.sticky?s(ye,{container:h.value,offsetTop:Q.value,onScroll:ie},{default:()=>[ce()]}):ce():null,s(Ie,{ref:I,count:z.length,inited:O.inited,animated:e.animated,duration:e.duration,swipeable:e.swipeable,lazyRender:e.lazyRender,currentIndex:O.currentIndex,onChange:ae},{default:()=>{var e;return[null==(e=a.default)?void 0:e.call(a)]}})])}});const[Re,ze]=I("tab"),Ae=a({name:Re,props:{id:String,dot:Boolean,type:String,color:String,title:String,badge:C,shrink:Boolean,isActive:Boolean,disabled:Boolean,controls:String,scrollable:Boolean,activeColor:String,inactiveColor:String,showZeroBadge:M},setup(e,{slots:t}){const a=o((()=>{const t={},{type:a,color:n,disabled:l,isActive:o,activeColor:r,inactiveColor:i}=e;n&&"card"===a&&(t.borderColor=n,l||(o?t.backgroundColor=n:t.color=n));const s=o?r:i;return s&&(t.color=s),t})),n=()=>{const a=s("span",{class:ze("text",{ellipsis:!e.scrollable})},[t.title?t.title():e.title]);return e.dot||q(e.badge)&&""!==e.badge?s(K,{dot:e.dot,content:e.badge,showZero:e.showZeroBadge},{default:()=>[a]}):a};return()=>s("div",{id:e.id,role:"tab",class:[ze([e.type,{grow:e.scrollable&&!e.shrink,shrink:e.shrink,active:e.isActive,disabled:e.disabled}])],style:a.value,tabindex:e.disabled?void 0:e.isActive?0:-1,"aria-selected":e.isActive,"aria-disabled":e.disabled||void 0,"aria-controls":e.controls,"data-allow-mismatch":"attribute"},[n()])}}),[je,Le]=I("tab");const He=O(a({name:je,props:R({},te,{dot:Boolean,name:C,badge:C,title:String,disabled:Boolean,titleClass:P,titleStyle:[String,Object],showZeroBadge:M}),setup(e,{slots:t}){const a=_(),l=n(!1),c=u(),{parent:d,index:g}=Q(Te);if(!d)return;const m=()=>{var t;return null!=(t=e.name)?t:g.value},x=o((()=>{const t=m()===d.currentName.value;return t&&!l.value&&(l.value=!0,d.props.lazyRender&&i((()=>{d.onRendered(m(),e.title)}))),t})),y=n(""),w=n("");v((()=>{const{titleClass:t,titleStyle:a}=e;y.value=t?be(t):"",w.value=a&&"string"!=typeof a?function(e){if(!e)return"";if(ie(e))return e;let t="";for(const a in e){const n=e[a];(ie(n)||"number"==typeof n)&&(t+=`${a.startsWith("--")?a:de(a)}:${n};`)}return t}(ue(a)):a}));const k=n(!x.value);return r(x,(e=>{e?k.value=!1:U((()=>{k.value=!0}))})),r((()=>e.title),(()=>{d.setLine(),d.scrollIntoView()})),f(ae,x),F({id:a,renderTitle:n=>s(Ae,b({key:a,id:`${d.id}-${g.value}`,ref:d.setTitleRefs(g.value),style:w.value,class:y.value,isActive:x.value,controls:a,scrollable:d.scrollable.value,activeColor:d.props.titleActiveColor,inactiveColor:d.props.titleInactiveColor,onClick:e=>n(c.proxy,g.value,e)},Y(d.props,["type","color","shrink"]),Y(e,["dot","badge","title","disabled","showZeroBadge"])),{title:t.title})}),()=>{var e;const n=`${d.id}-${g.value}`,{animated:o,swipeable:r,scrollspy:i,lazyRender:c}=d.props;if(!t.default&&!o)return;const u=i||x.value;if(o||r)return s(le,{id:a,role:"tabpanel",class:Le("panel-wrapper",{inactive:k.value}),tabindex:x.value?0:-1,"aria-hidden":!x.value,"aria-labelledby":n,"data-allow-mismatch":"attribute"},{default:()=>{var e;return[s("div",{class:Le("panel")},[null==(e=t.default)?void 0:e.call(t)])]}});const v=l.value||i||!c?null==(e=t.default)?void 0:e.call(t):null;return p(s("div",{id:a,role:"tabpanel",class:Le("panel"),tabindex:u?0:-1,"aria-labelledby":n,"data-allow-mismatch":"attribute"},[v]),[[h,u]])}}})),We=O($e);export{We as T,He as a};
