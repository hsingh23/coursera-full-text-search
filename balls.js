// ==UserScript==
// @name          Coursera full text search
// @namespace    coursera_full_text_search
// @version      0.1
// @description  Coursera full text search
// @author       You
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/lunr.js/0.5.7/lunr.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/q.js/1.2.0/q.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/pouchdb/3.4.0/pouchdb.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.runtime.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.7.0/lodash.min.js
// @match         https://class.coursera.org/*/lecture
// @grant        none

// ==/UserScript==


!function(t,e){"use strict";function n(t){return"object"==typeof Node?t instanceof Node:t&&"object"==typeof t&&"number"==typeof t.nodeType}function o(t){return"string"==typeof t}function i(){var t=[];return{watch:t.push.bind(t),trigger:function(e){for(var n=!0,o={preventDefault:function(){n=!1}},i=0;i<t.length;i++)t[i](e,o);return n}}}function r(t){this.elem=t}function l(t,e){return r.div().clazz("pico-overlay").clazz(t("overlayClass","")).stylize({display:"block",position:"fixed",top:"0px",left:"0px",height:"100%",width:"100%",zIndex:1e4, overflow:"auto"}).stylize(t("overlayStyles",{opacity:.5,background:"#000"})).onClick(function(){t("overlayClose",!0)&&e()})}function c(t,e){var n=t("width","auto");"number"==typeof n&&(n=""+n+"px");var o=r.div().clazz("pico-content").clazz(t("modalClass","")).stylize({display:"block",position:"fixed",zIndex:10001,left:"50%",top:"50px",width:n,"-ms-transform":"translateX(-50%)","-moz-transform":"translateX(-50%)","-webkit-transform":"translateX(-50%)","-o-transform":"translateX(-50%)",transform:"translateX(-50%)",height:"calc(100% - 10px)", overflow:"auto"}).stylize(t("modalStyles",{backgroundColor:"white",padding:"20px",borderRadius:"5px"})).html(t("content")).attr("role","dialog").onClick(function(t){var n=new r(t.target).anyAncestor(function(t){return/\bpico-close\b/.test(t.elem.className)});n&&e()});return o}function s(t,e){return e("closeButton",!0)?t.child().html(e("closeHtml","&#xD7;")).clazz("pico-close").clazz(e("closeClass")).stylize(e("closeStyles",{borderRadius:"2px",cursor:"pointer",height:"15px",width:"15px",position:"absolute",top:"5px",right:"5px",fontSize:"16px",textAlign:"center",lineHeight:"15px",background:"#CCC"})):void 0}function a(t){return function(){return t().elem}}function u(e){function r(t,n){var o=e[t];return"function"==typeof o&&(o=o(n)),void 0===o?n:o}function u(){z().hide(),w().hide(),b.trigger(C)}function f(){g.trigger(C)&&u()}function d(t){return function(){return t.apply(this,arguments),C}}function h(t){if(!p){var e=c(r,f);p={modal:e,overlay:l(r,f),close:s(e,r)},y.trigger(C)}return p[t]}(o(e)||n(e))&&(e={content:e});var p,y=i(),m=i(),v=i(),g=i(),b=i(),w=h.bind(t,"modal"),z=h.bind(t,"overlay"),x=h.bind(t,"close"),C={modalElem:a(w),closeElem:a(x),overlayElem:a(z),show:function(){return m.trigger(C)&&(z().show(),x(),w().show(),v.trigger(C)),this},close:d(f),forceClose:d(u),destroy:function(){w=w().destroy(),z=z().destroy(),x=void 0},options:function(t){e=t},afterCreate:d(y.watch),beforeShow:d(m.watch),afterShow:d(v.watch),beforeClose:d(g.watch),afterClose:d(b.watch)};return C}r.div=function(t){var n=e.createElement("div");return(t||e.body).appendChild(n),new r(n)},r.prototype={child:function(){return r.div(this.elem)},stylize:function(t){t=t||{},"undefined"!=typeof t.opacity&&(t.filter="alpha(opacity="+100*t.opacity+")");for(var e in t)t.hasOwnProperty(e)&&(this.elem.style[e]=t[e]);return this},clazz:function(t){return this.elem.className+=" "+t,this},html:function(t){return n(t)?this.elem.appendChild(t):this.elem.innerHTML=t,this},onClick:function(t){return this.elem.addEventListener("click",t),this},destroy:function(){e.body.removeChild(this.elem)},hide:function(){this.elem.style.display="none"},show:function(){this.elem.style.display="block"},attr:function(t,e){return this.elem.setAttribute(t,e),this},anyAncestor:function(t){for(var e=this.elem;e;){if(t(new r(e)))return!0;e=e.parentNode}return!1}},t.picoModal=u}(window,document);

//https://class.coursera.org/socialpsychology-002/lecture


