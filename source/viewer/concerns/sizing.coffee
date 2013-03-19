module.exports= (elem, state)->
  imageWidth=0
  imageHeight=0
  imageFullWidth=0
  imageFullHeight=0
  progressWidth=0

  state.on 'resize', ->
    if elem.is('.zoomed')
      # elem.css width:state.imageWidth
      resizeFullscreenElements()
    else
      # set size...
      resizeRegularElements()

  getDimensions= ->
    # return if imageFullHeight isnt 0
    # stack.show()
    # state.trigger 'cmd:current:show'
    firstImg= elem.find('img').get(0)
    state.imageWidth= imageWidth= firstImg.width
    state.imageHeight= imageHeight= firstImg.height
    state.imageFullWidth= imageFullWidth= firstImg.naturalWidth
    state.imageFullHeight= imageFullHeight= firstImg.naturalHeight
    log.info imageWidth, 'x', imageHeight, ' -- ', imageFullWidth, 'x', imageFullHeight
    getProgressDimensions()
    # state.trigger 'cmd:current:hide'

  getProgressDimensions= ->
    state.progressWidth= progressWidth= elem.find('.progress').width()

  # state.on 'cmd:sizes:calc', ->
  #   getDimensions()

  state.on 'change:loaded', (loaded)->
    getDimensions()

  resizeRegularElements= ->
    elem.css width:state.imageWidth, height:''
    stack.css(height:state.imageHeight)
    elem.find('img').css maxWidth:'100%', maxHeight:''


  resizeFullscreenElements= (e)->
    d= $(window)
    h= d.height()
    w= d.width()
    elem.css width:w, height:h
    h -= elem.find('.pager').outerHeight()
    h -= elem.find('header').outerHeight()
    h -= elem.find('.copyright').outerHeight() ? 0
    h -= 6 # margin
    stack.css height:h
    elem.find('img').css maxWidth:Math.min(w, imageFullWidth), maxHeight:Math.min(h, imageFullHeight)
    progressWidth= elem.find('.progress').width()