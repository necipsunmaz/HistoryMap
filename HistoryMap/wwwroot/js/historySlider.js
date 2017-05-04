var HistorySlider = function (containerID) {
    var self = this,
        $HistorySlider = $('#' + containerID),
        $SliderThumnb = $HistorySlider.find('.HistorySlider_Thumb'),
        $SliderTrack = $HistorySlider.find('.HistorySlider_Track'),
        $SliderTrackFill = $HistorySlider.find('.HistorySlider_TrackFill'),
        $ClickArea = $HistorySlider.find('.HistorySlider_ClickArea'),
        $SliderPoints = $HistorySlider.find('.HistorySlider_Point');

    this.value = 20;

    /* helper to find slider value based on filled track width */
    var findValueFromTrackFill = function (trackFillWidth) {
        var totalWidth = $SliderTrack.width(),
            onePercentWidth = totalWidth / 200,
            value = Math.round((trackFillWidth / onePercentWidth) / 10);
        return value;
    }

    /* change highlighted number based on new value */
    var updateSelectedValue = function (newValue) {
        $SliderPoints.removeClass('HistorySlider_PointActive');
        $SliderPoints.eq(newValue).addClass('HistorySlider_PointActive');
    }

    /* highlight track based on new value (and move thumb) */
    var updateHighlightedTrack = function (newPosition) {
        newPosition = (newPosition / 2).toFixed(1).toString().split('.').join('') + '%';
        $SliderTrackFill.css('width', newPosition);
    }

    /* set up drag funcationality for thumbnail */
    var setupDrag = function ($element, initialXPosition) {
        $SliderTrackFill.addClass('HistorySlider_TrackFill-stopAnimation');
        var trackWidth = $SliderTrackFill.width();

        var newValue = findValueFromTrackFill(trackWidth);
        updateSelectedValue(newValue);

        $element.on('mousemove', function (e) {
            var newPosition = trackWidth + e.clientX - initialXPosition;
            self.imitateNewValue(newPosition);

            newValue = findValueFromTrackFill($SliderTrackFill.width());
            updateSelectedValue(newValue);
        });
    }
    /* remove drag functionality for thumbnail */
    var finishDrag = function ($element) {
        $SliderTrackFill.removeClass('HistorySlider_TrackFill-stopAnimation');
        $element.off('mousemove');
        var newValue = findValueFromTrackFill($SliderTrackFill.width());
        self.updateSliderValue(newValue);
    }

    /* method to update all things required when slider value updates */
    this.updateSliderValue = function (newValue) {
        updateSelectedValue(newValue);
        updateHighlightedTrack(newValue);
        self.value = newValue;
    }

    /* method to imitate new value without animation */
    this.imitateNewValue = function (XPosition) {
        $SliderTrackFill.addClass('HistorySlider_TrackFill-stopAnimation');
        if (XPosition > $SliderTrack.width()) {
            XPosition = $SliderTrack.width();
        }
        $SliderTrackFill.css('width', XPosition + 'px');
    }

    /*
     * bind events when instance created
     */
    $ClickArea.on('mousedown', function (e) {
        /* if a number or thumbnail has been clicked, use their event instead */
        var $target = $(e.target);
        if ($target.hasClass('HistorySlider_Thumb')) {
            return false;
        }
        /* now we can continue based on where the clickable area was clicked */
        self.imitateNewValue(e.offsetX);
        setupDrag($(this), e.clientX);
    });

    $ClickArea.on('mouseup', function (e) {
        finishDrag($(this));
    });

    // update value when markers are clicked
    $SliderPoints.on('mousedown', function (e) {
        e.stopPropagation();
        var XPos = $(this).position().left + ($(this).width() / 2);
        self.imitateNewValue(XPos);
        setupDrag($ClickArea, e.clientX);
    });

    // when thumbnail is clicked down, init the drag stuff
    $SliderThumnb.on('mousedown', function (e) {
        e.stopPropagation();
        setupDrag($(this), e.clientX);
    });

    // when the thumbnail is released, remove the drag stuff
    $SliderThumnb.on('mouseup', function (e) {
        finishDrag($(this));
    });
}

var historySlider = new HistorySlider('HistorySlider');