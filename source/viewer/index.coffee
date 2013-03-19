###
  Viewer
    - handles commands
    - triggers commands
    - changes state
    - changes dom (if need be)
  Module
    - triggers commands
    - changes state
    - changes dom (if need be)
###
env= require 'env'
uid= require 'util/uid'
pad= require 'util/number/pad'
log= require('util/log').prefix('viewer:')
events= require 'cog/events'
validate= require './validator'

require('themes/_layout').activate()

CogView= require 'cog/view'
CogModel= require 'cog/object'

{getX}= require 'util/positions'

build_url= (pattern, idx)->
  #hack!
  pattern= pattern.replace('####', pad(idx, 4))
  pattern= pattern.replace('###', pad(idx, 3))
  pattern= pattern.replace('##', pad(idx, 2))
  pattern= pattern.replace('#', idx)

class ViewState extends CogModel
  isLastPage:  -> @currentPage is @getLastPage()
  isFirstPage: -> @currentPage is 0
  getNextPage: -> Math.min (@currentPage + 1), @getLastPage()
  getPrevPage: -> Math.max (@currentPage - 1 ), 0
  getLastPage: -> @pages - 1
  isValidPage: (num) -> num >= 0 and num < @pages
  getPercentageRead: -> 
    if @isLastPage()
      100
    else if @progressAllowEmpty
      if @current is 0
        0
      else
        Math.min Math.round( (@currentPage / @getLastPage()) * 100 ), 100
    else
      Math.min Math.ceil( ((@currentPage + 1) / @pages) * 100 ), 100


class FlipBookViewer extends CogView
  className: 'flipbook'
  template: require('./template')

  outlets:
    stack: '.screen-stack'
    pagerArea: '.pager'
    progressBar: '.progress'

  initialize: ->
    unless validate(@model, true)
      throw "Invalid settings: #{ validate.errors() }" 
    @elem
      .hide()
      .data 'controller', @
    @screenCount= @model.pages
    @state= new ViewState @model
    @state.set 
      controller: @
      currentPage: 0
      ready: no
      active: no
      loaded: no
      zoomed: no
      endScreen: no
      helpScreen: no
    
    # @state.on 'change', (changed)-> console.warn "state changed", changed
    @state.on 'change:currentPage', @onPageChange
    @state.on 'change:ready', @onReady

    @state.on 'cmd:page:next', @onNextPage
    @state.on 'cmd:page:prev', @onPrevPage
    @state.on 'cmd:current:show', @showCurrent
    @state.on 'cmd:current:hide', @hideCurrent
    # @state.on 'cmd:help:toggle', @toggleHelp
    @state.on 'cmd:zoom:toggle', @toggleZoom
    @state.on 'cmd:zoom:out', @doZoomOut
    @state.on 'cmd:zoom:in', @toggleZoom
    @state.on 'load:complete', @onLoad
    @state.on 'load:error', @onLoadError

    @screenCountIdx= @screenCount - 1
    @current= 0
    @elem
      .attr( 'tabindex', -1 )
      .addClass( 'inactive' ) # Allows for focus and blur events
      .toggleClass( 'isMobile', env.mobile)
      .toggleClass( 'isDesktop', (not env.mobile))
  
  toggleZoom: (e)=>
    return if not @state.ready
    @state.toggle 'zoomed'

  doZoomOut: (e)=>
    return if not @state.zoomed
    @state.set zoomed:no

  onPageChange: (idx)=>
    return @state.set currentPage:@state.getLastPage() if idx is -1
    return if not @state.ready or not @state.isValidPage(idx)
    @state.set endScreen:no
    @hideCurrent()
    @current = idx
    @showCurrent()

  onNextPage: =>
    return unless @state.ready
    if @state.isLastPage()
      @state.set endScreen:yes
      # e?.stopPropagation?()
    else if @state.endScreen or @state.helpScreen
      @state.set endScreen:no, helpScreen:no
    else
      @state.set currentPage:@state.getNextPage()

  onPrevPage: =>
    return unless @state.ready
    if @state.endScreen or @state.helpScreen
      @state.set endScreen:no, helpScreen:no
    else
      @state.set currentPage:@state.getPrevPage()

  onLoad: =>
    # @state.trigger 'cmd:sizes:calc'
    # @stack.show()
    # firstImg= @stack.find('img').get(0)
    # @fullImageHeight= firstImg.naturalHeight
    # @fullImageWidth= firstImg.naturalWidth
    # @imageWidth= firstImg.width
    # @imageHeight= firstImg.height
    @showCurrent()
    # @state.trigger 'resize'
    # @elem.css width:@imageWidth
    # @progressWidth= @progressBar.width()
    setTimeout (=> @state.set ready:yes ), 1

  onReady: =>
    log.info "onREady!"
    if @state.animated is false
      @stack
        .css(height:@state.imageHeight, opacity:1)
    else
      @stack
        .css(opacity:0)
        .animate(height:@state.imageHeight, opacity:1)


  onLoadError: =>
    log.info "ERROR Loading images"
    @elem.addClass('errors')
    @stack.find('img').remove()
    err= $("<div class='errors'>There were errors loading the images, please refresh your browser!</div>").hide()
    @stack.append(err).show()
    err.slideDown()

  showCurrent: =>
    displayType= if @state.zoomed then 'table-cell' else 'block'
    @stack.find('.screen').get(@current).style.display= displayType;

  hideCurrent: =>
    $(@stack.find('.screen').get(@current)).hide()

  getData: ->
    screens= []
    from= @model.start
    to= @model.start + @screenCountIdx
    for i in [from..to]
      mdl= src:build_url(@model.path, i)
      # log.info "state", mdl
      screens.push mdl
    data= @model
    data.screens= screens
    data.id= @id
    data.tapOrClick= ->
      if env.mobile then "tap" else "click"
    data.isMobile= env.mobile
    data

  onRender: ->
    for ctrlName in require.modules('viewer/concerns/')
      # log.debug "applying module:", ctrlName
      require(ctrlName).call @, @elem, @state
    # @progressWidth= @progressBar.width()
    @stack.find('.screen').hide()


  onDomActive: ->
    if @state.animated is false
      @elem.show()
    else
      @elem.addClass 'animated'
      @elem.fadeIn()
    @elem.focus() if @model.autofocus
    unless @state.firstRun is false
      @state.trigger 'cmd:help:toggle'
      

module.exports= FlipBookViewer

###
require('viewer/concerns/buttons');
require('viewer/concerns/end');
require('viewer/concerns/focus');
require('viewer/concerns/help');
require('viewer/concerns/keyboard');
require('viewer/concerns/loading');
require('viewer/concerns/metadata');
require('viewer/concerns/progress');
require('viewer/concerns/screen');
require('viewer/concerns/sizing');
require('viewer/concerns/theme');
require('viewer/concerns/zoom');
###