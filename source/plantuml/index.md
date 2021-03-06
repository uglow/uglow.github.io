---
title: PlantUML
date: 2015-03-14 22:26:35
---

[PlantUML Homepage](https://plantuml.com/)
[All SkinParams](https://plantuml-documentation.readthedocs.io/en/latest/formatting/all-skin-params.html)
[AWS Icons](https://github.com/awslabs/aws-icons-for-plantuml/tree/master/dist)

## Text

Purpose | Command
:------ | :------
Default Font | `skinparam defaultFontName "Comic Sans MS"`
Default Font Size | `skinparam defaultFontSize 18`
[Default Text Alignment](https://plantuml.com/skinparam) | `skinparam defaultTextAlignment center,left,right`
[Links](https://plantuml.com/link) | {% codeblock lang:bash line_number:false %}    participant Bob [[http://www.yahoo.com]]
    Bob -> Alice : [[http://www.google.com]] hello

    class Dummy [[http://www.yahoo.com]]
    Object <|-- Foo
    class Foo {
      [[http://www.google.com]]
      + methods1() [[http://www.yahoo.com/A1{Some explainations about this method}]]
      + methods2() [[http://www.yahoo.com/A2]]
    }
     
    class Foo2 {
      + methods1() [[http://www.yahoo.com/B1]]
      + methods2() [[http://www.yahoo.com/B2]]
    }
     
    class Object {
      [[http://www.yahoo.com]]
    }
    
    :Foo:
    note left of Foo {
    [[http://www.google.com]]
    This is a note
    }
    
    note right of Foo {
    Yet another link to [[http://www.google.com]] as demo.
    You can also <u>[[http://www.yahoo.fr specify a text]]</u> for the link.
    And even <u>[[http://www.yahoo.fr{This is a tooltip} add a tooltip]]</u> to the link.
    }

    Dummy -> Alice : foo1
    ref over Alice, Dummy : [[http://www.google.com]] Foo2
    
    Alice -> Bob : hello
    
    ref over Alice, Bob
      [[http://www.google.com]]
      this is a
      reference over
      Alice and Bob
    end
    {% endcodeblock %}
Link Colour | `skinparam HyperLinkColor red`
Title | {% codeblock lang:bash line_number:false %}
    skinparam titleBorderRoundCorner 15
    skinparam titleBorderThickness 2
    skinparam titleBorderColor red
    skinparam titleBackgroundColor Aqua-CadetBlue
    
    title Some Title
    {% endcodeblock %}
[Bold / Italics](https://plantuml.com/creole) | {% codeblock lang:bash line_number:false %}
    rectangle "<i>Platform engineer</i>" as buildDeployDevOps <<role>>
    rectangle "**Success**" as canBuildProdApp <<success>>
    {% endcodeblock %}
Lists, Lines, Headings, Tables, Trees | [Creole Styling](https://plantuml.com/creole)
[Text Alignment on Sequence Arrows](https://forum.plantuml.net/8626/align-text-on-arrows-of-sequence-digrams?show=8626#q8626) | `skinparam SequenceMessageAlign first`
                                         
    
    
## Layout

Purpose | Command
:------ | :------
Direction | `left to right direction`. Default is top to bottom.
Footer | {% codeblock lang:bash line_number:false %}
    center footer Generated for demonstration
    {% endcodeblock %}
Header | {% codeblock lang:bash line_number:false %}
    header
    <font color=red>Warning:</font>
    Do not use in production.
    endheader
    {% endcodeblock %}
Spacing between nodes | {% codeblock lang:bash line_number:false %}
                        skinparam padding 0
                        skinparam nodesep 30
                        skinparam ranksep 30
                        {% endcodeblock %}
Line Types (3 options) | {% codeblock lang:bash line_number:false %}
    /' Default is splines (curved lines) '/
    skinParam lineType ortho
    skinparam linetype polyline
    {% endcodeblock %}

## Styling

Purpose | Command
:------ | :------
Background Colour | `skinparam backgroundColor transparent`
[Change base-shape style](https://plantuml.com/archimate-diagram) (for Archimate shapes) | `!define junction circle #cornflowerblue;line:transparent`
Handwritten style | `skinparam handwritten true`
Shape styling | {% codeblock lang:bash line_number:false %}
    skinparam arrowColor cornflowerblue
    skinparam arrowThickness 1.5
    skinparam shadowing false
    skinparam defaultFontName "Comic Sans MS"
    {% endcodeblock %}
Stereotype styling | {% codeblock lang:bash line_number:false %}    skinparam rectangle<<recomm>> {
      backgroundColor business
    }
    
    skinparam rectangle<<choice>> {
      backgroundColor bisque
    }
    
    skinparam rectangle<<option>> {
      backgroundColor<<option>> gainsboro
    }{% endcodeblock %}
Strict UML (straight lines or simple arrow heads) | `skinparam style strictuml  /' Turns the note arrow into a line '/`

## Icons

Purpose | Command
:------ | :------
Define & use an image with scaling | {% codeblock lang:bash line_number:false %} 
    /' Path to all your images (optional) '/
    !define AWSPuml ../plantuml/lib/aws/dist
    
    /' Path relative to above path '/
    !define awsLogo AWSPuml/../aws-cloud.png`
    
    rectangle "<img:awsLogo{scale=0.4}>" <<awsGroup>> {    
      originAccessId .> webserver : provides secure access to
    }
    {% endcodeblock %}
    
## Source Code

Purpose | Command
:------ | :------
Comments | {% codeblock lang:bash line_number:false %}
    ' Start of line comment
    class Foo { /' end of line comment '/
    {% endcodeblock %}
Functions | {% codeblock lang:bash line_number:false %}
    !unquoted function $row($name, $type)
    $cell($name, $type) |
    !endfunction
    
    !unquoted function $cell($name, $type)
    !if ($type == "r")  /' recommended '/
    !return "|<#business> " + $name
    !elseif ($type == "o") /' optional '/
    !return "|<#gainsboro> " + $name
    !else /' consider '/
    !return "|<#white> " + $name
    !endif
    !endfunction
    
    /' Calling a function '/
    note as mobileFrameworks
     $row(Flutter, r)
    endnote    
    {% endcodeblock %}
Hiding elements | {% codeblock lang:bash line_number:false %}
    hide stereotype
    hide empty description
    {% endcodeblock %}
[Including files](https://plantuml.com/preprocessing) | `!import ../learning-pathway.lib.iuml!COMMON`
[Including Subparts](https://plantuml.com/preprocessing) | {% codeblock lang:bash line_number:false %}
    /' File A '/
    !includesub ../learning-pathway.lib.iuml!LEGEND
    
    /' learning-pathway.lib.iuml '/
    !startsub NOT_USED
    skinparam note {
       backgroundColor #beige
       backgroundColor<<warning>> #red
       shadowing false /' not working '/
       borderColor #beige
    }
    !endsub
    
    !startsub LEGEND
    skinparam legendBackgroundColor #transparent
    skinparam legendBorderColor #white
    legend top left
    | Legend |
    |<#bisque> Pick-one |
    |<#business> Recommended |
    |<#gainsboro> Optional |
    |<#white> Also consider |
    endlegend
    !endsub
    {% endcodeblock %}

## Exporting

To export a diagram that has hyperlinks, it needs to be saved as an **SVG** and included using this syntax:
```
<!-- Need to use Object tags to get the links in an SVG to be clickable -->
<object data="se-front-end.svg" type="image/svg+xml" width="100%">
    <img src="se-front-end.svg"/>
</object>
```
