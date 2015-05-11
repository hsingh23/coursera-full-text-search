this["HANDLEBAR_TEMPLATES"] = this["HANDLEBAR_TEMPLATES"] || {};

this["HANDLEBAR_TEMPLATES"]["coursera-searcher/result.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "	<div class=\"section\">\n		<h1>\n			"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0.header : depth0), depth0))
    + "\n		</h1>\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.videos : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 2, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "	</div>\n";
},"2":function(depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "			<h4>"
    + this.escapeExpression(this.lambda(((stack1 = blockParams[0][0]) != null ? stack1.title : stack1), depth0))
    + "</h4>\n			<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.quotes : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "			</ul>\n";
},"3":function(depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "				<li>\n					["
    + alias3(((helper = (helper = helpers['0'] || (depth0 != null ? depth0['0'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"0","hash":{},"data":data}) : helper)))
    + "] <a class=\"fullTextSearch\" onclick=\"takeMeAway("
    + alias3(alias4(blockParams[2][1], depth0))
    + ", '"
    + alias3(alias4(((stack1 = blockParams[1][0]) != null ? stack1.link : stack1), depth0))
    + "', "
    + alias3(((helper = (helper = helpers['0'] || (depth0 != null ? depth0['0'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"0","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "); return false;\" data-section=\""
    + alias3(alias4(blockParams[2][1], depth0))
    + "\" data-video=\""
    + alias3(alias4(((stack1 = blockParams[1][0]) != null ? stack1.link : stack1), depth0))
    + "\" data-time=\""
    + alias3(((helper = (helper = helpers['0'] || (depth0 != null ? depth0['0'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"0","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers['1'] || (depth0 != null ? depth0['1'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"1","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "</a>\n				</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<style>\n	video {\n		display: block;\n		margin: auto;\n	}\n	a:visited {\n		color: #D13924;\n	}\n</style>\n<video width=\"640px\" height=\"480px\" controls id=\"video_fts\" class=\"center\">\n  <source type=\"video/mp4\" id=\"source_fts\">\n</video>\n\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 2, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
! function(t, e) {
    "use strict";

    function n(t) {
        return "object" == typeof Node ? t instanceof Node : t && "object" == typeof t && "number" == typeof t.nodeType
    }

    function o(t) {
        return "string" == typeof t
    }

    function i() {
        var t = [];
        return {
            watch: t.push.bind(t),
            trigger: function(e) {
                for (var n = !0, o = {
                        preventDefault: function() {
                            n = !1
                        }
                    }, i = 0; i < t.length; i++) t[i](e, o);
                return n
            }
        }
    }

    function r(t) {
        this.elem = t
    }

    function l(t, e) {
        return r.div().clazz("pico-overlay").clazz(t("overlayClass", "")).stylize({
            display: "block",
            position: "fixed",
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%",
            zIndex: 1e4,
            overflow: "auto"
        }).stylize(t("overlayStyles", {
            opacity: .5,
            background: "#000"
        })).onClick(function() {
            t("overlayClose", !0) && e()
        })
    }

    function c(t, e) {
        var n = t("width", "70%");
        "number" == typeof n && (n = "" + n + "px");
        var o = r.div().clazz("pico-content").clazz(t("modalClass", "")).stylize({
            display: "block",
            position: "fixed",
            zIndex: 10001,
            left: "50%",
            top: "23px",
            width: n,
            "-ms-transform": "translateX(-50%)",
            "-moz-transform": "translateX(-50%)",
            "-webkit-transform": "translateX(-50%)",
            "-o-transform": "translateX(-50%)",
            transform: "translateX(-50%)",
            height: "calc(100% - 30px)",
            overflow: "auto"
        }).stylize(t("modalStyles", {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "13px"
        })).html(t("content")).attr("role", "dialog").onClick(function(t) {
            var n = new r(t.target).anyAncestor(function(t) {
                return /\bpico-close\b/.test(t.elem.className)
            });
            n && e()
        });
        return o
    }

    function s(t, e) {
        return e("closeButton", !0) ? t.child().html(e("closeHtml", "&#xD7;")).clazz("pico-close").clazz(e("closeClass")).stylize(e("closeStyles", {
            borderRadius: "2px",
            cursor: "pointer",
            height: "15px",
            width: "15px",
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "15px",
            background: "#CCC"
        })) : void 0
    }

    function a(t) {
        return function() {
            return t().elem
        }
    }

    function u(e) {
        function r(t, n) {
            var o = e[t];
            return "function" == typeof o && (o = o(n)), void 0 === o ? n : o
        }

        function u() {
            z().hide(), w().hide(), b.trigger(C)
        }

        function f() {
            g.trigger(C) && u()
        }

        function d(t) {
            return function() {
                return t.apply(this, arguments), C
            }
        }

        function h(t) {
            if (!p) {
                var e = c(r, f);
                p = {
                    modal: e,
                    overlay: l(r, f),
                    close: s(e, r)
                }, y.trigger(C)
            }
            return p[t]
        }(o(e) || n(e)) && (e = {
            content: e
        });
        var p, y = i(),
            m = i(),
            v = i(),
            g = i(),
            b = i(),
            w = h.bind(t, "modal"),
            z = h.bind(t, "overlay"),
            x = h.bind(t, "close"),
            C = {
                modalElem: a(w),
                closeElem: a(x),
                overlayElem: a(z),
                show: function() {
                    return m.trigger(C) && (z().show(), x(), w().show(), v.trigger(C)), this
                },
                close: d(f),
                forceClose: d(u),
                destroy: function() {
                    w = w().destroy(), z = z().destroy(), x = void 0
                },
                options: function(t) {
                    e = t
                },
                afterCreate: d(y.watch),
                beforeShow: d(m.watch),
                afterShow: d(v.watch),
                beforeClose: d(g.watch),
                afterClose: d(b.watch)
            };
        return C
    }
    r.div = function(t) {
        var n = e.createElement("div");
        return (t || e.body).appendChild(n), new r(n)
    }, r.prototype = {
        child: function() {
            return r.div(this.elem)
        },
        stylize: function(t) {
            t = t || {}, "undefined" != typeof t.opacity && (t.filter = "alpha(opacity=" + 100 * t.opacity + ")");
            for (var e in t) t.hasOwnProperty(e) && (this.elem.style[e] = t[e]);
            return this
        },
        clazz: function(t) {
            return this.elem.className += " " + t, this
        },
        html: function(t) {
            return n(t) ? this.elem.appendChild(t) : this.elem.innerHTML = t, this
        },
        onClick: function(t) {
            return this.elem.addEventListener("click", t), this
        },
        destroy: function() {
            e.body.removeChild(this.elem)
        },
        hide: function() {
            this.elem.style.display = "none"
        },
        show: function() {
            this.elem.style.display = "block"
        },
        attr: function(t, e) {
            return this.elem.setAttribute(t, e), this
        },
        anyAncestor: function(t) {
            for (var e = this.elem; e;) {
                if (t(new r(e))) return !0;
                e = e.parentNode
            }
            return !1
        }
    }, t.picoModal = u
}(window, document);
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
// Picomodal

//https://class.coursera.org/socialpsychology-002/lecture

// (function() {var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; templates['result'] = template({"1":function(depth0,helpers,partials,data,blockParams) {var stack1, helper, alias1=this.escapeExpression, alias2=helpers.helperMissing, alias3="function"; return "  <div class=\"section\">\n       <h1>\n          "+ alias1(this.lambda((depth0 != null ? depth0.header : depth0), depth0)) + "\n     </h1>\n\n           <video width=\"640px\" height=\"480px\" controls id=\"video_fts_"+ alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"key","hash":{},"data":data,"blockParams":blockParams}) : helper))) + "\" class=\"center\">\n             <source type=\"video/mp4\" id=\"source_fts_"+ alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"key","hash":{},"data":data,"blockParams":blockParams}) : helper))) + "\">\n           </video>\n"+ ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.videos : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 2, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "") + "  </div>\n"; },"2":function(depth0,helpers,partials,data,blockParams) {var stack1; return "           <h2>"+ this.escapeExpression(this.lambda(((stack1 = blockParams[0][0]) != null ? stack1.title : stack1), depth0)) + "</h2>\n            <ul>\n"+ ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.quotes : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "") + "          </ul>\n"; },"3":function(depth0,helpers,partials,data,blockParams) {var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda; return "             <li>\n                  ["+ alias3(((helper = (helper = helpers['0'] || (depth0 != null ? depth0['0'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"0","hash":{},"data":data}) : helper))) + "] <a class=\"fullTextSearch\"  return false;\" data-section=\""+ alias3(alias4(blockParams[2][1], depth0)) + "\" data-video=\""+ alias3(alias4(((stack1 = blockParams[1][0]) != null ? stack1.link : stack1), depth0)) + "\" data-time=\""+ alias3(((helper = (helper = helpers['0'] || (depth0 != null ? depth0['0'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"0","hash":{},"data":data,"blockParams":blockParams}) : helper))) + "\">"+ alias3(((helper = (helper = helpers['1'] || (depth0 != null ? depth0['1'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"1","hash":{},"data":data,"blockParams":blockParams}) : helper))) + "</a>\n              </li>\n"; },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams) {var stack1; return "<style>\n   video {\n       display: block;\n       margin: auto;\n }\n a:visited {\n       color: #D13924;\n   }\n</style>\n"+ ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 2, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : ""); },"useData":true,"useBlockParams":true}); })();

var SECOND = 1,
    MINUTE = 60 * SECOND,
    HOUR = 60 * MINUTE;

var subtitleUrls = document.querySelectorAll("a[title='Subtitles (srt)']");
var videoUrls = [];
var sectionHeader = {};
//header lookup to get section for sorting
$(".course-item-list-header h3").each(function(i, obj) {
    var t = obj.textContent.trim();
    sectionHeader[i] = t;
    sectionHeader[t] = i;
});

$.each(subtitleUrls, function(i, subtitleLink) {
    var header = subtitleLink.parentElement.parentElement.parentElement.previousSibling.querySelector("h3").textContent.trim();
    try {
        var obj = {
            section: sectionHeader[header],
            header: header,
            text: subtitleLink.parentElement.parentElement.querySelector(".lecture-link").text.trim(),
            link: subtitleLink.parentElement.querySelector('a[href*="download.mp4"]').href
        };
        videoUrls.push(obj);
    } catch (e) {
        console.error("no video for %o - perhaps videos are disabled", subtitleLink);
    }

});

var db = new PouchDB('coursera_fts');
var subtitles = {};


// We construct 2 indexes, txtIndex for knowing which video contains the text so that we can rank properly and lunrIndex for the srt segments that contain where in the video something was said
var lunrIndex = lunr(function() {
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

var addLunrDocuments = function(videoIndex, srt) {
    var segments = srt.trim().split(/\n\r?\n/);
    var bodyText = "";
    $.each(segments, function(i, segment) {
        try {
            var lines = segment.split("\n");
            var id, body;
            id = videoIndex + "#" + parseTime(lines[1].split(" --> ")[0]);
            body = lines.slice(2).join("\n");
            bodyText += body;
            lunrIndex.add({
                "id": id,
                "body": body
            });
            subtitles[id] = body;
        } catch (e) {
            console.log("Error %o for video %d when parsing segment %o in segments %o", e, videoIndex, segment, segments);
        }
    });
    // txtIndex.add({"id": videoIndex, "body": bodyText});
};


var parseTime = function(timeString) {
    // returns seconds
    var chunks = timeString.split(":"),
        secondChunks = chunks[2].split(","),
        hours = parseInt(chunks[0], 10),
        minutes = parseInt(chunks[1], 10),
        seconds = parseInt(secondChunks[0], 10);

    return HOUR * hours +
        MINUTE * minutes +
        SECOND * seconds;
};

var getCourse = function() {
    return window.location.pathname.split('/')[1];
};

var fetchSubtitles = function(dbResult) {
    dbResult = dbResult || {
        _id: getCourse(),
        data: srts
    };
    var srts = dbResult.data;
    var startIndex = srts.length || 0;
    var srtPromises = [];
    $.each(subtitleUrls, function(i, subtitle) {
        if (srts.hasOwnProperty(i)) {
            var promise = Q($.get(subtitle.attributes.href.textContent, function(videoIndex) {
                return function(srt) {
                    srts[videoIndex] = srt;
                    addLunrDocuments(videoIndex, srt);
                };
            }(i)));
            srtPromises.push(promise);
        }
    });
    var deferred = Q.defer();
    Q.allSettled(srtPromises).then(deferred.resolve(dbResult));
    return deferred;
};

var insertOrUpdateDB = function(dbResult) {
    return Q(db.put(dbResult));
};

var loadData = function() {
    console.log("called load data");
    var course = getCourse();
    db.get(course).then(function(data) {
        //check to see if there are more subtitles that need to be fetched and added
        if (data.data.length < subtitleUrls.length) {
            fetchSubtitles(data).then(insertOrUpdateDB).then(function(){
                console.log("successfully added data");
            });
        }
        setTimeout(function() {
            $.each(data.data, function(index, srt) {
                // add each document letting any waiting tasks happen in between - see how event loop works
                setTimeout(addLunrDocuments, 0, index, srt);
            });
        }, 900); // wait so that other things on the page can load
        //lunrIndex = data.lunrIndex;

    }).catch(function(err) {
        console.log("Not found %o", err);
        setTimeout(fetchSubtitles, 1500);
    });


};
var init = function() {
    showGUI();
    loadData();
};

//takeMeAway is defined in handlebars file
// var videoCache = {};
// var sourceCache = {};

// The node to be monitored

var showGUI = function() {
    console.log("loaded all the things");
    var $form = $('<form id="fulltext_gui" style="margin:0;"><input id="fulltext_search" type="search" placeholder="Search Videos" style="margin:0;height:15px;"></input></form>'),
        $li = $('<li class="course-topbar-nav-list-item"></li>');
    $li.append($form);
    $('body').on('click', 'a.fullTextSearch', function(e) {
        var attr = e.target.attributes;
        var theVideoCache = document.querySelector("#video_fts");
        var theSourceCache = document.querySelector("#source_fts");

        function load(sectionId, videoLink, time) {
            // if (!videoCache[sectionId]) {
            //     videoCache[sectionId] = document.querySelector("#video_fts_" + sectionId);
            //     sourceCache[sectionId] = document.querySelector("#source_fts_" + sectionId);
            // }
            theSourceCache.src = videoLink + "#t=" + time + "," + (parseInt(time, 10) + 10);
            theVideoCache.load();
            theVideoCache.play();
            theVideoCache.scrollIntoViewIfNeeded();
        }
        load(attr["data-section"].value, attr["data-video"].value, attr["data-time"].value);

    });
    $form.submit(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var r = lunrIndex.search(e.target.firstChild.value);
        // Data transforming holy hell
        var sections = _.chain(r)
            .map(function getProperties(o) {
                var t = o.ref.split("#");
                var time = parseInt(t[1], 10),
                    video = parseInt(t[0], 10);
                var section = videoUrls[video].section;
                return {
                    time: parseInt(time, 10),
                    video: video,
                    section: parseInt(section, 10),
                    ref: o.ref
                };
            })
            .groupBy(function(o) {
                return o.section;
            })
            .sortBy(function(v, k) {
                return parseInt(k, 10);
            })
            .map(function(v, k) {
                return {
                    videos: v,
                    header: videoUrls[v[0].video].header
                };
            })
            .value();


        _.each(sections, function(v, k, o) {
            var x = _.chain(v.videos)
                .groupBy(function(o) {
                    return o.video;
                })
                .sortBy("video")
                .map(function(v, k) {
                    var t = videoUrls[v[0].video];
                    var quotes = _.chain(v)
                        .sortBy("time").map(function(v) {
                            return [v.time, subtitles[v.ref]];
                        }).value();
                    return {
                        title: t.text,
                        link: t.link,
                        quotes: quotes
                    };
                })
                .value();
            o[k].videos = x;
        });
        picoModal(HANDLEBAR_TEMPLATES["coursera-searcher/result.hbs"](sections)).afterClose(function(modal) {
            modal.destroy();
        }).show();
        return false;
    });

    var target = document.querySelector("body");

    // Create an observer instance
    var observer = new MutationObserver(function( mutations ) {
      mutations.forEach(function( mutation ) {
        var newNodes = mutation.addedNodes; // DOM NodeList
        if( newNodes !== null && document.querySelector('.course-topbar-nav-list') !== null) { // If there are new nodes added
            $('.course-topbar-nav-list').prepend($li);
            observer.disconnect();
        }
      });
    });

    // Configuration of the observer:
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };
     
    observer.observe(target, config);
};
init();