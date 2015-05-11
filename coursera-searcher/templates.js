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