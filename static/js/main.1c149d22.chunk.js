(this["webpackJsonpspeling-be"]=this["webpackJsonpspeling-be"]||[]).push([[0],{36:function(e,t,n){},97:function(e,t,n){},98:function(e,t,n){"use strict";n.r(t);var c=n(2),s=n.n(c),i=n(27),a=n.n(i),r=(n(36),n(3)),o=n(4),l=n(6),u=n(5),d=n(1),h=n(8),j=n(17),v=n.n(j),p=n(7),b=n.n(p),m="\nall,am,because,been,before,came,can,down,fast,food,friend,gave,go,good,has,\ninto,like,look,make,put,the,time,to,you".split(",").map((function(e){return e.trim()})),f=n(0),O="abcdefghijklmnopqrstuvwxyz".split(""),g="speling-be",x="spelled",w="spoken",k={step:0,score:0,word:void 0,choices:[],ans:"",high:0,mode:x,spelled:[],spoken:[]},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=b()(m,e);if(0===t.length)return"";var n=Math.floor(Math.random()*t.length);return t[n]},y=function(e,t){return Object(f.jsxs)("div",{className:"score",children:[Object(f.jsxs)("div",{children:["Score: ",e]}),Object(f.jsxs)("div",{children:["High: ",t]})]})},I=function(e){return Object(f.jsx)("button",{className:"play",onClick:function(){e.current.currentTime=0,e.current.play()},children:" \ud83d\udd0a "})},S=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var c;return Object(r.a)(this,n),(c=t.call(this,e)).spell=function(){for(var e=c.state.word,t=v()(e.split(""));t.length<15;){var n=Math.floor(26*Math.random()),s=O[n];t.includes(s)||t.push(s)}c.update({step:2,choices:t})},c.print=function(e){var t=c.state,n=t.ans,s=t.word,i=t.score,a=t.high,r=t.mode,o=t.spelled,l=t.spoken,u=n.concat(e),d=u===s?3:2;if(3===d){a=(i+=1)>a?i:a,window.localStorage.setItem(g,a),r===x?(o=[].concat(Object(h.a)(o),[s]),window.localStorage.setItem(x,JSON.stringify(o))):(l=[].concat(Object(h.a)(l),[s]),window.localStorage.setItem(w,JSON.stringify(l)));setTimeout((function(){return c.update({score:i,high:a,spelled:o,spoken:l},(function(){return c.start()}))}),2e3)}c.update({ans:u,step:d})},c.remove=function(){var e=c.state.ans;c.update({ans:e.replace(/.$/,"")})},c.giveUp=function(){var e=c.state,t=e.high,n=e.spelled;c.update(Object(d.a)(Object(d.a)({},k),{},{score:0,high:t,spelled:n}))},c.start=function(){var e=c.state,t=e.spelled,n=e.spoken,s=N(t),i=N(n),a=s?1:i?2:4,r={step:a,mode:s?x:w,word:s||i,ans:"",countdown:3},o=s?function(){setTimeout((function(){return c.update({countdown:2})}),1e3),setTimeout((function(){return c.update({countdown:1})}),2e3),setTimeout((function(){return c.spell()}),3e3)}:function(){return c.spell()};c.update(r,a<4?o:void 0)},c.reset=function(){window.confirm("Reset words and high score?")&&(window.localStorage.setItem(g,0),window.localStorage.setItem(x,"[]"),window.localStorage.setItem(w,"[]"),c.update({high:0,spelled:[],spoken:[]}))},c.state=k,c.audioRef=s.a.createRef(),c}return Object(o.a)(n,[{key:"update",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.setState((function(t){return Object(d.a)(Object(d.a)({},t),e)}),t)}},{key:"componentDidMount",value:function(){var e,t,n,c=(null===(e=window.localStorage)||void 0===e?void 0:e.getItem(g))||0;null===c&&window.localStorage.setItem(g,0);var s=null===(t=window.localStorage)||void 0===t?void 0:t.getItem(x);try{s=JSON.parse(s).map((function(e){return e}))}catch(r){s=[]}var i=null===(n=window.localStorage)||void 0===n?void 0:n.getItem(w);try{i=JSON.parse(s).map((function(e){return e}))}catch(r){i=[]}var a=0===b()(m,v()([].concat(Object(h.a)(s),Object(h.a)(i)))).length?4:k.step;this.update({step:a,high:c,spelled:s,spoken:i})}},{key:"render",value:function(){var e,t,n=(e=this.state,t=this.props,{start:function(n,c){var s=e.score,i=e.high,a=e.spelled,r=e.spoken;return Object(f.jsxs)("div",{className:"app go",children:[y(s,i),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{children:"Get ready to spell!"}),Object(f.jsxs)("div",{className:"status",children:["There are ",m.length," words"]}),Object(f.jsxs)("div",{className:"status",children:[b()(m,a).length," left to read & spell"]}),Object(f.jsxs)("div",{className:"status",children:[b()(m,r).length," left to hear & spell"]}),Object(f.jsx)("button",{className:"reset",onClick:c,children:"Reset"}),Object(f.jsx)("button",{className:"quit",onClick:t.quit,children:"Quit"})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{className:"go",onClick:n,children:"Go"})})]})},read:function(){var t=e.score,n=e.high,c=e.word,s=e.countdown;return Object(f.jsxs)("div",{className:"app read",children:[y(t,n),Object(f.jsx)("div",{children:c}),Object(f.jsx)("div",{children:s})]})},spell:function(t,n,c,s){var i=e.word,a=e.mode,r=e.score,o=e.high,l=e.choices,u=e.ans;return Object(f.jsxs)("div",{className:"app spell",children:[Object(f.jsx)("audio",{ref:t,src:"".concat("/speling-be","/audio/").concat(i,".m4a"),autoPlay:a===w}),y(r,o),Object(f.jsxs)("div",{children:["\xa0",u||I(t),"\xa0"]}),Object(f.jsxs)("div",{className:"keyboard",children:[l.sort().map((function(e){return Object(f.jsx)("button",{onClick:function(){return n(e)},children:e},e)})),Object(f.jsx)("button",{className:"remove",onClick:c,children:" \u2190 "}),I(t),Object(f.jsx)("button",{className:"give-up",onClick:function(){window.confirm("Give up?")&&s()},children:" \ud83d\ude16 "})]})]})},yes:function(){var t=e.score,n=e.high,c=e.ans;return Object(f.jsxs)("div",{className:"app yes",children:[y(t,n),Object(f.jsx)("div",{children:c}),Object(f.jsx)("div",{children:"Yes!!!"})]})},done:function(t){var n=e.score,c=e.high;return Object(f.jsxs)("div",{className:"app winner",children:[y(n,c),Object(f.jsx)("div",{children:"\ud83e\udd29"}),Object(f.jsx)("div",{children:"All done!"}),Object(f.jsx)("button",{className:"reset",onClick:t,children:"Play again"})]})}}),c=n.start,s=n.read,i=n.spell,a=n.yes,r=n.done;switch(this.state.step){case 0:return c(this.start,this.reset);case 1:return s();case 2:return i(this.audioRef,this.print,this.remove,this.giveUp);case 3:return a();case 4:return r(this.reset)}}}]),n}(s.a.Component),C=S,G="math-be",q={step:0,score:0,equation:"",solution:"",countdown:10,tick:10,intervalId:null,ans:"",high:0},M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:9;return Math.floor(Math.random()*(e+1))},T=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"score",children:[Object(f.jsxs)("div",{children:["Score: ",e]}),Object(f.jsxs)("div",{children:["High: ",t]})]}),n>0&&Object(f.jsx)("div",{className:"progress",style:{width:"".concat(100*c/n,"%")},children:"\xa0"})]})},R=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var c;return Object(r.a)(this,n),(c=t.call(this,e)).print=function(e){var t=c.state,n=t.ans,s=t.solution,i=t.intervalId,a=t.score,r=t.high,o=n.concat(e),l=o===s?2:1;if(2===l){clearInterval(i),r=(a+=1)>r?a:r,window.localStorage.setItem(G,r);setTimeout((function(){return c.update({score:a,high:r,ans:""},(function(){return c.start()}))}),2e3)}c.update({ans:o,step:l})},c.remove=function(){var e=c.state.ans;c.update({ans:e.replace(/.$/,"")})},c.giveUp=function(){var e=c.state,t=e.high,n=e.intervalId;c.update(Object(d.a)(Object(d.a)({},q),{},{score:0,high:t,intervalId:n}))},c.start=function(){var e=M(),t=M();clearInterval(c.state.intervalId);var n=setInterval((function(){return c.setState((function(e){return Object(d.a)(Object(d.a)({},e),{},{tick:e.tick-1})}))}),1e3-20*c.state.score),s={step:1,equation:"".concat(e," + ").concat(t," ="),solution:"".concat(e+t),countdown:10,tick:10,intervalId:n};c.update(s)},c.reset=function(){window.confirm("Reset words and high score?")&&(window.localStorage.setItem(G,0),c.update({high:0}))},c.state=q,c}return Object(o.a)(n,[{key:"update",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.setState((function(t){return Object(d.a)(Object(d.a)({},t),e)}),t)}},{key:"componentDidMount",value:function(){var e,t=(null===(e=window.localStorage)||void 0===e?void 0:e.getItem(G))||0;null===t&&window.localStorage.setItem(G,0),this.update({high:t})}},{key:"componentDidUpdate",value:function(){0===this.state.tick&&(clearInterval(this.state.intervalId),this.giveUp())}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.intervalId)}},{key:"render",value:function(){var e=function(e,t){var n=e.score,c=e.high,s=e.equation,i=e.ans,a=e.countdown,r=e.tick;return{start:function(e,s){return Object(f.jsxs)("div",{className:"app go",children:[T(n,c),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{children:"Let's do math!"}),Object(f.jsx)("div",{children:"\xa0"}),Object(f.jsx)("button",{className:"reset",onClick:s,children:"Reset"}),Object(f.jsx)("button",{className:"quit",onClick:t.quit,children:"Quit"})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{className:"go",onClick:e,children:"Go"})})]})},compute:function(e,t,o){return Object(f.jsxs)("div",{className:"app spell",children:[T(n,c,a,r),Object(f.jsx)("div",{children:s}),Object(f.jsxs)("div",{children:["\xa0",i,"\xa0"]}),Object(f.jsxs)("div",{className:"keyboard",children:[[1,2,3,4,5,6,7,8,9,0].map((function(t){return Object(f.jsx)("button",{onClick:function(){return e(t)},children:t},t)})),Object(f.jsx)("button",{className:"remove",onClick:t,children:" \u2190 "}),Object(f.jsx)("button",{className:"give-up",onClick:function(){window.confirm("Give up?")&&o()},children:" \ud83d\ude16 "})]})]})},yes:function(){return Object(f.jsxs)("div",{className:"app yes",children:[T(n,c,1,1),Object(f.jsx)("div",{children:s}),Object(f.jsx)("div",{children:i}),Object(f.jsx)("div",{children:"Yes!!!"})]})},done:function(e){return Object(f.jsxs)("div",{className:"app winner",children:[T(n,c),Object(f.jsx)("div",{children:"\ud83e\udd29"}),Object(f.jsx)("div",{children:"Game over!"}),Object(f.jsx)("button",{className:"reset",onClick:e,children:"Play again"})]})}}}(this.state,this.props),t=e.start,n=e.compute,c=e.yes,s=e.done;switch(this.state.step){case 0:return t(this.start,this.reset);case 1:return n(this.print,this.remove,this.giveUp);case 2:return c();case 3:return s(this.reset)}}}]),n}(s.a.Component),U=R,J=(n(97),"spelling"),P=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var c;return Object(r.a)(this,n),(c=t.call(this,e)).setGame=function(e){c.setState({game:e})},c.state={game:null},c}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return null===this.state.game?Object(f.jsxs)("div",{className:"app games",children:[Object(f.jsxs)("button",{onClick:function(){return e.setGame(J)},children:["I",Object(f.jsx)("br",{}),"\ud83d\udc9b",Object(f.jsx)("br",{}),"Spelling"]}),Object(f.jsxs)("button",{onClick:function(){return e.setGame("math")},children:["I",Object(f.jsx)("br",{}),"\ud83d\udc9b",Object(f.jsx)("br",{}),"Math"]})]}):this.state.game===J?Object(f.jsx)(C,{quit:function(){return e.setGame(null)}}):Object(f.jsx)(U,{quit:function(){return e.setGame(null)}})}}]),n}(s.a.Component),D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),i(e),a(e)}))};a.a.createRoot(document.getElementById("root")).render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(P,{})})),D()}},[[98,1,2]]]);
//# sourceMappingURL=main.1c149d22.chunk.js.map