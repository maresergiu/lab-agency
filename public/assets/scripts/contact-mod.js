"use strict";

(function ($) {
  function contactMod() {
    var $thisContactMod = $(this),
        contactObj = {
      cache: {
        $slideHolder: $thisContactMod.find('.slider'),
        $svgElem: $thisContactMod.find('#svg-state'),
        $rangeInput: $thisContactMod.find('#range'),
        range: {
          min: 0,
          max: 1
        },
        timer: {
          rangeCta: {}
        },
        userState: ['angry', 'upset', 'moderate', 'curious', 'happy'],
        userStateIndex: 4
      },
      presentation: {
        updateSvg: function updateSvg(animClass) {
          return contactObj.cache.$svgElem.removeClass().addClass(animClass);
        }
      },
      events: function events() {
        contactObj.cache.$slideHolder.find('.range-cta').on('click', function () {
          var $thisRangeCta = $(this),
              shouldIncrement = $thisRangeCta.hasClass('increment'),
              inputState,
              rangeValue;
          clearTimeout(contactObj.cache.timer.rangeCta);
          contactObj.cache.timer.rangeCta = setTimeout(function () {
            if (shouldIncrement) {
              rangeValue = parseInt(contactObj.cache.$rangeInput.val()) + 1;
            } else {
              rangeValue = parseInt(contactObj.cache.$rangeInput.val()) - 1;
            }

            if (rangeValue >= contactObj.cache.range.min && rangeValue <= contactObj.cache.range.max) {
              contactObj.cache.userStateIndex = rangeValue - 1;
              inputState = "state-".concat(rangeValue);
              contactObj.cache.$rangeInput.val(rangeValue);
              contactObj.cache.$svgElem.removeClass().addClass(inputState);
            }
          }, lab.cache.timer.fast);
        });
        contactObj.cache.$rangeInput.on('change', function () {
          var inputValue = $(this).val();
          contactObj.cache.userStateIndex = inputValue - 1;
          contactObj.cache.$svgElem.removeClass().addClass("state-".concat(inputValue));
        });
        $thisContactMod.find('.full-submit').on('click', function () {
          var userMood = contactObj.cache.userState[contactObj.cache.userStateIndex],
              $thisSubmitCta = $(this),
              $modForm = $thisSubmitCta.closest('.mod-form'),
              $formSection = $modForm.find('.form-section');

          if (!$formSection.hasClass('errors')) {
            console.log($formSection.find('form').serialize() + '&userMood:' + userMood);
            $modForm.find('.content').fadeOut(lab.cache.timer.fast, function () {
              $modForm.find('.form-feedback').fadeIn(lab.cache.timer.fast);
            });
          }
        });
      },
      init: function init() {
        contactObj.cache.range.min = contactObj.cache.$rangeInput.attr('min');
        contactObj.cache.range.max = contactObj.cache.$rangeInput.attr('max');
        contactObj.events();
      }
    };
    contactObj.init();
  }

  $(document).ready(function () {
    lab.cache.$main.each(contactMod);
  });
})(jQuery);