// to do:

/*
    - add error message when image URL is wrong
*/

;(function ( $, window, document, undefined ) {
    var editor = undefined;
    var settings = undefined;
    var sliderDragging = false;
    var copiedStyles = undefined;
    var indexOfShapeToDelete = 0;

    // Preview settings, Used when the tour launches
    var preview_settings = {"id":4333,"editor":{"previewMode":0,"selected_shape":"spot-8364","tool":"poly"},"general":{"name":"Demo","width":1280,"height":776,"responsive":1,"sticky_tooltips":0,"constrain_tooltips":1,"image_url":"https://webcraftplugins.com/uploads/image-map-pro/demo.jpg","tooltip_animation":"grow","pageload_animation":"none","fullscreen_tooltips":"none","late_initialization":0},"spots":[{"id":"spot-8364","type":"spot","x":26,"y":19.8,"width":44,"height":44,"actions":{"mouseover":"show-tooltip","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#000000","fill_opacity":0.4,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":1,"icon_type":"library","icon_svg_path":"M409.81,160.113C409.79,71.684,338.136,0,249.725,0C161.276,0,89.583,71.684,89.583,160.113     c0,76.325,119.274,280.238,151.955,334.638c1.72,2.882,4.826,4.641,8.178,4.641c3.351,0,6.468-1.759,8.168-4.631     C290.545,440.361,409.81,236.438,409.81,160.113z M249.716,283.999c-68.303,0-123.915-55.573-123.915-123.895     c0-68.313,55.592-123.895,123.915-123.895s123.876,55.582,123.876,123.895S318.029,283.999,249.716,283.999z","icon_svg_viewbox":"0 0 499.392 499.392","icon_fill":"#000000","icon_url":"","icon_is_pin":1,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffffff","fill_opacity":0.4,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#ffcd00"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"left","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Mouseover the building below!","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[],"vs":[]},{"id":"poly-2893","type":"poly","x":15.75744680851064,"y":22.26270172030207,"width":22.844376899696048,"height":65.97720051389715,"actions":{"mouseover":"show-tooltip","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":450,"auto_width":0},"tooltip_content":{"content_type":"content-builder","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-359931\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Heading\",\"iconClass\":\"fa fa-header\"},\"options\":{\"heading\":{\"text\":\"Content Builder for the Tooltips\"}}},{\"settings\":{\"name\":\"Image\",\"iconClass\":\"fa fa-camera\"},\"options\":{\"layout\":{\"column_span\":{\"lg\":{\"class\":\"col-lg-6\"}}}}},{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"},\"options\":{\"text\":{\"text\":\"Image Map Pro 3.0 comes with a fully featured content builder that allows you to add rich content to your tooltips. Images, video, buttons, responsive grid system - it has it all!\"},\"layout\":{\"column_span\":{\"lg\":{\"class\":\"col-lg-6\"}}}}},{\"settings\":{\"name\":\"Button\",\"iconClass\":\"fa fa-link\"},\"options\":{\"button\":{\"text\":\"Example Button!\",\"display\":\"block\"}}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-273621\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><h3 id=\"\" style=\"\" class=\"\">Content Builder for the Tooltips</h3></div><div id=\"sq-element-241571\" class=\"squares-element col-lg-6 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><img src=\"https://webcraftplugins.com/uploads/placeholder_image.png\" id=\"\" style=\"\" class=\"\"></div><div id=\"sq-element-574821\" class=\"squares-element col-lg-6 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Image Map Pro 3.0 comes with a fully featured content builder that allows you to add rich content to your tooltips. Images, video, buttons, responsive grid system - it has it all!</p></div><div id=\"sq-element-33221\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><div id=\"\" style=\"\" class=\"\"><a href=\"#\" style=\"display: block; height: 44px; line-height: 44px; background-color: #2196f3; color: #ffffff; border-radius: 10px; padding-left: 20px; padding-right: 20px; \"  class=\"squares-button\">Example Button!</a></div></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":2.8712844939993056,"y":100},{"x":3.536549668697936,"y":95.06062700400813},{"x":0.8754889699034004,"y":95.06062700400813},{"x":0,"y":47.12265849973005},{"x":0.7847960076976461,"y":23.53692508155694},{"x":3.9088248123944527,"y":17.15586649440026},{"x":12.222274912965194,"y":15.76484496015944},{"x":15.056281433779493,"y":7.219083609526608},{"x":19.502913861465178,"y":6.533930832820084},{"x":19.502913861465178,"y":4.254220219285366},{"x":26.155565608451525,"y":1.9745096057506475},{"x":33.47348253013651,"y":0.8346542989832882},{"x":38.79560392772559,"y":0.4547025300608352},{"x":44.78299050001331,"y":0},{"x":52.766172596396935,"y":1.8997588446122655},{"x":59.41882434338327,"y":0.7599035378449062},{"x":64.49612815668326,"y":2.2028938646528204},{"x":70.93855610846484,"y":3.267998410281798},{"x":70.30788472285052,"y":9.951430765378646},{"x":85.60898374091914,"y":7.900104410746106},{"x":100,"y":12.231141378913366},{"x":99.33473482530137,"y":71.50361733081603},{"x":94.67787860241093,"y":71.1236655618936},{"x":94.67787860241093,"y":73.02342440650584},{"x":74.71992336145188,"y":73.02342440650584},{"x":74.71992336145188,"y":99.62004823107758}],"vs":[[210.09118541033433,684.7416413373859],[212.03647416413372,659.4528875379939],[204.25531914893617,659.4528875379939],[201.69531914893616,414.0186018237082],[203.99012564995655,293.2636383750531],[213.12503655683665,260.593698339942],[237.43423174842115,253.4719035012826],[245.72109422492397,209.7190516717325],[258.7234042553191,206.21118541033434],[258.7234042553191,194.53945288753798],[278.17629179331306,182.86772036474164],[299.57446808510633,177.03185410334345],[315.1367781155015,175.08656534954406],[332.64437689969606,172.75856534954406],[355.9878419452888,182.48500911854103],[375.44072948328267,176.64914285714283],[390.2871732522796,184.03700911854102],[409.12534954407295,189.49016413373857],[407.2812158054711,223.70820668693008],[452.0228571428571,213.20576291793313],[494.10334346504555,235.37993920972644],[492.15805471124617,538.8449848024316],[478.54103343465044,536.8996960486323],[478.54103343465044,546.6261398176291],[420.18237082066867,546.6261398176291],[420.18237082066867,682.7963525835867]]},{"id":"poly-974","type":"poly","x":41.03343465045592,"y":2.50681540438066,"width":19.908814589665656,"height":84.47967912762823,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":3.0534351145038165,"y":91.98813056379822},{"x":0,"y":10.979228486646884},{"x":11.450381679389313,"y":7.71513353115727},{"x":11.450381679389313,"y":6.528189910979229},{"x":3.0534351145038165,"y":3.857566765578635},{"x":29.00763358778626,"y":0},{"x":55.72519083969466,"y":5.934718100890208},{"x":60.30534351145038,"y":5.341246290801187},{"x":72.51908396946564,"y":8.605341246290802},{"x":73.2824427480916,"y":9.792284866468842},{"x":93.12977099236642,"y":14.540059347181009},{"x":93.12977099236642,"y":28.18991097922849},{"x":100,"y":30.267062314540063},{"x":98.47328244274809,"y":100},{"x":58.01526717557252,"y":100},{"x":57.25190839694656,"y":91.3946587537092},{"x":25.190839694656486,"y":91.0979228486647},{"x":25.190839694656486,"y":89.31750741839762},{"x":10.687022900763358,"y":89.02077151335311},{"x":10.687022900763358,"y":90.80118694362018}],"vs":[[533.0091185410333,622.4924012158053],[525.2279635258358,91.4285714285714],[554.4072948328267,70.0303951367781],[554.4072948328267,62.24924012158054],[533.0091185410333,44.741641337386014],[599.1489361702127,19.45288753799392],[667.2340425531914,58.358662613981764],[678.9057750759878,54.46808510638297],[710.030395136778,75.86626139817629],[711.9756838905774,83.64741641337383],[762.5531914893617,114.77203647416411],[762.5531914893617,204.25531914893614],[780.0607902735562,217.8723404255319],[776.1702127659574,675.0151975683889],[673.0699088145896,675.0151975683889],[671.1246200607902,618.6018237082064],[589.4224924012158,616.6565349544071],[589.4224924012158,604.9848024316108],[552.4620060790272,603.0395136778113],[552.4620060790272,614.7112462006078]]},{"id":"poly-225","type":"poly","x":64.74164133738601,"y":16.043618588036225,"width":18.84498480243161,"height":71.4442390248488,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":1.6129032258064515,"y":92.28070175438596},{"x":0,"y":25.6140350877193},{"x":2.4193548387096775,"y":25.6140350877193},{"x":2.4193548387096775,"y":12.982456140350877},{"x":15.32258064516129,"y":11.578947368421053},{"x":15.32258064516129,"y":5.964912280701754},{"x":31.451612903225808,"y":4.912280701754386},{"x":30.64516129032258,"y":2.807017543859649},{"x":54.03225806451613,"y":1.7543859649122806},{"x":54.83870967741935,"y":3.1578947368421053},{"x":77.41935483870968,"y":0},{"x":91.12903225806451,"y":5.614035087719298},{"x":91.93548387096774,"y":21.75438596491228},{"x":98.38709677419355,"y":25.6140350877193},{"x":100,"y":81.05263157894737},{"x":98.38709677419355,"y":89.47368421052632},{"x":86.29032258064517,"y":89.47368421052632},{"x":85.48387096774194,"y":99.64912280701755},{"x":3.225806451612903,"y":100}],"vs":[[832.5835866261398,636.1094224924011],[828.693009118541,266.5045592705167],[834.5288753799392,266.5045592705167],[834.5288753799392,196.47416413373858],[865.6534954407294,188.69300911854103],[865.6534954407294,157.56838905775075],[904.5592705167173,151.73252279635258],[902.6139817629179,140.06079027355622],[959.0273556231002,134.22492401215806],[960.9726443768997,142.0060790273556],[1015.4407294832827,124.4984802431611],[1048.5106382978722,155.62310030395136],[1050.4559270516718,245.1063829787234],[1066.018237082067,266.5045592705167],[1069.9088145896656,573.8601823708206],[1066.018237082067,620.547112462006],[1036.838905775076,620.547112462006],[1034.8936170212764,676.9604863221883],[836.4741641337386,678.9057750759878]]},{"id":"poly-1879","type":"poly","x":88.14589665653494,"y":53.14448657286999,"width":11.854103343465045,"height":35.09541566132924,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":5.128205128205128,"y":99.28571428571429},{"x":3.8461538461538463,"y":19.28571428571429},{"x":0,"y":13.571428571428571},{"x":8.974358974358974,"y":13.571428571428571},{"x":10.256410256410255,"y":10},{"x":14.102564102564102,"y":9.285714285714286},{"x":15.384615384615385,"y":5.714285714285714},{"x":98.71794871794873,"y":0},{"x":100,"y":100}],"vs":[[1136.0486322188447,682.7963525835867],[1134.1033434650453,464.9240121580547],[1128.267477203647,449.36170212765956],[1141.8844984802429,449.36170212765956],[1143.8297872340422,439.6352583586626],[1149.6656534954404,437.6899696048632],[1151.6109422492398,427.9635258358662],[1278.0547112462002,412.4012158054711],[1279.9999999999995,684.741641337386]]},{"id":"poly-5080","type":"poly","x":3.1914893617021276,"y":57.15539121987905,"width":12.613981762917934,"height":31.08451101432018,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":1.2048192771084338,"y":100},{"x":0,"y":92.74193548387096},{"x":13.253012048192772,"y":90.32258064516128},{"x":14.457831325301203,"y":87.09677419354838},{"x":28.915662650602407,"y":87.09677419354838},{"x":32.53012048192771,"y":50},{"x":38.55421686746988,"y":41.12903225806452},{"x":45.78313253012048,"y":41.12903225806452},{"x":44.57831325301205,"y":20.967741935483872},{"x":66.26506024096386,"y":15.32258064516129},{"x":67.46987951807229,"y":2.4193548387096775},{"x":83.13253012048193,"y":0},{"x":98.79518072289156,"y":4.838709677419355},{"x":100,"y":99.19354838709677}],"vs":[[42.796352583586625,684.741641337386],[40.85106382978723,667.2340425531914],[62.24924012158054,661.3981762917932],[64.19452887537993,653.6170212765958],[87.53799392097264,653.6170212765958],[93.37386018237082,564.1337386018237],[103.10030395136778,542.7355623100304],[114.77203647416414,542.7355623100304],[112.82674772036475,494.10334346504555],[147.8419452887538,480.48632218844983],[149.7872340425532,449.36170212765956],[175.07598784194528,443.5258358662614],[200.3647416413374,455.1975683890577],[202.31003039513678,682.7963525835866]]},{"id":"poly-3579","type":"poly","x":33.586626139817625,"y":69.9401497822204,"width":7.598784194528875,"height":18.55043399241688,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":100,"y":0},{"x":0,"y":9.45945945945946},{"x":4,"y":97.2972972972973},{"x":84,"y":100},{"x":80,"y":56.75675675675676},{"x":100,"y":52.702702702702695}],"vs":[[527.1732522796352,542.7355623100303],[429.9088145896656,556.3525835866261],[433.7993920972644,682.7963525835866],[511.61094224924005,686.6869300911853],[507.7203647416413,624.4376899696048],[527.1732522796352,618.6018237082067]]},{"id":"poly-919","type":"poly","x":39.66565349544073,"y":77.71127753580045,"width":12.917933130699089,"height":10.277943157960705,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":96.47058823529412,"y":100},{"x":100,"y":26.82926829268293},{"x":50.588235294117645,"y":17.073170731707318},{"x":50.588235294117645,"y":12.195121951219512},{"x":44.70588235294118,"y":0},{"x":28.235294117647058,"y":0},{"x":27.058823529411764,"y":14.634146341463413},{"x":0,"y":24.390243902439025},{"x":1.1764705882352942,"y":97.5609756097561}],"vs":[[667.2340425531916,682.7963525835866],[673.0699088145897,624.4376899696048],[591.3677811550152,616.6565349544072],[591.3677811550152,612.7659574468084],[581.6413373860182,603.0395136778114],[554.4072948328268,603.0395136778114],[552.4620060790273,614.7112462006078],[507.72036474164133,622.4924012158053],[509.6656534954407,680.8510638297871]]},{"id":"poly-9983","type":"poly","x":60.334346504559264,"y":73.95105442922947,"width":4.86322188449848,"height":14.038166264531696,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":15.625,"y":0},{"x":84.375,"y":0},{"x":96.875,"y":10.714285714285714},{"x":100,"y":96.42857142857143},{"x":0,"y":100},{"x":0,"y":16.071428571428573}],"vs":[[782.0060790273557,573.8601823708207],[824.8024316109422,573.8601823708207],[832.5835866261398,585.531914893617],[834.5288753799392,678.9057750759879],[772.2796352583587,682.7963525835867],[772.2796352583587,591.3677811550152]]},{"id":"poly-9416","type":"poly","x":80.69908814589665,"y":74.20173596966752,"width":8.054711246200611,"height":13.78748472409363,"actions":{"mouseover":"no-action","click":"no-action","link":"#","open_link_in_new_window":1},"default_style":{"opacity":1,"border_radius":50,"background_color":"#000000","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","use_icon":0,"icon_type":"library","icon_svg_path":"","icon_svg_viewbox":"","icon_fill":"#2196f3","icon_url":"","icon_is_pin":0,"icon_shadow":0},"mouseover_style":{"opacity":1,"border_radius":50,"background_color":"#ffffff","background_opacity":0.4,"border_width":0,"border_style":"solid","border_color":"#ffffff","border_opacity":1,"fill":"#ffcd00","fill_opacity":0.5112781954887218,"stroke_color":"#ffffff","stroke_opacity":0.75,"stroke_width":0,"stroke_dasharray":"10 10","stroke_linecap":"round","icon_fill":"#000000"},"tooltip_style":{"border_radius":5,"padding":20,"background_color":"#000000","background_opacity":0.9,"position":"top","width":300,"auto_width":1},"tooltip_content":{"content_type":"plain-text","plain_text":"Lorem Ipsum","plain_text_color":"#ffffff","squares_json":"{\"containers\":[{\"id\":\"sq-container-403761\",\"settings\":{\"elements\":[{\"settings\":{\"name\":\"Paragraph\",\"iconClass\":\"fa fa-paragraph\"}}]}}]}","squares_content":"<div class=\"squares-container\"><div id=\"sq-element-725001\" class=\"squares-element col-lg-12 \" style=\"margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; \"><p id=\"\" style=\"\" class=\"\">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class=\"squares-clear\"></div></div>"},"points":[{"x":0,"y":98.18181818181819},{"x":0,"y":47.27272727272727},{"x":30.188679245282955,"y":41.81818181818181},{"x":33.962264150943305,"y":0.029659090909091627},{"x":84.90566037735844,"y":0},{"x":98.11320754716974,"y":10.909090909090908},{"x":100,"y":100}],"vs":[[1032.9483282674773,680.8510638297872],[1032.9483282674773,626.3829787234042],[1064.0729483282676,620.547112462006],[1067.9635258358662,575.8372036474163],[1120.48632218845,575.80547112462],[1134.1033434650458,587.4772036474163],[1136.0486322188451,682.7963525835866]]}]};
    var tmp_settings = undefined;

    // For safe keeping only
    var demo_drawing_shapes_settings = {"id":8264,"editor":{"previewMode":1,"selected_shape":"poly-3332","tool":"poly"},"general":{"name":"Demo - Drawing Shapes","width":5245,"height":4428,"image_url":"img/demo_2.jpg"},"spots":[{"id":"poly-3332","type":"poly","x":3.409,"y":21.12,"width":94.279,"height":33.12,"actions":{"mouseover":"no-action"},"default_style":{"fill":"#ffffff","fill_opacity":0},"mouseover_style":{"fill":"#209ee8","fill_opacity":0.6533864541832669},"tooltip_style":{"auto_width":1},"points":[{"x":0,"y":76.44927536231886},{"x":0.5675485690757941,"y":100},{"x":39.6814667832578,"y":63.28502415458939},{"x":47.56156019637138,"y":57.97101449275364},{"x":51.28669526438871,"y":57.00483091787441},{"x":56.01475131225687,"y":58.454106280193265},{"x":60.169709657353124,"y":62.318840579710155},{"x":100,"y":99.03381642512075},{"x":99.71345114861406,"y":69.56521739130436},{"x":60.026435231660145,"y":5.797101449275358},{"x":55.58492803517794,"y":1.4492753623188424},{"x":52.86271394701143,"y":0.4830917874396141},{"x":48.707755601915174,"y":0},{"x":44.122973979739996,"y":1.4492753623188424},{"x":42.11713202003835,"y":3.864734299516913},{"x":40.11129006033671,"y":6.763285024154586}],"vs":[[178.81136000000004,2056.3632],[206.87616000000003,2401.7471999999993],[2141.0265600000002,1863.3023999999998],[2530.69056,1785.3696],[2714.89536,1771.1999999999998],[2948.69376,1792.4544],[3154.15296,1849.1327999999999],[5123.72736,2387.577599999999],[5109.55776,1955.4047999999998],[3147.06816,1020.2111999999998],[2927.43936,956.448],[2792.82816,942.2783999999999],[2587.3689600000002,935.1936],[2360.6553599999997,956.448],[2261.46816,991.872],[2162.2809599999996,1034.3808]]},{"id":"poly-3432","type":"poly","x":3.809,"y":40.16,"width":93.744,"height":25.92,"actions":{"mouseover":"no-action"},"default_style":{"fill":"#ffffff","fill_opacity":0},"mouseover_style":{"fill":"#209ee8","fill_opacity":0.6533864541832669},"tooltip_style":{"auto_width":1},"points":[{"x":0,"y":100},{"x":37.89625360230547,"y":93.20987654320986},{"x":48.84726224783862,"y":94.44444444444446},{"x":60.37463976945246,"y":91.35802469135804},{"x":100,"y":95.67901234567906},{"x":99.85590778097982,"y":53.086419753086425},{"x":60.61982514337632,"y":6.249999999999992},{"x":56.77233429394812,"y":2.4691358024691383},{"x":53.7463976945245,"y":0.6172839506172709},{"x":51.44092219020173,"y":0},{"x":48.559077809798275,"y":1.2345679012345692},{"x":45.38904899135447,"y":2.4691358024691383},{"x":42.65129682997118,"y":4.320987654320978},{"x":39.62536023054755,"y":6.790123456790117},{"x":0.14409221902017288,"y":53.703703703703724}],"vs":[[199.79136,2926.0224],[2063.0937599999997,2848.0895999999993],[2601.5385600000004,2862.2592],[3168.3225600000005,2826.8352],[5116.64256,2876.4288000000006],[5109.55776,2387.5776],[3180.3779600000003,1850.0184],[2991.20256,1806.6240000000003],[2842.42176,1785.3696],[2729.06496,1778.2848000000001],[2587.3689600000002,1792.4544],[2431.50336,1806.6240000000003],[2296.8921600000003,1827.8784],[2148.1113600000003,1856.2176],[206.87616,2394.6624]]},{"id":"poly-1676","type":"poly","x":3.269,"y":63.84,"width":94.149,"height":25.1,"actions":{"mouseover":"no-action"},"default_style":{"fill":"#ffffff","fill_opacity":0},"mouseover_style":{"fill":"#209ee8","fill_opacity":0.6533864541832669},"tooltip_style":{"auto_width":1},"points":[{"x":0.573888091822095,"y":57.370517928286844},{"x":40.45911047345766,"y":92.43027888446213},{"x":42.71904594344843,"y":98.64541832669322},{"x":46.162374494380984,"y":99.60159362549803},{"x":49.78087548391025,"y":99.36254980079683},{"x":53.39381968664259,"y":100},{"x":56.85773507962243,"y":94.18326693227088},{"x":60.54519368723099,"y":88.60557768924303},{"x":70.01434720229557,"y":78.40637450199203},{"x":77.18794835007174,"y":71.39442231075694},{"x":85.5093256814921,"y":62.47011952191235},{"x":93.974175035868,"y":55.45816733067726},{"x":100,"y":49.08366533864542},{"x":100,"y":4.4621513944223},{"x":60.83213773314202,"y":0},{"x":57.53228120516497,"y":1.2749003984063756},{"x":39.45480631276901,"y":1.2749003984063756},{"x":1.0043041606886653,"y":7.649402390438224},{"x":0.1434720229555236,"y":8.286852589641455},{"x":0,"y":12.111553784860554},{"x":0.573888091822095,"y":18.486055776892403}],"vs":[[199.79135999999997,3464.4672],[2169.365759999999,3854.1312],[2280.9637599999996,3923.2079999999996],[2450.998959999999,3933.8352000000004],[2629.684359999999,3931.1784000000002],[2808.09536,3938.2632000000003],[2979.1471599999995,3873.6143999999995],[3161.23776,3811.6224],[3628.8345600000007,3698.2656],[3983.0745599999996,3620.3327999999997],[4393.99296,3521.1456],[4811.99616,3443.2128],[5109.55776,3372.3648000000003],[5109.55776,2876.4287999999997],[3175.407359999999,2826.8352],[3012.4569599999986,2841.0048],[2119.77216,2841.0048],[221.04575999999994,2911.8527999999997],[178.53695999999997,2918.9376],[171.45215999999996,2961.4464],[199.79135999999997,3032.2943999999998]]}]};

    // Default settings
    var default_settings = {
        id: 0,
        editor: {
            previewMode: 0,
            selected_shape: -1,
            tool: 'spot'
        },
        general: {
            name: '',
            shortcode: '',
            width: 1050,
            height: 700,
            responsive: 1,
            sticky_tooltips: 0,
            constrain_tooltips: 1,
            image_url: 'https://webcraftplugins.com/uploads/image-map-pro/demo.jpg',
            tooltip_animation: 'grow',
            pageload_animation: 'none',
            fullscreen_tooltips: 'none', // none / mobile / always,
            late_initialization: 0
        }, spots: [
            // type (spot, rect, ellipse, poly), x, y, width, height, points(arr)
            // default styles, mouseover styles
        ]
    };
    var default_spot_settings = {
        id: 'spot-0',
        type: 'spot',
        x: -1,
        y: -1,
        width: 44,
        height: 44,
        actions: {
            mouseover: 'show-tooltip',
            click: 'no-action',
            link: '#',
            open_link_in_new_window: 1
        },
        default_style: {
            opacity: 1,
            border_radius: 50,
            background_color: '#000000',
            background_opacity: 0.4,
            border_width: 0,
            border_style: 'solid',
            border_color: '#ffffff',
            border_opacity: 1,

            // poly-specific
            fill: '#000000',
            fill_opacity: 0.4,
            stroke_color: '#ffffff',
            stroke_opacity: 0.75,
            stroke_width: 0,
            stroke_dasharray: '10 10',
            stroke_linecap: 'round',

            // spot-specific
            use_icon: 0,
            icon_type: 'library', // or 'custom'
            icon_svg_path: 'M409.81,160.113C409.79,71.684,338.136,0,249.725,0C161.276,0,89.583,71.684,89.583,160.113     c0,76.325,119.274,280.238,151.955,334.638c1.72,2.882,4.826,4.641,8.178,4.641c3.351,0,6.468-1.759,8.168-4.631     C290.545,440.361,409.81,236.438,409.81,160.113z M249.716,283.999c-68.303,0-123.915-55.573-123.915-123.895     c0-68.313,55.592-123.895,123.915-123.895s123.876,55.582,123.876,123.895S318.029,283.999,249.716,283.999z',
            icon_svg_viewbox: '0 0 499.392 499.392',
            icon_fill: '#000000',
            icon_url: '',
            icon_is_pin: 0,
            icon_shadow: 0
        },
        mouseover_style: {
            opacity: 1,
            border_radius: 50,
            background_color: '#ffffff',
            background_opacity: 0.4,
            border_width: 0,
            border_style: 'solid',
            border_color: '#ffffff',
            border_opacity: 1,

            // poly-specific
            fill: '#ffffff',
            fill_opacity: 0.4,
            stroke_color: '#ffffff',
            stroke_opacity: 0.75,
            stroke_width: 0,
            stroke_dasharray: '10 10',
            stroke_linecap: 'round',

            // spot-specific
            icon_fill: '#000000'
        },
        tooltip_style: {
            border_radius: 5,
            padding: 20,
            background_color: '#000000',
            background_opacity: 0.9,
            position: 'top',
            width: 300,
            auto_width: 0
        },
        tooltip_content: {
            content_type: 'plain-text',
            plain_text: 'Lorem Ipsum',
            plain_text_color: '#ffffff',
            squares_json: '{"containers":[{"id":"sq-container-403761","settings":{"elements":[{"settings":{"name":"Paragraph","iconClass":"fa fa-paragraph"}}]}}]}',
            squares_content: '<div class="squares-container"><div id="sq-element-725001" class="squares-element col-lg-12 " style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; float: left; font-family: sans-serif; font-size: 14px; font-weight: normal; font-style: normal; line-height: 22px; color: #ffffff; text-align: left; text-decoration: none; text-transform: none; background-color: rgba(255, 255, 255, 0); opacity: 1; box-shadow: none; border-width: 0px; border-style: none; border-color: rgba(0, 0, 0, 1); border-radius: 0px; "><p id="" style="" class="">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p></div><div class="squares-clear"></div></div>',
        },
        points: [],
        vs: []
    }

    $.imageMapProDefaultSettings = $.extend(true, {}, default_settings);
    $.imageMapProDefaultSpotSettings = $.extend(true, {}, default_spot_settings);

    // SQUARES API =============================================================
    $.squaresExtendElementDefaults({
        defaultControls: {
            font: {
                text_color: {
                    name: 'Text Color',
                    type: 'color',
                    default: '#ffffff'
                },
            }
        }
    });
    // =========================================================================

    // WCP EDITOR API ==========================================================

    // WCP TOUR API ============================================================
    $.wcpTourCoordinatesForTipForStep = function(step) {
        if (step == 0) {
            return {
                x: $('#wcp-editor-toolbar').offset().left,
                y: $('#wcp-editor-toolbar').offset().top + $('#wcp-editor-toolbar').height()/2
            }
        }
        if (step == 1) {
            return {
                x: $('[data-wcp-main-tab-button-name="Shape"]').offset().left + 20,
                y: $('[data-wcp-main-tab-button-name="Shape"]').offset().top + 40
            }
        }
        if (step == 2) {
            return {
                x: $('#wcp-editor-right').offset().left - 20,
                y: $('#wcp-editor-right').offset().top + 50
            }
        }
        if (step == 3) {
            return {
                x: $('[data-wcp-form-tab-button-name="icon"]').offset().left + 64,
                y: $('[data-wcp-form-tab-button-name="icon"]').offset().top + 28
            }
        }
        if (step == 4) {
            return {
                x: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().left + 64,
                y: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().top + 28
            }
        }
        if (step == 5) {
            return {
                x: $('[data-wcp-main-tab-button-name="Image Map"]').offset().left + 150,
                y: $('[data-wcp-main-tab-button-name="Image Map"]').offset().top + 40
            }
        }
        if (step == 6) {
            return {
                x: $('#wcp-editor-button-preview').offset().left + 64,
                y: $('#wcp-editor-button-preview').offset().top + 32
            }
        }
        if (step == 7) {
            return {
                x: $('#wcp-editor-button-load').offset().left + 64,
                y: $('#wcp-editor-button-load').offset().top + 32
            }
        }
        if (step == 8) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="export"]').offset().left + 64,
                y: $('[data-wcp-editor-extra-main-button-name="export"]').offset().top + 32
            }
        }
        if (step == 9) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="code"]').offset().left + 64,
                y: $('[data-wcp-editor-extra-main-button-name="code"]').offset().top + 32
            }
        }
    }
    $.wcpTourCoordinatesForHighlightRect = function(step) {
        if (step == 0) {
            return {
                x: $('#wcp-editor-toolbar').offset().left,
                y: $('#wcp-editor-toolbar').offset().top,
                width: $('#wcp-editor-toolbar').outerWidth(),
                height: $('#wcp-editor-toolbar').outerHeight(),
            }
        }
        if (step == 1) {
            return {
                x: $('[data-wcp-main-tab-button-name="Shape"]').offset().left,
                y: $('[data-wcp-main-tab-button-name="Shape"]').offset().top,
                width: $('[data-wcp-main-tab-button-name="Shape"]').outerWidth(),
                height: $('[data-wcp-main-tab-button-name="Shape"]').outerHeight(),
            }
        }
        if (step == 2) {
            return {
                x: $('#wcp-editor-right').offset().left,
                y: $('#wcp-editor-right').offset().top,
                width: $('#wcp-editor-right').outerWidth(),
                height: $('#wcp-editor-right').outerHeight(),
            }
        }
        if (step == 3) {
            return {
                x: $('[data-wcp-form-tab-button-name="icon"]').offset().left,
                y: $('[data-wcp-form-tab-button-name="icon"]').offset().top,
                width: $('[data-wcp-form-tab-button-name="icon"]').outerWidth(),
                height: $('[data-wcp-form-tab-button-name="icon"]').outerHeight(),
            }
        }
        if (step == 4) {
            return {
                x: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().left,
                y: $('[data-wcp-form-tab-button-name="tooltip_content"]').offset().top,
                width: $('[data-wcp-form-tab-button-name="tooltip_content"]').outerWidth(),
                height: $('[data-wcp-form-tab-button-name="tooltip_content"]').outerHeight(),
            }
        }
        if (step == 5) {
            return {
                x: $('[data-wcp-main-tab-button-name="Image Map"]').offset().left,
                y: $('[data-wcp-main-tab-button-name="Image Map"]').offset().top,
                width: $('[data-wcp-main-tab-button-name="Image Map"]').outerWidth(),
                height: $('[data-wcp-main-tab-button-name="Image Map"]').outerHeight(),
            }
        }
        if (step == 6) {
            return {
                x: $('#wcp-editor-button-preview').offset().left,
                y: $('#wcp-editor-button-preview').offset().top,
                width: $('#wcp-editor-button-preview').outerWidth(),
                height: $('#wcp-editor-button-preview').outerHeight(),
            }
        }
        if (step == 7) {
            return {
                x: $('#wcp-editor-button-save').offset().left,
                y: $('#wcp-editor-button-save').offset().top,
                width: $('#wcp-editor-button-save').outerWidth() + $('#wcp-editor-button-load').outerWidth(),
                height: $('#wcp-editor-button-save').outerHeight(),
            }
        }
        if (step == 8) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="import"]').offset().left,
                y: $('[data-wcp-editor-extra-main-button-name="import"]').offset().top,
                width: $('[data-wcp-editor-extra-main-button-name="import"]').outerWidth() + $('[data-wcp-editor-extra-main-button-name="export"]').outerWidth(),
                height: $('[data-wcp-editor-extra-main-button-name="import"]').outerHeight(),
            }
        }
        if (step == 9) {
            return {
                x: $('[data-wcp-editor-extra-main-button-name="code"]').offset().left,
                y: $('[data-wcp-editor-extra-main-button-name="code"]').offset().top,
                width: $('[data-wcp-editor-extra-main-button-name="code"]').outerWidth(),
                height: $('[data-wcp-editor-extra-main-button-name="code"]').outerHeight(),
            }
        }
    }
    $.wcpTourEventStarted = function() {
        tmp_settings = settings;
        settings = preview_settings;
        editor.shapesFormSpotIndex = -1; // Force redraw of the form
        editor.redraw();
        $.wcpEditorOpenMainTabWithName('Shape');
    }
    $.wcpTourEventFinished = function() {
        settings = tmp_settings;
        editor.redraw();
    }

    // [data source] Called on initialization:
    $.wcpEditorGetContentForTabWithName = function(tabName) {
        if (tabName == 'Image Map') {
            return $.wcpEditorGetHTMLForFormWithName('Image Map Settings');
        }
        if (tabName == 'Shape') {
            return $.wcpEditorGetHTMLForFormWithName('Shape Settings');
        }
    }
    $.wcpEditorGetContentForCanvas = function() {
        return '';
    }
    $.wcpEditorGetListItems = function() {
        var items = [];

        // Returns an array of objects in the format { id: 'id', title: 'title' }
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];
            items.push({ id: s.id, title: s.id });
        }

        return items;
    }
    // [data source] Get a list of saves
    $.wcpEditorGetSaves = function(callback) {
        $.imp_editor_storage_get_saves_list(function(savesList) {
            var list = new Array();

            for (var i=0; i<savesList.length; i++) {
                var listItem = {
                    name: savesList[i].meta.name,
                    id: savesList[i].id
                };

                list.push(listItem);
            }

            callback(list);
        });
    }
    // [data source] Provide encoded JSON for export
    $.wcpEditorGetExportJSON = function() {
        return JSON.stringify(editor.getCompressedSettings());
    }

    // Form events
    $.wcpEditorEventFormUpdated = function(formName, controlName) {
        if (formName == 'Image Map Settings') {
            var m = $.wcpEditorGetModelOfFormWithName(formName);

            // Did the image URL change?
            if (m.image.image_url && m.image.image_url.length > 0 && settings.general.image_url !== m.image.image_url) {
                settings.general.image_url = m.image.image_url;
                editor.canvasImage.src = m.image.image_url;

                loadImage(editor.canvasImage, function() {
                    // Image is loading
                    // Show loader
                    $.wcpEditorPresentLoadingScreen('Loading Image...');
                }, function() {
                    // Image has loaded
                    // init canvas events
                    editor.canvas_events();

                    // Hide loader
                    $.wcpEditorHideLoadingScreen();

                    settings.general.width = editor.canvasImage.naturalWidth;
                    settings.general.height = editor.canvasImage.naturalHeight;

                    $.wcpEditorSetControlValue('Image Map Settings', 'image_map_width', settings.general.width);
                    $.wcpEditorSetControlValue('Image Map Settings', 'image_map_height', settings.general.height);
                    $.wcpEditorUpdateForm('Image Map Settings');

                    editor.redraw();
                    editor.addAction();
                }, function() {
                    $.wcpEditorHideLoadingScreenWithMessage('Error Loading Image!', true);
                });
            } else {
                settings.general.name = m.general.image_map_name;
                if (m.general.image_map_shortcode) {
                    settings.general.shortcode = m.general.image_map_shortcode.replace(/[\[\]']+/g,'');
                }
                settings.general.width = m.general.image_map_width;
                settings.general.height = m.general.image_map_height;
                settings.general.responsive = m.general.responsive;
                settings.general.sticky_tooltips = m.general.sticky_tooltips;
                settings.general.constrain_tooltips = m.general.constrain_tooltips;
                settings.general.image_url = m.image.image_url;
                settings.general.tooltip_animation = m.general.tooltip_animation;
                settings.general.pageload_animation = m.general.pageload_animation;
                settings.general.fullscreen_tooltips = m.general.fullscreen_tooltips;
                settings.general.late_initialization = m.general.late_initialization;

                editor.redraw();
                editor.addAction();
            }
        }
        if (formName == 'Shape Settings' && editor.selectedSpot !== undefined) {
            var s = editor.selectedSpot;
            var model = $.wcpEditorGetModelOfFormWithName('Shape Settings');

            // General
            s.x = model.general.x;
            s.y = model.general.y;
            s.width = model.general.width;
            s.height = model.general.height;

            // Actions
            s.actions.mouseover = model.actions.mouseover;
            s.actions.click = model.actions.click;
            s.actions.link = model.actions.link;
            s.actions.open_link_in_new_window = model.actions.open_link_in_new_window;

            // Default style
            s.default_style.opacity = model.default_style.opacity;
            s.default_style.icon_fill = model.default_style.icon_fill;
            s.default_style.border_radius = model.default_style.border_radius;
            s.default_style.background_color = model.default_style.background_color;
            s.default_style.background_opacity = model.default_style.background_opacity;
            s.default_style.border_width = model.default_style.border_width;
            s.default_style.border_style = model.default_style.border_style;
            s.default_style.border_color = model.default_style.border_color;
            s.default_style.border_opacity = model.default_style.border_opacity;
            s.default_style.fill = model.default_style.fill;
            s.default_style.fill_opacity = model.default_style.fill_opacity;
            s.default_style.stroke_color = model.default_style.stroke_color;
            s.default_style.stroke_opacity = model.default_style.stroke_opacity;
            s.default_style.stroke_width = model.default_style.stroke_width;
            s.default_style.stroke_dasharray = model.default_style.stroke_dasharray;
            s.default_style.stroke_linecap = model.default_style.stroke_linecap;
            s.default_style.use_icon = model.icon.use_icon;
            s.default_style.icon_type = model.icon.icon_type;
            s.default_style.icon_svg_path = model.icon.icon_svg_path;
            s.default_style.icon_svg_viewbox = model.icon.icon_svg_viewbox;
            s.default_style.icon_url = model.icon.icon_url;
            s.default_style.icon_is_pin = model.icon.icon_is_pin;
            s.default_style.icon_shadow = model.icon.icon_shadow;

            // Mouseover style
            s.mouseover_style.opacity = model.mouseover_style.mouseover_opacity;
            s.mouseover_style.icon_fill = model.mouseover_style.mouseover_icon_fill;
            s.mouseover_style.border_radius = model.mouseover_style.mouseover_border_radius;
            s.mouseover_style.background_color = model.mouseover_style.mouseover_background_color;
            s.mouseover_style.background_opacity = model.mouseover_style.mouseover_background_opacity;
            s.mouseover_style.border_width = model.mouseover_style.mouseover_border_width;
            s.mouseover_style.border_style = model.mouseover_style.mouseover_border_style;
            s.mouseover_style.border_color = model.mouseover_style.mouseover_border_color;
            s.mouseover_style.border_opacity = model.mouseover_style.mouseover_border_opacity;
            s.mouseover_style.fill = model.mouseover_style.mouseover_fill;
            s.mouseover_style.fill_opacity = model.mouseover_style.mouseover_fill_opacity;
            s.mouseover_style.stroke_color = model.mouseover_style.mouseover_stroke_color;
            s.mouseover_style.stroke_opacity = model.mouseover_style.mouseover_stroke_opacity;
            s.mouseover_style.stroke_width = model.mouseover_style.mouseover_stroke_width;
            s.mouseover_style.stroke_dasharray = model.mouseover_style.mouseover_stroke_dasharray;
            s.mouseover_style.stroke_linecap = model.mouseover_style.mouseover_stroke_linecap;

            // Tooltip style
            s.tooltip_style.border_radius = model.tooltip_settings.tooltip_border_radius;
            s.tooltip_style.padding = model.tooltip_settings.tooltip_padding;
            s.tooltip_style.background_color = model.tooltip_settings.tooltip_background_color;
            s.tooltip_style.background_opacity = model.tooltip_settings.tooltip_background_opacity;
            s.tooltip_style.position = model.tooltip_settings.tooltip_position;
            s.tooltip_style.width = model.tooltip_settings.tooltip_width;
            s.tooltip_style.auto_width = model.tooltip_settings.tooltip_auto_width;

            // Tooltip content
            s.tooltip_content.content_type = model.tooltip_content.tooltip_content_type;
            s.tooltip_content.plain_text = model.tooltip_content.plain_text;
            s.tooltip_content.plain_text_color = model.tooltip_content.plain_text_color;
            s.tooltip_content.squares_json = model.tooltip_content.squares_json;
            s.tooltip_content.squares_content = model.tooltip_content.squares_content;

            editor.redraw();
            if (!sliderDragging) { editor.addAction(); }
        }
    }

    // Main button events
    $.wcpEditorEventNewButtonPressed = function() {}
    $.wcpEditorEventSaveButtonPressed = function() {
        $.wcpEditorPresentLoadingScreen('Saving...');

        $.imp_editor_storage_store_save(editor.getCompressedSettings(), function(progress) {
            if (progress) {
                $.wcpEditorUpdateLoadingScreenMessage('Saving... ' + progress + '%');
            } else {
                $.imp_editor_storage_set_last_save(settings.id, function() {
                    $.wcpEditorHideLoadingScreenWithMessage('Saved!', false);
                });
            }
        });
    }
    $.wcpEditorEventLoadButtonPressed = function() {}
    $.wcpEditorEventUndoButtonPressed = function() {
        editor.undo();
    }
    $.wcpEditorEventRedoButtonPressed = function() {
        editor.redo();
    }
    $.wcpEditorEventPreviewButtonPressed = function() {}
    $.wcpEditorEventEnteredPreviewMode = function() {
        settings.editor.previewMode = 1;
        editor.redraw();
    }
    $.wcpEditorEventExitedPreviewMode = function() {
        settings.editor.previewMode = 0;
        editor.redraw();
    }

    // List events
    $.wcpEditorEventListItemMouseover = function(itemID) {
        if (parseInt(settings.editor.previewMode, 10) == 1) {
            $.imageMapProHighlightShape(settings.general.name, itemID);
        }
    }
    $.wcpEditorEventListItemSelected = function(itemID) {
        editor.selectSpot(itemID);
        editor.redraw();

        if (parseInt(settings.editor.previewMode, 10) == 1) {
            $.imageMapProHighlightShape(settings.general.name, itemID);

            if (editor.selectedSpot.actions.mouseover == 'show-tooltip' || editor.selectedSpot.actions.click == 'show-tooltip') {
                $.imageMapProOpenTooltip(settings.general.name, itemID);
            }
        }
    }
    $.wcpEditorEventListItemMoved = function(itemID, oldIndex, newIndex) {
        // Example of how to handle an item reorder

        // Move the item with itemID from listItems to the new index
        if (newIndex > settings.spots.length - 1) {
            newIndex = settings.spots.length - 1;
        }

        settings.spots.splice(newIndex, 0, settings.spots.splice(oldIndex, 1)[0]);

        // Send the new list items to the editor
        var listItems = [];

        // Returns an array of objects in the format { id: 'id', title: 'title' }
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];
            listItems.push({ id: s.id, title: s.id });
        }
        $.wcpEditorSetListItems(listItems);

        // Re-select the selected item (it's not the editor's responsibility to remember that)
        $.wcpEditorSelectListItem(settings.editor.selected_shape);
    }
    $.wcpEditorEventListItemButtonPressed = function(itemID, buttonName) {
        if (buttonName == 'duplicate') {
            var i = editor.getIndexOfSpotWithId(itemID);
            var s = $.extend(true, {}, settings.spots[i]);

            if (s.type == 'spot') s.id = editor.createIdForSpot();
            if (s.type == 'rect') s.id = editor.createIdForRect();
            if (s.type == 'oval') s.id = editor.createIdForOval();
            if (s.type == 'poly') s.id = editor.createIdForPoly();

            settings.spots.push(s);

            editor.redraw();
            editor.addAction();
        }

        if (buttonName == 'copy') {
            var i = editor.getIndexOfSpotWithId(itemID);
            copiedStyles = {
                default_style: $.extend(true, {}, settings.spots[i].default_style),
                mouseover_style: $.extend(true, {}, settings.spots[i].mouseover_style),
                tooltip_style: $.extend(true, {}, settings.spots[i].tooltip_style),
                tooltip_content: {
                    plain_text_color: settings.spots[i].tooltip_content.plain_text_color
                }
            }
        }

        if (buttonName == 'paste') {
            var i = editor.getIndexOfSpotWithId(itemID);
            settings.spots[i].default_style = $.extend(true, {}, copiedStyles.default_style);
            settings.spots[i].mouseover_style = $.extend(true, {}, copiedStyles.mouseover_style);
            settings.spots[i].tooltip_style = $.extend(true, {}, copiedStyles.tooltip_style);
            settings.spots[i].tooltip_content.plain_text_color = copiedStyles.tooltip_content.plain_text_color;

            editor.redraw();
            editor.addAction();
        }

        if (buttonName == 'delete') {
            indexOfShapeToDelete = editor.getIndexOfSpotWithId(itemID);

            $.wcpEditorPresentModal({
                name: 'confirm-delete-shape',
                title: 'Confirm Delete',
                buttons: [
                    {
                        name: 'cancel',
                        title: 'Cancel',
                        class: ''
                    },
                    {
                        name: 'delete',
                        title: 'Delete',
                        class: 'danger'
                    }
                ],
                body: 'Delete this shape?'
            });
        }
    }

    // Tool events
    $.wcpEditorEventSelectedTool = function(toolName) {
        settings.editor.tool = toolName;
    }

    // Extra main button events
    $.wcpEditorEventExtraMainButtonClick = function(buttonName) {
        if (buttonName == 'code') {
            var html = '';

            html += '<div id="imp-generated-code-wrap">';
            html += '<div class="generated-code-help">';
            html += '    This is a sample HTML document, showing how to install the plugin in your website.';
            html += '</div>';

            html += '<pre>';
            html += '&lt;!doctype html&gt;<br>';
            html += '&lt;html&gt;<br>';
            html += '&lt;head&gt;<br>';
            html += '    <strong><span class="em-code">&lt;link rel=&quot;stylesheet&quot; href=&quot;css/image-map-pro.min.css&quot;&gt;</span></strong><br>';
            html += '    <strong><span class="em-code">&lt;link rel=&quot;stylesheet&quot; href=&quot;css/squares.min.css&quot;&gt;</span></strong><br>';
            html += '&lt;/head&gt;<br>';
            html += '&lt;body&gt;<br>';
            html += '    &lt;div id=&quot;<strong><span class="em-code">image-map-pro-container</span></strong>&quot;&gt;&lt;/div&gt;<br><br>';

            html += '    &lt;script src=&quot;js/jquery.min.js&quot;&gt;&lt;/script&gt;<br>';
            html += '    <strong><span class="em-code">&lt;script src=&quot;js/image-map-pro.min.js&quot;&gt;&lt;/script&gt;</span></strong><br>';
            html += '    &lt;script type=&quot;text/javascript&quot;&gt;<br>';
            html += '        ;(function ($, window, document, undefined) {<br>';
            html += '            $(document).ready(function() {<br>';
            html += '</pre>';
            html += '<div class="generated-code-help">The code that contains all settings and initializes the plugin:</div>';

            html += '<textarea id="textarea-generated-code" rows="4"></textarea>';

            html += '    <pre>';
            html += '            });<br>';
            html += '        })(jQuery, window, document);<br>';
            html += '    &lt;/script&gt;<br>';
            html += '&lt;/body&gt;<br>';
            html += '&lt;/html&gt;<br>';
            html += '</pre>';
            html += '</div>';

            $.wcpEditorPresentModal({
                name: 'code',
                title: 'Code',
                buttons: [
                    {
                        name: 'done',
                        title: 'Done',
                        class: 'primary'
                    }
                ],
                body: html
            });

            $('#textarea-generated-code').val("$('#image-map-pro-container').imageMapPro("+ JSON.stringify(editor.getCompressedSettings()) +");");
        }
    }

    // Modal events
    $.wcpEditorEventModalButtonClicked = function(modalName, buttonName) {
        if (modalName == 'create_new') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'modal-choose-icon') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'load') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'confirm-delete-shape') {
            if (buttonName == 'delete') {
                // If the deleted spot was selected, deselect it
                if (settings.editor.selected_shape == settings.spots[indexOfShapeToDelete].id) {
                    editor.deselectSpot();
                }

                settings.spots.splice(indexOfShapeToDelete, 1);

                $.wcpEditorCloseModal();

                editor.redraw();
                editor.addAction();
            }
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'code') {
            if (buttonName == 'done') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'export') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
        if (modalName == 'import') {
            if (buttonName == 'cancel') {
                $.wcpEditorCloseModal();
            }
        }
    }
    $.wcpEditorEventModalClosed = function(modalName) {}

    // Create new event
    $.wcpEditorEventCreatedNewInstance = function(instanceName) {
        settings = $.extend(true, {}, default_settings);

        settings.id = Math.round(Math.random() * 10000) + 1;
        settings.general.name = instanceName;

        $.wcpEditorPresentLoadingScreen('Creating...');

        $.imp_editor_storage_store_save(editor.getCompressedSettings(), function() {
            $.imp_editor_storage_set_last_save(settings.id, function() {
                // Launch editor
                editor.launch();

                $.wcpEditorHideLoadingScreenWithMessage('Created!', false);
            });
        });
    }

    // Event for loading a save
    $.wcpEditorEventLoadSaveWithID = function(saveID) {
        $.wcpEditorPresentLoadingScreen('Loading Image Map...');

        $.imp_editor_storage_get_save(saveID, function(save) {
            if (!save) {
                $.wcpEditorHideLoadingScreenWithMessage('Error loading image map.', true);
            } else {
                settings = save;

                $.imp_editor_storage_set_last_save(settings.id, function() {
                    $.wcpEditorHideLoadingScreen();
                    editor.launch();
                });
            }
        });
    }

    // Event for deleting a save
    $.wcpEditorEventDeleteSaveWithID = function(saveID, cb) {
        $.imp_editor_storage_delete_save(saveID, function() {
            cb();
        });
    }

    // Event for importing
    $.wcpEditorEventImportedJSON = function(parsedJSON) {
        // Preserve the map name and ID to avoid conflicts
        var mapName = settings.general.name;
        var mapID = settings.id;

        // Set the settings
        settings = $.extend(true, {}, parsedJSON);

        // Set the map name
        settings.general.name = mapName;
        settings.id = mapID;

        editor.launch();
    }

    // Event for help button
    $.wcpEditorEventHelpButtonPressed = function() {
        $.wcpTourRestart('Image Map Pro Editor Tour');
    }

    // CONTROLS API ============================================================
    $.wcpEditorSliderStartedDragging = function() {
        sliderDragging = true;
    }
    $.wcpEditorSliderFinishedDragging = function() {
        sliderDragging = false;
    }

    // IMAGE MAP PRO EDITOR API ================================================

    $.image_map_pro_default_spot_settings = function() {
        return default_spot_settings;
    }

    $.image_map_pro_init_editor = function(initSettings, wcpEditorSettings) {
        editor = new Editor();
        editor.init(initSettings, wcpEditorSettings);
    }

    $.image_map_pro_editor_current_settings = function() {
        return settings;
    }

    $.image_map_pro_editor_compressed_settings = function() {
        return editor.getCompressedSettings();
    }

    $.image_map_pro_user_uploaded_image = function() {}


    // EDITOR CLASS ============================================================

    function Editor() {
        this.wcpEditorSettings = undefined;

        // undo/redo
        this.actionStack = new Array();
        this.actionIndex = 0;

        // canvas
        this.canvasImage = new Image();
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.canvas = undefined;

        this.ix = 0; // in pixels, canvas space
        this.iy = 0;
        this.x = 0;
        this.y = 0;
        this.dx = 0; // in percentage, canvas space
        this.dy = 0;

        this.drawRectWidth = 0;
        this.drawRectHeight = 0;

        this.transformX = 0;
        this.transformY = 0;
        this.transformWidth = 0;
        this.transformHeight = 0;

        this.eventSpotId = undefined;
        this.redrawEl = undefined;
        this.redrawSvgEl = undefined;
        this.redrawPolygonEl = undefined;

        this.tempControlPoint = undefined;
        this.tempControlPointLine = undefined;
        this.tempControlPointIndex = undefined;

        this.controlPointInsertionPointX = 0;
        this.controlPointInsertionPointY = 0;

        this.translatedPointIndex = 0;
        this.translatedPoint = undefined;

        this.translatedPointX = 0;
        this.translatedPointY = 0;

        this.polyPoints = new Array();

        // flags
        this.startedSelecting = false;
        this.startedMoving = false;
        this.startedTransforming = false;
        this.transformDirection = 0;

        this.startedDrawingSpot = false;

        this.startedDrawingRect = false;
        this.createdDrawingRect = false;

        this.startedDrawingOval = false;
        this.createdDrawingOval = false;

        this.startedDrawingPoly = false;
        this.drawingPoly = false;
        this.finishedDrawingPoly = false;
        this.mouseDownWhileDrawingPoly = false;

        this.startedTranslatingControlPoint = false;
        this.translatingControlPoint = false;

        this.didDeleteControlPoint = false;

        this.shouldDeselectSpot = false;

        // vars
        this.selectedSpot = undefined;
        this.eventSpot = undefined;
        this.shapesFormSpotIndex = undefined;
        this.iconsHTML = undefined;
    }
    Editor.prototype.init = function(initSettings, wcpEditorSettings) {
        var self = this;

        // events & other
        self.events();
        self.loadIconLibrary();

        // Initialize the editor
        self.wcpEditorSettings = wcpEditorSettings;
        settings = $.extend(true, {}, default_settings);
        $.wcpEditorInit(this.wcpEditorSettings);

        // If settings were passed with initialization, use them and don't look for saves
        if (initSettings) {
            settings = initSettings;

            // launch
            self.launch();
        } else {
            // Load last save
            $.imp_editor_storage_get_last_save(function(lastSaveID) {
                if (lastSaveID && parseInt(lastSaveID, 10) != 0 && !isNaN(parseInt(lastSaveID, 10))) {
                    $.wcpEditorPresentLoadingScreen('Loading Image Map...');
                    $.imp_editor_storage_get_save(parseInt(lastSaveID, 10), function(save) {
                        if (!save) {
                            $.wcpEditorHideLoadingScreenWithMessage('Error loading image map.', true);
                        } else {
                            settings = save;
                            editor.launch();
                        }
                    });
                } else {
                    // Get a list of saves
                    $.imp_editor_storage_get_saves_list(function(savesList) {
                        if (savesList.length > 0) {
                            // Launch with defaults
                            settings = $.extend(true, {}, default_settings);
                            settings.general.name = 'Untitled';
                            settings.id = Math.round(Math.random() * 10000) + 1;
                            self.launch();

                            // Display saves modal
                            $.wcpEditorPresentLoadModal();
                        } else {
                            // If no saves are available, launch with default settings
                            settings = $.extend(true, {}, default_settings);
                            settings.general.name = 'Untitled';
                            settings.id = Math.round(Math.random() * 10000) + 1;
                            self.launch();
                        }
                    });
                }
            });
        }
    };
    Editor.prototype.launch = function() {
        var self = this;

        // Initialize the editor
        $.wcpEditorInit(this.wcpEditorSettings);

        // Reset vars
        this.selectedSpot = undefined;
        this.eventSpot = undefined;
        this.shapesFormSpotIndex = undefined;

        this.parseSettings();

        // If there is an image URL entered, show the loader and start redraw
        if (settings.general.image_url && settings.general.image_url.length > 0) {
            self.canvasImage.src = settings.general.image_url;

            loadImage(self.canvasImage, function() {
                // Image is loading
                // Show loader
                $.wcpEditorPresentLoadingScreen('Loading Image...');
            }, function() {
                // Image has loaded
                // Hide loader

                // init canvas events
                self.canvas_events();

                settings.general.width = self.canvasImage.naturalWidth;
                settings.general.height = self.canvasImage.naturalHeight;

                self.redraw();
                self.selectSpot(settings.editor.selected_shape);

                $.wcpEditorHideLoadingScreen();
            }, function() {
                $.wcpEditorHideLoadingScreenWithMessage('Error Loading Image!', true);
            });
        } else {
            $.wcpEditorHideLoadingScreen();
            $.wcpEditorOpenMainTabWithName('Image Map');
            $.wcpEditorFormOpenTab('Image Map Settings', 'image');
        }

        // Variables
        this.actionIndex = -1;
        this.actionStack = new Array();
        this.addAction();
        this.canvas = $('#wcp-editor-canvas');

        // Select the active tool
        $.wcpEditorSelectTool(settings.editor.tool);

        // Init general settings form
        this.updateImageMapForm();

        // Present guided tour
        $.wcpTourStart('Image Map Pro Editor Tour');
    }
    Editor.prototype.parseSettings = function() {

        // Make sure spot coordinates are numbers
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];

            s.x = parseFloat(s.x);
            s.y = parseFloat(s.y);

            if (s.width) {
                s.width = parseFloat(s.width);
            }
            if (s.height) {
                s.height = parseFloat(s.height);
            }

            if (s.type == 'poly') {
                if (s.points) {
                    for (var j=0; j<s.points.length; j++) {
                        s.points[j].x = parseFloat(s.points[j].x);
                        s.points[j].y = parseFloat(s.points[j].y);
                    }
                }
                if (s.vs) {
                    for (var j=0; j<s.vs.length; j++) {
                        for (var k=0; k<s.vs[j].length; k++) {
                            s.vs[j][0] = parseFloat(s.vs[j][0]);
                            s.vs[j][1] = parseFloat(s.vs[j][1]);
                        }
                    }
                }
            }
        }

        settings.general.width = parseInt(settings.general.width);
        settings.general.height = parseInt(settings.general.height);

        // Uncompress and update legacy spot options
        for (var i=0; i<settings.spots.length; i++) {
            settings.spots[i] = $.extend(true, {}, default_spot_settings, settings.spots[i]);

            // Migrate the title and text to the plain_text setting
            if (settings.spots[i].tooltip_content.title || settings.spots[i].tooltip_content.text) {
                var plainText = '';

                if (settings.spots[i].tooltip_content.title) {
                    plainText += '<h3>' + settings.spots[i].tooltip_content.title + '</h3>';
                }
                if (settings.spots[i].tooltip_content.text) {
                    plainText += '<p>' + settings.spots[i].tooltip_content.text + '</p>';
                }

                settings.spots[i].tooltip_content.plain_text = plainText;

                settings.spots[i].tooltip_content = {
                    content_type: settings.spots[i].tooltip_content.content_type,
                    plain_text: settings.spots[i].tooltip_content.plain_text,
                    plain_text_color: settings.spots[i].tooltip_content.plain_text_color,
                    squares_json: settings.spots[i].tooltip_content.squares_json,
                    squares_content: settings.spots[i].tooltip_content.squares_content
                };
            }
        }
        // Update legacy general options
        settings.general = $.extend(true, {}, default_settings.general, settings.general);
        settings.editor = $.extend(true, {}, default_settings.editor, settings.editor);
    }
    Editor.prototype.redraw = function() {
        var self = this;

        // Calculate canvas dimentions
        var canvasBackgroundWidth = $('#wcp-editor-center').width() - 80;
        var canvasBackgroundHeight = $('#wcp-editor-center').height() - 80;

        if (settings.general.width > canvasBackgroundWidth || settings.general.height > canvasBackgroundHeight) {
            // Canvas needs to be resized to fit the editor's background
            var imageRatio = settings.general.width / settings.general.height;
            var backgroundRatio = canvasBackgroundWidth / canvasBackgroundHeight;

            if (imageRatio <= backgroundRatio) {
                // Fit to height
                self.canvasWidth = canvasBackgroundHeight * imageRatio;
                self.canvasHeight = $('#wcp-editor-center').height() - 80;
            } else {
                // Fit to width
                self.canvasWidth = $('#wcp-editor-center').width() - 80;
                self.canvasHeight = canvasBackgroundWidth/imageRatio;
            }
        } else {
            // Canvas does not need to be resized
            self.canvasWidth = settings.general.width;
            self.canvasHeight = settings.general.height;
        }

        // Fit canvas to editor
        $('#wcp-editor-canvas').css({
            width: self.canvasWidth,
            height: self.canvasHeight
        });

        if (parseInt(settings.editor.previewMode, 10) == 0) {
            // Edit mode
            // Redraw editor
            $('#wcp-editor-canvas').html($.image_map_pro_editor_content());

            $('#imp-editor-image').css({
                width: self.canvasWidth,
                height: self.canvasHeight
            });

            $.wcpEditorSetPreviewModeOff();
        } else {
            // Preview mode
            // Redraw plugin
            $('#wcp-editor-canvas').imageMapPro(settings);

            $.wcpEditorSetPreviewModeOn();
        }

        // Redraw spot selection in canvas
        self.redrawSpotSelection();

        // Update shapes form values
        self.updateShapesForm();

        // Update the state of the form
        this.updateShapesFormState();

        // Update Shapes list
        self.updateShapesList();
    }
    Editor.prototype.redrawSpotSelection = function() {
        var self = this;

        // deselect
        $('.imp-editor-shape').removeClass('selected');

        // select
        if (settings.editor.selected_shape != -1) {
            // set a reference to the selected spot
            var i = self.getIndexOfSpotWithId(settings.editor.selected_shape);

            // No such spot found
            if (i == undefined) {
                settings.editor.selected_shape = -1;
                return;
            }

            $('.imp-editor-shape[data-id="'+ settings.editor.selected_shape +'"]').addClass('selected');

            self.selectedSpot = settings.spots[i];

            // Save a reference to the SVG if it's a poly for quick redraw
            if (self.selectedSpot.type == 'poly') {
                self.tempControlPoint = $('.imp-editor-poly[data-id="'+ settings.editor.selected_shape +'"]').find('.imp-editor-poly-svg-temp-control-point');
                self.tempControlPointLine = $('.imp-editor-poly[data-id="'+ settings.editor.selected_shape +'"]').find('.imp-editor-poly-svg-temp-control-point-line');
            }
        } else {
            self.selectedSpot = undefined;
        }
    }

    Editor.prototype.events = function() {
        var self = this;

        // Button Controls events
        $(document).off('button-choose-icon-clicked');
        $(document).on('button-choose-icon-clicked', function() {
            $.wcpEditorPresentModal({
                name: 'modal-choose-icon',
                title: 'Choose Icon',
                buttons: [
                    {
                        name: 'cancel',
                        title: 'Cancel',
                        class: 'default',
                        id: 'imp-editor-button-cancel-choose-icon'
                    },
                ],
                body: self.iconsHTML
            });
        });

        // Copy styles from default to mouseover
        $(document).off('button-copy-from-default-styles-clicked');
        $(document).on('button-copy-from-default-styles-clicked', function() {
            self.selectedSpot.mouseover_style.opacity = self.selectedSpot.default_style.opacity;
            self.selectedSpot.mouseover_style.border_radius = self.selectedSpot.default_style.border_radius;
            self.selectedSpot.mouseover_style.background_color = self.selectedSpot.default_style.background_color;
            self.selectedSpot.mouseover_style.background_opacity = self.selectedSpot.default_style.background_opacity;
            self.selectedSpot.mouseover_style.border_width = self.selectedSpot.default_style.border_width;
            self.selectedSpot.mouseover_style.border_style = self.selectedSpot.default_style.border_style;
            self.selectedSpot.mouseover_style.border_color = self.selectedSpot.default_style.border_color;
            self.selectedSpot.mouseover_style.border_opacity = self.selectedSpot.default_style.border_opacity;

            self.selectedSpot.mouseover_style.fill = self.selectedSpot.default_style.fill;
            self.selectedSpot.mouseover_style.fill_opacity = self.selectedSpot.default_style.fill_opacity;
            self.selectedSpot.mouseover_style.stroke_color = self.selectedSpot.default_style.stroke_color;
            self.selectedSpot.mouseover_style.stroke_opacity = self.selectedSpot.default_style.stroke_opacity;
            self.selectedSpot.mouseover_style.stroke_width = self.selectedSpot.default_style.stroke_width;
            self.selectedSpot.mouseover_style.stroke_dasharray = self.selectedSpot.default_style.stroke_dasharray;
            self.selectedSpot.mouseover_style.stroke_linecap = self.selectedSpot.default_style.stroke_linecap;

            self.selectedSpot.mouseover_style.icon_fill = self.selectedSpot.default_style.icon_fill;

            self.redraw();
            self.addAction();
        });

        // Launch content builder
        $(document).off('button-launch-content-builder-clicked');
        $(document).on('button-launch-content-builder-clicked', function() {
            self.launchTooltipContentBuilder();
        });

        // Choose Icon modal events
        $(document).off('click', '.imp-spot-icon');
        $(document).on('click', '.imp-spot-icon', function() {
            $.wcpEditorCloseModal();
            self.selectedSpot.default_style.icon_svg_path = $(this).data('path');
            self.selectedSpot.default_style.icon_svg_viewbox = $(this).data('viewbox');
            self.redraw();
            self.addAction();
        });

        // Tooltip content builder done event
        $(document).off('click', '#imp-editor-done-editing-tooltip, #imp-editor-tooltip-content-builder-close');
        $(document).on('click', '#imp-editor-done-editing-tooltip, #imp-editor-tooltip-content-builder-close', function() {
            $('#imp-editor-tooltip-content-builder-wrap').removeClass('imp-visible');

            setTimeout(function() {
                $('#imp-editor-tooltip-content-builder-wrap').hide();
            }, 250);

            self.doneEditingTooltip();
            $.squaresHideEditorWindow();
        });
    }
    Editor.prototype.canvas_events = function() {
        var self = this;

        $(window).off('resize.imp-redraw');
        $(window).on('resize.imp-redraw', function() {
            self.redraw();
        });

        $(document).off('mousedown', '#wcp-editor-center');
        $(document).on('mousedown', '#wcp-editor-center', function(e) {
            self.handleMouseDown(e);
        });
        $(document).off('mousemove', '#wcp-editor');
        $(document).on('mousemove', '#wcp-editor', function(e) {
            self.handleMouseMove(e);
        });
        $(document).off('mouseup', '#wcp-editor');
        $(document).on('mouseup', '#wcp-editor', function(e) {
            self.handleMouseUp(e);
        });
        $(document).off('keyup.canvasEvents');
        $(document).on('keyup.canvasEvents', function(e) {
            // Abort drawing poly
            if (e.keyCode == 27 && self.drawingPoly) {
                self.drawingPoly = false;
                self.startedDrawingPoly = false;
                self.mouseDownWhileDrawingPoly = false;
                $('#temp-poly').remove();
            }
        });
        // Disable the context menu when deleting control point
        $('body').on('contextmenu', function(e) {
            if (self.didDeleteControlPoint) {
                self.didDeleteControlPoint = false;
                return false;
            }
        });
    }
    Editor.prototype.addAction = function() {
        var self = this;
        if (self.actionIndex < self.actionStack.length - 1) {
            self.actionStack.splice(self.actionIndex + 1, self.actionStack.length);
        }

        self.actionStack.push($.extend(true, {}, settings));
        self.actionIndex++;

        if (self.actionStack.length > 100) {
            self.actionStack.splice(0, 1);
            self.actionIndex--;
        }

        $('#button-save').html('<span class="glyphicon glyphicon-hdd"></span> Save');
    }
    Editor.prototype.undo = function() {
        var self = this;
        if (self.actionIndex > 0) {
            self.actionIndex--;
        }

        settings = $.extend(true, {}, self.actionStack[self.actionIndex]);

        self.redraw();

        // to do: Update forms
    }
    Editor.prototype.redo = function() {
        var self = this;
        if (self.actionIndex < self.actionStack.length - 1) {
            self.actionIndex++;
        }

        settings = $.extend(true, {}, self.actionStack[self.actionIndex]);

        self.redraw();

        // to do: Update forms
    }
    Editor.prototype.loadIconLibrary = function() {
        var self = this;

        var html = '';
        for (var i=0; i<$.webcraft_icon_library.length; i++) {
            html += '<div class="imp-spot-icon" data-path="'+ $.webcraft_icon_library[i][1] +'" data-viewbox="'+ $.webcraft_icon_library[i][0] +'">';
            html += '   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="'+ $.webcraft_icon_library[i][0] +'" xml:space="preserve" width="40px" height="40px">';
            html += '       <path style="fill:#000000" d="'+ $.webcraft_icon_library[i][1] +'"></path>';
            html += '   </svg>';
            html += '</div>';
        }

        // $('#imp-spot-icons-container').html(html);
        this.iconsHTML = html;
    }

    Editor.prototype.handleMouseDown = function(e) {
        var self = this;

        // If the event occurred on a UI element of the editor, ignore event
        if ($(e.target).attr('id') == 'wcp-editor-toolbar' || $(e.target).closest('#wcp-editor-toolbar').length == 1) {
            return;
        }
        if ($(e.target).attr('id') == 'wcp-editor-extra-main-buttons' || $(e.target).closest('#wcp-editor-extra-main-buttons').length == 1) {
            return;
        }

        // === If preview mode, return
        if (parseInt(settings.editor.previewMode, 10) == 1) return;

        // === If a modal is open, ignore
        // to do: Add this class to WCPEditor
        if ($('body').hasClass('modal-open')) return;

        var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);
        self.ix = point.x;
        self.iy = point.y;

        // === Drawing a poly?
        if (self.drawingPoly) {
            // close the loop
            if ($(e.target).is('circle') && $(e.target).data('index') == 0) {
                self.drawingPoly = false;
                self.finishedDrawingPoly = true;
                return;
            }

            // or create a new point
            self.placePointForTempPoly(self.ix, self.iy);
            self.redrawTempPoly();
            self.mouseDownWhileDrawingPoly = true;

            return;
        }

        // === Did user click on a control point?
        if (self.selectedSpot && self.selectedSpot.type == 'poly' && $(e.target).hasClass('imp-poly-control-point')) {
            $(e.target).addClass('active');

            self.translatedPointIndex = $(e.target).data('index');

            if (e.button == 2) {
                // Remove the control point
                self.selectedSpot.points.splice(self.translatedPointIndex, 1);
                self.updateBoundingBoxForPolygonSpot(self.selectedSpot);
                self.redraw();
                self.addAction();
                self.didDeleteControlPoint = true;
                return;
            }

            self.translatingControlPoint = true;

            self.translatedPointX = self.selectedSpot.points[self.translatedPointIndex].x;
            self.translatedPointY = self.selectedSpot.points[self.translatedPointIndex].y;

            // Cache
            self.translatedPoint = $(e.target);
            self.redrawPolygonEl = $(e.target).closest('.imp-editor-shape').find('.imp-editor-poly-svg polygon');

            return;
        }

        // === Did user click on a poly line?
        if (self.selectedSpot && self.selectedSpot.type == 'poly' && $(e.target).hasClass('imp-editor-poly-svg-temp-control-point')) {
            self.selectedSpot.points.splice(self.tempControlPointIndex + 1, 0, { x: self.controlPointInsertionPointX, y: self.controlPointInsertionPointY });
            self.redraw();

            // Same code as from the "click on control point action"
            var point = $('.imp-editor-shape[data-id="'+ self.selectedSpot.id +'"]').find('.imp-poly-control-point[data-index="'+ (self.tempControlPointIndex+1) +'"]');
            point.addClass('active');

            self.translatedPointIndex = point.data('index');
            self.translatingControlPoint = true;

            self.translatedPointX = self.selectedSpot.points[self.translatedPointIndex].x;
            self.translatedPointY = self.selectedSpot.points[self.translatedPointIndex].y;

            // Cache
            self.translatedPoint = point;
            self.redrawPolygonEl = point.closest('.imp-editor-shape').find('.imp-editor-poly-svg polygon');

            return;
        }

        // === Did the event happen on a transform box?
        if ($(e.target).hasClass('imp-selection-translate-box')) {
            self.startedTransforming = true;
            self.transformDirection = $(e.target).data('transform-direction');
            self.redrawEl = $(e.target).closest('.imp-editor-shape');

            if (self.selectedSpot.type == 'poly') {
                // Reference for quick redrawing
                self.redrawSvgEl = self.redrawEl.find('.imp-editor-poly-svg');
                self.redrawPolygonEl = self.redrawSvgEl.find('polygon');

                // Save the original coordinates of the poly's points
                self.polyPoints = new Array();
                for (var i=0; i<self.selectedSpot.points.length; i++) {
                    self.polyPoints.push({
                        x: self.selectedSpot.points[i].x,
                        y: self.selectedSpot.points[i].y
                    });
                }
            }

            return;
        }



        // === Did user try to select a polygon?
        for (var i=settings.spots.length - 1; i>=0; i--) {
            if (settings.spots[i].type != 'poly') continue;

            if (self.shouldSelectPoly(settings.spots[i].id)) {
                self.eventSpotId = settings.spots[i].id;
                self.startedSelecting = true;
                return;
            }
        }

        // === Did the event happen on a spot?
        if ($(e.target).hasClass('imp-editor-shape') || $(e.target).closest('.imp-editor-shape').length > 0) {
            // Make sure it's not a polygon
            if (!$(e.target).hasClass('imp-editor-poly') && $(e.target).closest('.imp-editor-poly').length == 0) {
                self.eventSpotId = $(e.target).data('id') || $(e.target).closest('.imp-editor-shape').data('id');
                self.startedSelecting = true;
                return;
            }
        }

        // === Create spots

        // === If the event is outside canvas, ignore
        if (e.pageX > self.canvas.offset().left && e.pageX < self.canvasWidth + self.canvas.offset().left && e.pageY > self.canvas.offset().top && e.pageY < self.canvasHeight + self.canvas.offset().top) {
            // Spot tool
            if (settings.editor.tool == 'spot') {
                self.startedDrawingSpot = true;
                return;
            }

            // Rect tool
            if (settings.editor.tool == 'rect') {
                self.startedDrawingRect = true;
                return;
            }

            // Ellipse tool
            if (settings.editor.tool == 'oval') {
                self.startedDrawingOval = true;
                return;
            }

            // Poly tool
            if (settings.editor.tool == 'poly') {
                self.startedDrawingPoly = true;

                // deselect and redraw
                self.deselectSpot();
                self.redraw();

                // create a temp array of points
                self.polyPoints = new Array();

                // create a temp poly
                $('#imp-editor-shapes-container').append('<svg id="temp-poly" width="'+ self.canvasWidth +'px" height="'+ self.canvasHeight +'px" viewBox="0 0 '+ self.canvasWidth +' '+ self.canvasHeight +'" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>')

                // place the first point
                self.placePointForTempPoly(self.ix, self.iy);
                self.redrawTempPoly();
                self.mouseDownWhileDrawingPoly = true;

                self.drawingPoly = true;
                return;
            }
        }

        // If event happened outside the canvas, set the flag to deselect spot
        if ($(e.target).attr('id') == 'wcp-editor-center' && this.selectedSpot) {
            this.shouldDeselectSpot = true;
        }
        // self.deselectSpot();
        // self.redraw();
        // self.addAction();
    }
    Editor.prototype.handleMouseMove = function(e) {
        var self = this;

        // === If preview mode, return
        if (parseInt(settings.editor.previewMode, 10) == 1) return;

        var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);

        self.x = point.x;
        self.y = point.y;

        self.dx = ((self.x - self.ix)/self.canvasWidth) * 100;
        self.dy = ((self.y - self.iy)/self.canvasHeight) * 100;

        self.dx = Math.round(self.dx * 10) / 10;
        self.dy = Math.round(self.dy * 10) / 10;

        // Select
        if (self.startedSelecting) {
            self.selectSpot(self.eventSpotId);
            self.redrawEl = $('.imp-editor-shape[data-id="'+ self.eventSpotId +'"]');

            // Manually select the spot
            self.redrawSpotSelection();

            self.startedMoving = true;
            self.startedSelecting = false;
        }

        // Move
        if (self.startedMoving) {
            var c = limitToCanvas(self.selectedSpot.x + self.dx, self.selectedSpot.y + self.dy);

            if (self.selectedSpot.type == 'rect' || self.selectedSpot.type == 'oval' || self.selectedSpot.type == 'poly') {
                if (c.x + self.selectedSpot.width > 100) {
                    c.x = 100 - self.selectedSpot.width;
                }
                if (c.y + self.selectedSpot.height > 100) {
                    c.y = 100 - self.selectedSpot.height;
                }
            }

            self.redrawEl.css({
                left: c.x + '%',
                top: c.y + '%'
            });

            return;
        }

        // Transform
        if (self.startedTransforming) {
            var c, d;

            if (self.transformDirection == 1) {
                c = { x: self.selectedSpot.x + self.dx, y: self.selectedSpot.y + self.dy };
                d = { x: self.selectedSpot.width - self.dx, y: self.selectedSpot.height - self.dy };
            }
            if (self.transformDirection == 2) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y + self.dy };
                d = { x: self.selectedSpot.width, y: self.selectedSpot.height - self.dy };
            }
            if (self.transformDirection == 3) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y + self.dy };
                d = { x: self.selectedSpot.width + self.dx, y: self.selectedSpot.height - self.dy };
            }
            if (self.transformDirection == 4) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width + self.dx, y: self.selectedSpot.height };
            }
            if (self.transformDirection == 5) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width + self.dx, y: self.selectedSpot.height + self.dy };
            }
            if (self.transformDirection == 6) {
                c = { x: self.selectedSpot.x, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width, y: self.selectedSpot.height + self.dy };
            }
            if (self.transformDirection == 7) {
                c = { x: self.selectedSpot.x + self.dx, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width - self.dx, y: self.selectedSpot.height + self.dy };
            }
            if (self.transformDirection == 8) {
                c = { x: self.selectedSpot.x + self.dx, y: self.selectedSpot.y };
                d = { x: self.selectedSpot.width - self.dx, y: self.selectedSpot.height };
            }

            // Canvas bounds
            if (c.x < 0) {
                d.x = self.selectedSpot.x + self.selectedSpot.width;
                c.x = 0;
            }
            if (c.y < 0) {
                c.y = 0;
                d.y = self.selectedSpot.y + self.selectedSpot.height;
            }
            if (d.x + c.x > 100) d.x = 100 - c.x;
            if (d.y + c.y > 100) d.y = 100 - c.y;

            // Negative width/height
            if (c.x > self.selectedSpot.x + self.selectedSpot.width) c.x = self.selectedSpot.x + self.selectedSpot.width;
            if (c.y > self.selectedSpot.y + self.selectedSpot.height) c.y = self.selectedSpot.y + self.selectedSpot.height;
            if (d.x < 0) d.x = 0;
            if (d.y < 0) d.y = 0;

            self.transformX = c.x;
            self.transformY = c.y;
            self.transformWidth = d.x;
            self.transformHeight = d.y;

            self.redrawEl.css({
                left: c.x + '%',
                top: c.y + '%',
                width: d.x + '%',
                height: d.y + '%'
            });

            // Update the SVG viewbox property
            if (self.selectedSpot.type == 'poly') {
                var shapeWidthPx = settings.general.width * (d.x/100);
                var shapeHeightPx = settings.general.height * (d.y/100);
                self.redrawSvgEl[0].setAttribute('viewBox', '0 0 ' + shapeWidthPx + ' ' + shapeHeightPx);

                // Redraw the shape
                var coords = '';
                for (var j=0; j<self.selectedSpot.points.length; j++) {
                    var p = self.selectedSpot.points[j];
                    var x = self.selectedSpot.default_style.stroke_width + (p.x/100) * (shapeWidthPx - self.selectedSpot.default_style.stroke_width*2);
                    var y = self.selectedSpot.default_style.stroke_width + (p.y/100) * (shapeHeightPx - self.selectedSpot.default_style.stroke_width*2);
                    coords += x +','+ y +' ';
                }

                self.redrawPolygonEl.attr('points', coords);
            }


            return;
        }

        // Draw rect
        if (self.startedDrawingRect) {
            var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);

            if (!self.createdDrawingRect) {
                self.createdDrawingRect = true;

                // create a rect
                self.eventSpot = self.createRect();

                // set position
                self.eventSpot.x = (self.x/self.canvasWidth)*100;
                self.eventSpot.y = (self.y/self.canvasHeight)*100;

                self.eventSpot.x = Math.round(self.eventSpot.x * 10)/10;
                self.eventSpot.y = Math.round(self.eventSpot.y * 10)/10;

                // redraw once
                self.redraw();

                self.redrawEl = $('.imp-editor-shape[data-id="'+ self.eventSpot.id +'"]');
            }

            // fast redraw rect
            var d = { x: self.dx, y: self.dy };

            if (self.eventSpot.x + d.x > 100) {
                d.x = 100 - self.eventSpot.x;
            }
            if (self.eventSpot.y + d.y > 100) {
                d.y = 100 - self.eventSpot.y;
            }

            self.drawRectWidth = d.x;
            self.drawRectHeight = d.y;

            self.redrawEl.css({
                width: d.x + '%',
                height: d.y + '%'
            });

            return;
        }

        // Draw oval
        if (self.startedDrawingOval) {
            var point = screenToCanvasSpace(e.pageX, e.pageY, self.canvas);

            if (!self.createdDrawingOval) {
                self.createdDrawingOval = true;

                // create a rect
                self.eventSpot = self.createOval();

                // set position
                self.eventSpot.x = (self.x/self.canvasWidth)*100;
                self.eventSpot.y = (self.y/self.canvasHeight)*100;

                self.eventSpot.x = Math.round(self.eventSpot.x * 10)/10;
                self.eventSpot.y = Math.round(self.eventSpot.y * 10)/10;

                // redraw once
                self.redraw();

                self.redrawEl = $('.imp-editor-shape[data-id="'+ self.eventSpot.id +'"]');
            }

            // fast redraw rect
            var d = { x: self.dx, y: self.dy };

            if (self.eventSpot.x + d.x > 100) {
                d.x = 100 - self.eventSpot.x;
            }
            if (self.eventSpot.y + d.y > 100) {
                d.y = 100 - self.eventSpot.y;
            }

            self.drawRectWidth = d.x;
            self.drawRectHeight = d.y;

            self.redrawEl.css({
                width: d.x + '%',
                height: d.y + '%'
            });

            return;
        }

        // Draw poly
        if (self.mouseDownWhileDrawingPoly) {
            self.polyPoints[self.polyPoints.length - 1].x = self.x;
            self.polyPoints[self.polyPoints.length - 1].y = self.y;

            self.redrawTempPoly();

            return;
        }

        // Move control point
        if (self.translatingControlPoint) {
            // Scale up the SVG and redraw the points
            if (!self.startedTranslatingControlPoint) {
                self.startedTranslatingControlPoint = true;

                // Hide transform boxes
                $(e.target).closest('.imp-editor-shape').find('.imp-selection').hide();

                // Scale up the shape
                $(e.target).closest('.imp-editor-shape').css({
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%'
                });

                // Change the SVG viewbox
                $(e.target).closest('.imp-editor-shape').find('.imp-editor-poly-svg')[0].setAttribute('viewBox', '0 0 ' + settings.general.width + ' ' + settings.general.height);

                // Redraw the control points
                for (var i=0; i<self.selectedSpot.points.length; i++) {
                    $('.imp-editor-shape[data-id="'+ self.selectedSpot.id +'"]').find('.imp-poly-control-point[data-index="'+ i +'"]').css({
                        left: relLocalToRelCanvasSpace(self.selectedSpot.points[i], self.selectedSpot).x + '%',
                        top: relLocalToRelCanvasSpace(self.selectedSpot.points[i], self.selectedSpot).y + '%'
                    });
                }
            }

            // Limit to canvas bounds
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x + self.dx < 0) {
                self.dx = -relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x;
            }
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x + self.dx > 100) {
                self.dx = 100 - relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).x;
            }
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y + self.dy < 0) {
                self.dy = -relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y;
            }
            if (relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y + self.dy > 100) {
                self.dy = 100 - relLocalToRelCanvasSpace({x: self.translatedPointX, y: self.translatedPointY}, self.selectedSpot).y;
            }

            // convert self.dx from canvas rel. to poly rel.
            var dx = self.dx / (((self.selectedSpot.width/100)*self.canvasWidth)/self.canvasWidth);
            var dy = self.dy / (((self.selectedSpot.height/100)*self.canvasHeight)/self.canvasHeight);

            // Update the coordinates of the translated point
            self.selectedSpot.points[self.translatedPointIndex].x = self.translatedPointX + dx;
            self.selectedSpot.points[self.translatedPointIndex].y = self.translatedPointY + dy;

            // Redraw the control point
            self.translatedPoint.css({
                left: relLocalToRelCanvasSpace(self.selectedSpot.points[self.translatedPointIndex], self.selectedSpot).x + '%',
                top: relLocalToRelCanvasSpace(self.selectedSpot.points[self.translatedPointIndex], self.selectedSpot).y + '%',
            });

            // Redraw the polygon shape
            var coords = '';
            for (var j=0; j<self.selectedSpot.points.length; j++) {
                var p = relLocalToRelCanvasSpace(self.selectedSpot.points[j], self.selectedSpot);
                var x = self.selectedSpot.default_style.stroke_width + (p.x/100) * (settings.general.width - self.selectedSpot.default_style.stroke_width*2);
                var y = self.selectedSpot.default_style.stroke_width + (p.y/100) * (settings.general.height - self.selectedSpot.default_style.stroke_width*2);
                // var x = (p.x/100) * (settings.general.width);
                // var y = (p.y/100) * (settings.general.height);
                coords += x +','+ y +' ';
            }

            self.redrawPolygonEl.attr('points', coords);

            return;
        }

        // Place temporary control point
        if (self.selectedSpot && self.selectedSpot.type == 'poly') {
            self.redrawSelectedPolyTempPoint();
            return;
        }
    }
    Editor.prototype.handleMouseUp = function(e) {
        var self = this;

        // === If preview mode, return
        if (parseInt(settings.editor.previewMode, 10) == 1) return;

        if (self.startedDrawingSpot) {
            // Draw spot
            var s = self.createSpot();
            s.x = (self.ix/self.canvasWidth)*100;
            s.y = (self.iy/self.canvasHeight)*100;

            s.x = Math.round(s.x * 10)/10;
            s.y = Math.round(s.y * 10)/10;

            self.selectSpot(s.id);
            self.redraw();
            self.addAction();
        } else if (self.startedDrawingRect && self.createdDrawingRect) {
            // Draw rect
            var o = limitToCanvas(self.dx, self.dy);
            self.eventSpot.width = Math.round(self.drawRectWidth * 10)/10;
            self.eventSpot.height = Math.round(self.drawRectHeight * 10)/10;

            self.selectSpot(self.eventSpot.id);
            self.redraw();
            self.addAction();
        } else if (self.startedDrawingOval && self.createdDrawingOval) {
            // Draw oval
            var o = limitToCanvas(self.dx, self.dy);
            self.eventSpot.width = Math.round(self.drawRectWidth * 10)/10;
            self.eventSpot.height = Math.round(self.drawRectHeight * 10)/10;

            self.selectSpot(self.eventSpot.id);
            self.redraw();
            self.addAction();
        } else if (self.finishedDrawingPoly) {
            // Finish drawing poly

            // Delete temp poly
            $('#temp-poly').remove();

            // Create the final poly
            // Dimentions are created in the createPoly() function
            var p = self.createPoly(self.polyPoints);

            // Select it
            self.selectSpot(p.id);

            // Redraw
            self.addAction();
            self.redraw();

        } else if (self.startedMoving) {
            // Move
            var o = limitToCanvas(self.selectedSpot.x + self.dx, self.selectedSpot.y + self.dy);

            if (self.selectedSpot.type == 'rect' || self.selectedSpot.type == 'oval' || self.selectedSpot.type == 'poly') {
                if (o.x + self.selectedSpot.width > 100) {
                    o.x = 100 - self.selectedSpot.width;
                }
                if (o.y + self.selectedSpot.height > 100) {
                    o.y = 100 - self.selectedSpot.height;
                }
            }

            self.selectedSpot.x = Math.round(o.x * 10)/10;
            self.selectedSpot.y = Math.round(o.y * 10)/10;

            self.redraw();
            self.addAction();

        } else if (self.startedTransforming) {
            // Transform
            self.selectedSpot.x = Math.round(self.transformX * 10)/10;
            self.selectedSpot.y = Math.round(self.transformY * 10)/10;
            self.selectedSpot.width = Math.round(self.transformWidth * 10)/10;
            self.selectedSpot.height = Math.round(self.transformHeight * 10)/10;

            self.redraw();
            self.addAction();

        } else if (self.translatingControlPoint) {
            var dx = self.dx / (((self.selectedSpot.width/100)*self.canvasWidth)/self.canvasWidth);
            var dy = self.dy / (((self.selectedSpot.height/100)*self.canvasHeight)/self.canvasHeight);

            // Update the bounding box of the poly
            self.updateBoundingBoxForPolygonSpot(self.selectedSpot);

            self.redraw();
            self.addAction();
        } else if (self.startedSelecting) {
            // Select
            if (self.selectedSpot && self.selectedSpot.id != self.eventSpotId) {
                self.deselectSpot();
            }
            self.selectSpot(self.eventSpotId);

            self.redraw();
            self.addAction();
        } else if (self.shouldDeselectSpot) {
            self.deselectSpot();
            self.redraw();
            self.addAction();
        }

        // Reset flags
        self.startedSelecting = false;
        self.startedMoving = false;
        self.startedTransforming = false;
        self.transformDirection = 0;

        self.startedDrawingSpot = false;

        self.startedDrawingRect = false;
        self.createdDrawingRect = false;

        self.startedDrawingOval = false;
        self.createdDrawingOval = false;

        self.startedDrawingPoly = false;
        self.finishedDrawingPoly = false;
        self.mouseDownWhileDrawingPoly = false;

        self.translatingControlPoint = false;
        self.startedTranslatingControlPoint = false;

        self.shouldDeselectSpot = false;
    }

    Editor.prototype.getIndexOfSpotWithId = function(id) {
        for (var i=0; i<settings.spots.length; i++) {
            if (settings.spots[i].id == id) {
                return i;
            }
        }
    }
    Editor.prototype.selectSpot = function(id) {
        settings.editor.selected_shape = id;
    }
    Editor.prototype.deselectSpot = function() {
        settings.editor.selected_shape = -1;
    }

    Editor.prototype.createIdForSpot = function() {
        return 'spot-' + Math.floor(Math.random() * 9999);
    }
    Editor.prototype.createIdForRect = function() {
        return 'rect-' +  + Math.floor(Math.random() * 9999);
    }
    Editor.prototype.createIdForOval = function() {
        return 'oval-' +  + Math.floor(Math.random() * 9999);
    }
    Editor.prototype.createIdForPoly = function() {
        return 'poly-' +  + Math.floor(Math.random() * 9999);
    }

    Editor.prototype.createSpot = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'spot';
        s.id = self.createIdForSpot();

        settings.spots.push(s);

        return s;
    }
    Editor.prototype.createRect = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'rect';
        s.default_style.border_radius = 10;
        s.mouseover_style.border_radius = 10;
        s.id = self.createIdForRect();

        settings.spots.push(s);

        return s;
    }
    Editor.prototype.createOval = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'oval';
        s.id = self.createIdForOval();

        settings.spots.push(s);

        return s;
    }
    Editor.prototype.createPoly = function() {
        var self = this;

        var s = $.extend(true, {}, default_spot_settings);
        s.type = 'poly';
        s.id = self.createIdForPoly();

        // Set dimentions
        var minX=99999, minY=99999, maxX=0, maxY=0;
        for (var i=0; i<self.polyPoints.length; i++) {
            var p = self.polyPoints[i];

            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        }

        var pixelWidth = maxX - minX;
        var pixelHeight = maxY - minY;

        // percentage, relative to the canvas width/height
        s.x = (minX/self.canvasWidth)*100;
        s.y = (minY/self.canvasHeight)*100;
        s.width = (pixelWidth/self.canvasWidth)*100;
        s.height = (pixelHeight/self.canvasHeight)*100;

        for (var i=0; i<self.polyPoints.length; i++) {
            // coordinates are in percentage, relative to the current pixel dimentions of the shape box
            s.points.push({
                x: ((self.polyPoints[i].x - minX)/pixelWidth)*100,
                y: ((self.polyPoints[i].y - minY)/pixelHeight)*100
            });
        }

        settings.spots.push(s);

        return s;
    }

    Editor.prototype.shouldSelectPoly = function(id) {
        var self = this;
        var s;

        for (var i=0; i<settings.spots.length; i++) {
            if (settings.spots[i].id == id) {
                s = settings.spots[i];
            }
        }

        // Coordinates in shape pixel space
        var x = self.ix - (s.x/100)*self.canvasWidth;
        var y = self.iy - (s.y/100)*self.canvasHeight;

        // Spot dimentions in pixels
        var spotWidth = (s.width/100)*self.canvasWidth;
        var spotHeight = (s.height/100)*self.canvasHeight;

        // Convert to shape percentage space
        x = (x / spotWidth) * 100;
        y = (y / spotHeight) * 100;

        var testPoly = new Array();
        for (var i=0; i<s.points.length; i++) {
            testPoly.push([s.points[i].x, s.points[i].y]);
        }

        if (isPointInsidePolygon({ x: x, y: y }, testPoly)) {
            return true;
        } else {
            return false;
        }
    }
    Editor.prototype.placePointForTempPoly = function(x, y) {
        var self = this;

        self.polyPoints.push({
            x: x,
            y: y
        });
    }
    Editor.prototype.redrawTempPoly = function() {
        var self = this;

        // Draw polygon
        var html = '<polygon points="'
        for (var i=0; i<self.polyPoints.length; i++) {
            html += self.polyPoints[i].x + ',' + self.polyPoints[i].y + ' ';
        }
        html += '" />';

        // Draw points

        for (var i=0; i<self.polyPoints.length; i++) {
            html += '<circle cx="'+ self.polyPoints[i].x +'" cy="'+ self.polyPoints[i].y +'" r="4" data-index="'+ i +'" />';
        }

        // Insert HTML
        $('#temp-poly').html(html);
    }
    Editor.prototype.redrawSelectedPolyTempPoint = function() {
        var self = this;

        // Convert canvas space pixel coordinates to percentage space polygon space
        var polygonPixelWidth = (self.selectedSpot.width/100)*self.canvasWidth;
        var polygonPixelHeight = (self.selectedSpot.height/100)*self.canvasHeight;
        var xPolygonPixelSpace = self.x - ((self.selectedSpot.x/100) * self.canvasWidth);
        var yPolygonPixelSpace = self.y - ((self.selectedSpot.y/100) * self.canvasHeight);
        var xPolygonPerSpace = (xPolygonPixelSpace/polygonPixelWidth) * 100;
        var yPolygonPerSpace = (yPolygonPixelSpace/polygonPixelHeight) * 100;

        var p;
        if (p = self.shouldShowTempControlPoint(xPolygonPerSpace, yPolygonPerSpace, self.selectedSpot.points)) {
            // Show
            self.tempControlPoint.show();
            self.tempControlPointLine.show();

            self.tempControlPoint.css({
                left: p.x + '%',
                top: p.y + '%'
            });

            self.controlPointInsertionPointX = p.x;
            self.controlPointInsertionPointY = p.y;
        } else {
            // Hide
            self.tempControlPoint.hide();
            self.tempControlPointLine.hide();
        }
    }
    Editor.prototype.shouldShowTempControlPoint = function(x, y, points) {
        var self = this;
        var p1 = { x: x, y: y };

        // Test for each line
        for (var i=0; i<points.length; i++) {
            var p2 = { x: points[i].x, y: points[i].y };
            var p3 = undefined;

            if (points[i+1]) {
                p3 = { x: points[i+1].x, y: points[i+1].y };
            } else {
                p3 = { x: points[0].x, y: points[0].y };
            }

            var t = pointLineSegmentParameter([p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y]);
            var d = distanceFromLineToPoint(p2.x, p2.y, p3.x, p3.y, p1.x, p1.y);

            var x10 = p3.x - p2.x;
            var y10 = p3.y - p2.y;

            if (Math.abs(t - 0.5) < 0.45 && d < 5) {
                self.tempControlPointIndex = i;
                return { x: p2.x + t * x10, y: p2.y + t * y10};
            }
        }

        return false;
    }
    Editor.prototype.updateBoundingBoxForPolygonSpot = function(s) {
        var minX=99999, minY=99999, maxX=-99999, maxY=-99999;
        for (var i=0; i<s.points.length; i++) {
            var p = s.points[i];

            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        }

        // Calculate new bounding box
        var o = relLocalToRelCanvasSpace({ x: minX, y: minY }, s);
        var o2 = relLocalToRelCanvasSpace({ x: maxX, y: maxY }, s);

        // Update the coordinates of the points
        for (var i=0; i<s.points.length; i++) {
            var p = s.points[i];

            // to canvas space
            var p1 = relLocalToRelCanvasSpace(p, s);
            // to local space
            var p2 = relCanvasToRelLocalSpace(p1, { x: o.x, y: o.y, width: o2.x - o.x, height: o2.y - o.y });
            // debugger;
            p.x = p2.x;
            p.y = p2.y;
        }

        // Set new values
        s.x = o.x;
        s.y = o.y;
        s.width = o2.x - o.x;
        s.height = o2.y - o.y;

        // debugger;
    }

    Editor.prototype.updateShapesList = function() {
        // Create a list of items
        var listItems = [];
        for (var i=0; i<settings.spots.length; i++) {
            var s = settings.spots[i];
            listItems.push({ id: s.id, title: s.id });
        }

        // Set items
        $.wcpEditorSetListItems(listItems);

        // Select item
        $.wcpEditorSelectListItem(settings.editor.selected_shape);
    }
    Editor.prototype.updateShapesForm = function() {
        // This function needs to be called only when a shape is created, selected or deselected

        var i = this.getIndexOfSpotWithId(settings.editor.selected_shape);
        var s = settings.spots[i];

        if (s) {
            // General
            $.wcpEditorSetControlValue('Shape Settings', 'x', s.x);
            $.wcpEditorSetControlValue('Shape Settings', 'y', s.y);
            $.wcpEditorSetControlValue('Shape Settings', 'width', s.width);
            $.wcpEditorSetControlValue('Shape Settings', 'height', s.height);

            // Actions
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover', s.actions.mouseover);
            $.wcpEditorSetControlValue('Shape Settings', 'click', s.actions.click);
            $.wcpEditorSetControlValue('Shape Settings', 'link', s.actions.link);
            $.wcpEditorSetControlValue('Shape Settings', 'open_link_in_new_window', s.actions.open_link_in_new_window);

            // Icon
            $.wcpEditorSetControlValue('Shape Settings', 'use_icon', s.default_style.use_icon);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_type', s.default_style.icon_type);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_svg_path', s.default_style.icon_svg_path);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_svg_viewbox', s.default_style.icon_svg_viewbox);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_url', s.default_style.icon_url);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_is_pin', s.default_style.icon_is_pin);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_shadow', s.default_style.icon_shadow);

            // Default Style
            $.wcpEditorSetControlValue('Shape Settings', 'opacity', s.default_style.opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'icon_fill', s.default_style.icon_fill);
            $.wcpEditorSetControlValue('Shape Settings', 'border_radius', s.default_style.border_radius);
            $.wcpEditorSetControlValue('Shape Settings', 'background_color', s.default_style.background_color);
            $.wcpEditorSetControlValue('Shape Settings', 'background_opacity', s.default_style.background_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'border_width', s.default_style.border_width);
            $.wcpEditorSetControlValue('Shape Settings', 'border_style', s.default_style.border_style);
            $.wcpEditorSetControlValue('Shape Settings', 'border_color', s.default_style.border_color);
            $.wcpEditorSetControlValue('Shape Settings', 'border_opacity', s.default_style.border_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'fill', s.default_style.fill);
            $.wcpEditorSetControlValue('Shape Settings', 'fill_opacity', s.default_style.fill_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_color', s.default_style.stroke_color);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_opacity', s.default_style.stroke_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_width', s.default_style.stroke_width);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_dasharray', s.default_style.stroke_dasharray);
            $.wcpEditorSetControlValue('Shape Settings', 'stroke_linecap', s.default_style.stroke_linecap);

            // Mouseover Style
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_opacity', s.mouseover_style.opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_icon_fill', s.mouseover_style.icon_fill);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_radius', s.mouseover_style.border_radius);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_background_color', s.mouseover_style.background_color);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_background_opacity', s.mouseover_style.background_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_width', s.mouseover_style.border_width);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_style', s.mouseover_style.border_style);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_color', s.mouseover_style.border_color);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_border_opacity', s.mouseover_style.border_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_fill', s.mouseover_style.fill);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_fill_opacity', s.mouseover_style.fill_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_color', s.mouseover_style.stroke_color);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_opacity', s.mouseover_style.stroke_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_width', s.mouseover_style.stroke_width);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_dasharray', s.mouseover_style.stroke_dasharray);
            $.wcpEditorSetControlValue('Shape Settings', 'mouseover_stroke_linecap', s.mouseover_style.stroke_linecap);

            // Tooltip Settings
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_border_radius', s.tooltip_style.border_radius);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_padding', s.tooltip_style.padding);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_background_color', s.tooltip_style.background_color);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_background_opacity', s.tooltip_style.background_opacity);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_position', s.tooltip_style.position);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_width', s.tooltip_style.width);
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_auto_width', s.tooltip_style.auto_width);

            // Tooltip Content (to do)
            $.wcpEditorSetControlValue('Shape Settings', 'tooltip_content_type', s.tooltip_content.content_type);
            $.wcpEditorSetControlValue('Shape Settings', 'plain_text', s.tooltip_content.plain_text);
            $.wcpEditorSetControlValue('Shape Settings', 'squares_json', s.tooltip_content.squares_json);
            $.wcpEditorSetControlValue('Shape Settings', 'squares_content', s.tooltip_content.squares_content);

            // Do a "redraw update" of the form only when the selection changes
            // To show/hide shape-specific controls
            if (i == this.shapesFormSpotIndex) return;
            this.shapesFormSpotIndex = i;

            var form = $.wcpEditorGetHTMLForFormWithName('Shape Settings');
            $.wcpEditorSetContentForTabWithName('Shape', form);

            $.wcpEditorUpdateForm('Shape Settings');

            // Open Shape Settings tab
            $.wcpEditorOpenMainTabWithName('Shape');

            // Show/hide controls
            this.updateShapesFormStateMaster();
        } else {
            this.shapesFormSpotIndex = -1;
            $.wcpEditorSetContentForTabWithName('Shape', '<div class="wcp-editor-form-tabs-content-wrap">No shape selected.</div>');
        }
    }
    Editor.prototype.updateShapesFormState = function() {
        // Show/hide controls, depending on current settings of the selected shape

        var i = this.getIndexOfSpotWithId(settings.editor.selected_shape);
        var s = settings.spots[i];

        if (!s) return;

        if (s.type == 'spot') {
            // Show/hide icon controls, if the spot is an icon or not
            if (parseInt(s.default_style.use_icon, 10) == 1) {
                // Icon tab
                $.wcpEditorFormShowControl('Shape Settings', 'icon_type');

                if (s.default_style.icon_type == 'library') {
                    $.wcpEditorFormHideControl('Shape Settings', 'icon_url');
                    $.wcpEditorFormShowControl('Shape Settings', 'choose_icon_from_library');
                }

                if (s.default_style.icon_type == 'custom') {
                    $.wcpEditorFormShowControl('Shape Settings', 'icon_url');
                    $.wcpEditorFormHideControl('Shape Settings', 'choose_icon_from_library');
                }

                $.wcpEditorFormShowControl('Shape Settings', 'icon_is_pin');
                $.wcpEditorFormShowControl('Shape Settings', 'icon_shadow');

                // Default style tab
                $.wcpEditorFormShowControl('Shape Settings', 'icon_fill');

                $.wcpEditorFormHideControl('Shape Settings', 'border_radius');
                $.wcpEditorFormHideControl('Shape Settings', 'background_color');
                $.wcpEditorFormHideControl('Shape Settings', 'background_opacity');
                $.wcpEditorFormHideControl('Shape Settings', 'border_width');
                $.wcpEditorFormHideControl('Shape Settings', 'border_style');
                $.wcpEditorFormHideControl('Shape Settings', 'border_color');
                $.wcpEditorFormHideControl('Shape Settings', 'border_opacity');

                // Mouseover style tab
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_icon_fill');

                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_radius');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_color');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_opacity');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_width');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_style');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_color');
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_opacity');
            } else {
                // Icon tab
                $.wcpEditorFormHideControl('Shape Settings', 'choose_icon_from_library');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_type');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_url');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_is_pin');
                $.wcpEditorFormHideControl('Shape Settings', 'icon_shadow');

                // Default style tab
                $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');

                $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
                $.wcpEditorFormShowControl('Shape Settings', 'background_color');
                $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
                $.wcpEditorFormShowControl('Shape Settings', 'border_width');
                $.wcpEditorFormShowControl('Shape Settings', 'border_style');
                $.wcpEditorFormShowControl('Shape Settings', 'border_color');
                $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

                // Mouseover style tab
                $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
                $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');
            }
        }

        // Tooltip content type
        if (s.tooltip_content.content_type == 'plain-text') {
            $.wcpEditorFormShowControl('Shape Settings', 'plain_text');
            $.wcpEditorFormHideControl('Shape Settings', 'launch_content_builder');
            $.wcpEditorFormShowControl('Shape Settings', 'plain_text_color');
        } else {
            $.wcpEditorFormHideControl('Shape Settings', 'plain_text');
            $.wcpEditorFormShowControl('Shape Settings', 'launch_content_builder');
            $.wcpEditorFormHideControl('Shape Settings', 'plain_text_color');
        }
    }
    Editor.prototype.updateShapesFormStateMaster = function() {
        // Show/hide controls, depending on the type of the current selected shape
        var i = this.getIndexOfSpotWithId(settings.editor.selected_shape);
        var s = settings.spots[i];

        if (!s) return;

        if (s.type == 'spot') {
            // Show the Icon tab
            $.wcpEditorFormShowControlsGroup('Shape Settings', 'icon');

            // Show icon specific controls
            $.wcpEditorFormShowControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_icon_fill');

            // Show common controls
            $.wcpEditorFormShowControl('Shape Settings', 'opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');

            // Hide polygon-specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'fill');
            $.wcpEditorFormHideControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_linecap');
        }
        if (s.type == 'rect') {
            // Hide the Icon tab
            $.wcpEditorFormHideControlsGroup('Shape Settings', 'icon');

            // Hide icon specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

            // Show common controls
            $.wcpEditorFormShowControl('Shape Settings', 'opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');

            // Hide polygon-specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'fill');
            $.wcpEditorFormHideControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_linecap');
        }
        if (s.type == 'oval') {
            // Hide the Icon tab
            $.wcpEditorFormHideControlsGroup('Shape Settings', 'icon');

            // Hide icon specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

            // Show common controls
            $.wcpEditorFormShowControl('Shape Settings', 'opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_border_opacity');

            // Hide polygon-specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'fill');
            $.wcpEditorFormHideControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_stroke_linecap');
        }
        if (s.type == 'poly') {
            // Hide the Icon tab
            $.wcpEditorFormHideControlsGroup('Shape Settings', 'icon');

            // Hide icon specific controls
            $.wcpEditorFormHideControl('Shape Settings', 'icon_fill');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_icon_fill');

            // Hide common controls
            $.wcpEditorFormHideControl('Shape Settings', 'opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'border_radius');
            $.wcpEditorFormHideControl('Shape Settings', 'background_color');
            $.wcpEditorFormHideControl('Shape Settings', 'background_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'border_width');
            $.wcpEditorFormHideControl('Shape Settings', 'border_style');
            $.wcpEditorFormHideControl('Shape Settings', 'border_color');
            $.wcpEditorFormHideControl('Shape Settings', 'border_opacity');

            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_radius');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_background_opacity');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_width');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_style');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_color');
            $.wcpEditorFormHideControl('Shape Settings', 'mouseover_border_opacity');

            // Show polygon-specific controls
            $.wcpEditorFormShowControl('Shape Settings', 'fill');
            $.wcpEditorFormShowControl('Shape Settings', 'fill_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_color');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_width');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_dasharray');
            $.wcpEditorFormShowControl('Shape Settings', 'stroke_linecap');

            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_fill');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_fill_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_color');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_opacity');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_width');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_dasharray');
            $.wcpEditorFormShowControl('Shape Settings', 'mouseover_stroke_linecap');
        }

        // Hide controls which should be always hidden
        $.wcpEditorFormHideControl('Shape Settings', 'icon_svg_path');
        $.wcpEditorFormHideControl('Shape Settings', 'icon_svg_viewbox');
        $.wcpEditorFormHideControl('Shape Settings', 'squares_json');
        $.wcpEditorFormHideControl('Shape Settings', 'squares_content');
    }
    Editor.prototype.updateImageMapForm = function() {
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_name', settings.general.name);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_shortcode', settings.general.shortcode);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_width', settings.general.width);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_map_height', settings.general.height);
        $.wcpEditorSetControlValue('Image Map Settings', 'responsive', settings.general.responsive);
        $.wcpEditorSetControlValue('Image Map Settings', 'sticky_tooltips', settings.general.sticky_tooltips);
        $.wcpEditorSetControlValue('Image Map Settings', 'constrain_tooltips', settings.general.constrain_tooltips);
        $.wcpEditorSetControlValue('Image Map Settings', 'image_url', settings.general.image_url);
        $.wcpEditorSetControlValue('Image Map Settings', 'tooltip_animation', settings.general.tooltip_animation);
        $.wcpEditorSetControlValue('Image Map Settings', 'pageload_animation', settings.general.pageload_animation);
        $.wcpEditorSetControlValue('Image Map Settings', 'fullscreen_tooltips', settings.general.fullscreen_tooltips);
        $.wcpEditorSetControlValue('Image Map Settings', 'late_initialization', settings.general.late_initialization);

        $.wcpEditorUpdateForm('Image Map Settings');
    }

    Editor.prototype.launchTooltipContentBuilder = function() {
        if ($('#imp-editor-tooltip-content-builder-wrap').length == 0) {
            // add HTML
            var html = '';

            html += '<div id="imp-editor-tooltip-content-builder-wrap">';
            html += '   <div id="imp-editor-tooltip-content-builder-background"></div>';
            html += '   <div id="imp-editor-tooltip-content-builder-close"><i class="fa fa-times" aria-hidden="true"></i></div>';
            html += '   <div id="imp-editor-tooltip-content-builder-tooltip-wrap" class="squares">';
            html += '       <div id="imp-editor-tooltip-content-builder" class="squares"></div>';
            html += '   </div>';
            html += '   <div id="imp-editor-tooltip-content-builder-description">';
            html += '       <p>Press the Done button when you are done editing, or click the Close button in the upper-right corner.</p>';
            html += '   </div>';
            html += '   <div class="wcp-editor-control-button" id="imp-editor-done-editing-tooltip">Done</div>';
            html += '</div>';

            $('body').append(html);
        } else {
            $('#imp-editor-tooltip-content-builder-wrap').show();
        }

        setTimeout(function() {
            $('#imp-editor-tooltip-content-builder-wrap').addClass('imp-visible');
        }, 10);

        // Set width of the content root
        var tooltipWidth = this.selectedSpot.tooltip_style.width;
        var tooltipBackgroundRGB = hexToRgb(this.selectedSpot.tooltip_style.background_color);
        var tooltipBackground = 'rgba('+ tooltipBackgroundRGB.r +', '+ tooltipBackgroundRGB.g +', '+ tooltipBackgroundRGB.b +', '+ this.selectedSpot.tooltip_style.background_opacity +')';

        $('#imp-editor-tooltip-content-builder-tooltip-wrap').css({
            width: tooltipWidth,
            background: tooltipBackground
        });

        // initialize content builder
        $.squaresInitWithSettings($('#imp-editor-tooltip-content-builder'), this.selectedSpot.tooltip_content.squares_json);
        $.squaresShowEditorWindow(20, 20);
    }
    Editor.prototype.doneEditingTooltip = function() {
        var json = $.squaresGetCurrentSettings($('#imp-editor-tooltip-content-builder'));
        var html = $.squaresGenerateHTML($('#imp-editor-tooltip-content-builder'));

        this.selectedSpot.tooltip_content.squares_json = json;
        this.selectedSpot.tooltip_content.squares_content = html;

        this.redraw();
    }

    Editor.prototype.getCompressedSettings = function() {
        var compressed = $.extend(true, {}, settings);
        var compressedSpots = [];

        for (var i=0; i<compressed.spots.length; i++) {
            compressedSpots[i] = $.wcpCompress(compressed.spots[i], default_spot_settings);

            compressedSpots[i].x = Math.round(compressedSpots[i].x * 1000) / 1000;
            compressedSpots[i].y = Math.round(compressedSpots[i].y * 1000) / 1000;

            if (compressedSpots[i].width) {
                compressedSpots[i].width = Math.round(compressedSpots[i].width * 1000) / 1000;
            }
            if (compressedSpots[i].height) {
                compressedSpots[i].height = Math.round(compressedSpots[i].height * 1000) / 1000;
            }
        }

        compressed = $.wcpCompress(settings, default_settings);
        compressed.spots = compressedSpots;

        return compressed;
    }

    function loadImage(image, cbLoading, cbComplete, cbError) {
        if (!image.complete || image.naturalWidth === undefined || image.naturalHeight === undefined) {
            cbLoading();
            $(image).on('load', function() {
                $(image).off('load');
                cbComplete();
            });
            $(image).on('error', function() {
                $(image).off('error');
                cbError();
            });
        } else {
            cbComplete();
        }
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    function abs_to_rel(val, min, max) {
        return ((min + max) / val) * 100;
    }
    function rel_to_abs(val, min, max) {
        return ((min + max) * val) * 100;
    }
    function screenToCanvasSpace(x, y, canvas) {
        return {
            x: Math.round((x - canvas.offset().left)*10)/10,
            y: Math.round((y - canvas.offset().top)*10)/10
        }
    }
    function relLocalToRelCanvasSpace(p, localSpace) {
        return {
            x: (localSpace.width)*(p.x / 100) + localSpace.x,
            y: (localSpace.height)*(p.y / 100) + localSpace.y
        }
    }
    function relCanvasToRelLocalSpace(p, localSpace) {
        return {
            x: ((p.x - localSpace.x)/(localSpace.width))*100,
            y: ((p.y - localSpace.y)/(localSpace.height))*100
        }
    }

    function limitToCanvas(x, y) {
        if (x < 0) x = 0;
        if (x > 100) x = 100;
        if (y < 0) y = 0;
        if (y > 100) y = 100;

        return {
            x: Math.round(x*10)/10,
            y: Math.round(y*10)/10
        }
    }
    function isPointInsidePolygon(point, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        var x = point.x, y = point.y;

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }
    function distanceFromLineToPoint(lx1, ly1, lx2, ly2, px, py) {
        return Math.abs((ly2 - ly1)*px - (lx2 - lx1)*py + lx2*ly1 - ly2*lx1)/(Math.sqrt(Math.pow(ly2 - ly1, 2) + Math.pow(lx2 - lx1, 2)));
    }
    function pointLineSegmentParameter(p2, p0, p1) { // p0, p1 - line
        var x10 = p1[0] - p0[0], y10 = p1[1] - p0[1],
        x20 = p2[0] - p0[0], y20 = p2[1] - p0[1];
        return (x20 * x10 + y20 * y10) / (x10 * x10 + y10 * y10);
    }

})( jQuery, window, document );
