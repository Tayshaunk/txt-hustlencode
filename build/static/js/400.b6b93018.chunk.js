"use strict";(self.webpackChunkhustlencode_io=self.webpackChunkhustlencode_io||[]).push([[400],{87068:function(e,t,a){a.d(t,{Z:function(){return d}});var n=a(25415),s="CodeEditor_container__zNWs5",i="CodeEditor_header__Txhjd",r="CodeEditor_title__ii0lV",l="CodeEditor_editorContainer__5RqoY",o=a(80184),d=function(e){var t=e.title,a=e.editor,d=e.defaultValue,c=e.defaultLanguage,u=e.height;return(0,o.jsxs)("div",{className:s,children:[t?(0,o.jsxs)("div",{className:i,children:[(0,o.jsx)("div",{children:(0,o.jsx)("p",{className:r,children:t})}),(0,o.jsx)("div",{})]}):null,(0,o.jsx)("div",{className:l,style:{height:u,width:"100%",backgroundColor:"#1E1E1E"},children:(0,o.jsx)(n.ZP,{onMount:a.handleEditorDidMount,value:a.value,defaultLanguage:c,defaultValue:d,onChange:a.handleEditorChange,theme:a.theme,options:{scrollBeyondLastLine:!0,minimap:{enabled:!1}}})})]})}},94848:function(e,t,a){a.d(t,{Z:function(){return j}});var n=a(29439),s=a(95627),i=a(72791),r=a(67045),l=a(87068),o="MobileCodeEditor_tabToolBarWrapper__oleKr",d="MobileCodeEditor_tabButtonToolBar__yQPcD",c="MobileCodeEditor_tab__FLiOI",u="MobileCodeEditor_tabBtn__JCjXr",h="MobileCodeEditor_active__Sizq2",v="MobileCodeEditor_header__VaSja",p="MobileCodeEditor_btn__dPqlr",g="MobileCodeEditor_headerLeft__KoB-j",f="MobileCodeEditor_headerRight__4BBi-",m="MobileCodeEditor_editorContainer__xqGtU",x="MobileCodeEditor_postContainer__emlDG",_="MobileCodeEditor_post__W1A2e",C=a(80184),j=function(e){var t=e.isSaving,a=e.htmlEditor,j=e.cssEditor,b=e.jsEditor,E=e.actionLabel,Z=e.children,S=e.exitEditorHandler,y=e.saveAndExitHandler,k=e.saveHandler,L=e.updateHandler,N=(0,i.useState)([]),w=(0,n.Z)(N,2),H=w[0],M=w[1],P=(0,i.useState)(H.length-1),V=(0,n.Z)(P,2),z=V[0],D=V[1];(0,i.useEffect)((function(){var e=!0;return e&&function(){var e=[];a&&e.push({label:"HTML"}),j&&e.push({label:"CSS"}),b&&e.push({label:"JS"}),e.push({label:"Preview"}),M(e),D(e.length-1)}(),function(){e=!1}}),[a,j,b]);var O=function(e){return H.map((function(e){return e.label})).indexOf(e)};return(0,C.jsxs)("div",{className:o,children:[(0,C.jsx)("div",{className:d,children:H.map((function(e,t){return(0,C.jsx)("div",{className:"".concat(c," ").concat(t===z?h:""),children:(0,C.jsx)(r.Z,{className:u,onClick:function(){D(t),H.length-1===3&&L()},children:(0,C.jsx)("p",{children:e.label})})},e.label)}))}),a?(0,C.jsx)("div",{style:{display:z===O("HTML")?"block":"none"},className:m,children:(0,C.jsx)(l.Z,{editor:a,height:100,defaultLanguage:"html",defaultValue:""})}):null,j?(0,C.jsx)("div",{style:{display:z===O("CSS")?"block":"none"},className:m,children:(0,C.jsx)(l.Z,{editor:j,height:100,defaultLanguage:"css",defaultValue:""})}):null,b?(0,C.jsx)("div",{style:{display:z===O("JS")?"block":"none"},className:m,children:(0,C.jsx)(l.Z,{editor:b,height:100,defaultLanguage:"javascript",defaultValue:""})}):null,(0,C.jsxs)("div",{style:{display:z===O("Preview")?"flex":"none"},className:x,children:[(0,C.jsxs)("div",{className:v,children:[(0,C.jsxs)("div",{className:g,children:[(0,C.jsx)(s.Z,{className:p,size:"xs",color:"red",type:"button",appearance:"primary",label:"Exit Editor",isLoading:!1,disabled:t,onClick:S}),y?(0,C.jsx)(s.Z,{className:p,size:"xs",color:"green",type:"button",appearance:"primary",label:"Save And Exit",isLoading:t,disabled:t,onClick:y}):(0,C.jsx)("div",{})]}),(0,C.jsx)("div",{className:f,children:(0,C.jsx)(s.Z,{className:p,size:"xs",color:"green",type:"button",appearance:"primary",label:E,isLoading:t,disabled:t,onClick:k})})]}),(0,C.jsx)("div",{className:_,children:Z})]})]})}},32847:function(e,t,a){var n=a(95203),s=a(70616),i=a(80184);t.Z=function(e){var t=e.val,a=e.children;return(0,i.jsx)(s.Z,{children:t?a:(0,i.jsx)(n.Z,{})})}},89811:function(e,t,a){a.d(t,{Z:function(){return p}});var n=a(29439),s=a(83345),i=a(72791),r=a(70930),l="PostPreviewModule_container__uA2lJ",o="PostPreviewModule_header__IY7PJ",d="PostPreviewModule_imgContainer__WXzow",c="PostPreviewModule_nameContainer__vBaWZ",u="PostPreviewModule_name__qhwqm",h="PostPreviewModule_content__lh4O3",v=a(80184),p=function(e){var t=e.postUser,a=e.createdOn,p=e.postCode,g=(0,i.useState)(),f=(0,n.Z)(g,2),m=f[0],x=f[1],_='\n  <html id="html">\n      <head>\n          <style>\n          '.concat(p.css,"\n          </style>\n      </head>\n      <body>\n          ").concat(p.html,"\n      </body>\n\n      <script>\n          ").concat(p.js,"\n      <\/script>\n  \n  </html>\n  ");return(0,v.jsxs)("div",{className:l,children:[(0,v.jsxs)("div",{className:o,children:[(0,v.jsx)("div",{className:d,children:t?(0,v.jsx)("img",{src:(0,r.r)(t.profileImg,t.gender),alt:"".concat(t.name," profile thumbnail")}):(0,v.jsx)("img",{src:"https://hustlencode.s3.us-west-1.amazonaws.com/unspecified.jpg",alt:"profile thumbnail"})}),(0,v.jsxs)("div",{className:c,children:[(0,v.jsx)("div",{className:u,children:(0,v.jsx)("p",{children:null===t||void 0===t?void 0:t.name})}),(0,v.jsx)("div",{children:a?(0,v.jsx)(s.Z,{date:a}):(0,v.jsx)(s.Z,{date:new Date})})]})]}),(0,v.jsx)("div",{className:h,children:(0,v.jsx)("iframe",{style:{height:"".concat(m,"px"),width:"100%"},title:"".concat((new Date).getTime(),"-post"),srcDoc:_,onLoad:function(e){var t=e.target.contentWindow.document.getElementById("html").offsetHeight;x(t)}})})]})}},20454:function(e,t,a){a.d(t,{Z:function(){return j}});var n=a(29439),s=a(39832),i=a(95627),r=a(87068),l=a(72791),o="SplitCodeEditor_draggerDarkH__iTbJy",d="SplitCodeEditor_draggerDarkV__TkYiJ",c="SplitCodeEditor_gutterDarkH__Ub06v",u="SplitCodeEditor_gutterDarkV__JA0OW",h="SplitCodeEditor_wrap__+VLlI",v="SplitCodeEditor_preview__gJbyM",p="SplitCodeEditor_header__dFkJm",g="SplitCodeEditor_btn__N1LPe",f="SplitCodeEditor_headerLeft__xUZz-",m="SplitCodeEditor_headerRight__MnIh4",x="SplitCodeEditor_postContainer__8Ihko",_="SplitCodeEditor_post__0pvBR",C=a(80184),j=function(e){var t=e.isSaving,a=e.hasChanges,j=e.children,b=e.htmlEditor,E=e.cssEditor,Z=e.jsEditor,S=e.actionLabel,y=e.exitEditorHandler,k=e.saveAndExitHandler,L=e.updateHandler,N=e.saveHandler,w=(0,l.useState)([50,50]),H=(0,n.Z)(w,2),M=H[0],P=H[1];return(0,C.jsxs)(s.ZP,{gutterClassName:u,draggerClassName:d,direction:s.iS.Vertical,onResizeFinished:function(e,t){P(t)},initialSizes:M,children:[(0,C.jsxs)(s.ZP,{direction:s.iS.Horizontal,gutterClassName:c,draggerClassName:o,children:[b?(0,C.jsx)(r.Z,{editor:b,height:M[0],title:"HTML",defaultLanguage:"html",defaultValue:""}):null,E?(0,C.jsx)(r.Z,{editor:E,height:M[0],title:"CSS",defaultLanguage:"css",defaultValue:""}):null,Z?(0,C.jsx)(r.Z,{editor:Z,height:M[0],title:"JS",defaultLanguage:"javascript",defaultValue:""}):null]}),(0,C.jsx)("div",{className:h,children:(0,C.jsxs)("div",{className:v,children:[(0,C.jsxs)("div",{className:p,children:[(0,C.jsxs)("div",{className:f,children:[(0,C.jsx)(i.Z,{className:g,size:"xs",color:"red",type:"button",appearance:"primary",label:"Exit Editor",isLoading:!1,disabled:t,onClick:y}),k?(0,C.jsx)(i.Z,{className:g,size:"xs",color:"green",type:"button",appearance:"primary",label:"Save And Exit",isLoading:!1,disabled:t,onClick:k}):(0,C.jsx)("div",{})]}),(0,C.jsxs)("div",{className:m,children:[(0,C.jsx)(i.Z,{className:g,size:"xs",color:"blue",type:"button",appearance:"primary",label:"Update Preview",isLoading:!1,disabled:!a||t,onClick:L}),(0,C.jsx)(i.Z,{className:g,size:"xs",color:"green",type:"button",appearance:"primary",label:S,isLoading:t,disabled:t,onClick:N})]})]}),(0,C.jsx)("div",{className:x,children:(0,C.jsx)("div",{className:_,children:j})})]})})]})}},98235:function(e,t,a){a.d(t,{Z:function(){return r}});var n=a(29439),s=a(72791),i=a(16871);function r(e,t,a){var r=(0,i.TH)(),l=r.pathname.replace("/","")+a,o=r.pathname.replace("/","")+a,d=(0,s.useState)(""),c=(0,n.Z)(d,2),u=c[0],h=c[1],v=(0,s.useState)("vs-dark"),p=(0,n.Z)(v,2),g=p[0],f=p[1],m=(0,s.useRef)(null);(0,s.useEffect)((function(){var t=!0;return t&&e&&h(e),function(){t=!1}}),[e]);return{value:u,theme:g,handleEditorDidMount:function(e){m.current=e},handleEditorChange:function(e){e?(localStorage[l]=e,h(e)):(localStorage[l]="",h("")),t(u!==e&&""!==u)},getLinesCount:function(){return m&&m.current?m.current.getModel().getLineCount():0},updateTheme:function(e){localStorage[o]=e,f(e)}}}},65322:function(e,t,a){a.d(t,{Z:function(){return r}});var n=a(16871),s=a(66579),i=a(42728);function r(){var e=(0,n.TH)().pathname,t=(0,n.s0)(),a=(0,s.C)(i.Hd),r=(0,s.C)(i.s1);return{goBack:function(){1===r.length?t(a):r[r.length-2]===e?t("/"):t(r[r.length-2])}}}},67400:function(e,t,a){a.r(t),a.d(t,{default:function(){return H}});var n=a(15861),s=a(87757),i=a.n(s),r=a(16871),l=a(768),o=a(98235),d=a(99659),c=a(94848),u=a(20454),h=a(22642),v=a(67045),p=a(70616),g=a(13194),f=a(32847),m=a(1413),x=a(29439),_=a(72791),C=a(39245),j=a(66579),b=a(42728),E=a(41342);var Z=a(95512);function S(e){var t=(0,r.TH)(),a=t.pathname.replace("/","")+"html",s=t.pathname.replace("/","")+"css",l=t.pathname.replace("/","")+"js",o=(0,_.useState)(!1),d=(0,x.Z)(o,2),c=d[0],u=d[1],h=(0,_.useState)(null),v=(0,x.Z)(h,2),p=v[0],g=v[1],f=(0,_.useState)(!1),S=(0,x.Z)(f,2),y=S[0],k=S[1],L=(0,_.useState)(!1),N=(0,x.Z)(L,2),w=N[0],H=N[1],M=(0,_.useState)(!1),P=(0,x.Z)(M,2),V=P[0],z=P[1],D=(0,j.T)(),O=function(){return D((0,b.kS)())},T=function(e){var t=(0,_.useState)(!0),a=(0,x.Z)(t,2),s=a[0],r=a[1],l=(0,_.useState)(null),o=(0,x.Z)(l,2),d=o[0],c=o[1],u=(0,j.T)(),h=function(){return u((0,b.kS)())},v=(0,j.C)(b.PR);return(0,_.useEffect)((function(){var t=!0;function a(){return a=(0,n.Z)(i().mark((function e(t){var a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,E.MZ)(t);case 3:a=e.sent,c(a),r(!1),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),r(!1),(0,C.d)(e.t0,h);case 12:case"end":return e.stop()}}),e,null,[[0,8]])}))),a.apply(this,arguments)}return t&&v&&e&&function(e){a.apply(this,arguments)}(e),function(){t=!1}}),[e,v]),{value:d,isLoading:s,setValue:c}}(e),B=T.value;(0,_.useEffect)((function(){var e=!0;if(e&&B){(localStorage[a]||localStorage[s]||localStorage[l])&&H(!0);var t={html:B.html||"",css:B.css||"",js:B.js||"",linesOfCode:B.linesOfCode||0};g(t),u(!0)}return function(){e=!1}}),[B]);var U=function(){var e=(0,n.Z)(i().mark((function e(t){var a,n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,z(!0),e.next=4,(0,E.n5)((null===(a=T.value)||void 0===a?void 0:a._id)||"",t);case 4:n=e.sent,(0,Z.HG)(n.message,3e3),z(!1),T.setValue(n.payload),J(),k(!1),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),z(!1),(0,C.d)(e.t0,O);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=(0,n.Z)(i().mark((function e(t){var a,n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,z(!0),e.next=4,(0,E.n5)((null===(a=T.value)||void 0===a?void 0:a._id)||"",t);case 4:n=e.sent,(0,Z.HG)(n.message,3e3),z(!1),J(),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),z(!1),(0,C.d)(e.t0,O);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),J=function(){localStorage.removeItem(a),localStorage.removeItem(s),localStorage.removeItem(l)},I=function(){H(!1)},W=function(){J(),I()};return{post:T,value:p,isDoneLoading:c,hasChanges:y,showUnsavedChanges:w,isSaving:V,setValue:g,discardChanges:W,closeModal:I,setHasChanges:k,saveChanges:U,saveAndExit:A,applyUnsavedChanges:function(){if(T.value){var e=(0,m.Z)({},T.value);localStorage[a]&&(e.html=localStorage[a]),localStorage[s]&&(e.css=localStorage[s]),localStorage[l]&&(e.js=localStorage[l]),T.setValue((0,m.Z)({},e)),W()}}}}var y=a(89811),k=a(65322),L="EditPost_container__PXMSD",N="EditPost_moduleContainer__yYhEo",w=a(80184),H=function(){var e,t,a,s=S((0,r.UO)().id),m=(0,o.Z)(null===(e=s.value)||void 0===e?void 0:e.html,s.setHasChanges,"html"),x=(0,o.Z)(null===(t=s.value)||void 0===t?void 0:t.css,s.setHasChanges,"css"),_=(0,o.Z)(null===(a=s.value)||void 0===a?void 0:a.js,s.setHasChanges,"js"),C=(0,d.Z)(),j=(0,k.Z)(),b=function(){var e=m.getLinesCount()+x.getLinesCount()+_.getLinesCount();s.setValue({html:m.value,css:x.value,js:_.value,linesOfCode:e})},E=function(){var e=(0,n.Z)(i().mark((function e(){var t,a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P()){e.next=7;break}return t=m.getLinesCount()+x.getLinesCount()+_.getLinesCount(),a={html:m.value,css:x.value,js:_.value,linesOfCode:t},e.next=5,s.saveChanges(a);case 5:e.next=8;break;case 7:(0,Z.uP)("Please write some code code first.",3e3);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(){j.goBack()},M=function(){var e=(0,n.Z)(i().mark((function e(){var t,a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P()){e.next=8;break}return t=m.getLinesCount()+x.getLinesCount()+_.getLinesCount(),a={html:m.value,css:x.value,js:_.value,linesOfCode:t},e.next=5,s.saveAndExit(a);case 5:H(),e.next=9;break;case 8:(0,Z.uP)("Please write some code code first.",3e3);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){return""===m.value.trim()&&""===x.value.trim()&&""===_.value.trim()};return(0,w.jsxs)("div",{className:"".concat(l.Z.pageWrapper," ").concat(L),id:"wrapper",children:[(0,w.jsxs)(h.Z,{backdrop:"static",role:"alertdialog",open:s.showUnsavedChanges,onClose:s.closeModal,size:"xs",children:[(0,w.jsx)(h.Z.Body,{children:(0,w.jsx)("p",{children:"Would you like to restore unsaved changes?"})}),(0,w.jsxs)(h.Z.Footer,{children:[(0,w.jsx)(v.Z,{onClick:s.applyUnsavedChanges,appearance:"primary",children:"Restore Changes"}),(0,w.jsx)(v.Z,{onClick:s.discardChanges,appearance:"subtle",children:"Discard"})]})]}),s.isDoneLoading?(0,w.jsx)(p.Z,{children:(0,w.jsx)(f.Z,{val:s.post.value,children:C.value?(0,w.jsx)(c.Z,{htmlEditor:m,cssEditor:x,jsEditor:_,exitEditorHandler:H,saveAndExitHandler:M,saveHandler:E,isSaving:s.isSaving,actionLabel:"Save Changes",updateHandler:b,children:s.value&&s.post.value&&s.post.value.user?(0,w.jsx)(y.Z,{postCode:s.value,createdOn:s.post.value.createdOn,postUser:s.post.value.user}):(0,w.jsx)(g.Z,{style:{height:"100%",width:"100%"},isVisible:!0,fullscreen:!1,theme:"light"})}):(0,w.jsx)(u.Z,{htmlEditor:m,cssEditor:x,jsEditor:_,exitEditorHandler:H,updateHandler:b,saveAndExitHandler:M,saveHandler:E,isSaving:s.isSaving,hasChanges:s.hasChanges,actionLabel:"Save Changes",children:s.value&&s.post.value&&s.post.value.user?(0,w.jsx)("div",{className:N,children:(0,w.jsx)(y.Z,{postCode:s.value,createdOn:s.post.value.createdOn,postUser:s.post.value.user})}):(0,w.jsx)("div",{})})})}):(0,w.jsx)(g.Z,{style:{height:"100vh",width:"100vw"},isVisible:!0,fullscreen:!1,theme:"dark"})]})}}}]);
//# sourceMappingURL=400.b6b93018.chunk.js.map