(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{280:function(e,a,t){"use strict";t.r(a);var n=t(24),r=t(3),o=t(106),w=t(2),c=t(55),d=t(26),i=t(5),b=t(22),s=t(4),u=t(9),m=t(10),p=t(11),f=t(48),l=t(19),v=t(63),g=new i.a({source:new u.b({wrapX:!1})}),j=new r.a({layers:[g],target:"map",view:new w.a({center:[0,0],zoom:1,multiWorld:!0})}),y=new m.a({wrapX:!1}),O=new b.a({source:y});j.addLayer(O);var h=3e3;y.on("addfeature",function(e){var a,t,n;a=e.feature,t=(new Date).getTime(),n=g.on("postrender",function(e){var r=Object(v.b)(e),w=e.frameState,d=a.getGeometry().clone(),i=w.time-t,b=i/h,s=25*Object(c.b)(b)+5,u=Object(c.b)(1-b),m=new p.c({image:new f.a({radius:s,stroke:new l.a({color:"rgba(255, 0, 0, "+u+")",width:.25+u})})});r.setStyle(m),r.drawGeometry(d),i>h?Object(o.b)(n):j.render()})}),window.setInterval(function(){var e=360*Math.random()-180,a=180*Math.random()-90,t=new d.a(Object(s.f)([e,a])),r=new n.a(t);y.addFeature(r)},1e3)}},[[280,0]]]);
//# sourceMappingURL=feature-animation.js.map