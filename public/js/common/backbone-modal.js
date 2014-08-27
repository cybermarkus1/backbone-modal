define(function(require) {
  'use strict';

  require('bootstrap');

  var Backbone = require('backbone');
  var template = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" type="button" data-dismiss="modal" aria-hidden="true">x</div><h4 class="modal-title"> title </div><div class="modal-body"><div id="modal_content"></div></div><div class="modal-footer"><a data-action="closeModal" class="btn"> Close </a><a href="#" class="btn btn-primary"> Save </a></div></div></div>';
  
  return Backbone.View.extend({

    // id: 'base-modal',
    className: 'modal fade',

    events: {
      'hidden': 'teardown',
      'click button#close': 'close',
      'click [data-action="closeModal"]': 'close'
    },

    initialize: function(modalContentView) {
      //console.log('ModalBaseView > modalContentView',modalContentView);

      this.template = template;
      this.modalContentView = modalContentView;
      console.log('init modal base view');
      // _.bindAll(this);
      this.render();
    },

    close: function(){
      this.undelegateEvents();

      this.$el.removeData().unbind(); 

      //Remove view from DOM
      this.remove();  
      Backbone.View.prototype.remove.call(this);
      $('.modal-backdrop').remove();
    },

    show: function() {
      this.$el.modal('show');
    },

    teardown: function() {
      this.$el.data('modal', null);
      this.remove();
    },

    render: function() {
      this.renderView();
      return this;
    },

    renderView: function() {
      $(this.el).html(_.template(this.template));
      // this.$el.modal({show:false}); // dont show modal on instantiation
      console.log("ModalBaseView",this.modalContentView);

      var aux = new this.modalContentView();

      this.$el.find('#modal_content').html(aux.render().el);

      this.show();
    }


  });
  
});