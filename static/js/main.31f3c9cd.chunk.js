(this["webpackJsonpspeling-be"]=this["webpackJsonpspeling-be"]||[]).push([[0],{36:function(e,t,n){},96:function(e,t,n){},98:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),o=n(23),r=n.n(o),i=(n(36),n(4)),a=n(3),l=n(24),d=n(25),u=n(27),h=n(26),p=n(13),j=n.n(p),v=n(2),b=n.n(v),f=(n(96),n(0)),g=["all","am"],m="abcdefghijklmnopqrstuvwxyz".split(""),O="speling-be",w="spelled",x="spoken",k={step:0,score:0,word:void 0,choices:[],ans:"",high:0,mode:w,spelled:[],spoken:[]},N=function(){window.confirm("Reset words and high score?")&&(window.localStorage.setItem(O,0),window.localStorage.setItem(w,"[]"),window.localStorage.setItem(x,"[]"),window.location.reload())},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=b()(g,e);if(0===t.length)return"";var n=Math.floor(Math.random()*t.length);return t[n]},y=function(e,t){return Object(f.jsxs)("div",{className:"score",children:[Object(f.jsxs)("div",{children:["Score: ",e]}),Object(f.jsxs)("div",{children:["High: ",t]})]})},I=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var c;return Object(l.a)(this,n),(c=t.call(this,e)).spell=function(){for(var e=c.state.word,t=j()(e.split(""));t.length<15;){var n=Math.floor(26*Math.random()),s=m[n];t.includes(s)||t.push(s)}c.update({step:2,choices:t})},c.print=function(e){var t=c.state,n=t.ans,s=t.word,o=t.score,r=t.high,i=t.mode,l=t.spelled,d=t.spoken,u=n.concat(e),h=u===s?3:2;if(3===h){r=(o+=1)>r?o:r,window.localStorage.setItem(O,r),i===w?(l=[].concat(Object(a.a)(l),[s]),window.localStorage.setItem(w,JSON.stringify(l))):(d=[].concat(Object(a.a)(d),[s]),window.localStorage.setItem(x,JSON.stringify(d)));setTimeout((function(){return c.update({score:o,high:r,spelled:l,spoken:d},(function(){return c.start()}))}),2e3)}c.update({ans:u,step:h})},c.remove=function(){var e=c.state.ans;c.update({ans:e.replace(/.$/,"")})},c.giveUp=function(){var e=c.state,t=e.high,n=e.spelled;c.update(Object(i.a)(Object(i.a)({},k),{},{score:0,high:t,spelled:n}))},c.start=function(){var e=c.state,t=e.spelled,n=e.spoken,s=S(t),o=S(n),r=s?1:o?2:4,i={step:r,mode:s?w:x,word:s||o,ans:"",countdown:3},a=s?function(){setTimeout((function(){return c.update({countdown:2})}),1e3),setTimeout((function(){return c.update({countdown:1})}),2e3),setTimeout((function(){return c.spell()}),3e3)}:function(){return c.spell()};c.update(i,r<4?a:void 0)},c.state=k,c.audioRef=s.a.createRef(),c}return Object(d.a)(n,[{key:"update",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.setState((function(t){return Object(i.a)(Object(i.a)({},t),e)}),t)}},{key:"componentDidMount",value:function(){var e,t,n,c=(null===(e=window.localStorage)||void 0===e?void 0:e.getItem(O))||0;null===c&&window.localStorage.setItem(O,0);var s=null===(t=window.localStorage)||void 0===t?void 0:t.getItem(w);try{s=JSON.parse(s).map((function(e){return e}))}catch(i){s=[]}var o=null===(n=window.localStorage)||void 0===n?void 0:n.getItem(x);try{o=JSON.parse(s).map((function(e){return e}))}catch(i){o=[]}var r=0===b()(g,j()([].concat(Object(a.a)(s),Object(a.a)(o)))).length?4:k.step;this.update({step:r,high:c,spelled:s,spoken:o})}},{key:"render",value:function(){var e,t=(e=this.state,{start:function(t){var n=e.score,c=e.high,s=e.spelled,o=e.spoken;return Object(f.jsxs)("div",{className:"app go",children:[y(n,c),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{children:"Get ready to spell!"}),Object(f.jsxs)("div",{className:"status",children:["There are ",g.length," words"]}),Object(f.jsxs)("div",{className:"status",children:[b()(g,s).length," left to read & spell"]}),Object(f.jsxs)("div",{className:"status",children:[b()(g,o).length," left to hear & spell"]}),Object(f.jsx)("button",{className:"reset",onClick:function(){return N()},children:"Reset"})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{className:"go",onClick:t,children:"Go"})})]})},read:function(){var t=e.score,n=e.high,c=e.word,s=e.countdown;return Object(f.jsxs)("div",{className:"app read",children:[y(t,n),Object(f.jsx)("div",{children:c}),Object(f.jsx)("div",{children:s})]})},spell:function(t,n,c,s){var o=e.word,r=e.mode,i=e.score,a=e.high,l=e.choices,d=e.ans;return Object(f.jsxs)("div",{className:"app spell",children:[Object(f.jsx)("audio",{ref:t,src:"".concat("/speling-be","/audio/").concat(o,".m4a"),autoPlay:r===x}),y(i,a),Object(f.jsxs)("div",{children:["\xa0",d,"\xa0"]}),Object(f.jsxs)("div",{children:[l.sort().map((function(e){return Object(f.jsx)("button",{onClick:function(){return n(e)},children:e},e)})),Object(f.jsx)("button",{className:"remove",onClick:c,children:" \u2190 "}),Object(f.jsx)("button",{onClick:function(){t.current.currentTime=0,t.current.play()},children:" \ud83e\udd14 "}),Object(f.jsx)("button",{className:"give-up",onClick:function(){window.confirm("Give up?")&&s()},children:" \ud83d\ude16 "})]})]})},yes:function(){var t=e.score,n=e.high,c=e.ans;return Object(f.jsxs)("div",{className:"app yes",children:[y(t,n),Object(f.jsx)("div",{children:c}),Object(f.jsx)("div",{children:"Yes!!!"})]})},done:function(){var t=e.score,n=e.high;return Object(f.jsxs)("div",{className:"app winner",children:[y(t,n),Object(f.jsx)("div",{children:"\ud83e\udd29"}),Object(f.jsx)("div",{children:"All done!"}),Object(f.jsx)("button",{className:"reset",onClick:function(){return N()},children:"Play again"})]})}}),n=t.start,c=t.read,s=t.spell,o=t.yes,r=t.done;switch(this.state.step){case 0:return n(this.start);case 1:return c();case 2:return s(this.audioRef,this.print,this.remove,this.giveUp);case 3:return o();case 4:return r()}}}]),n}(s.a.Component),C=I,T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),o(e),r(e)}))};r.a.createRoot(document.getElementById("root")).render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(C,{})})),T()}},[[98,1,2]]]);
//# sourceMappingURL=main.31f3c9cd.chunk.js.map