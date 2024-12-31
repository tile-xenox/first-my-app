/**
 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
 *
 * Copyright 2008-2021 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Two ECMAScript polyfill functions carry the following license:
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED,
 * INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing permissions and limitations under the License.
 */
!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(n="undefined"!=typeof globalThis?globalThis:n||self).jsSHA=r()}(this,(function(){"use strict";var n=function(r,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])})(r,t)};var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t="ARRAYBUFFER not supported by this environment",e="UINT8ARRAY not supported by this environment";function i(n,r,t,e){var i,o,w,u=r||[0],s=(t=t||0)>>>3,f=-1===e?3:0;for(i=0;i<n.length;i+=1)o=(w=i+s)>>>2,u.length<=o&&u.push(0),u[o]|=n[i]<<8*(f+e*(w%4));return{value:u,binLen:8*n.length+t}}function o(n,o,w){switch(o){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(n){case"HEX":return function(n,r,t){return function(n,r,t,e){var i,o,w,u;if(0!=n.length%2)throw new Error("String of HEX type must be in byte increments");var s=r||[0],f=(t=t||0)>>>3,h=-1===e?3:0;for(i=0;i<n.length;i+=2){if(o=parseInt(n.substr(i,2),16),isNaN(o))throw new Error("String of HEX type contains invalid characters");for(w=(u=(i>>>1)+f)>>>2;s.length<=w;)s.push(0);s[w]|=o<<8*(h+e*(u%4))}return{value:s,binLen:4*n.length+t}}(n,r,t,w)};case"TEXT":return function(n,r,t){return function(n,r,t,e,i){var o,w,u,s,f,h,a,c,v=0,E=t||[0],l=(e=e||0)>>>3;if("UTF8"===r)for(a=-1===i?3:0,u=0;u<n.length;u+=1)for(w=[],128>(o=n.charCodeAt(u))?w.push(o):2048>o?(w.push(192|o>>>6),w.push(128|63&o)):55296>o||57344<=o?w.push(224|o>>>12,128|o>>>6&63,128|63&o):(u+=1,o=65536+((1023&o)<<10|1023&n.charCodeAt(u)),w.push(240|o>>>18,128|o>>>12&63,128|o>>>6&63,128|63&o)),s=0;s<w.length;s+=1){for(f=(h=v+l)>>>2;E.length<=f;)E.push(0);E[f]|=w[s]<<8*(a+i*(h%4)),v+=1}else for(a=-1===i?2:0,c="UTF16LE"===r&&1!==i||"UTF16LE"!==r&&1===i,u=0;u<n.length;u+=1){for(o=n.charCodeAt(u),!0===c&&(o=(s=255&o)<<8|o>>>8),f=(h=v+l)>>>2;E.length<=f;)E.push(0);E[f]|=o<<8*(a+i*(h%4)),v+=2}return{value:E,binLen:8*v+e}}(n,o,r,t,w)};case"B64":return function(n,t,e){return function(n,t,e,i){var o,w,u,s,f,h,a=0,c=t||[0],v=(e=e||0)>>>3,E=-1===i?3:0,l=n.indexOf("=");if(-1===n.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(n=n.replace(/=/g,""),-1!==l&&l<n.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<n.length;o+=4){for(s=n.substr(o,4),u=0,w=0;w<s.length;w+=1)u|=r.indexOf(s.charAt(w))<<18-6*w;for(w=0;w<s.length-1;w+=1){for(f=(h=a+v)>>>2;c.length<=f;)c.push(0);c[f]|=(u>>>16-8*w&255)<<8*(E+i*(h%4)),a+=1}}return{value:c,binLen:8*a+e}}(n,t,e,w)};case"BYTES":return function(n,r,t){return function(n,r,t,e){var i,o,w,u,s=r||[0],f=(t=t||0)>>>3,h=-1===e?3:0;for(o=0;o<n.length;o+=1)i=n.charCodeAt(o),w=(u=o+f)>>>2,s.length<=w&&s.push(0),s[w]|=i<<8*(h+e*(u%4));return{value:s,binLen:8*n.length+t}}(n,r,t,w)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(n){throw new Error(t)}return function(n,r,t){return function(n,r,t,e){return i(new Uint8Array(n),r,t,e)}(n,r,t,w)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(n){throw new Error(e)}return function(n,r,t){return i(n,r,t,w)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function w(n,i,o,w){switch(n){case"HEX":return function(n){return function(n,r,t,e){var i,o,w="0123456789abcdef",u="",s=r/8,f=-1===t?3:0;for(i=0;i<s;i+=1)o=n[i>>>2]>>>8*(f+t*(i%4)),u+=w.charAt(o>>>4&15)+w.charAt(15&o);return e.outputUpper?u.toUpperCase():u}(n,i,o,w)};case"B64":return function(n){return function(n,t,e,i){var o,w,u,s,f,h="",a=t/8,c=-1===e?3:0;for(o=0;o<a;o+=3)for(s=o+1<a?n[o+1>>>2]:0,f=o+2<a?n[o+2>>>2]:0,u=(n[o>>>2]>>>8*(c+e*(o%4))&255)<<16|(s>>>8*(c+e*((o+1)%4))&255)<<8|f>>>8*(c+e*((o+2)%4))&255,w=0;w<4;w+=1)h+=8*o+6*w<=t?r.charAt(u>>>6*(3-w)&63):i.b64Pad;return h}(n,i,o,w)};case"BYTES":return function(n){return function(n,r,t){var e,i,o="",w=r/8,u=-1===t?3:0;for(e=0;e<w;e+=1)i=n[e>>>2]>>>8*(u+t*(e%4))&255,o+=String.fromCharCode(i);return o}(n,i,o)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(n){throw new Error(t)}return function(n){return function(n,r,t){var e,i=r/8,o=new ArrayBuffer(i),w=new Uint8Array(o),u=-1===t?3:0;for(e=0;e<i;e+=1)w[e]=n[e>>>2]>>>8*(u+t*(e%4))&255;return o}(n,i,o)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(n){throw new Error(e)}return function(n){return function(n,r,t){var e,i=r/8,o=-1===t?3:0,w=new Uint8Array(i);for(e=0;e<i;e+=1)w[e]=n[e>>>2]>>>8*(o+t*(e%4))&255;return w}(n,i,o)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}var u=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],s=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],f=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];function h(n){var r={outputUpper:!1,b64Pad:"=",outputLen:-1},t=n||{},e="Output length must be a multiple of 8";if(r.outputUpper=t.outputUpper||!1,t.b64Pad&&(r.b64Pad=t.b64Pad),t.outputLen){if(t.outputLen%8!=0)throw new Error(e);r.outputLen=t.outputLen}else if(t.shakeLen){if(t.shakeLen%8!=0)throw new Error(e);r.outputLen=t.shakeLen}if("boolean"!=typeof r.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof r.b64Pad)throw new Error("Invalid b64Pad formatting option");return r}var a=function(){function n(n,r,t){var e=t||{};if(this.t=r,this.i=e.encoding||"UTF8",this.numRounds=e.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.o=n,this.u=[],this.h=0,this.v=!1,this.l=0,this.A=!1,this.p=[],this.U=[]}return n.prototype.update=function(n){var r,t=0,e=this.T>>>5,i=this.R(n,this.u,this.h),o=i.binLen,w=i.value,u=o>>>5;for(r=0;r<u;r+=e)t+this.T<=o&&(this.m=this.F(w.slice(r,r+e),this.m),t+=this.T);this.l+=t,this.u=w.slice(t>>>5),this.h=o%this.T,this.v=!0},n.prototype.getHash=function(n,r){var t,e,i=this.g,o=h(r);if(this.B){if(-1===o.outputLen)throw new Error("Output length must be specified in options");i=o.outputLen}var u=w(n,i,this.H,o);if(this.A&&this.S)return u(this.S(o));for(e=this.Y(this.u.slice(),this.h,this.l,this.C(this.m),i),t=1;t<this.numRounds;t+=1)this.B&&i%32!=0&&(e[e.length-1]&=16777215>>>24-i%32),e=this.Y(e,i,0,this.I(this.o),i);return u(e)},n.prototype.setHMACKey=function(n,r,t){if(!this.L)throw new Error("Variant does not support HMAC");if(this.v)throw new Error("Cannot set MAC key after calling update");var e=o(r,(t||{}).encoding||"UTF8",this.H);this.N(e(n))},n.prototype.N=function(n){var r,t=this.T>>>3,e=t/4-1;if(1!==this.numRounds)throw new Error("Cannot set numRounds with MAC");if(this.A)throw new Error("MAC key already set");for(t<n.binLen/8&&(n.value=this.Y(n.value,n.binLen,0,this.I(this.o),this.g));n.value.length<=e;)n.value.push(0);for(r=0;r<=e;r+=1)this.p[r]=909522486^n.value[r],this.U[r]=1549556828^n.value[r];this.m=this.F(this.p,this.m),this.l=this.T,this.A=!0},n.prototype.getHMAC=function(n,r){var t=h(r);return w(n,this.g,this.H,t)(this.X())},n.prototype.X=function(){var n;if(!this.A)throw new Error("Cannot call getHMAC without first setting MAC key");var r=this.Y(this.u.slice(),this.h,this.l,this.C(this.m),this.g);return n=this.F(this.U,this.I(this.o)),n=this.Y(r,this.g,this.T,n,this.g)},n}(),c=function(n,r){this.M=n,this.O=r};function v(n,r){var t;return r<32?(t=32-r,new c(n.M>>>r|n.O<<t,n.O>>>r|n.M<<t)):(t=64-r,new c(n.O>>>r|n.M<<t,n.M>>>r|n.O<<t))}function E(n,r){return new c(n.M>>>r,n.O>>>r|n.M<<32-r)}function l(n,r,t){return new c(n.M&r.M^~n.M&t.M,n.O&r.O^~n.O&t.O)}function A(n,r,t){return new c(n.M&r.M^n.M&t.M^r.M&t.M,n.O&r.O^n.O&t.O^r.O&t.O)}function d(n){var r=v(n,28),t=v(n,34),e=v(n,39);return new c(r.M^t.M^e.M,r.O^t.O^e.O)}function p(n,r){var t,e;t=(65535&n.O)+(65535&r.O);var i=(65535&(e=(n.O>>>16)+(r.O>>>16)+(t>>>16)))<<16|65535&t;return t=(65535&n.M)+(65535&r.M)+(e>>>16),e=(n.M>>>16)+(r.M>>>16)+(t>>>16),new c((65535&e)<<16|65535&t,i)}function y(n,r,t,e){var i,o;i=(65535&n.O)+(65535&r.O)+(65535&t.O)+(65535&e.O);var w=(65535&(o=(n.O>>>16)+(r.O>>>16)+(t.O>>>16)+(e.O>>>16)+(i>>>16)))<<16|65535&i;return i=(65535&n.M)+(65535&r.M)+(65535&t.M)+(65535&e.M)+(o>>>16),o=(n.M>>>16)+(r.M>>>16)+(t.M>>>16)+(e.M>>>16)+(i>>>16),new c((65535&o)<<16|65535&i,w)}function U(n,r,t,e,i){var o,w;o=(65535&n.O)+(65535&r.O)+(65535&t.O)+(65535&e.O)+(65535&i.O);var u=(65535&(w=(n.O>>>16)+(r.O>>>16)+(t.O>>>16)+(e.O>>>16)+(i.O>>>16)+(o>>>16)))<<16|65535&o;return o=(65535&n.M)+(65535&r.M)+(65535&t.M)+(65535&e.M)+(65535&i.M)+(w>>>16),w=(n.M>>>16)+(r.M>>>16)+(t.M>>>16)+(e.M>>>16)+(i.M>>>16)+(o>>>16),new c((65535&w)<<16|65535&o,u)}function T(n){var r=v(n,1),t=v(n,8),e=E(n,7);return new c(r.M^t.M^e.M,r.O^t.O^e.O)}function b(n){var r=v(n,14),t=v(n,18),e=v(n,41);return new c(r.M^t.M^e.M,r.O^t.O^e.O)}var R=[new c(u[0],3609767458),new c(u[1],602891725),new c(u[2],3964484399),new c(u[3],2173295548),new c(u[4],4081628472),new c(u[5],3053834265),new c(u[6],2937671579),new c(u[7],3664609560),new c(u[8],2734883394),new c(u[9],1164996542),new c(u[10],1323610764),new c(u[11],3590304994),new c(u[12],4068182383),new c(u[13],991336113),new c(u[14],633803317),new c(u[15],3479774868),new c(u[16],2666613458),new c(u[17],944711139),new c(u[18],2341262773),new c(u[19],2007800933),new c(u[20],1495990901),new c(u[21],1856431235),new c(u[22],3175218132),new c(u[23],2198950837),new c(u[24],3999719339),new c(u[25],766784016),new c(u[26],2566594879),new c(u[27],3203337956),new c(u[28],1034457026),new c(u[29],2466948901),new c(u[30],3758326383),new c(u[31],168717936),new c(u[32],1188179964),new c(u[33],1546045734),new c(u[34],1522805485),new c(u[35],2643833823),new c(u[36],2343527390),new c(u[37],1014477480),new c(u[38],1206759142),new c(u[39],344077627),new c(u[40],1290863460),new c(u[41],3158454273),new c(u[42],3505952657),new c(u[43],106217008),new c(u[44],3606008344),new c(u[45],1432725776),new c(u[46],1467031594),new c(u[47],851169720),new c(u[48],3100823752),new c(u[49],1363258195),new c(u[50],3750685593),new c(u[51],3785050280),new c(u[52],3318307427),new c(u[53],3812723403),new c(u[54],2003034995),new c(u[55],3602036899),new c(u[56],1575990012),new c(u[57],1125592928),new c(u[58],2716904306),new c(u[59],442776044),new c(u[60],593698344),new c(u[61],3733110249),new c(u[62],2999351573),new c(u[63],3815920427),new c(3391569614,3928383900),new c(3515267271,566280711),new c(3940187606,3454069534),new c(4118630271,4000239992),new c(116418474,1914138554),new c(174292421,2731055270),new c(289380356,3203993006),new c(460393269,320620315),new c(685471733,587496836),new c(852142971,1086792851),new c(1017036298,365543100),new c(1126000580,2618297676),new c(1288033470,3409855158),new c(1501505948,4234509866),new c(1607167915,987167468),new c(1816402316,1246189591)];function m(n){return"SHA-384"===n?[new c(3418070365,s[0]),new c(1654270250,s[1]),new c(2438529370,s[2]),new c(355462360,s[3]),new c(1731405415,s[4]),new c(41048885895,s[5]),new c(3675008525,s[6]),new c(1203062813,s[7])]:[new c(f[0],4089235720),new c(f[1],2227873595),new c(f[2],4271175723),new c(f[3],1595750129),new c(f[4],2917565137),new c(f[5],725511199),new c(f[6],4215389547),new c(f[7],327033209)]}function F(n,r){var t,e,i,o,w,u,s,f,h,a,m,F,g,B,H,S,Y=[];for(t=r[0],e=r[1],i=r[2],o=r[3],w=r[4],u=r[5],s=r[6],f=r[7],m=0;m<80;m+=1)m<16?(F=2*m,Y[m]=new c(n[F],n[F+1])):Y[m]=y((g=Y[m-2],B=void 0,H=void 0,S=void 0,B=v(g,19),H=v(g,61),S=E(g,6),new c(B.M^H.M^S.M,B.O^H.O^S.O)),Y[m-7],T(Y[m-15]),Y[m-16]),h=U(f,b(w),l(w,u,s),R[m],Y[m]),a=p(d(t),A(t,e,i)),f=s,s=u,u=w,w=p(o,h),o=i,i=e,e=t,t=p(h,a);return r[0]=p(t,r[0]),r[1]=p(e,r[1]),r[2]=p(i,r[2]),r[3]=p(o,r[3]),r[4]=p(w,r[4]),r[5]=p(u,r[5]),r[6]=p(s,r[6]),r[7]=p(f,r[7]),r}return function(r){function t(n,t,e){var i=this;if("SHA-384"!==n&&"SHA-512"!==n)throw new Error("Chosen SHA variant is not supported");var w=e||{};return(i=r.call(this,n,t,e)||this).S=i.X,i.L=!0,i.H=-1,i.R=o(i.t,i.i,i.H),i.F=F,i.C=function(n){return n.slice()},i.I=m,i.Y=function(r,t,e,i){return function(n,r,t,e,i){for(var o,w=31+(r+129>>>10<<5),u=r+t;n.length<=w;)n.push(0);for(n[r>>>5]|=128<<24-r%32,n[w]=4294967295&u,n[w-1]=u/4294967296|0,o=0;o<n.length;o+=32)e=F(n.slice(o,o+32),e);return"SHA-384"===i?[(e=e)[0].M,e[0].O,e[1].M,e[1].O,e[2].M,e[2].O,e[3].M,e[3].O,e[4].M,e[4].O,e[5].M,e[5].O]:[e[0].M,e[0].O,e[1].M,e[1].O,e[2].M,e[2].O,e[3].M,e[3].O,e[4].M,e[4].O,e[5].M,e[5].O,e[6].M,e[6].O,e[7].M,e[7].O]}(r,t,e,i,n)},i.m=m(n),i.T=1024,i.g="SHA-384"===n?384:512,i.B=!1,w.hmacKey&&i.N(function(n,r,t,e){var i=n+" must include a value and format";if(!r){if(!e)throw new Error(i);return e}if(void 0===r.value||!r.format)throw new Error(i);return o(r.format,r.encoding||"UTF8",t)(r.value)}("hmacKey",w.hmacKey,i.H)),i}return function(r,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function e(){this.constructor=r}n(r,t),r.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}(t,r),t}(a)}));
