$(function(){
  // $("body").append("<p> An other text</p>")
  var $orders = $('#orders');
  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/michail/orders/',
    // url: 'http://rest.learncode.academy/api/learncode/friends',
    success: function(orders){
      console.log('success', orders);
      $.each(orders, function(i, order){
        $orders.append('<li class="list">Name: '+order.name+', Drink: '+order.drink+', id:'+order.id+'</li>');
      });
    }
  });

});