!function(){var e=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n.result=e({1:function(e,n,a,t){var i;return'	<div class="section">\n'+(null!=(i=n.each.call(e,null!=e?e.videos:e,{name:"each",hash:{},fn:this.program(2,t,0),inverse:this.noop,data:t}))?i:"")+"	</div>\n"},2:function(e){var n=this.lambda,a=this.escapeExpression;return'			<div class="video">\n				<video width="320" height="240" prefetch controls>\n				  <source src="'+a(n(null!=e?e.link:e,e))+'" type="video/mp4">\n				</video>\n				'+a(n(null!=e?e.subtitle:e,e))+"\n			</div>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,t){var i;return null!=(i=n.each.call(e,e,{name:"each",hash:{},fn:this.program(1,t,0),inverse:this.noop,data:t}))?i:""},useData:!0})}();

var SECOND = 1
    , MINUTE = 60 * SECOND
    , HOUR = 60 * MINUTE;

var subtitleUrls = document.querySelectorAll("a[title='Subtitles (srt)']");
var videoUrls = [];
var sectionHeader = {};
//header lookup to get section for sorting
$(".course-item-list-header h3").each(function(i, obj){
    var t = obj.textContent.trim();
    sectionHeader[i] = t;
    sectionHeader[t] = i;
});

$.each(subtitleUrls, function(i, subtitleLink){
    var header = subtitleLink.parentElement.parentElement.parentElement.previousSibling.querySelector("h3").textContent.trim();
    videoUrls.push({
        section: sectionHeader[header],
        header: header,
        text: subtitleLink.parentElement.parentElement.querySelector(".lecture-link").text.trim(),
        link: subtitleLink.parentElement.querySelector('a[href*="download.mp4"]').href
    });
});

var db = new PouchDB('coursera_fts');
var subtitles = {};


// We construct 2 indexes, txtIndex for knowing which video contains the text so that we can rank properly and lunrIndex for the srt segments that contain where in the video something was said
var lunrIndex = lunr(function () {
  this.field('body');
  this.ref('id');
});
// var txtIndex = lunr(function () {
//   this.field('body');
//   this.ref('id');
// });

window.lunrIndex = lunrIndex;
//window.txtIndex = txtIndex;
window.subtitles = subtitles;
window.db = db;

var addLunrDocuments = function(videoIndex, srt){
    var segments = srt.trim().split("\n\n");
    var bodyText = "";
    $.each(segments, function(i, segment){
        try{
            var lines = segment.split("\n");
            var id, body;
            id = videoIndex + "#" + parseTime(lines[1].split(" --> ")[0]);
            body = lines.slice(2).join("\n");
            bodyText += body;
            lunrIndex.add({"id": id, "body": body});
            subtitles[id] = body;
        }catch(e) {
            console.error("Error %o for video %d when parsing segment %o in segments %o", e,videoIndex, segment, segments);
        }
    });
    // txtIndex.add({"id": videoIndex, "body": bodyText});
}

    
var parseTime = function (timeString) {
    // returns seconds
    var chunks = timeString.split(":")
        , secondChunks = chunks[2].split(",")
        , hours = parseInt(chunks[0], 10)
        , minutes = parseInt(chunks[1], 10)
        , seconds = parseInt(secondChunks[0], 10);

    return HOUR * hours +
        MINUTE * minutes +
        SECOND * seconds;
}

var getCourse = function(){
    return window.location.pathname.split('/')[1];
}

var fetchLoadEverything = function(deferred){
    var srtPromises = [];
    var srts = {}
    $.each(subtitleUrls, function (i, subtitle) {
        var promise = Q($.get(subtitle.attributes.href.textContent, function(videoIndex){
            return function(srt){
                srts[videoIndex] = srt;
                addLunrDocuments(videoIndex, srt);
            };
        }(i)));
        srtPromises.push(promise);
    });
    
    Q.all(srtPromises).then(function(deferred){
        // have the data now, so go forth and render the view
        //debugger;
        db.put({_id:getCourse(), data:srts}).then(function(response){console.log("Successfully stored stuff %o",response); deferred.resolve();}).catch(function(error){console.error("Could NOT stored stuff %o",error);});
        
    });
};

var loadData = function(){
    console.log("called load data");
    // check indexed db 
    // create db
    // search db for stored data structure  - may need to seralize
    var deferred = Q.defer();
    var course = getCourse();
    db.get(course).then(function(data){
        console.log("Found data %o",data);
        setTimeout( function(){
            //$.each(data.data, addLunrDocuments);
            $.each(data.data, function(index,srt){setTimeout(addLunrDocuments,0,index,srt);});
            deferred.resolve();
        },900);
        //lunrIndex = data.lunrIndex;
        
    }).catch(function(err) {
        console.log("Not found %o",err);
        setTimeout(fetchLoadEverything,1500,deferred);
    });
    return deferred.promise;
    

}
var init = function (){
    loadData()
        .then(showGUI);
}


var showGUI = function() {
    console.log("loaded all the things");
    var $form = $('<form id="fulltext_gui" style="margin:0;"><input id="fulltext_search" type="search" placeholder="Search Videos" style="margin:0;height:15px;"></input></form>'),
        $li = $('<li class="course-topbar-nav-list-item"></li>');
    $li.append($form);
    
    $form.submit(function(e){
        e.preventDefault(); 
        e.stopImmediatePropagation(); 
       
        // // _.mapObject(sections, function(lunrObjects){ })
        // // sort by section, sort by video placement
        var context = {}
        $.each(lunrIndex.search(e.target.firstChild.value), function(i, obj){
            var t = obj.ref.split('#'), 
                videoID = t[0], 
                time = t[1];
            var videoInfo = videoUrls[videoID];
            var video = {
                link: videoInfo.link+"#t="+time+","+(parseInt(time,10)+10),
                subtitle: subtitles[obj.ref]
            }, section = videoInfo.section,
                text = videoInfo.text;
            
            if (context[videoID]) {
                try {
                    /* code */
                    context[videoID].videos.push(video);
                } catch (e) {
                    debugger;
                }
            } else {
                context[videoID] = {};
                context[videoID].videoID = videoID;
                context[videoID].text= text;
                context[videoID].videos = [video];
            }
        });
        picoModal(Handlebars.templates.result(context)).afterClose(function (modal) { modal.destroy(); }).show();
        return false;
    });
    $('.course-topbar-nav-list').prepend($li);
}
init();
