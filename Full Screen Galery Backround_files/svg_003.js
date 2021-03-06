"use strict";
SVG.Clock = function(a, c, d) {
 var b, d;
 c = c || {};
 for (b in c) d[b] = c[b];
 this.full = {
  hours: 0,
  minutes: 0,
  seconds: 0
 };
 this.time = {
  hours: 0,
  minutes: 0,
  seconds: 0
 };
 this.constructor.call(this, SVG.create("svg"));
 this.viewbox(0, 0, 100, 100);
 this.size(a, a);
 this.plate = this.ellipse(99.5, 99.5).move(.25, .25).fill("none").stroke({
  color: d.plate,
  opacity: 1,
  width: .3
 });
 this.plate += this.ellipse(97, 97).move(1.5, 1.5).fill("none").stroke({
  color: d.plate,
  opacity: 1,
  width: .15
 });
 // this.plate += this.ellipse(93, 93).move(3.5, 3.5).fill("none").stroke({
 //  color: d.plate,
 //  opacity: 1,
 //  width: .15
 // });
 this.plate += this.ellipse(3.5, 3.5).move(48.25, 48.25).fill(d.plate);
 // for (b = 11; 0 <= b; b--) this.rect(.5, 2.8).move(49.75, 1.7).fill(d.marks).rotate(30 * b, 50, 50);
 // for (b = 59; 0 <= b; b--) 0 != b % 5 && this.rect(.2, 2).move(49.9, 1.7).fill(d.marks).rotate(6 * b, 50, 50);
 this.hours = this.rect(.6, 35).move(49.7, 20).fill(d.hours);
 this.minutes = this.rect(.6, 46).move(49.7, 9).fill(d.minutes);
 this.seconds = this.group().move(50.65,
  43).add(this.rect(.2, 50).move(-.75, -37.5).fill(d.seconds));
 this.plate += this.ellipse(2, 2).move(49, 49).fill(d.plate);
 this.update(0)
};
SVG.Clock.prototype = new SVG.Container;
SVG.extend(SVG.Clock, {
 start: function() {
  var a = this;
  setInterval(function() {
   a.update()
  }, 1E3);
  return this
 },
 update: function(a) {
  var c = new Date;
  null == a && (a = 900);
  this.setHours(c.getHours(), c.getMinutes()).setMinutes(c.getMinutes(), a).setSeconds(c.getSeconds(), a);
  return this
 },
 setHours: function(a, c) {
  this.time.hours = a;
  this.hours.rotate((a + c / 60) % 12 * 30, 50, 50);
  return this
 },
 setMinutes: function(a, c) {
  if (a == this.time.minutes) return this;
  this.time.minutes = a;
  0 == a && this.full.minutes++;
  var b = 360 * this.full.minutes + 6 * a;
  c ? this.minutes.animate(c, SVG.easing.elastic).rotate(b, 50, 50) : this.minutes.rotate(b, 50, 50);
  return this
 },
 setSeconds: function(a, c) {
  this.time.seconds = a;
  0 == a && this.full.seconds++;
  var b = 360 * this.full.seconds + 6 * a;
  c ? this.seconds.animate(c, SVG.easing.elastic).rotate(b, 50, 50) : this.seconds.rotate(b, 50, 50);
  return this
 }
});
SVG.extend(SVG.Container, {
 clock: function(a, b, c) {
  return this.put(new SVG.Clock(a, b, c))
 }
});
