#!/usr/bin/env ruby
require 'json'

filename = 'coursera-searcher/manifest.json'

text = File.read(filename)
json = JSON.parse(text)


version = json['version'].split(".")

if (version[2] == "9") 
	version[2] = "0"
	version[1] = (version[1].to_i + 1).to_s
else
	version[-1] = (version[-1].to_i + 1).to_s
end

vstring = version[0] + "." + version[1] + "." + version[2]
json['version'] = vstring

File.open(filename, "w") do |f|
	f.write(JSON.pretty_generate(json))
end

`zip -r coursera-searcher coursera-searcher`
p `grunt publish`
