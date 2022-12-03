// *** Tỷ lệ khung hình **** //
var _templateType=1;
var _fullScreenStatus=0;
var wH=0;var wW=0;var tyle=920/470;
// Xử lý di chuyển khung thông báo trang câu hỏi và đáp án câu hỏi có thể di chuyển
$('.DraggablePanel').on('mouseenter',function(){$(this).draggable();});
$('#leftMainContent').on('mouseleave',function(){$('.DraggablePanel').mouseup();$('.DraggablePanel').each(function(){var _curPosition=$(this).position();if (_curPosition.left>($('#leftMainContent').width()-20))$(this).css('left',$('#leftMainContent').width()-30+'px');if (_curPosition.left<-20)$(this).css('left',-($(this).width()-20)+'px');if (_curPosition.top>($('#leftMainContent').height()-20))$(this).css('top',$('#leftMainContent').height()-30+'px');if (_curPosition.top<-($(this).height()-20))$(this).css('top',-($(this).height()-20)+'px');});$('.DraggableAnswer').mouseup();$('.DraggableAnswer').each(function(){var _curPosition=$(this).position();if (_curPosition.left>($('#leftMainContent').width()-20))$(this).css('left',$('#leftMainContent').width()-30+'px');if (_curPosition.left<-20)$(this).css('left',-($(this).width()-20)+'px');if (_curPosition.top>($('#leftMainContent').height()-20))$(this).css('top',$('#leftMainContent').height()-30+'px');if (_curPosition.top<-($(this).height()-20))$(this).css('top',-($(this).height()-20)+'px');});});
// *** Hết phần xử lý khung *** //
$(window).on('load',function(){$('.pageName').first().addClass('RightMenuCurrent');$('.pageNameThumb').first().addClass('RightMenuCurrent');wW=$(window).innerWidth();wH=$(window).innerHeight();resizeAll(wW,wH);$('.mainRightBotPageList').jScrollPane({autoReinitialise: true,showArrows: true});var topBotRightH=$('#mainRightTopBotRight').height();$('.mainRightTopBotRight').css('font-size', topBotRightH*0.18+'px');$('.mainRightBotPageList').css('height',$('#mainRightBot').height() - $('#mainRightBotHeader').height()+'px');$('.mainRightBotPageList').css('width',$('#mainRightBot').width() + 0.5 +'px');$('.jspPane').css('border-right',0 + 'px');$('.jspPane').css('width',$('#mainRightBot').width() - $('.jspVerticalBar').width() +'px');$('.jspTrack').css('height',$('.jspVerticalBar').height() - 2*$('.jspArrow').height() +'px');$('.pageName').css('height',$('.jspContainer').height()*0.084 +'px');if ($('.jspPane').height()<$('.jspContainer').height()) $('.jspPane').css('height',$('.jspContainer').height());$('.jspPane').css('border',$('.jspPane').width()*0.03 + 'px solid #F1F1F1');$('.jspPane').css('background','#F1F1F1');$('#leftMainContent').children('.CELPage').addClass('hidden');if ( typeof $('#wtmImage').attr('src') != typeof undefined && $('#wtmImage').attr('src').length==0 && _imageWTM.length>0) $('#wtmImage').attr('src','data:image/png;base64,' + _imageWTM);if (_imageWTM=='') $('#wtmImage').css('visibility','hidden'); $('#leftMainContent').find('video').each(function(){if (typeof $(this).attr('maxVol')!=typeof undefined){var _maxVol=parseFloat($(this).attr('maxVol')/100);if (this.volume > _maxVol)this.volume = _maxVol;}}); $('#leftMainContent').find('audio').each(function(){if (typeof $(this).attr('maxVol')!=typeof undefined){var _maxVol=parseFloat($(this).attr('maxVol')/100);if (this.volume > _maxVol)this.volume = _maxVol;}}); if (typeof ShowPlayer !== 'undefined' && $.isFunction(ShowPlayer)) ShowPlayer();}); 
$('.pageName').on('click',function(){
    if (ReNhanhCauHoi()==false){
        if (CheckMustAnswerQuestion()==true) // 19-9-16 Dũng
        {
            var page = $('#leftMainContent').children('div > .CELPage').not('.hidden');
            var id=$(this).find('.pageNameLeft').attr('id').substring(9,$(this).find('.pageNameLeft').attr('id').length);
            if (typeof $('#'+id).attr('questype')!= typeof undefined) CountAnswerMaxTime(); else if (typeof timeQuestionPageInterval!=typeof undefined)  clearInterval(timeQuestionPageInterval);
            var idIndex=$(page[page.length-1]).attr('id');
            if(idIndex != id){
                $('#leftMainContent').children('.CELPage').css('visibility','');
                $('#leftMainContent').children('.CELPage').addClass('hidden');
                clickShowPage(id);
            }
            $('.DraggablePanel').css('visibility','hidden');
            $('.DraggablePanel').css('z-index','-1');
            if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
            if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice();
            if (typeof CreatePareConnectCrossAnswer !== 'undefined' && $.isFunction(CreatePareConnectCrossAnswer)) CreatePareConnectCrossAnswer();
        } else ShowMessMustAnswer();
    }
});
$('.pageNameThumb').on('click',function(){
    if (ReNhanhCauHoi()==false){
        if (CheckMustAnswerQuestion()==true) // 19-9-16 Dũng
        {
            var page = $('#leftMainContent').children('div > .CELPage').not('.hidden');
            var id=$(this).find('.pageNameLeftThumb').attr('id').substring(10,$(this).find('.pageNameLeftThumb').attr('id').length);
            if (typeof $('#'+id).attr('questype')!= typeof undefined) CountAnswerMaxTime(); else if (typeof timeQuestionPageInterval!=typeof undefined)  clearInterval(timeQuestionPageInterval);
            var idIndex=$(page[page.length-1]).attr('id');
            if(idIndex != id){
                $('#leftMainContent').children('.CELPage').css('visibility','');
                $('#leftMainContent').children('.CELPage').addClass('hidden');
                clickShowPage(id);
            }
            $('.DraggablePanel').css('visibility','hidden');
            $('.DraggablePanel').css('z-index','-1');
            if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
            if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice();
            if (typeof CreatePareConnectCrossAnswer !== 'undefined' && $.isFunction(CreatePareConnectCrossAnswer)) CreatePareConnectCrossAnswer();
        } else ShowMessMustAnswer();
    }
});
function CheckMustAnswerQuestion(){$('.DragableAnswer').each(function(){if (typeof $(this).attr('clozeId') != typeof undefined && $(this).attr('id').indexOf('swerContent')>0){$(this).css('visibility','');}}); var _curPage=GetCurrentPage();if (typeof _curPage != typeof undefined){if (_curPage.attr('id').indexOf('QuestionPage_')>0){if (_curPage.attr('mustanswer')=='True') return false; else return true;}else return true;}else return true;}
function ShowMessMustAnswer(){$('#ConfirmAnswerRight_OnePage_Content_IMG').attr('src','images/button/Question/messageWarning.png');$('#ConfirmAnswerRight_OnePage_Content_Content').text('Trả lời câu hỏi này để tiếp tục!');$('#ConfirmAnswerRight_OnePage_Message').css('visibility','visible');$('#ConfirmAnswerRight_OnePage_Message').css('z-index','19998');$('#ConfirmAnswerRight_OnePage_Content_Content').css('line-height',$('#ConfirmAnswerRight_OnePage_Content_btnAccept').height() + 'px');$('#ConfirmAnswerRight_OnePage_Content_Content').css('font-size',$('#ConfirmAnswerRight_OnePage_Content_btnAccept').height()*0.5 + 'px');$('#ConfirmAnswerRight_OnePage_Content_Content').css('padding-top',$('#ConfirmAnswerRight_OnePage_Content_btnAccept').height()/1.5 + 'px');}
$('#mainRightBotHeaderLeft').on('click',function(){$(this).addClass('mainRightBotHeaderActive'); $('#mainRightBotHeaderRight').removeClass('mainRightBotHeaderActive');$('#mainRightBotPageView').children(':eq(1)').css('display','none');$('#mainRightBotPageView').children(':eq(0)').css('display','');});
$('#mainRightBotHeaderRight').on('click',function(){$(this).addClass('mainRightBotHeaderActive'); $('#mainRightBotHeaderLeft').removeClass('mainRightBotHeaderActive');$('#mainRightBotPageView').children(':eq(0)').css('display','none');$('#mainRightBotPageView').children(':eq(1)').css('display','');});
$('#mainBottomBtnReplay').on('click',function(){$('.pageName').first().trigger('click'); $('.pageNameThumb').first().trigger('click');});
function checkVersionIE(){var ua = window.navigator.userAgent;var msie = ua.indexOf ( 'MSIE ' );if ( msie > 0 ) return parseInt (ua.substring (msie+5, ua.indexOf ('.', msie ))); else return 0;}
function resizeAll(p1,p2){var container=document.getElementById('container');var content=document.getElementById('mainContent');if (_fullScreenStatus==0){if (_templateType==3){$('#rightMainContent').css('display','none');$('#leftMainContent').css('width','99.5%');$('#mainBottomFull').css('width','99.5%');if ((p1/p2)<tyle) {container.style.height= (p1 / tyle)+'px';container.style.width= (p1) * 0.757 +'px';content.style.top = ((p2 - (p1/tyle)*0.98)/tyle)+'px';content.style.left = (p1-p1*0.98)/tyle + 'px';};if ((p1/p2)>tyle) {container.style.height= (p2)+'px';container.style.width= (p2*tyle) * 0.757+'px';content.style.top = (p2-p2*0.98)/tyle +'px';};if (p1>1200 && p2>612) {container.style.height= (612)+'px';container.style.width= (1200) * 0.757+'px';content.style.top = ((p2-(612))/2) +'px';};if (p1<600) {content.style.top = ((p2-(306))/2) +'px';container.style.width=600 * 0.757 + 'px';$('#container').css('min-width',600 * 0.757 + 'px');};}else{if ((p1/p2)<tyle) {container.style.height= (p1 / tyle)+'px';container.style.width= (p1)+'px';content.style.top = ((p2 - (p1/tyle)*0.98)/tyle)+'px';content.style.left = (p1-p1*0.98)/tyle + 'px';};if ((p1/p2)>tyle) {container.style.height= (p2)+'px';container.style.width= (p2*tyle)+'px';content.style.top = (p2-p2*0.98)/tyle +'px';};if (p1>1200 && p2>612) {container.style.height= (612)+'px';container.style.width= (1200)+'px';content.style.top = ((p2-(612))/2) +'px';};if (p1<600) {content.style.top = ((p2-(306))/2) +'px';};}}var contentH=$('#mainContent').height();$('.ques-content-p').css('font-size', contentH*0.035+'px');$('.ans-content-p').css('font-size', contentH*0.025+'px');$('#mainTittleContent').css('font-size', contentH*0.03+'px');$('.seo-bold').css('font-size', contentH*0.025+'px');$('.seo-light').css('font-size', contentH*0.025+'px');$('.pageNameLeft').css('font-size', contentH*0.022+'px');$('.pageNameRight').css('font-size', contentH*0.022+'px');$('#mainRightBotHeaderContent').css('font-size', contentH*0.023+'px');$('#mainRightBotHeaderContent').css('line-height', contentH*0.05+'px');$('#mainRightBotHeaderContentRight').css('font-size', contentH*0.023+'px');$('#mainRightBotHeaderContentRight').css('line-height', contentH*0.05+'px');var topBotRightH=$('#mainRightTopBotRight').height();$('.mainRightTopBotRight').css('font-size', topBotRightH*0.2+'px');$('.mainRightBotPageList').css('height',$('#mainRightBot').height() - $('#mainRightBotHeader').height()+'px');$('.mainRightBotPageList').css('width',$('#mainRightBot').width() + 0.5 +'px');$('.jspPane').css('width',$('#mainRightBot').width() - $('.jspVerticalBar').width() +'px');$('.jspTrack').css('height',$('.jspVerticalBar').height() - 2*$('.jspArrow').height() +'px');$('.pageName').css('height',$('#mainContent').height()*0.05 +'px');$('.pageNameThumb').css('height',$('#mainContent').height()*0.132 +'px');$('.DraggablePanel').css('visibility','hidden');$('.DraggablePanel').css('z-index','-1');if (typeof InitMindMapIMG !== 'undefined' && $.isFunction(InitMindMapIMG)) InitMindMapIMG();$('.jspPane').css('border',$('.jspPane').width()*0.03 + 'px solid #F1F1F1');if (typeof ResizeBorderAndText !== 'undefined' && $.isFunction(ResizeBorderAndText)) ResizeBorderAndText(); if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice(); if (typeof ResizeTblPageList !== 'undefined' && $.isFunction(ResizeTblPageList)) ResizeTblPageList(); }
$('#container').on('mouseover',function(){$('.jspPane').each(function(){var borderWidth = parseFloat($(this).css('border-left-width'));if (borderWidth>($(this).width()*0.03))$(this).css('border-width',$(this).width()*0.03 + 'px');})});
var _imageWTM='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';
function ExitFullScreen(){$('#leftMainContent').css('left','0.25%');$('#leftMainContent').css('top','0.5%');$('#leftMainContent').css('bottom','auto');$('#leftMainContent').css('right','auto');$('#leftMainContent').css('width','75%');$('#leftMainContent').css('height','92%');wW=$(window).innerWidth();wH=$(window).innerHeight();resizeAll(wW,wH);if (_templateType==3) $('#leftMainContent').css('width','99.5%');if (_templateType==1){$('#leftMainContent').css('right','0.25%');$('#leftMainContent').css('top','0.5%');$('#leftMainContent').css('bottom','auto');$('#leftMainContent').css('left','auto');$('#leftMainContent').css('width','75%');$('#leftMainContent').css('height','92%');}_fullScreenStatus=0;}
$('#mainBottomBtnZoom').on('click',function(){_fullScreenStatus=1;var docElement, request;docElement = document.getElementById('leftMainContent');request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullscreen; if(typeof request!='undefined' && request){request.call(docElement);var left=0.0;var top=0.0;var bot=0.0;var right=0.0;var w=0.0;var h=0.0;wW=screen.width;wH=screen.height;if (wW/wH == 4/3){w=wW;h=w*10/16;top=(wH-h)/2;bot=top;}if (wW/wH == 16/9){h=wH;w=h*16/10;left=(wW-w)/2;right=left;}if (_templateType==3){$('#leftMainContent').css('left',left + 'px');$('#leftMainContent').css('top',top + 'px');$('#leftMainContent').css('bottom',bot + 'px');$('#leftMainContent').css('right',right + 'px');$('#leftMainContent').css('width',parseFloat(100*(wW-right-left)/wW) + '%' );$('#leftMainContent').css('height','auto');}else{$('#leftMainContent').css('left',left + 'px');$('#leftMainContent').css('top',top + 'px');$('#leftMainContent').css('bottom',bot + 'px');$('#leftMainContent').css('right',right + 'px');$('#leftMainContent').css('width','auto');$('#leftMainContent').css('height','auto');}}});
// *** Thoát fullScreenMode *** //
document.addEventListener('fullscreenchange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});
document.addEventListener('webkitfullscreenchange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});
document.addEventListener('mozfullscreenchange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});
document.addEventListener('MSFullscreenChange', function() {var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;if (fullscreenElement == null) {ExitFullScreen();}});// *** Hết xử lý thoát fullScreenMode *** //
$('.QuestionResultPanelContent_Bottom_NoScore_Right').on('click',function(){$(this).parent().parent().css('z-index',-1);$(this).parent().parent().css('visibility','hidden');});
$('.QuestionResultPanelContent_Bottom').on('click',function(){$(this).parent().parent().css('z-index',-1);$(this).parent().parent().css('visibility','hidden');});
function GetMaxIndex(pageID){var _obj=$('#'+pageID);var _max=_obj.zIndex();_obj.children().each(function(){var _k=GetMaxIndexSub($(this));if (_k>_max)_max=_k;   });return _max;}
function GetMaxIndexSub(_obj){var _max=_obj.zIndex();_obj.children().each(function(){if (typeof $(this) != typeof undefined && $(this).zIndex()>_max)_max=$(this).zIndex();});return _max;}
function ResizeTblPageList(){var _allHeight=0.0;$('#tblPageList').children().each(function(){if (typeof parseFloat($(this).height()) != typeof undefined)_allHeight+= 1 + parseFloat($(this).height());});$('.ConfirmAnswerLeft_Left_btnPre').each(function(){$(this).children().first().css('height',parseFloat(0.8 * $('.ConfirmAnswerLeft_Left_btnPre').parent().parent().parent().height())-1 + 'px');});$('.ConfirmAnswerLeft_Left_btnNext').each(function(){$(this).children().first().css('height',parseFloat(0.8 * $('.ConfirmAnswerLeft_Left_btnNext').parent().parent().parent().height())-1 + 'px');});if (_allHeight<$('#tblPageList').parent().parent().height() && $('#tblPageList').parent().attr('class')=='jspPane') $('#tblPageList').parent().css('height',$('#tblPageList').parent().parent().height()+'px'); else if (_allHeight>$('#tblPageList').parent().parent().height() && $('#tblPageList').parent().attr('class')=='jspPane') $('#tblPageList').parent().css('height',_allHeight+'px');}// *** Phục vụ đa phương tiện *** //
function ShowPlayer(){$('.iconAudio').each(function(){$(this).parent().parent().mouseenter(function(){$(this).find('audio').each(function(){$(this).attr('controls', true);});});$(this).parent().parent().mouseleave(function(){$(this).find('audio').each(function(){$(this).attr('controls', false);});});});$('#leftMainContent').find('audio').each(function(){var _aWidth=$(this).width();var _parWidth=$(this).parent().parent().width();if (_parWidth<_aWidth){$(this).parent().css('left',(_parWidth-_aWidth)/2 + 'px');} else if (_parWidth>_aWidth){$(this).parent().css('left',(_parWidth-_aWidth)/2 + 'px');}});$('video').mouseenter(function(){$(this).attr('controls', true);if (typeof $(this).attr('id')!=typeof undefined && $(this).attr('id')=='mainRightTopBotLeft_Video'){$(this).attr('controls', false);}});$('video').mouseleave(function(){$(this).attr('controls', false);if (typeof $(this).attr('id')!=typeof undefined && $(this).attr('id')=='mainRightTopBotLeft_Video'){$(this).attr('controls', false);}});}
function PlayMedia(namePage){$('#' + namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0 && $(this).hasClass('VideoDemonstration')==false)this.play();});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)this.play();});}
function PauseMedia(namePage){$('#' + namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)this.pause();});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)this.pause();});}
function StopMedia(namePage){$('#' + namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){$(this).get(0).pause();this.currentTime = 0;}});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){$(this).get(0).pause();this.currentTime = 0;}});}
function StopAllMedia(){$('#leftMainContent').children('.CELPage').each(function(){$(this).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){this.pause();this.currentTime = 0;}});$(this).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){this.pause();this.currentTime = 0;}});});}
function stopFlash(IdCelPage) {var child = $('#' + IdCelPage).find('EMBED');for (var i = 0; i < child.length; i++) {var id = $(child[i]).attr('id');document.getElementById(id).StopPlay();}}
function playFlash(IdCelPage) {var child = $('#' + IdCelPage).find('EMBED');for (var i = 0; i < child.length; i++) {var id = $(child[i]).attr('id');document.getElementById(id).Play();}}
function ControlMedia(){var timeSlide = $('#slider-value').html();var timeSlide = parseFloat(parseFloat(timeSlide).toFixed(1));var _curPage = GetCurrentPage();var namePage =_curPage.attr('id');$('#' +namePage).find('video').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){var vid = document.getElementById($(this).attr('id'));vid.currentTime = timeSlide;}});$('#' + namePage).find('audio').each(function(){if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0){var aid = document.getElementById($(this).attr('id'));aid.currentTime = timeSlide;}});}
// **** Phục vụ chủ đề **** //
function inlineTest($el,$insert, saveOptions, testOptions) {var svg = $el.html();var canvas = $el.find(testOptions && testOptions.selector || 'svg')[0];svgAsDataUri(canvas,saveOptions,function(uri){$insert.append('<img class="ThemeIMGBackground" src=' + uri + ' />');});}
// **** Phục vụ thuyết minh, đồng bộ //
function GetCurrentPage() {var _curPage;$('#leftMainContent').children().each(function(){if ($(this).hasClass('CELPage')==true && $(this).hasClass('hidden')==false){_curPage=$(this);return _curPage;}});return _curPage;}
function StopGlobalDemonstration(stop)
{
    var timeSlide = $('#slider-value').html();var timeSlide = parseFloat(parseFloat(timeSlide).toFixed(1));var time = timeSlide;var timeStop = time.toFixed(1) * 10;var nubmerPage = checkNumberPage();var list = listObject[nubmerPage];var endTime = list.time;var percent = Math.abs(((100 * timeStop) / (endTime * 10)) - 100);var _curTime= endTime - (percent * endTime/100);
    var _curPage=GetCurrentPage();
    if (typeof _curPage != typeof undefined)
    {
        _curPage.find('audio').each(function(){
            if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0 && $(this).hasClass('AudioDemonstration'))
            {
                if (stop==true) this.pause();
                else
                {
                    if (_curTime<this.duration){this.currentTime=_curTime;this.play();}
                }
            }
        });
    }
    $('#mainRightTopBotLeft').find('video').each(function(){
        if (typeof $(this).attr('src') != typeof undefined && $(this).attr('src').length>0)
        {
            if (stop==true) this.pause();
            else
            {
                if (_curTime<this.duration){this.currentTime=_curTime;this.play();}
            }
        }
    });
}
window.onresize = function(event){
    wW=$(window).innerWidth();wH=$(window).innerHeight();
    resizeAll(wW,wH); 
    // Thay đổi kích thước chủ đề
    if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
    if (typeof NextPreviewButtonQuestionPage !== 'undefined' && $.isFunction(NextPreviewButtonQuestionPage)) NextPreviewButtonQuestionPage();
    if (typeof RestyleQuesOneChoice !== 'undefined' && $.isFunction(RestyleQuesOneChoice)) RestyleQuesOneChoice();
    if (typeof CreatePareConnectCrossAnswer !== 'undefined' && $.isFunction(CreatePareConnectCrossAnswer)) CreatePareConnectCrossAnswer();
    if (typeof InitDragableAnswer !== 'undefined' && $.isFunction(InitDragableAnswer)) InitDragableAnswer();
    if (typeof InitQuestionPages !== 'undefined' && $.isFunction(InitQuestionPages)) InitQuestionPages();
};function BackGroundAudio(_nextBack)
{
    var timeSlide = $('#slider-value').html();
    var timeSlide = parseFloat(parseFloat(timeSlide).toFixed(1));
    var time = timeSlide;
    var timeStop = time.toFixed(1) * 10;
    nubmerPage = checkNumberPage();
    var list = listObject[nubmerPage];
    if (typeof list == typeof undefined) return false;
    var listPage = list.listPage;
    var endTime;var percent;var _curTime;
    var _pageTime;var _bgAudioTime=0;var _bgAudioTimePrevious=0;
    var _bgAudio = document.getElementById('BGAudio');
    _bgAudio.volume=0.5;
    if (listPage != null)
    {
        var endTime = list.time;
        var percent = Math.abs(((100 * timeStop) / (endTime * 10)) - 100);
        var _demonstrationTime= endTime - (percent * endTime/100);
        if (_nextBack==true) _demonstrationTime=0;
        var _curPage=GetCurrentPage();
        if (typeof window['listBackGroundAudio'] != typeof undefined)
        {
            // Tổng time từ đầu đến trang hiện tại
            _pageTime=0.0;
            for (i=0;i<nubmerPage;i++){_pageTime += listObject[i].time;}
            _pageTime+=_demonstrationTime; // Thời gian hiện tại
            // Tìm đối tượng BackGround Audio phù hợp - duration + startTime
            _bgAudioTime=0.0;
            _bgIndex=0;
            for (i=0;i<listBackGroundAudio.length;i++)
            {
                _bgAudioTime += listBackGroundAudio[i].Duration;
                _bgAudioTime += listBackGroundAudio[i].StartTime;
                if (i>0)
                {
                    _bgAudioTimePrevious += listBackGroundAudio[i-1].Duration;
                    _bgAudioTimePrevious += listBackGroundAudio[i-1].StartTime;
                }
                if (_bgAudioTime>_pageTime)
                {
                    _bgIndex=i;
                    i=listBackGroundAudio.length;
                }
            }
            if (_pageTime>_bgAudioTime && _bgAudio.paused==false)
            {
                 $('#BGAudio').attr('src','');
                _bgAudio.pause();
            }
            if (_pageTime<_bgAudioTime)
            {
                if (typeof $('#BGAudio').attr('src') != typeof undefined && $('#BGAudio').attr('src') != listBackGroundAudio[_bgIndex].SRC) $('#BGAudio').attr('src',listBackGroundAudio[_bgIndex].SRC);
                if (typeof $('#BGAudio').attr('src') == typeof undefined) $('#BGAudio').attr('src',listBackGroundAudio[_bgIndex].SRC);
                var time = _pageTime-listBackGroundAudio[_bgIndex].StartTime-_bgAudioTimePrevious;
                _bgAudio.currentTime = time;
                if (playingGlobal==true) _bgAudio.play(); else _bgAudio.pause();
            }
        }
    }
}
