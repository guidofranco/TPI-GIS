(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{418:function(t,e,i){"use strict";i.r(e);var r=i(3),o=i(2),n=i(5),a=i(9),c=i(113),s=i(16),p=i(30),l=i(56),u=i(49),h=i(54),w=function(t){function e(e,i,r){t.call(this,e,s.a.LOADED),this.tileSize_=i,this.text_=r,this.canvas_=null}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getImage=function(){if(this.canvas_)return this.canvas_;var t=this.tileSize_,e=Object(p.a)(t[0],t[1]);return e.strokeStyle="grey",e.strokeRect(.5,.5,t[0]+.5,t[1]+.5),e.fillStyle="grey",e.strokeStyle="white",e.textAlign="center",e.textBaseline="middle",e.font="24px sans-serif",e.lineWidth=4,e.strokeText(this.text_,t[0]/2,t[1]/2,t[0]),e.fillText(this.text_,t[0]/2,t[1]/2,t[0]),this.canvas_=e.canvas,e.canvas},e.prototype.load=function(){},e}(c.a),y=function(t){function e(e){var i=e||{};t.call(this,{opaque:!1,projection:i.projection,tileGrid:i.tileGrid,wrapX:void 0===i.wrapX||i.wrapX,zDirection:i.zDirection})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getTile=function(t,e,i){var r=Object(h.d)(t,e,i);if(this.tileCache.containsKey(r))return this.tileCache.get(r);var o,n=Object(l.d)(this.tileGrid.getTileSize(t)),a=[t,e,i],c=this.getTileCoordForTileUrlFunction(a);o=c?"z:"+c[0]+" x:"+c[1]+" y:"+c[2]:"none";var s=new w(a,n,o);return this.tileCache.set(r,s),s},e}(u.a);new r.a({layers:[new n.a({source:new a.b}),new n.a({source:new y})],target:"map",view:new o.a({center:[0,0],zoom:1})})}},[[418,0]]]);
//# sourceMappingURL=canvas-tiles.js.map