/**
 * @file
 * Implements drupal popup ajax command.
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  /**
   * Command to append and open a popup.
   *
   * @param {Object} ajax
   *   Ajax call object.
   * @param response
   *   Response data.
   */
  Drupal.AjaxCommands.prototype.showPopup = function (ajax, response) {
    var popup = Popup.register(response.data, response.id).open();

    // @todo The document context should be passed when attaching a behavior.
    // For example, active-link.js attempts to call querySelectorAll on the attached popup element. Since that method
    // is not available on popup element the call fails and an error is thrown. This fixes the issue for active-link.js
    // but it is NOT a generic fix.
    popup.element.querySelectorAll = document.querySelectorAll.bind(document);
    Drupal.attachBehaviors(popup.element, drupalSettings);
  };

  /**
   * Command to close a popup.
   *
   * @param {Object} ajax
   *   Ajax call object.
   * @param response
   *   Response data.
   */
  Drupal.AjaxCommands.prototype.closePopup = function (ajax, response) {
    Popup.close(response.id);
  };

})(jQuery, Drupal, drupalSettings);
