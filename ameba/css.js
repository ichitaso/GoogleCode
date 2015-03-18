$(document).ready(function() {
  $("head").append('<link rel="stylesheet" href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" type="text/css" />');
  $("head").append('<link rel="stylesheet" href="http://alexgorbatchev.com/pub/sh/current/styles/shCore.css" type="text/css" />');
 
  function path() {
    var args = arguments,
    result = [];
 
    for(var i = 0; i < args.length; i++)
      result.push(args[i].replace('@', 'http://alexgorbatchev.com/pub/sh/current/scripts/'));
 
    return result
  }
 
  SyntaxHighlighter.autoloader.apply(null, path(
    'applescript            @shBrushAppleScript.js',
    'actionscript3 as3      @shBrushAS3.js',
    'bash shell             @shBrushBash.js',
    'coldfusion cf          @shBrushColdFusion.js',
    'cpp c                  @shBrushCpp.js',
    'c# c-sharp csharp      @shBrushCSharp.js',
    'css                    @shBrushCss.js',
    'delphi pascal          @shBrushDelphi.js',
    'diff patch pas         @shBrushDiff.js',
    'erl erlang             @shBrushErlang.js',
    'groovy                 @shBrushGroovy.js',
    'java                   @shBrushJava.js',
    'jfx javafx             @shBrushJavaFX.js',
    'js jscript javascript  @shBrushJScript.js',
    'perl pl                @shBrushPerl.js',
    'php                    @shBrushPhp.js',
    'text plain             @shBrushPlain.js',
    'py python              @shBrushPython.js',
    'ruby rails ror rb      @shBrushRuby.js',
    'sass scss              @shBrushSass.js',
    'scala                  @shBrushScala.js',
    'sql                    @shBrushSql.js',
    'xml xhtml xslt html    @shBrushXml.js'
  ));
  SyntaxHighlighter.all();
 
});