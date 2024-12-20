var S,N,O=(e,n,t=new Set)=>(n={get value(){return S?.deps.push(t.add(S)),e},set value(r){if(r!==e){e=r;for(let l of t)N?N.add(l):l()}},peek(){return e}},n.toJSON=n.then=n.toString=n.valueOf=()=>n.value,n),L=(e,n,t,r)=>(t=l=>{n?.call?.(),l=S,S=t;try{n=e()}finally{S=l}},r=t.deps=[],t(),l=>{for(n?.call?.();l=r.pop();)l.delete(t)}),D=(e,n=O(),t,r)=>(t={get value(){return r||(r=L(()=>n.value=e())),n.value},peek:n.peek},t.toJSON=t.then=t.toString=t.valueOf=()=>t.value,t),K=e=>{let n=N;n||(N=new Set);try{e()}finally{if(!n){n=N,N=null;for(const t of n)t()}}},I=(e,n,t)=>(n=S,S=null,t=e(),S=n,t);function z(e){O=e.signal,L=e.effect,D=e.computed,K=e.batch||(n=>n()),I=e.untracked||K}var _=Symbol("signals"),W=Symbol("length");function x(e,n){if(!e||e[_])return e;if(Array.isArray(e))return Q(e);if(e.constructor!==Object||e[Symbol.toStringTag])return e;let t={...n?.[_]},r=O(Object.values(e).length);const l=new Proxy(t,{get:(s,i)=>i===W?r:i===_?t:t[i]?.valueOf(),set:(s,i,o,a)=>(a=t[i],M(t,i,o),a??++r.value,1),deleteProperty:(s,i)=>(t[i]&&(q(t,i),r.value--),1),ownKeys(){return r.value,Reflect.ownKeys(t)}});for(let s in e){const i=Object.getOwnPropertyDescriptor(e,s);i?.get?(t[s]=D(i.get.bind(l)))._set=i.set?.bind(l):(t[s]=void 0,M(t,s,e[s]))}return l}var G={push:1,pop:1,shift:1,unshift:1,splice:1};function Q(e){let n;if(e[_])return e;let t=O(e.length),r=Array(e.length).fill();const l=new Proxy(r,{get(s,i){if(typeof i=="symbol")return i===W?t:i===_?r:r[i];if(i==="length")return G[n]?t.peek():t.value;if(n=i,r[i])return r[i].valueOf();if(i<r.length)return(r[i]=O(x(e[i]))).value},set(s,i,o){if(i==="length"){for(let a=o,h=r.length;a<h;a++)delete l[a];return t.value=r.length=o,!0}return M(r,i,o),i>=t.peek()&&(t.value=r.length=Number(i)+1),!0},deleteProperty:(s,i)=>(r[i]&&q(r,i),1)});return l}function M(e,n,t){let r=e[n];if(n[0]==="_")e[n]=t;else if(!r)e[n]=r=t?.peek?t:O(x(t));else if(t!==r.peek())if(r._set)r._set(t);else if(Array.isArray(t)&&Array.isArray(r.peek())){const l=r.peek();l[W]?I(()=>{K(()=>{let s=0,i=t.length;for(;s<i;s++)l[s]=t[s];l.length=i})}):r.value=t}else r.value=x(t)}function q(e,n){const t=e[n],r=t[Symbol.dispose];r&&delete t[Symbol.dispose],delete e[n],r?.()}var $=Symbol.dispose||(Symbol.dispose=Symbol("dispose")),p={},y=new WeakMap;function k(e,n){if(!e?.childNodes)return;if(y.has(e))return Object.assign(y.get(e),n);const t=x(n||{}),r=[];return l(e),y.has(e)||y.set(e,t),e[$]=()=>{for(;r.length;)r.pop()();y.delete(e),e[$]=null},t;function l(s,i=s.parentNode){if(s.childNodes){for(let o=0;o<s.attributes?.length;){let a=s.attributes[o];if(a.name[0]===":"){s.removeAttribute(a.name);let h=a.name.slice(1).split(":");for(let g of h){let c=p[g]||p.default,u=(c.parse||T)(a.value),m=c(s,u,t,g);m&&r.push(L(m)),r.push(()=>s.setAttributeNode(a))}if(y.has(s))return s[$]&&r.push(s[$]);if(s.parentNode!==i)return}else o++}for(let o of[...s.childNodes])l(o,s.content?s.childNodes[0].parentNode:s)}}}var F={},T=(e,n,t)=>{if(t=F[e=e.trim()])return t;try{t=B(e)}catch(r){J(r,n,e)}return F[e]=t},J=(e,n,t="")=>{throw Object.assign(e,{message:`\u2234 ${e.message}

${n}${t?`="${t}"

`:""}`,expr:t})},B;k.use=e=>{e.signal&&z(e),e.compile&&(B=e.compile)};var j=e=>{if(!e.nodeType)return e;let n=e.content.cloneNode(!0),t=[...e.attributes],r=document.createTextNode(""),l=(n.append(r),[...n.childNodes]);return{childNodes:l,content:n,remove:()=>n.append(...l),replaceWith(s){s!==r&&(r.before(s),n.append(...l))},attributes:t,removeAttribute(s){t.splice(t.findIndex(i=>i.name===s),1)},setAttributeNode(){}}},H=Symbol("if");p.if=(e,n,t)=>{let r=e.nextElementSibling,l=document.createTextNode(""),s,i,o;return e.replaceWith(l),i=e.content?j(e):e,y.set(i,null),r?.hasAttribute(":else")&&(r.removeAttribute(":else"),r.hasAttribute(":if")||(r.remove(),o=r.content?j(r):r,y.set(o,null))),()=>{const a=n(t)?i:e[H]?null:o;r&&(r[H]=a===i),s!=a&&(s&&(s.remove(),s[Symbol.dispose]?.()),(s=a)&&(l.before(s.content||s),y.get(s)===null&&y.delete(s),k(s,t)))}},p.each=(e,[n,t,r],l)=>{const s=document.createTextNode("");e.replaceWith(s);let i,o,a=0;const h=D(()=>{o=null;let u=r(l);return typeof u=="number"&&(u=Array.from({length:u},(m,d)=>d+1)),u?.constructor===Object&&(o=Object.keys(u),u=Object.values(u)),u||[]}),g=()=>{I(()=>{var u,m;let d=0,b=h.value,w=b.length;if(i&&!i[W]){for(let v of i[_]||[])v[Symbol.dispose]();i=null,a=0}if(w<a)i.length=w;else{if(!i)i=b;else for(;d<a;d++)i[d]=b[d];for(;d<w;d++){i[d]=b[d];let v=d,C=x({[n]:i[_]?.[v]||i[v],[t]:o?o[v]:v},l),A=e.content?j(e):e.cloneNode(!0);s.before(A.content||A),k(A,C),((m=i[u=_]||(i[u]=[]))[d]||(m[d]={}))[Symbol.dispose]=()=>{A[Symbol.dispose]?.(),A.remove()}}}a=w})};let c=0;return()=>{h.value[W]?.value,c?c++:(g(),queueMicrotask(()=>(c&&g(),c=0)))}},p.each.parse=e=>{let[n,t]=e.split(/\s+in\s+/),[r,l="$"]=n.split(/\s*,\s*/);return[r,l,T(t)]},p.ref=(e,n,t)=>()=>n(t)?.call?.(null,e),p.with=(e,n,t)=>{let r;return()=>{let l=n(t);k(e,r?l:r=x(l,t))}},p.text=(e,n,t)=>(e.content&&e.replaceWith(e=j(e).childNodes[0]),()=>{let r=n(t);e.textContent=r??""}),p.class=(e,n,t)=>{let r=new Set;return()=>{let l=n(t),s=new Set;l&&(typeof l=="string"?l.split(" ").map(i=>s.add(i)):Array.isArray(l)?l.map(i=>i&&s.add(i)):Object.entries(l).map(([i,o])=>o&&s.add(i)));for(let i of r)s.has(i)?s.delete(i):e.classList.remove(i);for(let i of r=s)e.classList.add(i)}},p.style=(e,n,t)=>{let r=e.getAttribute("style");return()=>{let l=n(t);if(typeof l=="string")e.setAttribute("style",r+(r.endsWith(";")?"":"; ")+l);else{r&&e.setAttribute("style",r);for(let s in l)s[0]=="-"?e.style.setProperty(s,l[s]):e.style[s]=l[s]}}},p.default=(e,n,t,r)=>{if(!r.startsWith("on"))return()=>{let c=n(t);if(r)P(e,r,c);else for(let u in c)P(e,X(u),c[u])};const l=r.split("..").map(c=>{let u={evt:"",target:e,test:()=>!0};return u.evt=(c.startsWith("on")?c.slice(2):c).replace(/\.(\w+)?-?([-\w]+)?/g,(m,d,b="")=>(u.test=U[d]?.(u,...b.split("-"))||u.test,"")),u});if(l.length==1)return()=>g(n(t),l[0]);let s,i,o,a=0;const h=c=>{o=g(u=>(o(),i=c?.(u),(a=++a%l.length)?h(i):s&&h(s)),l[a])};return()=>(s=n(t),!o&&h(s),()=>s=null);function g(c,{evt:u,target:m,test:d,defer:b,stop:w,prevent:v,immediate:C,...A}){b&&(c=b(c));const R=E=>{try{d(E)&&(w&&(C?E.stopImmediatePropagation():E.stopPropagation()),v&&E.preventDefault(),c?.(E))}catch(Z){J(Z,`:on${u}`,c)}};return m.addEventListener(u,R,A),()=>m.removeEventListener(u,R,A)}};var U={prevent(e){e.prevent=!0},stop(e){e.stop=!0},immediate(e){e.immediate=!0},once(e){e.once=!0},passive(e){e.passive=!0},capture(e){e.capture=!0},window(e){e.target=window},document(e){e.target=document},parent(e){e.target=e.target.parentNode},throttle(e,n){e.defer=t=>V(t,n?Number(n)||0:108)},debounce(e,n){e.defer=t=>Y(t,n?Number(n)||0:108)},outside:e=>n=>{let t=e.target;return!(t.contains(n.target)||n.target.isConnected===!1||t.offsetWidth<1&&t.offsetHeight<1)},self:e=>n=>n.target===e.target,ctrl:(e,...n)=>t=>f.ctrl(t)&&n.every(r=>f[r]?f[r](t):t.key===r),shift:(e,...n)=>t=>f.shift(t)&&n.every(r=>f[r]?f[r](t):t.key===r),alt:(e,...n)=>t=>f.alt(t)&&n.every(r=>f[r]?f[r](t):t.key===r),meta:(e,...n)=>t=>f.meta(t)&&n.every(r=>f[r]?f[r](t):t.key===r),arrow:()=>f.arrow,enter:()=>f.enter,esc:()=>f.esc,tab:()=>f.tab,space:()=>f.space,delete:()=>f.delete,digit:()=>f.digit,letter:()=>f.letter,char:()=>f.char},f={ctrl:e=>e.ctrlKey||e.key==="Control"||e.key==="Ctrl",shift:e=>e.shiftKey||e.key==="Shift",alt:e=>e.altKey||e.key==="Alt",meta:e=>e.metaKey||e.key==="Meta"||e.key==="Command",arrow:e=>e.key.startsWith("Arrow"),enter:e=>e.key==="Enter",esc:e=>e.key.startsWith("Esc"),tab:e=>e.key==="Tab",space:e=>e.key==="\xA0"||e.key==="Space"||e.key===" ",delete:e=>e.key==="Delete"||e.key==="Backspace",digit:e=>/^\d$/.test(e.key),letter:e=>/^\p{L}$/gu.test(e.key),char:e=>/^\S$/.test(e.key)},P=(e,n,t)=>{t==null||t===!1?e.removeAttribute(n):e.setAttribute(n,t===!0?"":typeof t=="number"||typeof t=="string"?t:"")},V=(e,n)=>{let t,r,l=s=>{t=!0,setTimeout(()=>{if(t=!1,r)return r=!1,l(s),e(s)},n)};return s=>t?r=!0:(l(s),e(s))},Y=(e,n)=>{let t;return r=>{clearTimeout(t),t=setTimeout(()=>{t=null,e(r)},n)}},X=e=>e.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,(n,t)=>(t?"-":"")+n.toLowerCase());p.value=(e,[n,t],r)=>{const l=e.type==="text"||e.type===""?i=>e.setAttribute("value",e.value=i??""):e.tagName==="TEXTAREA"||e.type==="text"||e.type===""?(i,o,a)=>(o=e.selectionStart,a=e.selectionEnd,e.setAttribute("value",e.value=i??""),o&&e.setSelectionRange(o,a)):e.type==="checkbox"?i=>(e.checked=i,P(e,"checked",i)):e.type==="select-one"?i=>{for(let o of e.options)o.value==i?o.setAttribute("selected",""):o.removeAttribute("selected");e.value=i}:e.type==="select-multiple"?i=>{for(let o of e.options)o.removeAttribute("selected");for(let o of i)e.querySelector(`[value="${o}"]`).setAttribute("selected","")}:i=>e.value=i;e.type?.startsWith("select")&&k(e,r);const s=e.type==="checkbox"?i=>t(r,e.checked):e.type==="select-multiple"?i=>t(r,[...e.selectedOptions].map(o=>o.value)):i=>t(r,e.value);return e.oninput=e.onchange=s,()=>l(n(r))},p.value.parse=e=>{let n=[T(e)];try{const t=T(`${e}=__;`);n.push((r,l)=>{r.__=l;let s=t(r,l);return delete r.__,s})}catch{}return n},p.fx=(e,n,t)=>()=>n(t),p.aria=(e,n,t)=>{const r=l=>{for(let s in l)P(e,"aria-"+X(s),l[s]==null?null:l[s]+"")};return()=>r(n(t))},p.data=(e,n,t)=>()=>{let r=n(t);for(let l in r)e.dataset[l]=r[l]},k.use({compile:e=>k.constructor(`with (arguments[0]) { return ${e} };`)});var ee=k;export{ee as default};
