var se=Object.defineProperty;var ue=(e,t,n)=>t in e?se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var M=(e,t,n)=>(ue(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function w(){}function ie(e){return e()}function V(){return Object.create(null)}function C(e){e.forEach(ie)}function le(e){return typeof e=="function"}function T(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let L;function G(e,t){return e===t?!0:(L||(L=document.createElement("a")),L.href=t,e===L.href)}function oe(e){return Object.keys(e).length===0}function W(e){return e??""}function f(e,t){e.appendChild(t)}function H(e,t,n){e.insertBefore(t,n||null)}function E(e){e.parentNode&&e.parentNode.removeChild(e)}function ae(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function h(e){return document.createElement(e)}function $(e){return document.createTextNode(e)}function b(){return $(" ")}function d(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function fe(e){return Array.from(e.childNodes)}function N(e,t){t=""+t,e.data!==t&&(e.data=t)}function ce(e,t,n,l){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,l?"important":"")}let F;function q(e){F=e}const A=[],X=[];let O=[];const Y=[],de=Promise.resolve();let U=!1;function me(){U||(U=!0,de.then(re))}function D(e){O.push(e)}const I=new Set;let x=0;function re(){if(x!==0)return;const e=F;do{try{for(;x<A.length;){const t=A[x];x++,q(t),he(t.$$)}}catch(t){throw A.length=0,x=0,t}for(q(null),A.length=0,x=0;X.length;)X.pop()();for(let t=0;t<O.length;t+=1){const n=O[t];I.has(n)||(I.add(n),n())}O.length=0}while(A.length);for(;Y.length;)Y.pop()();U=!1,I.clear(),q(e)}function he(e){if(e.fragment!==null){e.update(),C(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(D)}}function ge(e){const t=[],n=[];O.forEach(l=>e.indexOf(l)===-1?t.push(l):n.push(l)),n.forEach(l=>l()),O=t}const S=new Set;let pe;function R(e,t){e&&e.i&&(S.delete(e),e.i(t))}function B(e,t,n,l){if(e&&e.o){if(S.has(e))return;S.add(e),pe.c.push(()=>{S.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}else l&&l()}function Z(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function J(e){e&&e.c()}function j(e,t,n){const{fragment:l,after_update:i}=e.$$;l&&l.m(t,n),D(()=>{const r=e.$$.on_mount.map(ie).filter(le);e.$$.on_destroy?e.$$.on_destroy.push(...r):C(r),e.$$.on_mount=[]}),i.forEach(D)}function z(e,t){const n=e.$$;n.fragment!==null&&(ge(n.after_update),C(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function _e(e,t){e.$$.dirty[0]===-1&&(A.push(e),me(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function K(e,t,n,l,i,r,o=null,s=[-1]){const c=F;q(e);const u=e.$$={fragment:null,ctx:[],props:r,update:w,not_equal:i,bound:V(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:V(),dirty:s,skip_bound:!1,root:t.target||c.$$.root};o&&o(u.root);let g=!1;if(u.ctx=n?n(e,t.props||{},(m,p,...a)=>{const v=a.length?a[0]:p;return u.ctx&&i(u.ctx[m],u.ctx[m]=v)&&(!u.skip_bound&&u.bound[m]&&u.bound[m](v),g&&_e(e,m)),p}):[],u.update(),g=!0,C(u.before_update),u.fragment=l?l(u.ctx):!1,t.target){if(t.hydrate){const m=fe(t.target);u.fragment&&u.fragment.l(m),m.forEach(E)}else u.fragment&&u.fragment.c();t.intro&&R(e.$$.fragment),j(e,t.target,t.anchor),re()}q(c)}class Q{constructor(){M(this,"$$");M(this,"$$set")}$destroy(){z(this,1),this.$destroy=w}$on(t,n){if(!le(n))return w;const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const i=l.indexOf(n);i!==-1&&l.splice(i,1)}}$set(t){this.$$set&&!oe(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ve="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ve);function k(e,t,n){const l=e.slice();return l[1]=t[n],l}function ee(e){let t,n,l=e[1]+"",i,r,o;return{c(){t=h("li"),n=h("a"),i=$(l),o=b(),d(n,"href",r="#"+e[1]),d(n,"class","svelte-1mf42xs"),d(t,"class","svelte-1mf42xs")},m(s,c){H(s,t,c),f(t,n),f(n,i),f(t,o)},p(s,c){c&1&&l!==(l=s[1]+"")&&N(i,l),c&1&&r!==(r="#"+s[1])&&d(n,"href",r)},d(s){s&&E(t)}}}function ye(e){let t,n,l=Z(e[0]),i=[];for(let r=0;r<l.length;r+=1)i[r]=ee(k(e,l,r));return{c(){t=h("div"),n=h("ul");for(let r=0;r<i.length;r+=1)i[r].c();d(n,"class","svelte-1mf42xs"),d(t,"class","navbar svelte-1mf42xs")},m(r,o){H(r,t,o),f(t,n);for(let s=0;s<i.length;s+=1)i[s]&&i[s].m(n,null)},p(r,[o]){if(o&1){l=Z(r[0]);let s;for(s=0;s<l.length;s+=1){const c=k(r,l,s);i[s]?i[s].p(c,o):(i[s]=ee(c),i[s].c(),i[s].m(n,null))}for(;s<i.length;s+=1)i[s].d(1);i.length=l.length}},i:w,o:w,d(r){r&&E(t),ae(i,r)}}}function be(e,t,n){let{items:l=[]}=t;return e.$$set=i=>{"items"in i&&n(0,l=i.items)},[l]}class we extends Q{constructor(t){super(),K(this,t,be,ye,T,{items:0})}}function xe(e){let t,n,l,i,r,o,s,c,u,g,m,p,a,v,P;return{c(){t=h("div"),n=h("h2"),l=$(e[0]),i=b(),r=h("div"),o=h("div"),s=h("h3"),c=$(e[4]),u=b(),g=h("p"),m=$(e[5]),p=b(),a=h("img"),d(n,"class","svelte-1ahwm7n"),d(s,"class","svelte-1ahwm7n"),d(g,"class","svelte-1ahwm7n"),G(a.src,v=e[2])||d(a,"src",v),d(a,"alt",e[3]),d(a,"class","svelte-1ahwm7n"),d(r,"class",P=W("contents "+(e[1]?"left":"right"))+" svelte-1ahwm7n"),d(t,"class","card svelte-1ahwm7n")},m(_,y){H(_,t,y),f(t,n),f(n,l),f(t,i),f(t,r),f(r,o),f(o,s),f(s,c),f(o,u),f(o,g),f(g,m),f(r,p),f(r,a)},p(_,[y]){y&1&&N(l,_[0]),y&16&&N(c,_[4]),y&32&&N(m,_[5]),y&4&&!G(a.src,v=_[2])&&d(a,"src",v),y&8&&d(a,"alt",_[3]),y&2&&P!==(P=W("contents "+(_[1]?"left":"right"))+" svelte-1ahwm7n")&&d(r,"class",P)},i:w,o:w,d(_){_&&E(t)}}}function Ae(e,t,n){let{title:l=""}=t,{leftOrRight:i=!1}=t,{image:r=""}=t,{imageAlt:o=""}=t,{header:s=""}=t,{text:c=""}=t;return e.$$set=u=>{"title"in u&&n(0,l=u.title),"leftOrRight"in u&&n(1,i=u.leftOrRight),"image"in u&&n(2,r=u.image),"imageAlt"in u&&n(3,o=u.imageAlt),"header"in u&&n(4,s=u.header),"text"in u&&n(5,c=u.text)},[l,i,r,o,s,c]}class te extends Q{constructor(t){super(),K(this,t,Ae,xe,T,{title:0,leftOrRight:1,image:2,imageAlt:3,header:4,text:5})}}const ne="/assets/headshot-O8S1tHQ0.jpg";function Oe(e){let t,n,l,i,r,o,s,c,u,g,m,p;return n=new we({props:{items:["About","test2","test3"]}}),s=new te({props:{title:"About Me",image:ne,imageAlt:"Headshot of Jayden Pahukula",text:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\r
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\r
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}}),u=new te({props:{image:ne,header:"About Me",leftOrRight:!0,imageAlt:"Headshot of Jayden Pahukula",text:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\r
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\r
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\r
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}}),{c(){t=h("main"),J(n.$$.fragment),l=b(),i=h("div"),i.innerHTML='<div><p class="titleline1 svelte-1f8e5z">Hello, my name is</p> <h1 class="titleline2 svelte-1f8e5z">Jayden Pahukula</h1></div>',r=b(),o=h("div"),J(s.$$.fragment),c=b(),J(u.$$.fragment),g=b(),m=h("div"),d(i,"class","header svelte-1f8e5z"),d(o,"class","section svelte-1f8e5z"),d(o,"id","About"),ce(m,"height","10000px"),d(t,"class","svelte-1f8e5z")},m(a,v){H(a,t,v),j(n,t,null),f(t,l),f(t,i),f(t,r),f(t,o),j(s,o,null),f(o,c),j(u,o,null),f(t,g),f(t,m),p=!0},p:w,i(a){p||(R(n.$$.fragment,a),R(s.$$.fragment,a),R(u.$$.fragment,a),p=!0)},o(a){B(n.$$.fragment,a),B(s.$$.fragment,a),B(u.$$.fragment,a),p=!1},d(a){a&&E(t),z(n),z(s),z(u)}}}class $e extends Q{constructor(t){super(),K(this,t,null,Oe,T,{})}}new $e({target:document.getElementById("app")});
