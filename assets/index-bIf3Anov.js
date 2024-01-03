var W=Object.defineProperty;var X=(e,t,n)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var b=(e,t,n)=>(X(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function _(){}function F(e){return e()}function I(){return Object.create(null)}function v(e){e.forEach(F)}function J(e){return typeof e=="function"}function K(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Y(e){return Object.keys(e).length===0}function a(e,t){e.appendChild(t)}function P(e,t,n){e.insertBefore(t,n||null)}function x(e){e.parentNode&&e.parentNode.removeChild(e)}function Z(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function h(e){return document.createElement(e)}function R(e){return document.createTextNode(e)}function O(){return R(" ")}function d(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function k(e){return Array.from(e.childNodes)}function ee(e,t){t=""+t,e.data!==t&&(e.data=t)}function te(e,t,n,s){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,s?"important":"")}let j;function $(e){j=e}const m=[],B=[];let g=[];const M=[],ne=Promise.resolve();let E=!1;function re(){E||(E=!0,ne.then(U))}function N(e){g.push(e)}const w=new Set;let p=0;function U(){if(p!==0)return;const e=j;do{try{for(;p<m.length;){const t=m[p];p++,$(t),se(t.$$)}}catch(t){throw m.length=0,p=0,t}for($(null),m.length=0,p=0;B.length;)B.pop()();for(let t=0;t<g.length;t+=1){const n=g[t];w.has(n)||(w.add(n),n())}g.length=0}while(m.length);for(;M.length;)M.pop()();E=!1,w.clear(),$(e)}function se(e){if(e.fragment!==null){e.update(),v(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(N)}}function ie(e){const t=[],n=[];g.forEach(s=>e.indexOf(s)===-1?t.push(s):n.push(s)),n.forEach(s=>s()),g=t}const y=new Set;let le;function V(e,t){e&&e.i&&(y.delete(e),e.i(t))}function oe(e,t,n,s){if(e&&e.o){if(y.has(e))return;y.add(e),le.c.push(()=>{y.delete(e),s&&(n&&e.d(1),s())}),e.o(t)}else s&&s()}function H(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function fe(e){e&&e.c()}function z(e,t,n){const{fragment:s,after_update:r}=e.$$;s&&s.m(t,n),N(()=>{const i=e.$$.on_mount.map(F).filter(J);e.$$.on_destroy?e.$$.on_destroy.push(...i):v(i),e.$$.on_mount=[]}),r.forEach(N)}function D(e,t){const n=e.$$;n.fragment!==null&&(ie(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ue(e,t){e.$$.dirty[0]===-1&&(m.push(e),re(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function G(e,t,n,s,r,i,f=null,l=[-1]){const o=j;$(e);const u=e.$$={fragment:null,ctx:[],props:i,update:_,not_equal:r,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(o?o.$$.context:[])),callbacks:I(),dirty:l,skip_bound:!1,root:t.target||o.$$.root};f&&f(u.root);let A=!1;if(u.ctx=n?n(e,t.props||{},(c,L,...S)=>{const C=S.length?S[0]:L;return u.ctx&&r(u.ctx[c],u.ctx[c]=C)&&(!u.skip_bound&&u.bound[c]&&u.bound[c](C),A&&ue(e,c)),L}):[],u.update(),A=!0,v(u.before_update),u.fragment=s?s(u.ctx):!1,t.target){if(t.hydrate){const c=k(t.target);u.fragment&&u.fragment.l(c),c.forEach(x)}else u.fragment&&u.fragment.c();t.intro&&V(e.$$.fragment),z(e,t.target,t.anchor),U()}$(o)}class Q{constructor(){b(this,"$$");b(this,"$$set")}$destroy(){D(this,1),this.$destroy=_}$on(t,n){if(!J(n))return _;const s=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return s.push(n),()=>{const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}$set(t){this.$$set&&!Y(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ce="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ce);function T(e,t,n){const s=e.slice();return s[1]=t[n],s}function q(e){let t,n,s=e[1]+"",r,i,f;return{c(){t=h("li"),n=h("a"),r=R(s),f=O(),d(n,"href",i="#"+e[1]),d(n,"class","svelte-j6l7ik"),d(t,"class","svelte-j6l7ik")},m(l,o){P(l,t,o),a(t,n),a(n,r),a(t,f)},p(l,o){o&1&&s!==(s=l[1]+"")&&ee(r,s),o&1&&i!==(i="#"+l[1])&&d(n,"href",i)},d(l){l&&x(t)}}}function ae(e){let t,n,s=H(e[0]),r=[];for(let i=0;i<s.length;i+=1)r[i]=q(T(e,s,i));return{c(){t=h("div"),n=h("ul");for(let i=0;i<r.length;i+=1)r[i].c();d(n,"class","svelte-j6l7ik"),d(t,"class","navbar svelte-j6l7ik")},m(i,f){P(i,t,f),a(t,n);for(let l=0;l<r.length;l+=1)r[l]&&r[l].m(n,null)},p(i,[f]){if(f&1){s=H(i[0]);let l;for(l=0;l<s.length;l+=1){const o=T(i,s,l);r[l]?r[l].p(o,f):(r[l]=q(o),r[l].c(),r[l].m(n,null))}for(;l<r.length;l+=1)r[l].d(1);r.length=s.length}},i:_,o:_,d(i){i&&x(t),Z(r,i)}}}function de(e,t,n){let{items:s=[]}=t;return e.$$set=r=>{"items"in r&&n(0,s=r.items)},[s]}class he extends Q{constructor(t){super(),G(this,t,de,ae,K,{items:0})}}function pe(e){let t,n,s,r,i,f,l;return n=new he({props:{items:["test1","test2","test3"]}}),{c(){t=h("main"),fe(n.$$.fragment),s=O(),r=h("div"),r.innerHTML='<div><p class="titleline1 svelte-5u3xp5">Hello, my name is</p> <h1 class="titleline2 svelte-5u3xp5">Jayden Pahukula</h1></div>',i=O(),f=h("div"),d(r,"class","header svelte-5u3xp5"),te(f,"height","10000px"),d(t,"class","svelte-5u3xp5")},m(o,u){P(o,t,u),z(n,t,null),a(t,s),a(t,r),a(t,i),a(t,f),l=!0},p:_,i(o){l||(V(n.$$.fragment,o),l=!0)},o(o){oe(n.$$.fragment,o),l=!1},d(o){o&&x(t),D(n)}}}class me extends Q{constructor(t){super(),G(this,t,null,pe,K,{})}}new me({target:document.getElementById("app")});
