(this.webpackJsonpshotterud=this.webpackJsonpshotterud||[]).push([[0],{112:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(25),i=n.n(r),c=n(12),l=n(165),o=n(96),j=n(29),d=n(166),u=n(168),m=n(169),b=n(170),x=n(162),h=n(157),O=n(160),f=n(90),p=n.n(f),g=n(62),v=n.n(g),y=n(91),M=n.n(y),S=n(52),N=n(30),C=n(2);function k(e){var t=e.prevNames,n=e.setPrevNames,a=e.settings,s=e.setSettings,r=Object(N.a)();return Object(C.jsx)(d.a,{position:"static",children:Object(C.jsxs)(u.a,{children:[Object(C.jsx)(v.a,{sx:{mr:1}}),Object(C.jsx)(p.a,{sx:{mr:1}}),Object(C.jsx)(m.a,{id:"prev-names",sx:{display:"flex",flex:1,alignItems:"center",overflowX:"auto"},children:t.map((function(e,t){return 0!==t?Object(C.jsxs)(m.a,{sx:{display:"flex"},children:[Object(C.jsx)(m.a,{sx:{width:2,minHeight:"100%",bgcolor:"white",ml:1,mr:1}}),Object(C.jsx)(b.a,{children:e})]},t):Object(C.jsx)(b.a,{children:e},t)}))}),t.length>0&&Object(C.jsx)(x.a,{startIcon:Object(C.jsx)(M.a,{}),color:"inherit",onClick:function(){return n([])},children:"Clear"}),Object(C.jsx)(h.a,{name:"theme",value:a.theme,label:"Theme",onChange:function(e){return s(Object(j.a)(Object(j.a)({},a),{},{theme:e.target.value}))},size:"small",sx:{ml:2,color:r.palette.primary.contrastText,borderColor:r.palette.primary.contrastText},children:Object.keys(S).map((function(e,t){return Object(C.jsx)(O.a,{value:e,children:S[e].name},t)}))})]})})}var w=n(92),T=n(78),D=n.n(T),E=n(171),A=n(93),I=n.n(A),R=n(14),F=n(24),H=n.n(F);n(112);function J(e){var t=e.names,n=e.spinnerNr,s=(e.prevNames,e.setPrevNames),r=Object(a.useCallback)((function(){var e=t,a=[],r=H()("#loadout"+n),c=30,l=1e4;H()("#roll"+n).attr("disabled",!0);var o,j,d=0,u=0;H()(r).html(""),H()("#log"+n).html(""),r.css("left","100%"),e.length<10?(c=20,l=5e3):(c=10,l=1e4);for(var m=0;m<c;m++){i(a=e);for(var b=0;b<e.length;b++)r.append('<td><div class="roller"><div>'+a[b]+"</div></div></td>"),d+=192}u=Math.round(d/2),o=u-300,j=u+300,u=Math.floor(Math.random()*(j-o+1)+o),H()("#loadout"+n).animate({left:"-="+u},l,(function(){H()("#roll"+n).attr("disabled",!1),H()("#loadout"+n).children("td").each((function(){var e=window.innerWidth/2;if(H()(this).offset().left<e&&H()(this).offset().left+185>e){var t=H()(this).children().text();H()("#log"+n).append('Sk\xe5l <span class="badge">'+t+"!</span>"),s((function(e){return[t].concat(e)}))}}))}))}),[t,s,n]);function i(e){for(var t,n,a=e.length;a>0;)n=Math.random()*a--|0,t=e[a],e[a]=e[n],e[n]=t}return Object(a.useEffect)((function(){return r()}),[r]),Object(C.jsxs)("div",{className:"container",children:[Object(C.jsx)("div",{className:"row topbox",children:Object(C.jsxs)("div",{className:"col-md-6 col-md-offset-3 rollbox",children:[Object(C.jsx)("div",{className:"line"}),Object(C.jsx)("table",{children:Object(C.jsx)("tbody",{children:Object(C.jsx)("tr",{className:"loadout",id:"loadout"+n})})})]})}),Object(C.jsx)("div",{className:"col-md-12",style:{textAlign:"center"},children:Object(C.jsx)("div",{className:"log",id:"log"+n})})]})}function P(e){var t=e.names,n=e.settings,s=e.prevNames,r=e.setPrevNames,c=Object(R.f)(),l=Object(N.a)(),o=Object(a.useRef)(!1),j=function(){var e=new Date;return"["+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+"]"},d=Object(a.useCallback)((function(){if(o.current){console.log(j()+" Generating Spinners...");var e=101*Math.random(),a=e>80&&n.amtSpinners>=2,i=e>90&&n.amtSpinners>=3,c=1;return e>95&&n.amtSpinners>=4?c=4:i?c=3:a&&(c=2),Object(C.jsx)(m.a,{children:Array(c).fill().map((function(e,n){return Object(C.jsx)(J,{names:t,spinnerNr:n,prevNames:s,setPrevNames:r},n)}))})}}),[t,n.amtSpinners,r]),u=Object(a.useCallback)((function(){return console.log(j()+" Picking Random Time..."),new Promise((function(e,t){setTimeout((function(){e()}),1e3*(Math.random()*(60*n.minMaxMinutes[1]-60*n.minMaxMinutes[0])+60*n.minMaxMinutes[0]))}))}),[n.minMaxMinutes]),x=Object(a.useCallback)(Object(w.a)(D.a.mark((function e(){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(j()+" Starting Game...");case 1:if(!o.current){e.next=6;break}return e.next=4,u().then((function(){o.current&&t.length>1&&(i.a.render(d(),document.getElementById("spinners")),setTimeout((function(){i.a.render("",document.getElementById("spinners"))}),25e3))}));case 4:e.next=1;break;case 6:case"end":return e.stop()}}),e)}))),[t.length,u,d]);return Object(a.useEffect)((function(){return o.current=!0,t.length>1&&x(),function(){o.current=!1,console.log("Stopping Game...")}}),[x]),Object(C.jsxs)(m.a,{sx:{py:4,px:4},children:[Object(C.jsx)(m.a,{sx:{display:"flex",justifyContent:"center",color:l.palette.getContrastText(l.palette.background.default),textAlign:"center"},children:t.length>1?Object(C.jsx)(b.a,{variant:"h4",children:"christmas"===n.theme?"SHO-HO-HOTTERUD":"SHOTTERUD"}):Object(C.jsxs)(m.a,{children:[Object(C.jsx)(b.a,{variant:"h4",children:"SHOTTERUD"}),Object(C.jsx)(b.a,{variant:"h3",sx:{mt:10},children:"Add more players to begin"})]})}),Object(C.jsx)("div",{id:"spinners"}),Object(C.jsxs)(E.a,{color:"primary",variant:"extended","aria-label":"add",sx:{position:"absolute",bottom:16,right:16},onClick:function(){return c("/settings")},children:[Object(C.jsx)(I.a,{sx:{mr:1}}),"Settings"]})]})}var B=n(3),G=n(159),U=n(163),W=n(172),L=n(173),z=n(164),K=n(94),X=n.n(K),Y=n(95),_=n.n(Y);function q(e){var t=e.settings,n=e.setSettings,s=e.names,r=e.setNames,i=Object(R.f)(),l=Object(N.a)(),o=Object(a.useState)(""),d=Object(c.a)(o,2),u=d[0],f=d[1],p=function(){r((function(e){return e.concat(u)})),f("")};return Object(C.jsx)(m.a,{sx:{display:"flex",width:"100%",justifyContent:"center",color:l.palette.getContrastText(l.palette.background.default)},children:Object(C.jsxs)(m.a,{sx:{maxWidth:"100%",width:"600px",pY:2,px:4,textAlign:"center"},children:[Object(C.jsx)(b.a,{variant:"h3",sx:{mb:4},children:"Settings"}),Object(C.jsx)(b.a,{children:"Minimum and Maximum Waiting Time (Minutes)"}),Object(C.jsx)(G.a,{name:"minMaxMinutes",value:t.minMaxMinutes,onChange:function(e,a,s){Array.isArray(a)&&n(0===s?Object(j.a)(Object(j.a)({},t),{},{minMaxMinutes:[Math.min(a[0],t.minMaxMinutes[1]-1),t.minMaxMinutes[1]]}):Object(j.a)(Object(j.a)({},t),{},{minMaxMinutes:[t.minMaxMinutes[0],Math.max(a[1],t.minMaxMinutes[0]+1)]}))},valueLabelDisplay:"auto",sx:{mb:2}}),Object(C.jsxs)(m.a,{sx:{display:"flex",flexDirection:"row",alignItems:"center",mb:2},children:[Object(C.jsxs)(b.a,{sx:{flex:1,textAlign:"left"},children:["Maximum number of spinners:"," "]}),Object(C.jsxs)(h.a,{name:"amtSpinners",value:t.amtSpinners,label:"Spinners",onChange:function(e){n(Object(j.a)(Object(j.a)({},t),{},Object(B.a)({},e.target.name,e.target.value)))},variant:"standard",sx:{color:l.palette.getContrastText(l.palette.background.default)},children:[Object(C.jsx)(O.a,{value:1,children:"One"}),Object(C.jsx)(O.a,{value:2,children:"Two"}),Object(C.jsx)(O.a,{value:3,children:"Three"}),Object(C.jsx)(O.a,{value:4,children:"Four"})]})]}),Object(C.jsxs)(m.a,{sx:{display:"flex",flexDirection:"row",alignItems:"center",mb:2},children:[Object(C.jsx)(b.a,{sx:{flex:1,textAlign:"left"},children:"Add players:"}),Object(C.jsx)(U.a,{value:u,placeholder:"Name",onChange:function(e){return f(e.target.value)},onKeyDown:function(e){13===e.keyCode&&p()},endAdornment:Object(C.jsx)(W.a,{position:"end",children:Object(C.jsx)(L.a,{onClick:p,children:Object(C.jsx)(X.a,{})})}),sx:{color:l.palette.getContrastText(l.palette.background.default)}})]}),Object(C.jsx)(m.a,{sx:0===s.length?{display:"flex",border:"1px solid "+l.palette.action.disabled,borderRadius:1,color:l.palette.action.disabled,alignItems:"center",justifyContent:"center",textAlign:"center",minHeight:"100px",mb:2}:{border:"1px solid",borderRadius:1,p:1,textAlign:"left",minHeight:"100px",mb:2},children:s.length>0?s.map((function(e,t){return Object(C.jsx)(z.a,{label:e,sx:{mr:1},color:"primary",onDelete:function(){return t=e,void r(s.filter((function(e){return e!==t})));var t}},t)})):Object(C.jsx)(b.a,{variant:"h4",children:"No Players :("})}),Object(C.jsx)(x.a,{variant:"contained",color:"primary",startIcon:Object(C.jsx)(_.a,{}),onClick:function(){return r([])},children:"Delete All"}),Object(C.jsxs)(E.a,{color:"primary",variant:"extended","aria-label":"add",sx:{position:"absolute",bottom:16,right:16},onClick:function(){return i("/")},children:[Object(C.jsx)(v.a,{sx:{mr:1}}),"Save and go back to game"]})]})})}var Q=n(59),V=function(e,t){window.sessionStorage.setItem(e,t)},Z=function(e){return window.sessionStorage.getItem(e)},$=n(156),ee=n.p+"static/media/christmas_decor.28d6bdc3.png";var te=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],s=t[1],r=Object(a.useState)([]),i=Object(c.a)(r,2),j=i[0],d=i[1],u=Object(a.useState)({amtSpinners:1,minMaxMinutes:[15,30],theme:"default"}),m=Object(c.a)(u,2),b=m[0],x=m[1],h=Object(a.useState)(!1),O=Object(c.a)(h,2),f=O[0],p=O[1];return Object(a.useEffect)((function(){var e=JSON.parse(Z("names")),t=JSON.parse(Z("settings"));e&&s(e),JSON.stringify(t)!==JSON.stringify(b)&&null!==t&&x(t),p(!0)}),[]),Object(a.useEffect)((function(){n&&V("names",JSON.stringify(n))}),[n]),Object(a.useEffect)((function(){V("settings",JSON.stringify(b))}),[b]),f?Object(C.jsxs)(l.a,{theme:Object(o.a)(S[b.theme]),children:[Object(C.jsx)($.a,{}),Object(C.jsx)(k,{prevNames:j,setPrevNames:d,settings:b,setSettings:x}),"christmas"===b.theme?Object(C.jsx)("img",{src:ee,alt:"Christmas Decor",style:{width:"100%"}}):null,Object(C.jsx)(Q.a,{children:Object(C.jsxs)(R.c,{children:[Object(C.jsx)(R.a,{path:"/",element:Object(C.jsx)(P,{names:n,settings:b,prevNames:j,setPrevNames:d})}),Object(C.jsx)(R.a,{path:"/settings",element:Object(C.jsx)(q,{settings:b,setSettings:x,names:n,setNames:s})})]})})]}):Object(C.jsx)("div",{children:"Loading..."})};i.a.render(Object(C.jsx)(s.a.StrictMode,{children:Object(C.jsx)(te,{})}),document.getElementById("root"))},52:function(e){e.exports=JSON.parse('{"default":{"name":"Default","palette":{"primary":{"main":"#0052cc"},"secondary":{"main":"#edf2ff"}},"typography":{"fontFamily":["Roboto"]}},"christmas":{"name":"Christmas","palette":{"primary":{"main":"#1E792C"},"secondary":{"main":"#791E6B"},"background":{"default":"#CF3F45"}},"typography":{"fontFamily":["Roboto"]}},"reshjem":{"name":"Reshjemfestivalen","palette":{"primary":{"main":"#78E3FD"},"secondary":{"main":"#D1F5FF"},"background":{"default":"#7D53DE"}},"typography":{"fontFamily":["Roboto"]}}}')}},[[113,1,2]]]);
//# sourceMappingURL=main.36059db3.chunk.js.map