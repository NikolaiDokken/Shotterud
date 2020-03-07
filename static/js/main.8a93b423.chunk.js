(this.webpackJsonpshotterud=this.webpackJsonpshotterud||[]).push([[0],{77:function(e,t,a){e.exports=a(90)},87:function(e,t,a){},88:function(e,t,a){},90:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),l=a.n(i),o=a(53),s=a.n(o),c=a(62),m=a(23),u=a(121),p=a(129),d=a(131),f=a(123),g=a(127),E=a(67),v=a.n(E),h=a(49),y=a.n(h),b=a(48),x=a.n(b),S=a(54),N=a(128),O=a(119),w=a(135),j=a(130),k=a(139),I=a(132),M=a(140),C=a(134),J=a(138),T=a(68),B=a(136),A=a(124),L=Object(T.a)({palette:{primary:{main:"#ff3d42"},error:{main:"#ff3d42",color:"white"}}}),P=Object(O.a)((function(e){return Object(B.a)({root:{display:"flex",flexWrap:"wrap"},input:{color:"white"},margin:{margin:e.spacing(1)}})}));function q(e){var t=Object(n.useCallback)((function(){var t=document.querySelector("#inputName").value;""===t||t.length>20||(e.names.push({name:t,selected:!1}),e.setNames(e.names.filter((function(e){return!0}))),document.querySelector("#inputName").value="",window.sessionStorage.setItem("names",JSON.stringify(e.names)))}),[e]),a=e.css,i=P();return Object(n.useEffect)((function(){document.querySelector("#inputName").addEventListener("keypress",(function(e){"Enter"===e.key&&t()}),!0)}),[t]),r.a.createElement(u.a,{container:!0,direction:"column",spacing:4},r.a.createElement(u.a,{container:!0,item:!0,justify:"center"},r.a.createElement(f.a,{className:a.text,variant:"h4"},"Add Names")),r.a.createElement(u.a,{container:!0,item:!0,justify:"center"},r.a.createElement(A.a,{theme:L},r.a.createElement(C.a,{error:!0,input:{style:{color:"#fff"}},InputLabelProps:{style:{color:"white"}},labelProps:{cclassName:i.input},InputProps:{className:i.input},id:"inputName",label:"Add name"}),r.a.createElement(g.a,{className:a.text,color:"primary",variant:"outlined",onClick:t},"Add"))),r.a.createElement(u.a,{container:!0,item:!0,direction:!0,row:!0,justify:"center"},e.names.map((function(t){return r.a.createElement(J.a,{label:t.name.toUpperCase(),onDelete:function(){return function(t){e.setNames(e.names.filter((function(e){return e!==t}))),window.sessionStorage.setItem("names",JSON.stringify(e.names.filter((function(e){return e!==t}))))}(t)},color:"primary"})}))))}var z=Object(T.a)({palette:{primary:{main:"#ff3d42"},error:{main:"#ff3d42"}}}),D=r.a.forwardRef((function(e,t){return r.a.createElement(N.a,Object.assign({direction:"up",ref:t},e))})),R=Object(O.a)({background:{backgroundColor:"#303030"},text:{color:"white"}});function W(e){var t=R(),a=function(){e.setOpen(!e.open),window.location.reload()};return r.a.createElement(w.a,{PaperProps:{classes:{root:t.background}},fullScreen:!0,open:e.open,onClose:a,TransitionComponent:D},r.a.createElement(A.a,{theme:z},r.a.createElement(p.a,{style:{position:"relative"}},r.a.createElement(j.a,null,r.a.createElement(d.a,{edge:"start",color:"inherit",onClick:a,"aria-label":"close"},r.a.createElement(x.a,null)),r.a.createElement(f.a,{variant:"h6"},"Settings"))),r.a.createElement(u.a,{container:!0,direction:"column",style:{padding:"16px 10%",width:"inherit",marginLeft:"auto",marginRight:"auto"},spacing:4,xs:8},r.a.createElement(u.a,{item:!0,xs:!0},r.a.createElement(f.a,{className:t.text,style:{textAlign:"center"}}," ","Minimum/Maximum time (min) before spin"),r.a.createElement(k.a,{value:e.settings.minMaxSec,valueLabelDisplay:"auto",step:.5,marks:!0,min:.5,max:20,onChange:function(t,a){e.setSettings(Object(S.a)({},e.settings,{minMaxSec:a})),window.sessionStorage.setItem("minMaxSec",JSON.stringify(e.settings.minMaxSec))}})),r.a.createElement(u.a,{item:!0,xs:!0,style:{margin:"auto"}},r.a.createElement(f.a,{className:t.text},"Max amt. of spinners"),r.a.createElement(I.a,{error:!0,IconComponent:function(){return r.a.createElement(y.a,{style:{fill:"white"}})},color:"primary",style:{marginLeft:"40px"},value:e.settings.amtSpinners,onChange:function(t){e.setSettings(Object(S.a)({},e.settings,{amtSpinners:t.target.value})),window.sessionStorage.setItem("amtSpinners",JSON.stringify(t.target.value))},inputProps:{classes:{root:t.text}}},r.a.createElement(M.a,{value:1},"1"),r.a.createElement(M.a,{value:2},"2"),r.a.createElement(M.a,{value:3},"3"),r.a.createElement(M.a,{value:4},"4"))),r.a.createElement(u.a,{item:!0,xs:!0},r.a.createElement(q,{css:t,names:e.names,setNames:e.setNames})))))}var U=a(14),H=a.n(U);a(87);function V(e){var t=Object(n.useCallback)((function(){var t=e.names.map((function(e){return e.name})),n=[],r=H()("#loadout"+e.nr),i=30,l=1e4;H()("#roll"+e.nr).attr("disabled",!0);var o,s,c=0,m=0;H()(r).html(""),H()("#log"+e.nr).html(""),r.css("left","100%"),t.length<10?(i=20,l=5e3):(i=10,l=1e4);for(var u=0;u<i;u++){a(n=t);for(var p=0;p<t.length;p++)r.append('<td><div class="roller"><div>'+n[p]+"</div></div></td>"),c+=192}m=Math.round(c/2),o=m-300,s=m+300,m=Math.floor(Math.random()*(s-o+1)+o),H()("#loadout"+e.nr).animate({left:"-="+m},l,(function(){H()("#roll"+e.nr).attr("disabled",!1),H()("#loadout"+e.nr).children("td").each((function(){var t=window.innerWidth/2;if(H()(this).offset().left<t&&H()(this).offset().left+185>t){var a=H()(this).children().text();H()("#log"+e.nr).append('Sk\xe5l <span class="badge">'+a+"!</span>"),H()("#prev-names").append("<p style=color:#ff3d42;font-size:20px;font-family:arial;text-transform:uppercase;border-left:groove;border-color:#ff3d42;padding-right:15px;padding-left:15px;margin-top:0px;margin-bottom:0px;>"+a+"</p>");var n=JSON.parse(sessionStorage.getItem("prevNames")),r=null===n||void 0===n?[]:n;r.push(a),window.sessionStorage.setItem("prevNames",JSON.stringify(r));var i=document.getElementById("prev-names");i.scrollLeft=i.scrollWidth}}))}))}),[e]);function a(e){for(var t,a,n=e.length;n>0;)a=Math.random()*n--|0,t=e[n],e[n]=e[a],e[a]=t}return Object(n.useEffect)((function(){t()}),[t]),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row topbox"},r.a.createElement("div",{className:"col-md-6 col-md-offset-3 rollbox"},r.a.createElement("div",{className:"line"}),r.a.createElement("table",null,r.a.createElement("tr",{className:"loadout",id:"loadout"+e.nr})))),r.a.createElement("div",{className:"col-md-12",style:{textAlign:"center"}},r.a.createElement("div",{className:"log",id:"log"+e.nr})))}a(88);(0,a(89).disableBodyScroll)(document.querySelector("#root")),l.a.render(r.a.createElement((function(e){var t=JSON.parse(sessionStorage.getItem("names")),a=JSON.parse(sessionStorage.getItem("amtSpinners")),i=JSON.parse(sessionStorage.getItem("minMaxSec")),o=Object(n.useState)(null!==t?t:[]),E=Object(m.a)(o,2),h=E[0],b=E[1],S=Object(n.useState)({amtSpinners:null!==a?a:1,minMaxSec:null!==i?i:[10,15]}),N=Object(m.a)(S,2),O=N[0],w=N[1],j=Object(n.useState)(!1),k=Object(m.a)(j,2),I=k[0],M=k[1],C=Object(n.useCallback)((function(e){return new Promise((function(t){setTimeout((function(){e(),t()}),1e3*(Math.random()*(60*O.minMaxSec[1]-60*O.minMaxSec[0])+60*O.minMaxSec[0]))}))}),[O.minMaxSec]),J=Object(n.useCallback)((function(){var e=101*Math.random(),t=e>80&&O.amtSpinners>=2,a=e>92&&O.amtSpinners>=3,n=1;return e>96&&O.amtSpinners>=4?n=4:a?n=3:t&&(n=2),r.a.createElement(u.a,{container:!0,direction:"column",justify:"center",style:{height:"100%"},spacing:4},Array(n).fill().map((function(e,t){return r.a.createElement(u.a,{item:!0},r.a.createElement(V,{names:h,nr:t}))})))}),[h,O]),T=Object(n.useCallback)(Object(c.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,C((function(){h.length>1&&(l.a.render(J(),document.getElementById("spinners")),setTimeout((function(){l.a.render("",document.getElementById("spinners"))}),25e3))}));case 3:e.next=0;break;case 5:case"end":return e.stop()}}),e)}))),[h,C,J]);return Object(n.useEffect)((function(){T();var e=JSON.parse(sessionStorage.getItem("prevNames"));if(null!==e){e.map((function(e){return H()("#prev-names").append("<p style=color:#ff3d42;font-size:20px;font-family:arial;text-transform:uppercase;border-left:groove;border-color:#ff3d42;padding-right:15px;padding-left:15px;margin-top:0px;margin-bottom:0px;>"+e+"</p>"),null}));var t=document.getElementById("prev-names");t.scrollLeft=t.scrollWidth}}),[T]),r.a.createElement("div",null,r.a.createElement(p.a,{id:"AppBar"},r.a.createElement(u.a,{container:!0,direction:"column",justify:"center",style:{height:"100%"}},r.a.createElement(u.a,{item:!0,container:!0,direction:"row",justify:"flex-end"},r.a.createElement("div",{className:"hideScrollBar",id:"prev-names"}),r.a.createElement("div",{style:{position:"absolute",right:"0",top:"0"}},r.a.createElement(v.a,null),r.a.createElement(y.a,null)),r.a.createElement("div",{style:{position:"absolute",left:"0",top:"0"}},r.a.createElement(d.a,{size:"small",style:{padding:"0px"},onClick:function(){H()("#prev-names").empty(),window.sessionStorage.setItem("prevNames",JSON.stringify([]))}},r.a.createElement(x.a,null)))))),r.a.createElement(u.a,{container:!0,justify:"center"},h.length<2?r.a.createElement("h1",{className:"header-text",style:{marginTop:"40px"}},"Velkommen til ",r.a.createElement("br",null)," SHOTTERUD"):r.a.createElement("h1",{className:"header-text",style:{marginTop:"40px",marginBottom:0}},"SHOTTERUD")),r.a.createElement("div",{id:"spinners",style:{height:"100%",width:"100%",position:"absolute"}}),h.length<2?r.a.createElement(u.a,{container:!0,direction:"row",justify:"center",style:{marginTop:"100px"}},r.a.createElement(f.a,{className:"infoText",variant:"h5",style:{textTransform:"uppercase"}},"Add more than 1 player")):null,r.a.createElement(u.a,{container:!0,justify:"center",style:{position:"absolute",bottom:"6px",width:"100%"}},r.a.createElement(g.a,{onClick:function(){return M(!0)},style:{color:"#ff3d42",fontSize:"24px"}},"Settings")),r.a.createElement(W,{open:I,setOpen:M,names:h,setNames:b,settings:O,setSettings:w}))}),null),document.getElementById("root"))}},[[77,1,2]]]);
//# sourceMappingURL=main.8a93b423.chunk.js.map