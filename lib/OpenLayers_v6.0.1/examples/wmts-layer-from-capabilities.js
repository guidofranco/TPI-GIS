(window.webpackJsonp=window.webpackJsonp||[]).push([[169],{404:function(e,a,n){"use strict";n.r(a);var t=n(3),r=n(2),w=n(147),c=n(5),i=n(9),o=n(96),p=new w.a;fetch("data/WMTSCapabilities.xml").then(function(e){return e.text()}).then(function(e){var a=p.read(e),n=Object(o.b)(a,{layer:"layer-7328",matrixSet:"EPSG:3857"});new t.a({layers:[new c.a({source:new i.b,opacity:.7}),new c.a({opacity:1,source:new o.a(n)})],target:"map",view:new r.a({center:[19412406.33,-5050500.21],zoom:5})})})}},[[404,0]]]);
//# sourceMappingURL=wmts-layer-from-capabilities.js.map